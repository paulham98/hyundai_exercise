<template>
    <tbody name="item">
    <tr v-for="(item, i) in line['main']" :key="i">
        <td @click="handle_click(item)">
            <img v-if="item.info !== undefined" :src="get_image_url(item.info.image_type)" class="ms ms1" alt="">
            <p :class="item['error'] === true ? 'red' : 'blue'"><span>{{item['deviceName']}}</span></p>
            <p :class="get_device_state(item)">{{item['maker']}}</p>
        </td>
        <td :class="prevent_pointer(i)" @click="handle_click(line['sub'][i])">
            <img v-if="line['sub'][i] !== undefined && line['sub'][i].info !== undefined" :src="get_image_url(line['sub'][i].info.image_type)" class="ms ms2" alt="">
            <p v-if="line['sub'][i]" :class="line['sub'][i]['error'] === true ? 'red' : 'blue'"><span>{{line['sub'][i]['deviceName']}}</span></p>
            <p v-if="line['sub'][i]" :class="get_device_state(line['sub'][i])">{{line['sub'][i].maker}}</p>
        </td>
    </tr>
    <tr v-if="line['main'].length < 2" class="ms">
        <td></td>
        <td></td>
    </tr>
    <tr v-if="line['main'].length < 3" class="ms">
        <td></td>
        <td></td>
    </tr>
    <tr v-if="line['main'].length < 4" class="ms">
        <td></td>
        <td></td>
    </tr>
    <tr v-if="line['main'].length < 5" class="ms">
        <td></td>
        <td></td>
    </tr>
    </tbody>
</template>

<script>
   // import $ from "jquery"
    //import ScrollShadow from "vue-scroll-shadow"
    import {EventBus} from "../../event-bus";
    export default {
        name: "ArcListBody",
        props:{
            line: Object,
        },
        components:{},
        data(){
            return {
              test: [[],[],[],[],[],[],[],[],[],[]],
            }
        },
        methods:{
            get_image_url(brand) {
              // console.log("brand: " + brand);
              if (brand === null) {
                return "/images/h1.png"
              }
              let str = brand.toUpperCase();
              if(str.startsWith("C1")) {
                return "/images/c1.png";
              } else if (str.startsWith("I1")) {
                return "/images/i1.png";
              } else if (str.startsWith("H1")) {
                return "/images/h1.png"
              }
              return "/images/h2.png";
            },
            prevent_pointer(index){
                let prevent = "ms"
                if(index >= this.line['sub'].length){
                    return prevent
                }
            },
            get_device_state(line){
                let device_state = "";
                if(line['packetState'] > 0){
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
            handle_click(item){
              console.log("item:",item);
              EventBus.$emit('whole-robot-item',item)
            }
        },
        mounted() {
          //
          // try{
          //   $(".status").slick({
          //     infinite: false,
          //     autoplay: false,
          //     slidesToShow: 5,
          //     arrows: false,
          //     dots: false,
          //   });
          // } catch (e){
          //   console.log(e)
          // }

        },
    }
</script>

<style scoped>

    .ms{ pointer-events: none; }
    .status>div .ms_wrap_1 tbody td:first-child{background: #fff; }
    .status>div .ms_wrap_1 tbody td:last-child{background: #fff; }
    .status>div .ms_wrap_1 tbody td:hover{background: #ffc200;}
    .status>div .ms_wrap_1 tbody td:last-child{border-left: 4px solid #ededed;}
    .status>div .ms_wrap_1 tbody td{border-bottom: 1px solid #ededed;padding: 4px;position: relative;height: 107px;vertical-align: top;padding-top:0;}
    .status>div .ms_wrap_1 tbody td img{position:absolute;z-index: 8; display: block !important; top: 10px; }/*right:70px;*/
    .status>div .ms_wrap_1 tbody td p{font-size: smaller;border-radius: 500px;text-align: left;padding-left: 42px; margin-top: 7px;position: relative;}
    .status>div .ms_wrap_1 tbody td p span{padding-left: 11px; white-space:normal;position:absolute;top: 50%;transform: translateY(-50%);z-index: 9;}
    .status>div .ms_wrap_1 tbody td p:nth-of-type(1){height: 55px;border-radius: 10px; }
    .status>div .ms_wrap_1 tbody td p:nth-last-of-type(1){height:auto; padding-left: 50px;}
    .status>div .ms_wrap_1 tbody td p.green{background: #2ed400;color:#fff;}
    .status>div .ms_wrap_1 tbody td p.blue{background: #0090ff;color:#fff;}
    .status>div .ms_wrap_1 tbody td p.red{background: #ff2b2b;color:#fff;}
    .status>div .ms_wrap_1 tbody td p.gray{background: #939393;color:#fff;}
    .status>div .ms_wrap_1 tbody td p.white{border:1px solid #a7a7a7;color:#a7a7a7}

</style>
