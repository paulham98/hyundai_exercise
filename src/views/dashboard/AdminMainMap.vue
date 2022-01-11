<template>
  <div>
    <div class="top_line">
      <h1>메인맵 관리</h1>
    </div>
    <div class="left">
      <AdminMainMapLineMap :line_data="line_name_data" :lines="rendering_data" :selected_line_code="selected_line_code"></AdminMainMapLineMap>
    </div>
    <AdminMainMapLineSearch :line_data="line_name_data" :lines="selected_line" :selected_line_code="selected_line_code" :storage_data="storage_data" ></AdminMainMapLineSearch>
  </div>
</template>
<script>
import AdminMainMapLineMap from "@/components/dashboard/AdminMainMapLineMap";
import AdminMainMapLineSearch from "@/components/dashboard/AdminMainMapLineSearch";
import axios from "axios"
import {EventBus} from "../../event-bus";
import {putApi32} from "../../api/dashboard/endpoints";

export default {
  name: "Admin2",
  components:{
    AdminMainMapLineMap, AdminMainMapLineSearch
  },
  watch:{
    un_data: function (un_data) {
      console.log('mainMap',un_data)

    },
  },
  data(){
    return{
      key_value:'STORAGE_KEY_MAIN_MAP_LINE',
      hostname:this.$get_api_host(),
      dummy_data: {
        'F1L100': [{start_row:10, start_col:'A', end_row:9, end_col:'G'},{start_row:9, start_col:'D', end_row:8, end_col: 'J'}],
        'F1L300' : [{start_row:8,  start_col:'A', end_row:7, end_col:'K'}],
        'F1L500' : [{start_row:7, start_col:'A', end_row:6, end_col:'K'}],
        'F1L600' : [{start_row:7, start_col:'K', end_row:6, end_col:'P'}],
        'F1L200' : [{start_row:6, start_col:'A', end_row:5, end_col:'D'}, {start_row:4, start_col:'A', end_row:3, end_col:'K'}],
        'F1L400' : [{start_row:6, start_col:'K', end_row:4, end_col:'P'}],
      },
      rendering_data: [],
      storage_data : {},
      line_name_data: Array,
      line_cd_data: new Set(),
      entire_lines: [],
      selected_line:[],
      selected_line_code: "",
    }
  },
  methods:{
    post_dummy_data(){
      let api31URL = `${this.hostname}/hiweld/api/dashboard/storage/`;
      axios.put(api31URL, {
        key : this.key_value,
        factory: 'F100',
        value : this.dummy_data,
        }
      ).then(res => {
          console.log('res', res)
          console.log('저장 되었습니다.', res['value']);
          alert("저장 되었습니다.");
          })
    },
    save_data(){
      console.log("save_data:",this.storage_data);
      let data = {key: this.key_value , factory: 'F100',value:this.storage_data }
      console.log("data:",data);
      return putApi32(data).then(res => {
        console.log('res', res)
        console.log('저장 되었습니다.', res['data']['result']);

        return res
      }).catch( err=>{
        console.log(err)
      })
    },
    make_render_object(row, index, i, key, line_name_dict, storage_data) {
      console.log(`index: ${index}, key:${key}`);
      console.log("row:",row);
      // row가 있을 경우 즉 start_row 값이 있을 경우 해당 값을 계산 하여 저장한다.
      let data = {line_cd: key, type:'selected', is_zig:false, start_row:i, end_row :(i-1), start_col:row.start_col, end_col:row.end_col, name:line_name_dict[key]};

      // type == h2 인지 여부 확인
      if (i > 4) {
        if(row.start_row === i) {
          data.row_count = row.start_row - row.end_row;
        }
      }

      // is_zig, type == blank 인지 여부 확인
      if (i < 10) {
        //  첫 줄 빼고는 모두다 is_zig 와 selected 여부를 고민 해야 함
        // is_zig는 두가지 상황이 있음
        // 1. row 의 start와 end의 차이가 2이상 이면서 현재의 위치가 두번째 이후일 경우
        // 2. 현재의 위치가 맨 처음이지만 내 위의 row랑 겹칠 경우
        if(row.start_row === i) {
          // 현재의 위치가 맨 처음일 경우, 내 위에 라인이 있는지 찾는다. 있으면 겹치는지 여부 확인 한다.
          for(let k = 0 ; k < storage_data[key].length; k++) {
            if (storage_data[key][k].end_row === i) {
              // 나랑 같은 line code 중에 end_row가 내 현재 row랑 같은 값이 있을 경우 col 값을 비교해서 겹치는지를 판단 한다.
              let upper_row = storage_data[key][k];
              if(row.start_col.charCodeAt(0) >= upper_row.start_col.charCodeAt(0) && upper_row.end_col.charCodeAt(0) > row.start_col.charCodeAt(0)) {
                // 이러면 겹치는 상황임
                data.is_zig = true;
              } else if (upper_row.start_col.charCodeAt(0) >= row.start_col.charCodeAt(0) && row.end_col.charCodeAt(0) > upper_row.start_col.charCodeAt(0)) {
                // 이러면 겹치는 상황임
                data.is_zig = true;
              }
            }
          }
        } else {
          // 현재의 위치가 맨 처음이 아닐 경우
          data.is_zig = true;
          data.type = 'blank';
        }
      }
      return data;
    },
    make_rendering_data(storage_data, line_name_dict) {
      // storage data에 저장 되어있는 데이터를 렌더링 형식에 맞게 변환 한다.
      // storage data는 key는 line code , value에는 array로 dictionary 를 넣는다.
      // ['F1L100'] = [{start_row:10, start_col:'A', end_row:9, end_col:'G'},{start_row:9, start_col:'D', end_row:8, end_col: 'J'}];
      // ['F1L300'] = [{start_row:8,  start_col:'A', end_row:7, end_col:'K'}];
      // ['F1L500'] = [{start_row:7, start_col:'A', end_row:6, end_col:'K'}];
      // ['F1L600'] = [{start_row:7, start_col:'K', end_row:6, end_col:'P'}];
      // ['F1L200'] = [{start_row:6, start_col:'A', end_row:5, end_col:'D'}, {start_row:4, start_col:'A', end_row:3, end_col:'K'}];
      // ['F1L400'] = [{start_row:6, start_col:'K', end_row:4, end_col:'P'}];
      //  {'line_cd':'F1L100', 'type':'selected', 'start_row': 10, 'start_col': 'A', 'end_row': 9, 'end_col': 'G', 'name':'BOOM', 'is_zig':false, },
      console.log("storage_data",storage_data);
      let ret = [[],[],[],[],[],[],[]];
      let index = 0;
      let storage_data_items ;
      let data;
      for (let i = 10 ; i > 3 ; i--) {
        for (let key in storage_data) {

          storage_data_items = storage_data[key];
          for(let j = 0 ; j < storage_data_items.length ; j++ ) {
            if (storage_data_items[j].start_row === i) {
              data = this.make_render_object(storage_data_items[j], index, i, key, line_name_dict, storage_data);
              ret[index].push(data);
            } else if (storage_data_items[j].start_row > i && i > storage_data_items[j].end_row) {
              data = this.make_render_object(storage_data_items[j], index, i, key, line_name_dict, storage_data);
              ret[index].push(data);
            }
          }
        }

        // start_col 값을 기준으로 정렬 한다.
        ret[index].sort((a, b) => {
          if ( a.start_col.charCodeAt(0) < b.start_col.charCodeAt(0))
            return -1
          else if ( a.start_col.charCodeAt(0) > b.start_col.charCodeAt(0))
            return 1
          else
            return 0
        })
        index++;
      }
      console.log("!!!!!!!!!!!!!!!!!!return data:", ret);
      return ret;
    }
  },

  created() {
    //this.post_dummy_data();
    console.log('check selected_line',this.selected_line)
    this.rendering_data = [[],[],[],[],[],[],[]];
    this.line_name_data = [];
    this.selected_line = [];


    let entire_lines_url = `${this.hostname}/hiweld/api/code/factories/F100/lines`
    this.$call_api(entire_lines_url, data=>{
      if (data === undefined) {
       return;
      }
      this.entire_lines  = data;
      this.line_name_data = [];
      this.line_name_dict = {};

      for (let i = 0 ; i < data.length ; i++) {
        this.line_name_data[i] = {line_cd : data[i].code, name : data[i].name};
        this.line_name_dict[data[i].code] = data[i].name;
      }

      let api31URL = `${this.hostname}/hiweld/api/dashboard/storage/${this.key_value}?factory=F100`;
      this.$call_api(api31URL, data => {
        console.log("api31URL get response:",data);
        if (data === undefined) {
          data = {};
          data.value = {};
        }

        // data = {};
        // data.value = {};
        //
        // // dummy data 로딩
        // data.value['F1L100'] = [{start_row:10, start_col:'A', end_row:9, end_col:'G'},{start_row:9, start_col:'D', end_row:8, end_col: 'J'}];
        // data.value['F1L300'] = [{start_row:8,  start_col:'A', end_row:7, end_col:'K'}];
        // data.value['F1L500'] = [{start_row:7, start_col:'A', end_row:6, end_col:'K'}];
        // data.value['F1L600'] = [{start_row:7, start_col:'K', end_row:6, end_col:'P'}];
        // data.value['F1L200'] = [{start_row:6, start_col:'A', end_row:5, end_col:'D'}, {start_row:4, start_col:'A', end_row:3, end_col:'K'}];
        // data.value['F1L400'] = [{start_row:6, start_col:'K', end_row:4, end_col:'P'}];
        //
        this.storage_data = data.value;
        this.rendering_data = this.make_rendering_data(this.storage_data, this.line_name_dict);

      });

    });

    EventBus.$on("save_data", (callback) => {
      console.log("event save_data");
      this.save_data(this.storage_data)
        .then(data =>{
          console.log(data)
          return callback(true)
        })
        .catch(err =>{
          console.log(err)
          callback(false)
        });
    })
    EventBus.$on('select_line', line_cd => {
      console.log("event_bus!!!! select_line !!! "+line_cd)
      this.selected_line = this.storage_data[line_cd]
      this.selected_line_code = line_cd;
      if(line_cd === ""){
        this.selected_line = [];
      }
    })
    EventBus.$on("render", data => {
      // 겹치는게 있는지 확인 한다.

      console.log("!!!!!!!render event:",data)
      let key = data['line_cd'];
      let value = data['data'];
      this.storage_data[key] = value;
      console.log("key value:",this.storage_data[key])
      this.rendering_data = this.make_rendering_data(this.storage_data, this.line_name_dict);
    });
  },
  mounted(){},
}

</script>

<style scoped>
.top_line{position: relative;text-align: center;margin-bottom: 15px;}
.top_line div{position: absolute;left: 0;top: 50%;transform: translatey(-50%);}
.top_line div button{margin-right: 15px;}
.top_line div img{display: block;}
.top_line div img.active{display: none;}
.top_line div button:hover img{display: none;}
.top_line div button:hover img.active{display: block;}
.top_line h1{color: #014085;font-size: 32px;font-weight: 700;}

.left{display: inline-block;width: calc(100% - 600px);}
.left .graph_wrap{display:inline-block;width: calc(100% - 40px);vertical-align: top; text-align: left !important;}
.left .graph_wrap2{display:inline-block;width: calc(100% - 42px);vertical-align: top;margin-bottom: 50px;box-sizing: border-box;}



</style>
