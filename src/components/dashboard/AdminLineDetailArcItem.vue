<template>
    <tr :class="arc_item.device===selected_arc_device_cd?'selected':''" @click="handle_click_item">
      <td v-if="mode === 'MANUAL'">1</td>
      <td v-if="mode === 'MANUAL'">{{arc_item.device}}</td>
      <td v-if="mode === 'ROBOT'">{{arc_item.device}}</td>
      <td v-if="mode === 'ROBOT'">{{arc_item.deviceName}}</td>
      <td v-if="mode === 'ROBOT'">{{get_master_slave()}}</td>
      <td>
        <select :value="row"  @click="handle_click_row(row)" name="select_row" @change="handle_change_device_info($event)">
          <option :key="i" v-for="(row, i) in column_row" :value="row">{{row}}</option>
        </select>
        <select :value="column"  @click="handle_click_column(column)" name="select_column" @change="handle_change_device_info($event)">
          <option :key="i" v-for="(col, i) in column_col" :value="col">{{col}}</option>
        </select>
      </td>
      <td>
        <select :value="position" @click="handle_click_position(position)" name="select_position" @change="handle_change_device_info($event)">
          <option :key="i" v-for="(po, i) in cell_position" :value="po">{{po}}</option>
        </select>
      </td>
      <td><button v-if="is_changed && stop_change == false" type="button" @click="handle_click_save" >SAVE</button></td>
    </tr>
</template>

<script>
import {EventBus} from "../../event-bus";
export default {
  name: "AdminLineDetailArcItem",
  props:{
    arc_item:Object,
    mode: String,
    m_s: String,
    selected_arc_device_cd:String,
    p_position:String,
    p_column:String,
  },

  watch:{
    mode:function(){
      // console.log('mode changed', val)
      this.is_changed = false
    },
    arc_item:function (){
      this.position = this.arc_item.position
      this.column = this.get_col(this.arc_item.column)
      this.row = this.get_row()
    }
  },
  data(){
    return {
      is_changed:false,
      column:this.get_col(this.arc_item.column),
      row:this.get_row(),
      position:this.arc_item.position,
      device_cd: this.arc_item.device,
      cell_position: ["11", "12", "13", "14", "21", "22", "23", "24", "31", "32", "33", "34", "41", "42", "43","44"],
      column_row:[10, 9, 8, 7, 6, 5, 4, 3],
      column_col:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q'],
      stop_change : false,
      change_cnt : 0
    }
  },
  methods:{
    handle_click_save(){
      console.log("click_save:",this.arc_item);
      const arc_item ={device_cd:this.arc_item.device, column:this.row+this.column, position:this.position , lineCd : this.arc_item.lineCd, processCd : this.arc_item.processCd}
      EventBus.$emit('click-AdminDetailArcItem-save', arc_item, validation_result=>{
        if(validation_result){
          alert('저장 되었습니다.')
          this.change_cnt = 0
          this.is_changed=false
        }else{
          alert('용접기 값이 잘못 되었습니다.')
          this.is_changed=false
        }
      })
    },
    handle_click_item(){
      console.log('click-AdminDetailArcItem-select')
      // this.column = this.p_column
      // this.position = this.p_position
      EventBus.$emit('click-AdminDetailArcItem-select', {device_cd:this.arc_item.device})
    },
    handle_click_column(e){
      this.column = e
    },
    handle_click_row(e){
      this.row = e
    },
    handle_click_position(e){
      this.position = e
    },
    handle_change_device_info(e){
      console.log("show change device info !!!!!!!!",e.target.value, e.target.name)
      let arc_item_before ={device_cd:this.arc_item.device, column:this.row+this.column, row:this.row, position:this.position , lineCd : this.arc_item.lineCd, processCd : this.arc_item.processCd}
      let arc_item_after ={device_cd:this.arc_item.device, column:this.row+this.column, row:this.row, position:this.position , lineCd : this.arc_item.lineCd, processCd : this.arc_item.processCd}

      if (e.target.name == 'select_row'){
        this.is_changed = true;
        arc_item_after.column = e.target.value + this.column;
        this.row = e.target.value;
      }
      else if(e.target.name == 'select_column'){
        this.is_changed = true;
        arc_item_after.column = this.row + e.target.value;
        this.column = e.target.value
      }
      else if(e.target.name == 'select_position'){
        this.is_changed = true;
        arc_item_after.position = e.target.value;
        this.position = e.target.value
      }

      if(this.row === undefined || this.row === null ||
        this.column === undefined || this.column === null ||
        this.position === undefined || this.position === null) {
        this.stop_change = true;
        return;
      }

      this.stop_change = false;
      EventBus.$emit('click-AdminDetailArcItem-change', arc_item_before, arc_item_after, validation_result=>{
        if (validation_result.result){
          this.change_cnt += 1
          this.is_changed = true;
        }else{
          // false면 이전 값으로 원복
          alert(`${validation_result.msg}`);
          // console.log(`origin:${origin_device_info.position} this.arc_item:${this.arc_item.position}`)
          if (this.change_cnt > 0){
            this.is_changed = true
          } else{
            this.is_changed = false;
          }
          this.row = arc_item_before.row
          this.column = this.get_col(arc_item_before.column)
          this.position = arc_item_before.position
        }
      })
    },
    get_master_slave() {
      let deviceID = this.arc_item.device.toUpperCase();
      let m = '';
      if (this.arc_item.deviceName.endsWith('e')) {
        m = 'S'
      }else if(deviceID.startsWith('HRM')){
        m = 'M'
      }else m = 'M'
      return m
    },
    get_row(){
      if(this.arc_item.column === undefined || this.arc_item.column === null ) {
        return "";
      }

      if(this.arc_item.column.length > 2){
        return this.arc_item.column[0] + this.arc_item.column[1]
      }else return this.arc_item.column[0]
    },
    get_col(arc_item_column){
      if(arc_item_column === undefined || arc_item_column === null ) {
        return "";
      }
      if(arc_item_column.length > 2){
        return arc_item_column[2]
      }else return arc_item_column[1]
    },
  },
  created() {
    // console.log('arc_item', this.arc_item)
  },
  updated() {
    // this.column = this.arc_item.column
    // console.log(this.column, this.position)
  }
}
</script>

<style scoped>
input{width:50%}
.right table td{border-right: 1px solid #fff;padding: 3px 0;overflow: hidden;}
.right table td button{background: #2ed400;color: #fff;border-radius: 3px;font-size: 13px;padding: 1px 10px;}
.right table td button:hover{background: #209400;}
.right table tr.selected{background: #FFC200;}
</style>
