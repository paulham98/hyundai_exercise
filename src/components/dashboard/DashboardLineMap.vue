<template>
  <div class="graph_wrap ver17">
    <div class="top_wrap_dashboard">
      <p>A</p>
      <p>B</p>
      <p>C</p>
      <p>D</p>
      <p>E</p>
      <p>F</p>
      <p>G</p>
      <p>H</p>
      <p>I</p>
      <p>J</p>
      <p>K</p>
      <p>L</p>
      <p>M</p>
      <p>N</p>
      <p>O</p>
      <p>P</p> <!-- 16 -->
      <p>Q</p> <!-- 17 -->
    </div>
    <div class="left_wrap">
      <p><span>10</span></p>
      <p><span>9</span></p>
      <p><span>8</span></p>
      <p><span>7</span></p>
      <p><span>6</span></p>
      <p><span>5</span></p>
      <p><span>4</span></p>
      <p><span>3</span></p>
      <p><span>2</span></p>
    </div>
    <!--
        block_box = 3D용 설정
        block1~16 = 길이
        blue,yellow,gray = 색
        l1~16 = 위치 (포지션으로 설정이라 필수 기본값 left:0;)
        zig = ㄹ 모양 아래거에만 추가
     -->

<!--            <LineRow v-for="(d, i) in data" :key="i" :lines="data[i]" v-model="hovered_obj_nm" @armEvent="change" @originalEvent="original">-->
<!--            </LineRow>-->

       <LineRow :lines="data[0]" v-model="hovered_obj_nm" @armEvent="change" @originalEvent="original"></LineRow>
       <LineRow :lines="data[1]" v-model="hovered_obj_nm" @armEvent="change" @originalEvent="original"></LineRow>
       <LineRow :lines="data[2]" v-model="hovered_obj_nm" @armEvent="change" @originalEvent="original"></LineRow>
       <LineRow :lines="data[3]" v-model="hovered_obj_nm" @armEvent="change" @originalEvent="original"></LineRow>
       <LineRow :lines="data[4]" v-model="hovered_obj_nm" @armEvent="change" @originalEvent="original"></LineRow>
       <LineRow :lines="data[5]" v-model="hovered_obj_nm" @armEvent="change" @originalEvent="original"></LineRow>
       <LineRow :lines="data[6]" v-model="hovered_obj_nm" @armEvent="change" @originalEvent="original"></LineRow>
       <LineRow :lines="data[7]" v-model="hovered_obj_nm" @armEvent="change" @originalEvent="original"></LineRow>
  </div>
</template>

<script>
import LineRow from "./LineRow";
import $ from "jquery";
export default {
  name: 'LineMap',
  components:{
    LineRow,
  },
  props: {
    lines: Array,
  },
  watch:{
    lines: function (lines){
      console.log('LineMap!!!!!!', lines)
      this.data = this.get_parsed_obj(this.lines)
    }
  },
  data() {
    return {
        last_index: 5,
        data:this.get_parsed_obj(this.lines),
        hovered_obj_nm :"",
    }
  },
  methods: {
    get_parsed_obj: arr => {
      let l = []
      for (let v of arr){
        // Alphabet은 upper case로 바꾼다
        // console.log(v.start_col, v.start_row, v.end_col, v.end_row)
        // console.log(v.start_col, v.start_row, v.end_col, v.end_row)
        // A ~ G 는 7
        // let size1 = v.end_col.toUpperCase().charCodeAt(0) - v.start_col.toUpperCase().charCodeAt(0)
        // console.log(size1)
        l.push(v)
      }

       console.log(l)
      return l
    },
    change(data){
      // console.log(data)
      this.$emit("hoveredEvent", data);
      this.hovered_obj_nm = data;
    },
    original(data){
      // console.log(data)
      this.hovered_obj_nm = data;
    }
  },
  created() {
    console.log('[LineMap][created] call')
  },
  mounted() {
    console.log('[LineMap] mounted')
    var top_n = 1
    $(".top_wrap_dashboard").find("p").each(function(){
      top_n++;
      $(".top_wrap_dashboard>p:nth-of-type("+top_n+")").css("left",(top_n-1)*(100/($('.top_wrap_dashboard>p').length-1))+'%');
    });
    var left_n = 0
    $(".left_wrap").find("p").each(function(){
      console.log("1234")
      left_n++;
      $(".left_wrap>p:nth-of-type("+left_n+")").css("top",(left_n-1)*(100/($(".left_wrap>p").length))+"%");
    });
  },
  updated() {
    // console.log('[LineMap] updated', this.hovered_obj_nm)
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.graph_wrap{position: relative;/* width: 700px; */padding-top: 40px;padding-left: 47px;padding-right: 0;margin: 20px;box-sizing: border-box;/* margin-top: 0; */}
.graph_wrap{display:inline-block;width: calc(100% - 134px);vertical-align: top;margin-bottom: 50px;}
.graph_wrap ul li .gray{background: #e0e0e0;height: 100%;position: absolute;/* left: 0.1%; */border-left: 2px solid #fff;border-right: 2px solid #fff;box-sizing: border-box;}
.graph_wrap ul .block_box.blue{background: #3145a1;box-shadow: 1px 1px 0px #263579,2px 2px 0px #263579,3px 3px 0px #263579,4px 4px 0px #263579,5px 5px 0px #263579,6px 6px 0px #263579,7px 7px 0px #263579;color: #fff;}
.graph_wrap ul .block_box.yellow{background: #ffdb32;box-shadow: 1px 1px 0px #e3941a,2px 2px 0px #e3941a,3px 3px 0px #e3941a,4px 4px 0px #e3941a,5px 5px 0px #e3941a,6px 6px 0px #e3941a,7px 7px 0px #e3941a;color: #002f63;font-weight: 500;}
.graph_wrap .left_wrap{position: absolute;height: 100%;left: 0;width: 100%;top: 0;margin-top: 29px;}
.graph_wrap .left_wrap p{position:absolute;width: 17px;text-align: left;width: calc(100% + 7.5px);}
.graph_wrap .left_wrap p span{display:inline-block;width:17px;text-align:right;}
.graph_wrap .left_wrap p:before{content:"";height: 1px;width: calc(100% - 22px);position:absolute;background:#ddd;top: 50%;left: 22px;transform: translateY(-50%);}


.graph_wrap .top_wrap_dashboard{position: absolute;width: calc(100% - 40px);top: 0;height: 100%;left: 0;margin-left: 40px;}
.graph_wrap .top_wrap_dashboard p{text-align: center;position: absolute;height: 100%;width: 12px;}
.graph_wrap .top_wrap_dashboard p:last-child{/* right: -7.3px!important; *//* left: unset!important; */}
.graph_wrap .top_wrap_dashboard p:before{content:"";width:1px;height: calc(100% - 22px);position:absolute;background:#ddd;left: 50%;top: 22px;transform: translateX(-50%);}
.active { background: black;
    box-shadow: 1px 1px 0px #e3941a,2px 2px 0px #e3941a,3px 3px 0px #e3941a,4px 4px 0px #e3941a,5px 5px 0px #e3941a,6px 6px 0px #e3941a,7px 7px 0px #e3941a;
}
.graph_wrap.ver17 ul li .block1{width: calc(100% / 16);}
.graph_wrap.ver17 ul li .block2{width: calc((100% / 16) *2);}
.graph_wrap.ver17 ul li .block3{width: calc((100% / 16) *3);}
.graph_wrap.ver17 ul li .block4{width: calc((100% / 16) *4);}
.graph_wrap.ver17 ul li .block5{width: calc((100% / 16) *5);}
.graph_wrap.ver17 ul li .block6{width: calc((100% / 16) *6);}
.graph_wrap.ver17 ul li .block7{width: calc(((100% / 16) *7) + 2px);}
.graph_wrap.ver17 ul li .block8{width: calc(((100% / 16) *8) + 2px);}
.graph_wrap.ver17 ul li .block9{width: calc(((100% / 16) *9) + 2px);}
.graph_wrap.ver17 ul li .block10{width: calc(((100% / 16) *10) + 2px);}
.graph_wrap.ver17 ul li .block11{width: calc(((100% / 16) *11) + 3px);}
.graph_wrap.ver17 ul li .block12{width: calc(((100% / 16) *12) + 4px);}
.graph_wrap.ver17 ul li .block13{width: calc(((100% / 16) *13) + 4px);}
.graph_wrap.ver17 ul li .block14{width: calc(((100% / 16) *14) + 4px);}
.graph_wrap.ver17 ul li .block15{width: calc(((100% / 16) *15) + 4px);}
.graph_wrap.ver17 ul li .block16{width: calc(((100% / 16) *16) + 4px);}
.graph_wrap.ver17 ul li .gray.block1{width: calc((100% / 16) - 2px);}
.graph_wrap.ver17 ul li .gray.block2{width: calc(((100% / 16) *2) - 1px);}
.graph_wrap.ver17 ul li .gray.block3{width: calc(((100% / 16) *3) - 1px);}
.graph_wrap.ver17 ul li .gray.block4{width: calc((100% / 16) *4);}
.graph_wrap.ver17 ul li .gray.block5{width: calc((100% / 16) *5);}
.graph_wrap.ver17 ul li .gray.block6{width: calc((100% / 16) *6);}
.graph_wrap.ver17 ul li .gray.block7{width: calc(((100% / 16) *7) + 2px);}
.graph_wrap.ver17 ul li .gray.block8{width: calc(((100% / 16) *8) + 1px);}
.graph_wrap.ver17 ul li .gray.block9{width: calc(((100% / 16) *9) + 2px);}
.graph_wrap.ver17 ul li .gray.block10{width: calc(((100% / 16) *10) + 2px);}
.graph_wrap.ver17 ul li .gray.block11{width: calc(((100% / 16) *11) + 3px);}
.graph_wrap.ver17 ul li .gray.block12{width: calc(((100% / 16) *12) + 3px);}
.graph_wrap.ver17 ul li .gray.block13{width: calc(((100% / 16) *13) + 3px);}
.graph_wrap.ver17 ul li .gray.block14{width: calc(((100% / 16) *14) + 4px);}
.graph_wrap.ver17 ul li .gray.block15{width: calc(((100% / 16) *15) + 5px);}
.graph_wrap.ver17 ul li .gray.block16{width: calc(((100% / 16) *16) + 5px);}
.graph_wrap.ver17 ul li .l1{left: calc(6.25% + 1px);}
.graph_wrap.ver17 ul li .l2{left: calc(12.5% + 1px);}
.graph_wrap.ver17 ul li .l3{left: calc(18.75% + 1px);}
.graph_wrap.ver17 ul li .l4{left: calc(25% + 2px);}
.graph_wrap.ver17 ul li .l5{left: calc(31.25% + 2px);}
.graph_wrap.ver17 ul li .l6{left: calc(37.5% + 2px);}
.graph_wrap.ver17 ul li .l7{left: calc(43.75% + 2px);}
.graph_wrap.ver17 ul li .l8{left: calc(50% + 3px);}
.graph_wrap.ver17 ul li .l9{left: calc(56.25% + 3px);}
.graph_wrap.ver17 ul li .l10{left: calc(62.5% + 4px);}
.graph_wrap.ver17 ul li .l11{left: calc(68.75% + 4px);}
.graph_wrap.ver17 ul li .l12{left: calc(75% + 5px);}
.graph_wrap.ver17 ul li .l13{left: calc(81.25% + 5px);}
.graph_wrap.ver17 ul li .l14{left: calc(87.5% + 6px);}
.graph_wrap.ver17 ul li .l15{left: calc(93.75% + 6px);}
.graph_wrap.ver17 ul li .gray.l1{left: calc(6.25% + 1px);}
.graph_wrap.ver17 ul li .gray.l2{left: calc(12.5% + 1px);}
.graph_wrap.ver17 ul li .gray.l3{left: calc(18.75% + 1px);}
.graph_wrap.ver17 ul li .gray.l4{left: calc(25% + 2px);}
.graph_wrap.ver17 ul li .gray.l5{left: calc(31.25% + 2.5px);}
.graph_wrap.ver17 ul li .gray.l6{left: calc(37.5% + 3px);}
.graph_wrap.ver17 ul li .gray.l7{left: calc(43.75% + 3.5px);}
.graph_wrap.ver17 ul li .gray.l8{left: calc(50% + 3px);}
.graph_wrap.ver17 ul li .gray.l9{left: calc(56.25% + 4px);}
.graph_wrap.ver17 ul li .gray.l10{left: calc(62.5% + 4px);}
.graph_wrap.ver17 ul li .gray.l11{left: calc(68.75% + 5px);}
.graph_wrap.ver17 ul li .gray.l12{left: calc(75% + 6px);}
.graph_wrap.ver17 ul li .gray.l13{left: calc(81.25% + 6px);}
.graph_wrap.ver17 ul li .gray.l14{left: calc(87.5% + 6px);}
.graph_wrap.ver17 ul li .gray.l15{left: calc(93.75% + 6px);}

</style>
