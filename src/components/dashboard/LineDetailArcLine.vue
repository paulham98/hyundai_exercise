<template>
    <div class="bot_slide bot_slide2">
        <slick>
        </slick>
      <div class="prev">
        <button type="button">
          <img alt="">
        </button>
      </div>
        <div class="slide2" >
            <LineDetailSlickSlideItem :arc_device_data="arc_device_data"  :device_infos="device_infos"
                                      :hovered_device_nm="hovered_device_nm"  :key="i" v-for="(v, i) in slick_data" :v="v">
            </LineDetailSlickSlideItem>
<!--          <LineDetailSlickSlideItem :arc_device-data="arc_device_data" :v="slick_data[0]"></LineDetailSlickSlideItem>-->
<!--          <LineDetailSlickSlideItem :arc_device-data="arc_device_data" :v="slick_data[0]"></LineDetailSlickSlideItem>-->
<!--          <LineDetailSlickSlideItem :arc_device-data="arc_device_data" :v="slick_data[0]"></LineDetailSlickSlideItem>-->
<!--          <LineDetailSlickSlideItem :arc_device-data="arc_device_data" :v="slick_data[0]"></LineDetailSlickSlideItem>-->
        </div>
        <div class="next">
            <button type="button">
                <img alt="">
            </button>
        </div>
    </div>
</template>

<script>
  import Slick from 'vue-slick';
  import LineDetailSlickSlideItem from "./LineDetailSlickSlideItem"
  import $ from "jquery"
  export default {
    name: "LineDetailArcLine",
    components:{ Slick, LineDetailSlickSlideItem},
    comments:{$},
    model:{
    },
    watch:{
      // hovered_device_nm(){
      //   this.hovered_device_nm2 = this.hovered_device_nm
      //   // console.log('ffffffffffffff', this.hovered_device_nm, this.hovered_device_nm2)
      // }
    },
    props:{
      slick_data: Array,
      hovered_device_nm: String,
      used_line_cd: Set,
      arc_device_data: Array,
      device_infos: Object,
    },
    computed:{
        modalView: {
            get (){
                return Boolean
            },
            set(){

            }
        },

    },
    data() {
        return{
          modalSend: {},
          hovered_device_nm2: this.hovered_device_nm,
        }
    },
    methods:{
    },
    created() {
      console.log('[LineDetailArcLine] created', this.arc_device_data, this.slick_data );
    },
    mounted(){

    },
    updated() {
      console.log('[LineDetailArcLine] updated', this.hovered_device_nm, this.hovered_device_nm2)
    }
  }
</script>

<style scoped>
.bot_slide{}
.slick-slide {margin: 0 2px;}
.bot_slide .slick-list {margin: 0 -2px;}
.bot_slide .top{margin-bottom: 30px;padding-left: 55px;}
.bot_slide .top h1{background: #002f63;color: #fff;border-radius: 500px;padding: 5px 0;font-size: 20px;display: inline-block;width: 400px;text-align: center;vertical-align: middle;}
.bot_slide .top .on_off{display: inline-block;vertical-align: middle;margin-left: 10px;}
.bot_slide .top .on_off p{display: inline-block;vertical-align: middle;font-size: 18px;margin: 0 7px;color: #999;}
.bot_slide .top .on_off p.active{color:#002f63;font-weight: 600;}
.bot_slide .top .on_off div{display: inline-block;background: #002f63;border-radius: 500px;width: 60px;height: 30px;position: relative;vertical-align: middle;cursor: pointer;}
.bot_slide .top .on_off div span{display: inline-block;background: #fabe00;border-radius: 500px;width: 22px;height: 22px;position: absolute;left: 9%;top: 50%;transform: translateY(-50%);transition: left 0.5s;}
.bot_slide .top .on_off div.r_on span{left: 57%;}
    .table_wrap{display: inline-block;}
.bot_slide .prev,.left .bot_slide .next{display: inline-block;}
.bot_slide .prev button img, .bot_slide .next img{display:block; height:146px; width: 48px;border-radius:5px 5px 5px 5px; border: none;}
.bot_slide .prev button{background:url(/images/prev_icon_hover.png)no-repeat; margin-right:3px;border-radius:5px 5px 5px 5px;}
.bot_slide .prev button.slick-disabled{ background:url(/images/prev_icon.png)no-repeat; width:48px; height: 146px; margin-right:3px;border-radius:5px 5px 5px 5px;}
.bot_slide .next button{background:url(/images/next_icon_hover.png)no-repeat; margin-left:2px;border-radius:5px 5px 5px 5px;}
.bot_slide .next button.slick-disabled{background:url(/images/next_icon.png)no-repeat; margin-right:3px;border-radius:5px 5px 5px 5px;}
.bot_slide .prev thead th{background: #002f63;border-radius: 5px 5px 0 0;padding: 6px 0;}
.bot_slide .prev tbody td{padding: 6px 0;}
.bot_slide .prev tbody tr:nth-of-type(1) td{background:#295585;}
.bot_slide .prev tbody tr:nth-of-type(2) td{background:#003f84;border-top:1px solid #3d6899;border-bottom:1px solid #3d6899;}
.bot_slide .prev tbody tr:nth-of-type(3) td{background:#002f63;border-radius:0 0 5px 5px}
.bot_slide .prev table{color:#fff;width: 85px;text-align:center;}
.bot_slide .slide{display: inline-block;width: calc(100% - 192px);vertical-align: top;margin-right: 2px;}
.bot_slide .slide table{text-align:center;}
.bot_slide .slide table th{background: #002f63;border-radius: 5px 5px 0 0;padding: 5px 0;color: #fff;border-bottom: 1px solid #fff;}
.bot_slide .slide table tbody tr:nth-of-type(1) td:nth-of-type(1){background:#295585;border-right:1px solid #fff;color:#fff;}
.bot_slide .slide table tbody tr:nth-of-type(1) td:nth-of-type(2){background:#003f84;color:#fff;}
.bot_slide .slide table tbody tr:nth-of-type(n+2){border-bottom:1px solid #002f63;}
.bot_slide .slide table tbody tr:last-child{border-bottom:2px solid #002f63}
.bot_slide .slide table tbody td{padding: 1.3px 0;}

.bot_slide .slide2 *{font-size: 16px;}
.bot_slide .slide2{display: inline-block;width: calc(100% - 110px);vertical-align: top;}
.bot_slide .slide2 table{border-radius:5px;overflow: hidden; border-right:50px solid #fff; }
.bot_slide .slide2 table td{background: #eee;text-align: center;padding: 8px 0;}
.bot_slide .slide2 table th{color:#fff;text-align: left;padding: 3.5px 10px;position: relative;}
.bot_slide .slide2 table.navy thead{background: #002f63;}
.bot_slide .slide2 table.blue thead{background: #0067d9;}
.bot_slide .slide2 table th span{display:inline-block;vertical-align:middle;}
.bot_slide .slide2 table em{display: inline-block;width: 15px;height: 15px;border-radius: 500px;vertical-align:middle;position: absolute;right: 10px;top: 55%;transform: translateY(-50%);}
.bot_slide .slide2 table em.yellow{background: #ffc200;}
.bot_slide .slide2 table em.green{background: #2ed400;}
.bot_slide .slide2 table em.purple{background: #a400e9;}
.bot_slide .slide2 table em.white{background: #fff;}
.bot_slide .slide2 table td.line{height: 14px;padding: 0;}
.bot_slide .slide2 table td.line.blue{background: #0f8bf8;}
.bot_slide .slide2 table td.line.red{background: #ff2b2b;}

</style>
