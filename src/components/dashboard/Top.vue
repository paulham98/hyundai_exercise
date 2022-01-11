<template>
  <div class="top">
    <h1 :class="mode==='MANUAL'?'manual':'robot'">{{mode==='MANUAL'?'수동':'로봇'}} 용접 아크율 현황</h1>
    <div class="on_off" >
      <p :class="mode==='MANUAL'?'':'active'">로봇 용접</p>
      <div :class="mode==='MANUAL'?'r_on':'l_on'" @click="change" ><span></span></div>
      <p :class="mode==='MANUAL'?'active':''">수동 용접</p>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery';
export default {
  model: {
    prop: 'mode',
    event: ['modeChangeEvent']
  },
  props: {
    mode: String,
  },
  methods: {
    change(){
      console.log('click', this.mode)
      if (this.mode == 'MANUAL'){
        this.$emit("modeChangeEvent", 'ROBOT');
      } else {
        this.$emit("modeChangeEvent", 'MANUAL');
      }
    }
  },
  mounted() {
    console.log(this.mode)
    // $(".top .on_off div").click(function(){
    //   if($(this).hasClass("l_on")){
    //     $(".top .on_off div").removeClass("l_on").addClass("r_on");
    //     $(".top .on_off p").removeClass("active");
    //     $(".top .on_off p:last-child").addClass("active");
    //   }
    //   else{
    //     $(".top .on_off div").removeClass("r_on").addClass("l_on");
    //     $(".top .on_off p").removeClass("active");
    //     $(".top .on_off p:first-child").addClass("active");
    //   }
    // });
  }
}
</script>

<style scoped>

.top{margin-bottom: 30px;padding-left: 55px; text-align: left !important;}
.top h1.robot{background: #002f63;color: #fff;border-radius: 500px;padding: 5px 0;font-size: 20px;display: inline-block;width: 400px;text-align: center;vertical-align: middle;}
.top h1.manual{background: #436175;color: #fff;border-radius: 500px;padding: 5px 0;font-size: 20px;display: inline-block;width: 400px;text-align: center;vertical-align: middle;}
.top .on_off{display: inline-block;vertical-align: middle;margin-left: 10px;}
.top .on_off p{display: inline-block;vertical-align: middle;font-size: 18px;margin: 0 7px;color: #999;}
.top .on_off p.active{color:#002f63;font-weight: 600;}
.top .on_off div{display: inline-block;background: #002f63;border-radius: 500px;width: 60px;height: 30px;position: relative;vertical-align: middle;cursor: pointer;}
.top .on_off div span{display: inline-block;background: #fabe00;border-radius: 500px;width: 22px;height: 22px;position: absolute;left: 9%;top: 50%;transform: translateY(-50%);transition: left 0.5s;}
.top .on_off div.r_on span{left: 57%;}
</style>
