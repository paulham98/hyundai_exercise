<template>
  <div class="right">
    <div class="top">
      <p>라인 조회</p>
      <button type="button" :class="is_changed === true ? '' : 'change'" @click="click_save">저장</button>
     <!--, <button type="button" @click="get_change" class="change">수정</button> -->
      <select  v-model="selected" @change="selected_line">
        <option v-if="line_data.length === 0"></option>
        <option v-else :key="i" v-for="(nm, i) in line_data" :selected="selected === nm['line_cd']" :value="nm['line_cd']">{{nm['name']}}</option>
      </select>
    </div>
      <table class="table1" style="float: left; width: 50%;table-layout: auto">
          <thead>
          <tr>
              <th colspan="3">변경 전</th>
          </tr>
          </thead>
          <tbody >
          <tr style="height:41.5px">
              <th style="width: 20%">행</th>
              <th style="width: 40%">시작</th>
              <th style="width: 40%">종료</th>
          </tr>
          <tr :key="i+1" v-for="(item, i) in data" style="height:51px">
            <td><p>{{i+1}}</p></td>
            <td><p>{{item['start_row'] + item['start_col']}}</p></td>
            <td><p>{{item['end_row'] + item['end_col']}}</p></td>
          </tr>
          </tbody>
      </table>
     <!-- <img v-if="let_change" src="/images/arrow01.png" class="arrow"> -->
      <table class="table2" style="float: right; width: 50%; table-layout: auto">
          <thead>
          <tr>
              <th colspan="3">변경 후</th>
          </tr>
          </thead>
          <tbody >
          <tr style="height:41.5px;">
              <th style="width:20%">행</th>
              <th style="width:40%">시작</th>
              <th style="width:40%">종료</th>
          </tr>
          <tr style="height:51px;" :key="'dc -' + k" v-for="(dc ,k) in data_change" :class="(click_index === k ?(click_check === false ? '' : 'gray') : '')" @click="handleClick(k)">
            <td><p>{{k+1}}</p></td>
            <td><p >
              <select class="line_change" @change="change_event_start_row(k)"  v-model="dc.start_row"><option :key="i" v-for="(row, i) in change_row">{{row}}</option></select>
              <select class="line_change" @change="change_event_start_col(k)" v-model="dc.start_col"><option :key="i" v-for="(col, i) in change_col">{{col}}</option></select>
            </p></td><!--{{dc['start_row'] + dc['start_col']}}-->
            <td><p >
              <select class="line_change" @change="change_event_end_row(k)" maxlength="2" v-model="dc.end_row"><option :key="i" v-for="(row, i) in change_row">{{row}}</option></select>
              <select class="line_change" @change="change_event_end_col(k)" maxlength="1" v-model="dc.end_col"><option :key="i" v-for="(col, i) in change_col">{{col}}</option></select>
            </p></td><!-- {{dc['end_row'] + dc['end_col']}} -->
          </tr>
          </tbody>
      </table>
    <div class="addNdel">
      <button type="button" @click="row_add(click_index)"  class="add">추가</button>
      <button type="button" @click="row_pop(click_index)" class="del">삭제</button>
      <div>
        <img v-if="selected !== ''" :src="`${hostname}/hiweld/api/code/factories/F100/lines/${selected}/image`" style="display:block; padding-left: 50px;">
      <button @click="click_inputTag()" style="width: 100px; padding-left: 17px" type="button"  class="img_change">
        <input ref="image" id="input" type="file" name="image" accept="image/*" multiple="multiple" class="hidden" @change="upload_image(selected)"/>
        이미지교체
      </button>
      </div>

    </div>

    <div>

    </div>
  </div>
</template>

<script>
import {EventBus} from "../../event-bus";
import axios from 'axios'
export default {
  name: "AdminMainMapLineSearch",
  components:{},
  props:{
    line_data: {type: Array, required:true },
    lines: {type: Array, required:true},
    selected_line_code: {type: String, required:true},
    storage_data : {type: Object, required:true}
  },
  data(){
    return{
      change_row:[10,9,8,7,6,5,4,3],
      change_col:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q'],
      selected: '',
      data:[],
      data_change: [],
      input_start_rc: '',
      input_end_rc: '',
      plus_start_rc: '',
      plus_end_rc: '',
      data_length: 0,
      click_check: false,
      click_index: 100,
      row_cnt: 0,
      is_changed: false,
      change_img: '',
      images: '',
      hostname:this.$get_api_host(),

    }
  },
  watch:{
    lines: function (lines) {
      console.log('lineSearch: ', lines)

      this.data = this.copy_line(lines)
      this.data_change = this.copy_line(lines)
    },
    line_data: function (line_data) {
      console.log('line_data', line_data)
    },
    selected_line_code: function (selected_line_code) {
      console.log('selected line code:',selected_line_code)
      console.log(this.lines)
      this.selected = selected_line_code;
    }
  },
  methods:{
    is_duplicated(rect1, rect2) {
      let a = {start_col: rect1.start_col, end_col:rect1.end_col, start_row:rect1.start_row, end_row:rect1.end_row};
      let b = {start_col: rect2.start_col, end_col:rect2.end_col, start_row:rect2.start_row, end_row:rect2.end_row};
      if (a.start_col.charCodeAt(0) >= b.end_col.charCodeAt(0) || a.end_col.charCodeAt(0) <= b.start_col.charCodeAt(0)
          || a.start_row <= b.end_row || a.end_row >= b.start_row) {
        return false;
      }
      return true;
    },
    check_all_lines(item, index) {
      console.log("check_all_lines")
      // 데이터 겹치는지 여부 확인 한다.
      // 일단 먼저 나와 같은 line code인 친구들 먼저 계산 한다.
      let obj;
      for(let i = 0 ; i < this.data_change.length ; i++ ) {
        if (i !== index) {
          obj = this.data_change[i];
          if (this.is_duplicated(item, obj)) {
            alert("라인이 겹칩니다.");
            return false;
          }
        }
      }

      // 전체 데이터 중에 line code가 나랑 일치 하지 않는 것들만 비교 한다.
      let line_cd = this.selected;
      let line;
      for (let key in this.storage_data) {
        if (key === line_cd) {
          continue;
        }

        // key에 들어있는 모든 데이터랑 this.data_change 배열에 있는 rect들과 다 비교 한다.
        line = this.storage_data[key];
        for (let i = 0 ; i < line.length ; i++) {
          for (let j = 0 ; j < this.data_change.length ; j++) {
            if (this.is_duplicated(line[i], this.data_change[j])) {
              alert("라인이 겹칩니다");
              return false;
            }
          }
        }
      }
      return true;
    },
    change_event_start_col(index) {
      this.change_event(index,"start_col")
    },
    change_event_start_row(index) {
      this.change_event(index,"start_row")
    },
    change_event_end_col(index) {
      this.change_event(index,"end_col")
    },
    change_event_end_row(index) {
      this.change_event(index,"end_row")
    },
    change_event(index, key) {
      this.is_changed = true;
      let item = this.data_change[index];
      console.log("change_event start_col:"+item.start_col + " start_row:"+item.start_row+" end_col:"+item.end_col+" end_row:"+item.end_row);
      if (item.start_col === '' || item.start_row === '' || item.end_col === '' || item.end_row === '')  {
        //  아직 데이터가 제대로 되어있지 않으므로 일단 아무런 처리 안하고 반환 한다.
        return ;
      }

      item.start_row = parseInt(item.start_row);
      item.end_row = parseInt(item.end_row);

      // validation check 위치가 잘못 되었을 경우
      if (item.end_row - item.start_row >= 0 || item.end_col.charCodeAt(0) - item.start_col.charCodeAt(0) <= 0) {
        alert("잘못된 형식입니다.");
        item[key] = '';
        // return false;
        return ;
      }
      // row가 3줄을 넘어서는 안됨
      if(item.start_row -item.end_row  > 3){
        alert('3줄을 넘어서는 안됩니다.');
        item[key] = '';
        return ;
      }

      // col이 10칸을 넘어서는 안됨
      let first_col = 'R';
      for(let value of this.data_change){
        console.log(value.start_col)
        if(value.start_col.charCodeAt(0) <= first_col.charCodeAt(0)){
          first_col = value.start_col
          console.log(first_col)
        }
        console.log(first_col)
      }
      if(item.end_col.charCodeAt(0) - first_col.charCodeAt(0) > 10){
        alert('라인은 10칸을 넘어서는 안됩니다.');
        item[key] = '';
        return ;
      }

      if (this.check_all_lines(item, index) === true) {
        // 전혀 문제가 없을 경우에만 rendering을 요청 한다.

        item = {};
        item['line_cd'] = this.selected;
        item['data'] = this.convert_storage_data(this.data_change);

        // 다시 렌더링 하도록 event bus를 호출 한다.
        EventBus.$emit('render', item);
        // return true;
      }

      item[key] = '';
      // return false;

    },
    click_inputTag(){
      this.$refs['image'].click()
    },
    upload_image(){
      let form = new FormData();
      let image = this.$refs['image'].files[0]
      //let upload_url = `${this.hostname.replace('.com/','.com:49018')}/hiweld/api/code/factories/F100/lines/${this.selected}/image/upload`
      let upload_url = `${this.hostname}/hiweld/api/code/factories/F100/lines/${this.selected}/image/upload`
      form.append('file', image)

      axios.post(upload_url, form, {
        header: {'Content-Type': 'multipart/form-data' }
      }).then( ({data}) =>{
        this.images = data;
        console.log(data)
        console.log('upload images!!!', this.images, this.selected)
        location.reload()
      }).catch( err => console.log(err))
    },
    copy_line(lines){
      let l = [];
      let value;
      for (let v of lines) {
        value = {start_col: v.start_col, end_col:v.end_col, start_row: v.start_row, end_row:v.end_row};
        l.push(value);
      }
      return l;
    },
    selected_line(){
      // 상단의 라인 선택 drop down list를 변경 하면 호출 된다.
      console.log("changed... selected line code: " + this.selected);
      EventBus.$emit('select_line', this.selected) //AdminMainMapLineMap created
    },
    find_line_name(line_cd) {
      for (let i = 0 ; i < this.line_data.length; i++) {
        if(this.line_data.line_cd === line_cd) {
          return this.line_data.name;
        }
      }
    },
    convert_storage_data(change_data) {
      let ret = [];
      let value;
      for(let i = 0 ; i < change_data.length; i++) {
        value = {start_row:change_data[i].start_row,  start_col:change_data[i].start_col, end_row:change_data[i].end_row, end_col:change_data[i].end_col};
        ret.push(value);
      }
      return ret;
    },
    row_add(index_num){
      //let l = [];
      this.is_changed = true
      if(this.selected === "") return alert("수정할 라인을 선택해주세요");

      // 마지막에 insert된 row의 값이 다 차있지 않으면 추가로 row를 삽입 할 수 없다.
      if (this.data_change.length > 0 ) {
        let item = this.data_change[this.data_change.length - 1];
        if (item.start_col === '' || item.start_row === '' || item.end_col === '' || item.end_row === '')  {
          //  아직 데이터가 제대로 되어있지 않으므로 추가로 row를 삽입 못하게 막는다.
          alert(`${this.data_change.length} 행에 값을 채워주세요.`);
          return ;
        }
      }

      let r = {start_row:'', start_col:'', end_row:'', end_col:'', index:index_num, name:this.find_line_name(this.selected),line_cd:this.selected }

      if(this.click_check === true && this.click_index !== 100){
          this.data_change.splice(index_num+1, 0, r)
      }
      else {
        this.data_change.push(r)
      }

    },
    row_pop(index){
      this.is_changed = true
      if(this.selected === "") return alert("수정할 라인을 선택해주세요.");
      if(this.let_change === false) return alert("수정버튼을 먼저 눌러주세요.");

      if(index === 100){ //특정 행을 고르지 않았을때
        this.data_change.pop();
      }else{
        this.data_change.splice(index, 1)
      }

      let item = {};
      item['line_cd'] = this.selected;
      item['data'] = this.convert_storage_data(this.data_change);

      // 다시 렌더링 하도록 event bus를 호출 한다.
      EventBus.$emit('render', item);

    },
    handleClick(id){
      if( this.click_check === false){
        this.click_check = true
        this.click_index = id
      } else {
        this.click_check = false
        this.click_index = 100
      }
      console.log(id)
    },
    click_save(){
      if(this.selected === "") return alert("수정할 라인을 선택해주세요.");
      if(this.is_changed === false) return alert("수정된 라인이 없습니다.");

      let item;
      for(let i = 0 ; i < this.data_change.length ; i++ ) {
        item = this.data_change[i];
        if (item.start_col === '' || item.start_row === '' || item.end_col === '' || item.end_row === '')  {
          //  아직 데이터가 제대로 되어있지 않으므로 alert창 띄우고 리턴 시켜버린다.
          alert("라인에 빈 속성이 있습니다.");
          return ;
        }
      }


      EventBus.$emit('save_data', (is_sent)=>{
        if(!is_sent){
          alert('저장실패')
        }
        else{
          alert("저장 되었습니다.");
          console.log(this.data, this.data_change)
          return this.is_changed = false
        }
      });

    }

  },
  created(){


  }
}
</script>

<style scoped>
.right{display: inline-block;width: 600px;border: 1px solid #ddd;border-radius: 5px;vertical-align: top;padding: 10px;margin-top: 20px;padding-bottom: 10px;position: relative;}
.right .top{margin-bottom: 30px;}
.right .top p{display: inline-block;font-weight: 500;color: #555;margin-bottom: 20px;}
.right .top button{margin: 3px 0;background: #002f63;color:#fff;border-radius: 500px;padding: 1px 20px;font-size: 15px;float: right;}
.right .top button:hover{background: #fabe00;color: #fff;}

input{width:30%;}
select{border: 1px solid #ddd;border-radius: 5px;width: 100%;}
select {color: #555;font-weight:600;-webkit-appearance: none;-moz-appearance: none;appearance: none;border: 1px solid #D7D7D7;background:url(/images/select.png)no-repeat;background-position: calc(100% - 10px);background-position : -webkit-calc(100% - 10px); background-position :-moz-calc(100% - 10px);padding:5px 10px;/*padding-right: 20px;*/background-size: 15px 7px;}
select::-ms-expand {display: none; width: 50%}
select option:hover{color: #fabe00; width: 50%}


select.line_change{border: 1px solid #ddd;border-radius: 5px;width: 50%;}
select.line_change{color: #555;font-weight:600;-webkit-appearance: none;-moz-appearance: none;appearance: none;border: 1px solid #D7D7D7;background:url(/images/select.png)no-repeat;background-position: calc(100% - 10px);background-position : -webkit-calc(100% - 10px); background-position :-moz-calc(100% - 10px);padding:5px 10px;/*padding-right: 20px;*/background-size: 15px 7px;}
select.line_change::-ms-expand {display: none; width: 50%}
select.line_change option:hover{color: #fabe00; width: 50%}

.right table thead th{background: #5e5e5e;color:#fff;border-right: 2px solid #ffffff;font-weight: 500;padding: 5px 0;}
.right table tbody th{background: #8a8a8a;color:#fff;font-weight: 500;padding: 5px 0;border-right: 1px solid #fff;}
.right table tbody td{border-bottom: 1px solid #999; }
.right table tbody td p{border-right: 1px solid #999;text-align: center;margin: 7px 0;line-height: 1;}
.right table tbody tr td:last-child p{border-right: 0;}
.right .table2 thead th{background: #002f63; border-right: 2px solid #ffffff}
.right .table2 tbody tr th:nth-of-type(n+1){background: #003f84;border-right: 2px solid #ffffff}
.right .table1 tbody tr{table-layout: fixed;  border-right: 2px solid #ffffff; background: lightgray}
.right .table2 tbody tr{table-layout: fixed; }
/*.right .table1 tbody tr:hover{background: #fabe00;}*/
.right table tbody tr.gray{background: gray;}

.arrow{display: block;margin: 20px auto;}
.addNdel{text-align: right;margin-top:280px;width: 100%;}
.addNdel button{background: #002f63;color:#fff;border-radius: 500px;padding: 1px 0px;font-size: 15px;padding-left: 27px;width: 68px;text-align: left;position: relative;margin-left: 10px;}
.right button.change{background: gray;color:#fff;border-radius: 500px;padding: 1px 0px;font-size: 15px;padding-left: 20px;width: 68px;text-align: left;position: relative;margin-left: 10px;}
.addNdel button.add:before{content: "+";color: #fabe00;position: absolute;left: 9px;font-size: 23px;line-height: 1;top: -1px;}
.addNdel button.del:before{content: "-";color: #ff0000;position: absolute;left: 9px;font-size: 40px;line-height: 1;top: -8px;}
.addNdel button.change:before{color: #ff0000;position: absolute;border-radius: 100px; left: 9px;font-size: 40px;line-height: 1;top: -8px;width: 200%; }

.addNdel img{max-width: 300px; max-height:350px; border:1px solid lightgray; padding-left: 0px!important;}
.addNdel button.add:hover{background: #fabe00;color: #fff;}
.addNdel button.del:hover{background: #ff0000;color: #fff;}
.addNdel button.img_change:hover{background: #fabe00;color: #fff;}
.addNdel button.add:hover:before,.addNdel button.del:hover:before .addNdel button.change:hover:before{color: #fff;}
.addNdel .img_input{float: left; padding-left: 20px}

</style>
