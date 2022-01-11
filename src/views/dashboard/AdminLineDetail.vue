<template>
  <div>
    <div class="top_line">
      <h1>세부맵 관리</h1>
    </div>
    <div class="left">
      <div class="select_wrap">
        <p>라인 조회</p>
        <select @change="handle_change_line" @click="handle_click_line_cds">
          <option :key="i" :value="v['line_cd']" v-for="(v, i) in sort_lines">{{v['name']}}</option>
        </select>
        <div class="radio_btn" >
          <div>
            <input type="radio" v-model="mode" name="" id="mode_manual" value="MANUAL" @click="handle_click_radio_manual_robot">
            <label for="mode_manual">수동</label>
          </div>
          <div class="purple">
            <input type="radio" v-model="mode" name="" id="mode_robot" value="ROBOT" @click="handle_click_radio_manual_robot">
            <label for="mode_robot">로봇</label>
          </div>
        </div>
        <div class="type">
          <p>
            <em class="yellow"></em>
            <span>수동</span>
          </p>
          <p>
            <em class="purple"></em>
            <span>로봇</span>
          </p>
          <p>
            <em class="red"></em>
            <span>선택됨</span>
          </p>
          <p>
            <em class="green"></em>
            <span>수정됨</span>
          </p>
        </div>
      </div>

      <div class="grid_wrap">
        <AdminLineDetailColumnNum :first_col="first_col"></AdminLineDetailColumnNum>
        <div class="row_number_area">
          <p :key="i" v-for="(v, i) in 4"><span>{{first_row - v + 1}}</span></p>
        </div>
        <AdminLineDetailMap :mode="mode" :line_data="line_data"></AdminLineDetailMap>
      </div>
    </div>
    <div class="right">
      <AdminLineDetailRightTable  :selected_arc_device_cd="selected_arc_device_cd" :mode="mode" :filtered_arc_items="filtered_arc_items"></AdminLineDetailRightTable>
    </div>
  </div>
</template>

<script>
import AdminLineDetailColumnNum from "../../components/dashboard/AdminLineDetailColumnNum";
import {EventBus} from "../../event-bus";
import AdminLineDetailRightTable from "../../components/dashboard/AdminLineDetailRightTable";
import AdminLineDetailMap from "../../components/dashboard/AdminLineDetailMap";
import {fetchApi6, fetchApi31, fetchEntireLines, putApi40} from "../../api/dashboard/endpoints";

export default {
  name: "AdminLineDetail",
  components: {AdminLineDetailMap, AdminLineDetailRightTable, AdminLineDetailColumnNum},
  data() {
    return {
      hostname:this.$get_api_host(),
      line_cd: this.$route.query.line_cd,
      line_data_origin:[],
      selected_line_cd:'F1L100',
      moved_arc_device_cd:'',
      selected_arc_device_cd:'',
      first_row:0,
      first_col:0,
      line_data:this.init_line_data(),
      mode:'MANUAL',
      arc_items:[],
      filtered_arc_items:[],
      sort_lines: [],
      ROBOT_DATA_KEY:'STORAGE_KEY_MAIN_MAP_LINE',
      line_name_data: Array,
    }
  },
  watch:{
    mode: function(mode) {
      // console.log('[watch] mode', mode)
      this.selected_arc_device_cd = ''
      this.update_filtered_arc_items(mode, this.selected_line_cd)
    },
    selected_line_cd: function (line_cd){
      console.log('[watch] selected_line_cd', line_cd);
      this.update_filtered_arc_items(this.mode, line_cd);

      this.selected_arc_device_cd = '';
      this.line_data = this.init_line_data();
      console.log('[line_data_origin]', this.line_data_origin);
      const selected_line = this.line_data_origin[line_cd];
      console.log('selected_line',this.line_data_origin, selected_line);
      // const row_col = this.$get_first_row_column(selected_line);
      // this.first_row = row_col[0];
      // this.first_col = row_col[1];
      // console.log('row_col', selected_line, row_col, this.first_row, this.first_col)
      const yellow_bg_location = this.get_yellow_bg_location(selected_line, this.first_row, this.first_col);
      console.log('yellow_bg_location', yellow_bg_location);
      console.log('line_data', this.line_data);
      // for (const lo of yellow_bg_location)
      //   console.log(lo)
      for (const lo of yellow_bg_location) {
        for (const i in [0, 1, 2, 3]){
          for (const j in [0, 1, 2, 3]) {
            // console.log('cell',this.line_data[lo[0]],lo[0], lo[1])
            this.$set(this.line_data[lo[0]][lo[1]][i][j], 2, "yellow")
          }
        }
      }
      this.call_api_and_set_arc_items()
    }
  },
  methods:{
    sort_data_line_cd(data){
      let arr = [];

      for(let item of data){
        //console.log('sort data', data, item)
        //let item_name = item;
        let line = {'line_cd' : item.line_cd, 'name':item.name};
        //console.log(line, data[n].name)
        arr.push(line)
      }
      arr.sort((a, b)=>{
        return a.line_cd[3] - b.line_cd[3]
      })
       console.log(arr)

      return arr
      },
    save_arc_item_data(device_info){
      console.log(`received device_info [${device_info.device_cd}]`,device_info)
      return putApi40(device_info)
        .then(res => {
          return res
        })
        .catch(err=>{
          console.log(err)
        })
    },
    handle_click_line_cds(){
      this.selected_arc_device_cd = ''
      this.filtered_arc_items = []
    },
    handle_click_radio_manual_robot(){
      // const q = confirm("저장하지 않은 데이터가 있습니다. 이동하시겠습니까?")
      // if (q){
        this.selected_arc_device_cd = ''
        this.filtered_arc_items = []
        this.call_api_and_set_arc_items()
        this.update_location_and_status(this.arc_items, this.selected_arc_device_cd)
      // }
    },
    handle_change_line(event){
      this.selected_line_cd = event.target.value
      const first_row_col = this.$get_first_row_column(this.line_data_origin[this.selected_line_cd])
      // console.log(first_row_col)
      this.first_row = first_row_col[0]
      this.first_col = first_row_col[1]
    },

    update_filtered_arc_items(mode, line_cd){
      this.filtered_arc_items = this.arc_items
        .filter(item=>item.deviceType === mode)
        .filter(item=>item.lineCd === line_cd)
    },
    init_line_data(){
      const r = []
      for(let i = 0; i < 3; i+=1){
        let row = []
        for(let j = 0; j < 10; j+=1){
          row.push([
            [{'device_id':"",'state':0,2:"",3:false},{'device_id':"",'state':0,2:"",3:false},{'device_id':"",'state':0,2:"",3:false},{'device_id':"",'state':0,2:"",3:false}],
            [{'device_id':"",'state':0,2:"",3:false},{'device_id':"",'state':0,2:"",3:false},{'device_id':"",'state':0,2:"",3:false},{'device_id':"",'state':0,2:"",3:false}],
            [{'device_id':"",'state':0,2:"",3:false},{'device_id':"",'state':0,2:"",3:false},{'device_id':"",'state':0,2:"",3:false},{'device_id':"",'state':0,2:"",3:false}],
            [{'device_id':"",'state':0,2:"",3:false},{'device_id':"",'state':0,2:"",3:false},{'device_id':"",'state':0,2:"",3:false},{'device_id':"",'state':0,2:"",3:false}]
          ])
        }
        r.push(row)
      }
      return r
    },
    get_device_location_status(data, first_row, first_col, line_cd){
      let positions = [];
      let selected_line_data = [];
      for(let sel of data){
        if(sel.lineCd === line_cd){
          selected_line_data.push(sel)
        }
      }
      for (const element of selected_line_data) {
        if (element.column === null || element.position === null) {
          continue;
        }

        if (this.selected_line_cd === element.lineCd){
          let row = first_row - Number(new RegExp('[0-9]{1,2}').exec(element['column'])[0])
          let col = new RegExp('[A-Z]{1}').exec(element['column'])[0].charCodeAt(0) - 65 + first_col
          const map = {3:0, 4:1, 1:2, 2:3}
          const position_row = map[Number(element['position'][0])]
          const position_column = map[Number(element['position'][1])]

          if (['11', '12', '21', '22'].indexOf(element['position']) >= 0){
            row -= 1
            col -= 1
          }else if(['13', '14', '23', '24'].indexOf(element['position']) >= 0){
            row -= 1
          }else if(['31', '32', '41', '42'].indexOf(element['position']) >= 0){
            col -= 1
          }
          // 11 A~P를 넘어갈때 빼줘야함
          if(col > 9) col -= 12;
          let state = ''
          if (element['deviceType'] === 'ROBOT'){
            state = 'purple'
          }else{
            state = 'yellow'
          }
          let is_error = element['error'];

          positions.push({'device': `${element['device']}`, 'state':state, 'is_moved':element.is_moved==true, 'origin':`${element['column']}${element['position']}`, 'cell_row':row, 'cell_col':col, 'position_row':position_row,
            'position_col':position_column, 'is_error':is_error})
        }
      }
      return positions
    },
    update_location_and_status(data, selected_arc_device_cd){
      this.line_data = this.init_line_data()
      this.set_yellow_bg(this.line_data_origin[this.selected_line_cd])
      const locations_and_status = this.get_device_location_status(data, this.first_row, this.first_col, this.selected_line_cd);
      for (const lo of locations_and_status) {
        try {
          this.$set(this.line_data[lo['cell_row']][lo['cell_col']][lo['position_row']][lo['position_col']], 'state', lo['state']);
          this.$set(this.line_data[lo['cell_row']][lo['cell_col']][lo['position_row']][lo['position_col']], 'device_cd', lo['device']);
          this.$set(this.line_data[lo['cell_row']][lo['cell_col']][lo['position_row']][lo['position_col']], 'is_moved', lo.is_moved);
          this.$set(this.line_data[lo['cell_row']][lo['cell_col']][lo['position_row']][lo['position_col']], 'is_selected', selected_arc_device_cd == lo['device']);
        } catch (e){
          console.log('err',e, lo)
          console.log('errr',lo['cell_row'], this.line_data[lo['cell_row']])
        }
      }

    },
    call_api_and_set_arc_items(){
      return fetchApi6().then(data=>{
        console.log('[call data from api6]', data)
        this.arc_items = data;
        this.update_filtered_arc_items(this.mode, this.selected_line_cd);
        // for (let item of this.filtered_arc_items.filter(m=>m.deviceType == this.mode).filter(m=>m.lineCd == this.selected_line_cd))
        //   console.log('filtered_arc_item', item.location)
        this.update_location_and_status(data, this.selected_arc_device_cd)
        return data
      })
    },
    get_yellow_bg_location(line_bg_data, first_row, first_col){
      // 7, 10인 경우
      // console.log('get first row column' ,first_row, first_col)
      const r = []
      const theta_column = first_col >= 10?4:0;
      for (const line_bg of line_bg_data) {
        const start_row = Number(new RegExp('[0-9]{1,2}').exec(line_bg['start_point'])[0])
        const start_col = new RegExp('[A-Z]{1}').exec(line_bg['start_point'])[0].charCodeAt(0) - 65
        const end_row = Number(new RegExp('[0-9]{1,2}').exec(line_bg['end_point'])[0])
        const end_col = new RegExp('[A-Z]{1}').exec(line_bg['end_point'])[0].charCodeAt(0) - 65
        for (let i = 0; i < start_row - end_row; i += 1){
          for (let j = start_col - first_col; j < start_col - first_col + Math.abs(end_col - start_col); j+=1){
            r.push([i + Math.abs(first_row - start_row), j + theta_column])
          }
        }
      }
      // line_bg_data를 참고하여 bg에 yellow가 들어갈 td를 찾는다.
      return r

    },
    set_yellow_bg(selected_line){
      const yellow_bg_location = this.get_yellow_bg_location(selected_line, this.first_row, this.first_col)
      for (const lo of yellow_bg_location) {
        for (const i in [0, 1, 2, 3]){
          for (const j in [0, 1, 2, 3]) {
            this.$set(this.line_data[lo[0]][lo[1]][i][j], 2, "yellow")
          }
        }
      }

    },
    move_arc_item(device_info_before, device_info_after){
      for (let i = 0; i < this.arc_items.length; i += 1) {
        if (this.arc_items[i].column == device_info_before.column && this.arc_items[i].position == device_info_before.position) {
          this.$set(this.arc_items[i], 'position', device_info_after.position)
          this.$set(this.arc_items[i], 'column', device_info_after.column)
          this.$set(this.arc_items[i], 'is_moved', true)
          this.selected_arc_device_cd = ''
          // this.arc_items.splice(i, 1)
          break
        }
      }

    },
    validation_duplicate_arc_item_column_location(device_info){
      let filtered_length = this.arc_items
        .filter(item=>item.column == device_info.column)
        .filter(item=>item.position == device_info.position)
        .length
      console.log('[validation_위치 중복]',device_info, filtered_length,filtered_length > 0?'중복있음':'중복없음')
      return filtered_length > 0
    },
    validation_out_of_area(device_info_before, device_info_after){
      // 라인을 벗어나는지 check
      let row = Number(new RegExp('[0-9]{1,2}').exec(device_info_after['column'])[0])
      const first_row_valid_positons = ['31', '32', '33', '34', '41', '42', '43', '44'] // positon type은 String
      let result = this.first_row < row || this.first_row - 3 > row
      if (!result && row == this.first_row){ // 범위 안에 들어오고 row가 첫번째 줄이면
        result = !first_row_valid_positons.includes(device_info_after.position)
      } else if(row == this.first_row - 3){
        result = first_row_valid_positons.includes(device_info_after.position)
      }
      console.log('[validation_라인 벗어남]',device_info_after,typeof device_info_after.position, row, result?'문제있음':'문제없음')
      return result
    }
  },
  created() {
    this.line_name_data = [];

    fetchEntireLines().then(data=>{
      if (data === undefined) {
        return;
      }
      this.line_name_data = [];
      this.line_name_dict = {};
      for (let i = 0 ; i < data.length ; i++) {
        this.line_name_data[i] = {line_cd : data[i].code, name : data[i].name};
        this.line_name_dict[data[i].code] = data[i].name;
      }

      fetchApi31(this.ROBOT_DATA_KEY).then(robot_info=>{
        console.log(`api31URL response:`, robot_info.value);

        let data2 = {};
        for(let value in robot_info.value) {
          if (data2[value] === undefined) {
            data2[value] = []
          }
          robot_info.value[value].forEach(item_obj => {
            //console.log(item_obj)
            let start_point = `${item_obj['start_row']}${item_obj['start_col']}`
            let end_point = `${item_obj['end_row']}${item_obj['end_col']}`
            data2[value].push({'start_point': start_point, 'end_point': end_point})

          })
        }
        this.line_data_origin = data2;

        // todo static하게 데이터 다시 바인딩 함 나중에 지울 것
        //this.line_data_origin = this.get_line_data_origin()

        this.sort_lines = this.sort_data_line_cd(this.line_name_data)
        console.log('[AdminLineDetail created] ', this.line_data);
        console.log(this.line_data_origin[this.selected_line_cd])
        const selected_line = this.line_data_origin[this.selected_line_cd];
        const row_col = this.$get_first_row_column(selected_line);
        this.first_row = row_col[0]
        this.first_col = row_col[1]

        this.set_yellow_bg(selected_line)
        this.call_api_and_set_arc_items()
      })

    });
    EventBus.$on("click-AdminDetailArcItem-change", (device_info_before, device_info_after, callback) =>{
      console.log('[click-AdminDetailArcItem-change]',device_info_before, device_info_after)
      // 바뀌면 validation한 후 반영 validation은 true가 문제 있는 것
      let validation_result1 = this.validation_duplicate_arc_item_column_location(device_info_after)
      if(validation_result1 == true){
        callback({'result':false, 'msg':`선택하신 ${device_info_after.column} ${device_info_after.position}는 위치가 겹칩니다.`})
      }else{
        let validation_result2 = this.validation_out_of_area(device_info_before, device_info_after)
        if(validation_result2 == true){
          callback({'result':false, 'msg':'선택하신 위치가 잘못되었습니다.'})
        } else if (!validation_result1 && !validation_result2) { // 둘다 false여야 save
          // this.arc_items에서 item의 위치를 변경함
          this.move_arc_item(device_info_before, device_info_after)
          this.update_location_and_status(this.arc_items, this.selected_arc_device_cd)
          callback({'result':true, 'msg':'용접기 위치가 유효 합니다.'})
        } else{
          console.log(validation_result1, validation_result2, 'validation results')
          callback({'result':false, 'msg':'알수 없는 에러'})
        }
      }


    });
    EventBus.$on("click-AdminDetailArcItem-save", (device_info, callback) =>{
      console.log("[click-AdminDetailArcItem-save]", device_info);
      if(this.validation_duplicate_arc_item_column_location(device_info)){
        this.save_arc_item_data(device_info)
          .then(res=>{
            this.selected_arc_device_cd = ''
            this.call_api_and_set_arc_items() // 데이터 다시 호출
              .then(data=>{
                console.log('저장완료', res)
                // for (let item of this.arc_items.filter(m=>m.deviceType == this.mode).filter(m=>m.lineCd == this.selected_line_cd))
                //   console.log('item', item.location)
                this.update_location_and_status(data, this.selected_arc_device_cd)
                callback({'result':true, 'msg':'저장 완료.'})
              })
          })
          .catch(err=>{
            console.log('err:', err)
            callback({'result':false, 'msg':'저장중 에러 발생'})
          })
      } else{
        callback({'result':false, 'msg':'입력 값이 겹칩니다.'})
      }
    });
    EventBus.$on("click-AdminDetailCell-select", device_info =>{
      // alert('validation추가 할 것')
      if(this.arc_items.filter(item=>item.device == device_info.device_cd)[0].deviceType == this.mode){
        this.selected_arc_device_cd = device_info.device_cd
        this.update_location_and_status(this.arc_items, this.selected_arc_device_cd)
      } else{
        if(this.mode == 'MANUAL'){
          alert("현재 모드는 수동입니다. 로봇에서 선택 해주세요.")
        } else{
          alert("현재 모드는 로봇입니다. 수동에서 선택 해주세요.")
        }
      }
    });
    EventBus.$on("click-AdminDetailArcItem-select", device_info =>{
      this.selected_arc_device_cd = device_info.device_cd
      this.update_location_and_status(this.arc_items, this.selected_arc_device_cd)
    });



  }
}
</script>
<style scoped>
.top_line{position: relative;text-align: center;margin-bottom: 15px; }
.top_line div{position: absolute;left: 0;top: 50%;transform: translateY(-50%);}
.top_line div button{margin-right: 15px;}
.top_line div img{display: block;}
.top_line div img.active{display: none;}
.top_line div button:hover img{display: none;}
.top_line div button:hover img.active{display: block;}
.top_line h1{color: #014085;font-size: 32px;font-weight: 700;}
.grid_wrap{position: relative;/* width: 700px; */padding-top: 42px;padding-left: 47px;padding-right: 0;margin: 60px 0;box-sizing: border-box;/* margin-top: 0; */}
.grid_wrap .row_number_area{position: absolute;height: calc(100% - 29px);left: 0;width: 100%;top: 0;margin-top: 29px;}
.grid_wrap .row_number_area p{position:absolute;width: 17px;text-align: left;width: calc(100% + 7.5px);}
.grid_wrap .row_number_area p span{display:inline-block;width:17px;text-align:right;}
.grid_wrap .row_number_area p:before{content:"";height: 1px;width: calc(100% - 22px);position:absolute;background:#ddd;top: 50%;left: 22px;transform: translateY(-50%);}
.grid_wrap .row_number_area p:nth-of-type(1){top:0}
.grid_wrap .row_number_area p:nth-of-type(2){top: 121px!important;}
.grid_wrap .row_number_area p:nth-of-type(3){top: 241px!important;}
.grid_wrap .row_number_area p:nth-of-type(4){top: 361px!important;}
.left{width: calc(100% - 575px); display: inline-block;}
.left .grid_wrap{display:inline-block;width: calc(100% - 15px);vertical-align: top;box-sizing: border-box;}
.type *{font-size: 16px;}
.type{ text-align: right; padding-top:4px; text-align: right; }
.type p{display:inline-block;margin-right: 20px;}
.type p span{display: inline-block;vertical-align: middle;}
.type p em{display: inline-block;width: 15px;height: 15px;border-radius: 500px;vertical-align:middle;margin-right: 5px;}
.type p em.yellow{background: #ffc200;}
.type p em.green{background: #2ed400;}
.type p em.purple{background: #a400e9;}
.type p em.red{background: #ff2b2b;}
.type p:last-child{margin-right: 0;}
.radio_btn{position: relative; display: inline-block; float:right; }
.radio_btn>div{display:inline-block;position: relative;}
.radio_btn input{border: white;width: 0px;height: 0px;position: absolute;bottom: 3px;left: 1px;}
.radio_btn label {position: relative;padding-left: 30px;}
.radio_btn .purple{margin-left: 20px;}
.radio_btn .purple label::before{background: url(/images/radio_icon2.png)no-repeat;content: "";display: inline-block;width: 19px;height: 19px;position: absolute;left: 0;bottom: 2px;background-size: 100%!important;}
.radio_btn label::before{background: url(/images/radio_icon1.png)no-repeat;content: "";display: inline-block;width: 19px;height: 19px;position: absolute;left: 0;bottom: 2px;background-size: 100%!important;}
.radio_btn .purple input:checked+label:before{background: url(/images/radio_icon2_o.png)no-repeat;}.radio_btn label::before{background: url(/images/radio_icon1.png)no-repeat;content: "";display: inline-block;width: 19px;height: 19px;position: absolute;left: 0;bottom: 2px;background-size: 100%!important;}
.radio_btn input:checked+label:before{background: url(/images/radio_icon1_o.png)no-repeat;}
.select_wrap{margin-top: 30px;text-align: left;}
.select_wrap select {color: #555;font-weight:600;-webkit-appearance: none;-moz-appearance: none;appearance: none;border: 1px solid #D7D7D7;background:url(/images/select.png)no-repeat;background-position: calc(100% - 10px);background-position : -webkit-calc(100% - 10px); background-position :-moz-calc(100% - 10px);padding:5px 10px;padding-right: 20px;background-size: 15px 7px;}
.select_wrap select::-ms-expand { display: none; }
.select_wrap select{border: 1px solid #ddd;border-radius: 5px;width: 300px;}
.select_wrap>p{margin-right: 20px;display: inline-block;font-weight: 600;color:#666;}

.right{display: inline-block;width: 550px;border: 1px solid #ddd;border-radius: 5px;vertical-align: top;padding: 15px;margin-left: 15px;margin-top: 20px;position: relative;text-align: center;height: 518px;}
.right .table_scr{height: 100%;overflow-y: scroll;}
.right table{}
.right table th{color: #fff;font-weight: 600;padding: 5px 0;border-right: 1px solid #fff;position: sticky;top:0;}
.right table th.gray{background: #5e5e5e;}
.right table th.navy{background: #002f63;}
.right table tbody tr:nth-of-type(2n){background: #ededed;}
.right table tbody tr:hover{background: #ffc200;}
@media(max-width:1600px){
  .left{width:100%;position: relative;}
  .right{width:100%;margin: 0;}
  .radio_btn{position: relative; display: inline-block; float:right;}
  .type{text-align: right;background: none;width: 100%;padding-right: 0;margin-top: 0;}
  .type *{color: #000}
  .grid_wrap{margin-top: 75px;}
}
</style>
