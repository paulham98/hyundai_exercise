<template>
  <table :class="style1">
    <tbody>
    <tr>
      <td :key="i" v-for="(item, i) in cell_data[0]" :class="item[2]"><p v-if="item[1] != 0" :class="get_icon_nm(item[0])+item[1]"  :device_nm="item[0]"
           @mouseover="handleMouseOver" @mouseout="handleMouseOut" @click="handleClick"></p></td>
    </tr>
    <tr>
        <td :key="i" v-for="(item, i) in cell_data[1]" :class="item[2]"><p v-if="item[1] != 0" :class="get_icon_nm(item[0])+item[1]" :device_nm="item[0]"
           @mouseover="handleMouseOver" @mouseout="handleMouseOut" @click="handleClick"></p></td>
    </tr>
    <tr>
        <td :key="i" v-for="(item, i) in cell_data[2]" :class="item[2]"><p v-if="item[1] != 0" :class="get_icon_nm(item[0])+item[1]" :device_nm="item[0]"
           @mouseover="handleMouseOver" @mouseout="handleMouseOut" @click="handleClick"></p></td>
    </tr>
    <tr>
        <td :key="i" v-for="(item, i) in cell_data[3]" :class="item[2]"><p v-if="item[1] != 0" :class="get_icon_nm(item[0])+item[1]" :device_nm="item[0]"
           @mouseover="handleMouseOver" @mouseout="handleMouseOut" @click="handleClick"></p></td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {EventBus} from "../../event-bus";

export default {
  name: "LineDetailTable",
  model: {
      prop: 'hovered_device_nm',
      event: ['armEvent', 'originalEvent']
  },
  props:{
    style1:String,
    cell_data:Array,
    hovered_device_nm: String,
  },
  data(){
    return {
      arr:[],
      icon_style: 'circle_icon ',
      hovered_icon_nm: "default",
    }
  },
  watch:{
    hovered_device_nm(){
       //console.log('gggggg', this.hovered_device_nm)
      // this.get_device_type_style(this.v['deviceCd'], this.hovered_device_nm)
    }
  },
    methods: {
    //lineDetail 332번과 연동
      handleClick(e){
        const target_nm = e.target.getAttribute('device_nm')
        if (target_nm !== null)
          EventBus.$emit("click-arc-circle", target_nm)
      },
      handleMouseOver(e){
        const target_nm = e.target.getAttribute('device_nm')
        if (target_nm !== null)
          console.log("[LineDetailTable] mouseover",target_nm, )
        this.$emit("armEvent", target_nm);
      },
      handleMouseOut(e){
        const target_nm = e.target.getAttribute('device_nm')
        if (target_nm !== null)
          // console.log("mouseout",target_nm)
          this.$emit("armEvent", ""); // mouse out일 때는 ""로
      },
      get_icon_nm(item){
        if( this.hovered_icon_nm === item){
          return 'circle_icon_on '
        }else if(this.hovered_icon_nm === ""){
          return 'circle_icon '
        } else {
          return 'circle_icon '
        }
      }

    },
  created() {
    console.log('[LineDetailTable] created', this.cell_data, this.cell_data[0][2])
    EventBus.$on("get_icon_style", on_off =>{
        this.hovered_icon_nm = on_off

    })

  },
  beforeDestroy(){
    EventBus.$off("get_icon_style")
  }
}
</script>

<style scoped>
.graph_wrap2 ul{padding: 0;height: 115px;width: calc(100% + 7.5px);}
.graph_wrap2 ul li table td{width: 25%;border-right: 1px solid #eee;height: 28px;border-bottom: 1px solid #eee;position: relative;}
.graph_wrap2 ul li table td.yellow{background-color: #feefbf}
.graph_wrap2 ul li table{float:left;}
.graph_wrap2 ul li table tr td:last-child{border-right:0;}
.graph_wrap2 ul li table tr:last-child td{border-bottom:0}
/*.graph_wrap2 ul li table.bg_yellow{background: #feefbf;}*/
.graph_wrap2 ul:last-child{height: 29px;}
.graph_wrap2 ul:last-child table tr:last-child td{border-bottom:1px solid #eee}
.graph_wrap2 .left_wrap p:nth-of-type(1){top:0}
.graph_wrap2 .left_wrap p:nth-of-type(2){top: 116px;}
.graph_wrap2 .left_wrap p:nth-of-type(3){top: 231px;}
.graph_wrap2 .left_wrap p:nth-of-type(4){top: 345px;}
.graph_wrap2 ul li table tr td p.circle_icon{width: 32px;background-size: auto 100%!important;height: 32px;background-position: center!important;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);}
.graph_wrap2 ul li table tr td p.circle_icon.gray{background:url(/images/gray_icon.png)no-repeat;}
.graph_wrap2 ul li table tr td p.circle_icon.white{background:url(/images/white_icon.png)no-repeat;}
.graph_wrap2 ul li table tr td p.circle_icon.red{background-color:red;  width:17px;  height:17px;  border-radius:75px;  text-align:center;  margin:0 auto;  vertical-align:middle;  line-height:1px;}
.graph_wrap2 ul li table tr td p.circle_icon.green{background: url(/images/green_icon.png)no-repeat;}
.graph_wrap2 ul li table tr td p.circle_icon.gray:hover{background:url(/images/gray_icon_o.png)no-repeat;}
.graph_wrap2 ul li table tr td p.circle_icon.green:hover{background:url(/images/green_icon_o.png)no-repeat;}
.graph_wrap2 ul li table tr td p.circle_icon.white:hover{background:url(/images/white_icon_o.png)no-repeat;}
.graph_wrap2 ul li table tr td p.circle_icon.red:hover{background-color:red;  width:12px;  height:12px;  border-radius:75px; border:3px solid white;  text-align:center;  margin:0 auto;  vertical-align:middle;  line-height:1px;}

.graph_wrap2 ul li table tr td p.circle_icon_on{width: 32px;background-size: auto 100%!important;height: 32px;background-position: center!important;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);}
.graph_wrap2 ul li table tr td p.circle_icon_on.gray{background:url(/images/gray_icon_o.png)no-repeat;}
.graph_wrap2 ul li table tr td p.circle_icon_on.green{background:url(/images/green_icon_o.png)no-repeat;}
.graph_wrap2 ul li table tr td p.circle_icon_on.white{background:url(/images/white_icon_o.png)no-repeat;}
.graph_wrap2 ul li table tr td p.circle_icon_on.red{background-color:red;  width:12px;  height:12px;  border-radius:75px; border:3px solid white;  text-align:center;  margin:0 auto;  vertical-align:middle;  line-height:1px;}

</style>
