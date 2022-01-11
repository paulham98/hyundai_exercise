<template>
  <ul>
    <li>
      <div :key="i" v-for="(item, i) in cls" :class="item['style'] + (selected_line_code === item['line_cd'] ? ' yellow1' : ' gray3')" :name="item['name']" @click="handleClick(item['line_cd'])">{{item['name']}}</div>
    </li>
  </ul>

</template>

<script>
import {EventBus} from "@/event-bus";

export default {
  name: "AdminMainMapLineRow",
  props:{
    line:{type: Array, required:true},
    selected_line_code: {type: String, required: true}
  },
  data(){
    return {
      cls: this.get_block_styles(this.line)
    }
  },
  watch:{
    line: function (line){
      this.cls = this.get_block_styles(this.line)
      console.log('LineRow',line)
    }
  },
  methods:{
    get_block_styles: (lines) => {
      let l = [];
      if (lines === undefined){
        return []
      }
      for (let line of lines){
        console.log("block style:",line);
        if (line.type === 'blank'){
          l.push({'style':``, 'name':''})
        }
        else {
          // A ~ G 는 7
          // Alphabet은 upper case로 바꾼다
          let l_n = line.start_col.toUpperCase().charCodeAt(0) - 65
          let blonk_n = line.end_col.toUpperCase().charCodeAt(0) - line.start_col.toUpperCase().charCodeAt(0)
          let style_line_cnt = '';
          if (line.row_count === 2) {
            style_line_cnt = 'h2';
          }
          else if(line.row_count === 3) {
            style_line_cnt = 'h3';
          }
          l.push({
            'style': `txt block${blonk_n} block_box l${l_n} ${style_line_cnt} ${line.is_zig === true ? 'zig' : ''}`,
            'name': line.name,
            'start_row': line.start_row,
            'end_row': line.end_row,
            'start_col': line.start_col,
            'end_col': line.end_col,
            'line_cd': line.line_cd
          })
        }
      }
      console.log(l)
      return l
    },
    //AdminMainMapLineMap 75번 클릭할 때 라인이름이 바뀜
    handleClick(line_cd){
      if(this.selected_line_code === line_cd){
        EventBus.$emit('select_line', "")
      } else {
        EventBus.$emit('select_line', line_cd);
      }
    }
  },
  created(){
   // console.log(this.cls)
  }

}
</script>

<style scoped>
.graph_wrap ul{height: 60px;width: calc(100% + 3px);}
.graph_wrap ul li{height:102%;position: relative;width: calc(100% + 0px);}
.graph_wrap ul li .block_box{height:100%;text-align: center;padding: 12px 0;display: inline-block;position: relative;border-right: 1px solid #ddd;border-top: 1px solid #ddd}
.graph_wrap ul .block_box.yellow1{background: #fff382;}
.graph_wrap ul .block_box.yellow2{background: #fabe00;}
.graph_wrap ul .block_box.gray1{background: #f0f0f0;}
.graph_wrap ul .block_box.gray2{background: #e1e1e1;}
.graph_wrap ul .block_box.gray3{background: #d2d2d2;}
.graph_wrap ul .block_box.gray4{background: #c3c3c3;}
.graph_wrap ul .block_box.gray5{background: #b4b4b4;}
.graph_wrap ul li .txt.h2{height: calc(200%);padding-top: 40px;top:100%; width: 100%}
.graph_wrap ul li .txt.h3{height: calc(300%);padding-top: 80px;top:150%; width: 100%; }
.graph_wrap ul li .block_box.block_box.zig{height: 103%;transform: translate(-1px,-33px); padding: 15px 0; border-top:0px}
.graph_wrap ul li .txt{position: absolute;text-align: center;top:50%;transform: translateY(-50%);z-index: 1;color: #5a5c60;font-weight: 600;}
.graph_wrap.ver17 ul li .txt.block1{width: calc(100% / 16);}
.graph_wrap.ver17 ul li .txt.block2{width: calc((100% / 16) *2);}
.graph_wrap.ver17 ul li .txt.block3{width: calc((100% / 16) *3);}
.graph_wrap.ver17 ul li .txt.block4{width: calc((100% / 16) *4);}
.graph_wrap.ver17 ul li .txt.block5{width: calc((100% / 16) *5);}
.graph_wrap.ver17 ul li .txt.block6{width: calc((100% / 16) *6);}
.graph_wrap.ver17 ul li .txt.block7{width: calc(((100% / 16) *7) + 2px);}
.graph_wrap.ver17 ul li .txt.block8{width: calc(((100% / 16) *8) + 2px);}
.graph_wrap.ver17 ul li .txt.block9{width: calc(((100% / 16) *9) + 2px);}
.graph_wrap.ver17 ul li .txt.block10{width: calc(((100% / 16) *10) + 1px);}
.graph_wrap.ver17 ul li .txt.block11{width: calc(((100% / 16) *11) + 3px);}
.graph_wrap.ver17 ul li .txt.block12{width: calc(((100% / 16) *12) + 4px);}
.graph_wrap.ver17 ul li .txt.block13{width: calc(((100% / 16) *13) + 4px);}
.graph_wrap.ver17 ul li .txt.block14{width: calc(((100% / 16) *14) + 4px);}
.graph_wrap.ver17 ul li .txt.block15{width: calc(((100% / 16) *15) + 4px);}
.graph_wrap.ver17 ul li .txt.block16{width: calc(((100% / 16) *16) + 4px);}
.graph_wrap.ver17 ul li .txt.l1{left: calc(6.25% + 1px);}
.graph_wrap.ver17 ul li .txt.l2{left: calc(12.5% + 1px);}
.graph_wrap.ver17 ul li .txt.l3{left: calc(18.75% + 1px);}
.graph_wrap.ver17 ul li .txt.l4{left: calc(25% + 2px);}
.graph_wrap.ver17 ul li .txt.l5{left: calc(31.25% + 2px);}
.graph_wrap.ver17 ul li .txt.l6{left: calc(37.5% + 2px);}
.graph_wrap.ver17 ul li .txt.l7{left: calc(43.75% + 2px);}
.graph_wrap.ver17 ul li .txt.l8{left: calc(50% + 3px);}
.graph_wrap.ver17 ul li .txt.l9{left: calc(56.25% + 3px);}
.graph_wrap.ver17 ul li .txt.l10{left: calc(62.5% + 1px);}
.graph_wrap.ver17 ul li .txt.l11{left: calc(68.75% + 4px);}
.graph_wrap.ver17 ul li .txt.l12{left: calc(75% + 5px);}
.graph_wrap.ver17 ul li .txt.l13{left: calc(81.25% + 5px);}
.graph_wrap.ver17 ul li .txt.l14{left: calc(87.5% + 6px);}
.graph_wrap.ver17 ul li .txt.l15{left: calc(93.75% + 6px);}
</style>