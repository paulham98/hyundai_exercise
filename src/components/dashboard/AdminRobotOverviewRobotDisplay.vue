<template>

  <table class="ms_wrap">
    <thead>
    <tr>
      <th colspan="2">{{line_nm}}</th>
    </tr>
    <tr>
      <th>MAIN</th>
      <th>SUB</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item, i) in line_data[0]" :key="i">
      <td @click="handle_click_item(item)" :class="selected_arc_device_cd===item.device?'selected':''">
        <img v-if="item.info !== undefined" :src="get_image_url(item.info.image_type)" class="ms ms1" alt="">
        <p :class="item['error'] === true ? 'red' : 'blue'"><span>{{item['deviceName']}}</span></p>
        <p :class="get_device_state(item)">{{item.maker}}</p>
      </td>
      <td v-if="line_data[1][i] && line_data[1][i].info !== undefined" :class="selected_arc_device_cd===line_data[1][i].device?prevent_pointer(i)+'selected':prevent_pointer(i)" @click="handle_click_item(line_data[1][i])">
        <img v-if="line_data[1][i] && line_data[1][i].info !== undefined" :src="get_image_url(line_data[1][i].info.image_type)" class="ms ms2" alt="">
        <p v-if="line_data[1][i]" :class="line_data[1][i]['error'] === true ? 'red' : 'blue'"><span>{{line_data[1][i]['deviceName']}}</span></p>
        <p v-if="line_data[1][i]" :class="get_device_state(line_data[1][i])">{{line_data[1][i].maker}}</p>
<!--        {{line_data[1][i]}}-->
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {EventBus} from "../../event-bus";

export default {
  name: "AdminRobotOverviewRobotDisplay",
  props:{
    line_nm:String,
    line_data:Array,
    selected_arc_device_cd:String
  },
  methods:{
    prevent_pointer(index){
      let prevent = "ms "
      if(index >= this.line_data[1].length){
        return prevent
      }else{
        return ""
      }
    },
    get_image_url(brand) {
      let str = brand.toUpperCase();
      console.log("get image url " + str);
      if(str.startsWith("C1")) {
        return "/images/c1.png";
      } else if (str.startsWith("I1")) {
        return "/images/i1.png";
      } else if (str.startsWith("H1")) {
        return "/images/h1.png"
      }
      return "/images/h2.png";
    },
    get_device_state(line){
      let device_state = "";
      if(line['pocketState'] > 0){
        if( line['arcState'] === true){
          device_state = "green" // 용접중
        } else{
          device_state = "white" //대기중
        }
      }else{
        device_state = "gray" // 꺼짐
      }
      return device_state
    },
    handle_click_item(item){
      console.log('eeee', item)
      EventBus.$emit('AdminRobotOverviewRobotDisplay-click-item', item)
    }
  }

}
</script>

<style scoped>
.ms_wrap tbody td:first-child{background: #fff;}
.ms_wrap tbody td:last-child{background: #fff; }
.ms_wrap tbody td:hover{background: #ffc200;}
.ms_wrap tbody td.selected{background: #ffc200;}
.ms_wrap tbody td:last-child{border-left: 1px solid #ededed;}
.ms_wrap tbody td{border-bottom: 1px solid #ededed;padding: 4px;position: relative;height: 90px;vertical-align: top;padding-top:0;}
.ms_wrap tbody td img{position:absolute;z-index: 2; display: block !important;}
.ms_wrap tbody td p{font-size: smaller;border-radius: 500px;text-align: center;padding-left: 27px;margin-top: 7px;padding-right: 20px;overflow: hidden;position: relative;}
.ms_wrap tbody td p span{position: absolute;top: 50%;transform: translateY(-50%);max-height: 37px;overflow: hidden;z-index: 9;width: 100%;left: 0;padding-left: 27px;box-sizing: border-box;padding-right: 20px;}
.ms_wrap tbody td p:nth-of-type(1){height: 55px;border-radius: 10px;}
.ms_wrap tbody td p:nth-last-of-type(1){height:auto;}
.ms_wrap tbody td p.green{background: #2ed400;color:#fff;}
.ms_wrap tbody td p.blue{background: #0090ff;color:#fff;}
.ms_wrap tbody td p.red{background: #ff2b2b;color:#fff;}
.ms_wrap tbody td p.gray{background: #939393;color:#fff;}
.ms_wrap tbody td p.white{border:1px solid #a7a7a7;color:#a7a7a7}
.ms_wrap thead th{background: #002f63;color: #fff;}
.ms_wrap thead tr:first-child th{ border-radius: 5px 5px 0 0;border-left: 1px solid #ededed; border-bottom: 1px solid #ededed;}
.ms_wrap thead tr:last-child th:last-child{ background: #003f84;border-left: 1px solid #ededed;}
</style>
