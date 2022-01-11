<template>
  <div class="slick_wrap">
    <button @click="modalChange">
    <table :class="get_th_style(v['deviceCd'], hovered_device_nm)" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
      <thead>
      <tr>
        <th colspan="2" >
          <span>{{v['deviceCd']}}</span>
          <em :class="device_infos[v['deviceCd']]['device_type']==='ROBOT'?'purple':'yellow'"></em>
        </th>
      </tr>
      <tr>
        <th colspan="2">
          <span>{{device_infos[v['deviceCd']]['column']}}-{{device_infos[v['deviceCd']]['position']}}</span>
          <em :class="arc_state"></em>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td colspan="2" :class="'line ' + (arc_state==='gray'?'gray':device_infos[v['deviceCd']]['error']?'red':'blue')"></td>
      </tr>
      <tr>
        <td>
          <h1 v-if="v['arcRate'] !== undefined">아크율<br>{{Math.floor(v['arcRate']*10)/10}}%</h1>
          <h1 v-if="v['arcRate'] === undefined">아크율<br>%</h1>
        </td>
        <td>
          <h1>용접시간<br>{{$n_to_0n(v['workHours'])}}:{{$n_to_0n(v['workTime']%60)}}</h1>
        </td>
      </tr>
      </tbody>
    </table>
    </button>
  </div>

</template>

<script>
import $ from "jquery"
import {EventBus} from "../../event-bus";
export default {
  components: {},
  name: "LineDetailSlickSlideItem",
  model:{
  },
  props:{
    v: Object,
    hovered_device_nm : String,
    device_infos: Object,
  },
  data () {
    return{
      modalSend:{},
      th_style:'navy',
      arc_state:this.get_arc_state(this.device_infos[this.v['deviceCd']]['packet_state'], this.device_infos[this.v['deviceCd']]['arc_state'])
    }
  },
  watch:{
    hovered_device_nm(){
       //console.log('gggggg', this.hovered_device_nm)
      // this.get_device_type_style(this.v['deviceCd'], this.hovered_device_nm)
    }
  },
  methods:{
    handleMouseOver(){
      const target_nm = this.v['deviceCd'];
      if (target_nm !== null)
        console.log("get_icon_style target_nm: ",target_nm, 1);
      EventBus.$emit("get_icon_style", target_nm);

    },
    handleMouseOut(){
      const target_nm = this.v['deviceCd'];
      if (target_nm !== null)
        console.log("get_icon_style  mouseout" , 0);
      EventBus.$emit("get_icon_style", "");

    },
    get_th_style(device_nm, hovered_device_nm){
      // console.log('[LineDetailSlickItem]', hovered_device_nm, device_nm, this.v['deviceCd'])
      if(device_nm===hovered_device_nm){
          return 'blue'
      }
      return 'navy'

    },
    //lineDetail 332번과 연동
    modalChange(){
        EventBus.$emit("click-arc-circle", this.v.deviceCd)
    },
    get_arc_state(packet_state, arc_state){
      if (packet_state > 0) {
        if (arc_state === true) {
          return 'green' // 용접
        } else {
          return 'white' // 대기
        }
      }else {
        return 'gray' // 비활성
      }
    }
  },
  created() {
    // console.log(`[${this.$options.name}]`, 'slickslideItem',this.v.lineCd, this.v.deviceType)
    this.th_style = this.get_th_style(this.v['deviceCd'])
    this.modalSend = this.v;
    console.log("linedetailSlickItem",this.device_infos, this.v, this.modalSend)
  },
  mounted() {
    this.$nextTick(function() {
      // 모든 화면이 렌더링된 후 실행합니다.
      try { $(".bot_slide .slide2").slick({
          infinite: false,
          autoplay: false,
          slidesToShow: 5,
          arrows: true,
          dots: false,
          prevArrow : $('.bot_slide .prev button'),
          nextArrow : $('.bot_slide .next button'),
        });
      } catch (e) {
          "a"
      }
    })
  },
  beforeUpdate(){
  },
  updated(){
  }

}
</script>

<style scoped>
*{font-size: 16px;}
table{border-radius:5px;overflow: hidden; width: 99%}
table td{background: #eee;text-align: center;padding: 8px 0;}
table td h1{font-weight: 600}
table th{color:#fff;text-align: left;padding: 3.5px 10px;position: relative;}
table th .blue{background-color: #428bca; color:#fff;text-align: left;padding: 3.5px 10px;position: relative;}
table.navy thead{background: #002f63;}
table.navy thead:hover{background: #0067d9;}
table.blue thead{background: #0067d9;}
table th span{display:inline-block;vertical-align:middle;}
table em{display: inline-block;width: 15px;height: 15px;border-radius: 500px;vertical-align:middle;position: absolute;right: 10px;top: 55%;transform: translateY(-50%);}
table em.yellow{background: #ffc200;}
table em.green{background: #2ed400;}
table em.red{background: red;}
table em.purple{background: #a400e9;}
table em.white{background: #fff;}
table em.gray{background: gray;}
table td.line{height: 14px;padding: 0;}
table td.line.blue{background: #0f8bf8;}
table td.line.red{background: #ff2b2b;}
table td.line.gray{background: gray;}

</style>
