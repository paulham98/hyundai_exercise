<template>
  <ul>
    <li>
      <router-link
         :key="i" v-for="(cl, i) in cls" :class="cl['style'] + (hovered_obj_nm==cl['name']?' yellow':' blue')" :name="cl['name']"
        @mouseover.native="handleChange" @mouseout.native="original"
        tag="div" :to="{ name: 'line_detail', params: { id: cl['name']}, query:{start_row:cl['start_row'], line_cd:cl['line_cd'], line_nm:cl['name']} }">{{cl['name']}}</router-link>
    </li>
  </ul>

</template>

<script>
import Modal from "./Modal"
export default {
  component:{ Modal},
  model: {
      prop: 'hovered_obj_nm',
      event: ['armEvent', 'originalEvent']
  },
  props:{
      lines:Array,
      markup:String,
      hovered_obj_nm: String,
  },
  watch:{
    lines: function (lines){
      console.log('line row!!!!!', lines);
      this.cls = this.get_block_styles(this.lines, this.hovered_obj_nm)
    }
  },

  data() {
    return {
      // data: this.lines,
        data:[],
        cls: this.get_block_styles(this.lines, this.hovered_obj_nm),
    }
  },
  methods: {
    get_block_styles: (lines) => {
      let l = [];
      if (lines === undefined){
        return []
      }

      for (let line of lines){
        // console.log(line.name, send);
        let id = 0;
        if(line.end_row === 9) id = 100;
        else if(line.end_row === 8) id = 200;
        else if(line.end_row === 7) id = 300;
        else if(line.end_row === 6) id = 400;
        else if(line.end_row === 5) id = 500;
        else if(line.end_row === 4) id = 600;
        else if(line.end_row === 3) id = 700;
        console.log(line.end_row, line.end_col)
        if (line.type === 'blank'){
          l.push({'style':`block1 grey`, 'name':''})
        } else {
          // A ~ G 는 7
          // Alphabet은 upper case로 바꾼다
          let l_n = line.start_col.toUpperCase().charCodeAt(0) - 65
          let blonk_n = line.end_col.toUpperCase().charCodeAt(0) - line.start_col.toUpperCase().charCodeAt(0)
          // console.log(blonk_n, l_n, line.start_col, line.row_cnt)
          // let color = 'blue'
          let style_line_cnt = '';
          if (line.row_count === 2) {
            id +=100
            style_line_cnt = 'h2';
          }
          else if(line.row_count === 3) {
            style_line_cnt = 'h3';
            id+=200
          }
          l.push({
            'style':`txt${id + line.end_col.charCodeAt(0)} block${blonk_n} block_box l${l_n} ${style_line_cnt}${line.is_zig===true?'zig':'' }`,
            'name':line.name,
            'start_row':line.start_row,
            'end_row':line.end_row,
            'end_col': line.end_col,
            'start_col':line.start_col,
            'line_cd':line.line_cd
          })
          console.log((line.end_col.charCodeAt(0)-(line.end_row)))
        }
      }
      return l
    },
    handleChange(e){
      const target_nm = e.target.getAttribute('name')
      if (target_nm !== null)
        this.$emit("armEvent", target_nm);
    },
    original(e){
      const target_nm = e.target.getAttribute('name')
      if (target_nm !== null)
        this.$emit("armEvent", ""); // mouse out일 때는 ""로
    },
  },
  created() {
    // console.log('line created:', this.lines)
  },
  updated(){
    // console.log('[LineRow updated]', this.hovered_obj_nm)
  }
}
</script>

<style scoped>
ul{height: 36px;padding: 3px 0;padding-bottom: 1px;width: 100%; margin-left: 3px}
ul li{height:100%;position: relative;}

ul li .block_box{z-height:100%;transform: translate(-7px,-7px);text-align: center;padding: 6px 0;position: absolute;}
ul li .block_box.block_box.zig{height: calc(100% + 4px);transform: translate(-7px,-11px);}
ul li .gray{background: #e0e0e0;height: 100%;position: absolute;/* left: 0.1%; */border-left: 2px solid #fff;border-right: 2px solid #fff;box-sizing: border-box;}
ul .block_box.blue{background: #3145a1;color: #fff;box-shadow: 1px 1px 0px #263579,2px 2px 0px #263579,3px 3px 0px #263579,4px 4px 0px #263579,5px 5px 0px #263579,6px 6px 0px #263579,7px 7px 0px #263579;}
ul .block_box.yellow{background: gold;box-shadow: 1px 1px 0px #e3941a,2px 2px 0px #e3941a,3px 3px 0px #e3941a,4px 4px 0px #e3941a,5px 5px 0px #e3941a,6px 6px 0px #e3941a,7px 7px 0px #e3941a;}
ul li .block_box.h2{height: calc(200% + 4px);padding-top: 25px; width: 100% /*top:10%*/}
ul li .block_box.h3{height: calc(300% + 8px);padding: 45px 0;}
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

ul li .txt166{z-index: 166}
ul li .txt167{z-index: 167}
ul li .txt168{z-index: 168}
ul li .txt169{z-index: 169}
ul li .txt170{z-index: 170}
ul li .txt171{z-index: 171}
ul li .txt172{z-index: 172}
ul li .txt173{z-index: 173}
ul li .txt174{z-index: 174}
ul li .txt175{z-index: 175}
ul li .txt176{z-index: 176}
ul li .txt177{z-index: 177}
ul li .txt178{z-index: 178}
ul li .txt179{z-index: 179}
ul li .txt180{z-index: 180}
ul li .txt181{z-index: 181}

ul li .txt266{z-index: 266}
ul li .txt267{z-index: 267}
ul li .txt268{z-index: 268}
ul li .txt269{z-index: 269}
ul li .txt270{z-index: 270}
ul li .txt271{z-index: 271}
ul li .txt272{z-index: 272}
ul li .txt273{z-index: 273}
ul li .txt274{z-index: 274}
ul li .txt275{z-index: 275}
ul li .txt276{z-index: 276}
ul li .txt277{z-index: 277}
ul li .txt278{z-index: 278}
ul li .txt279{z-index: 279}
ul li .txt280{z-index: 280}
ul li .txt281{z-index: 281}

ul li .txt366{z-index: 366}
ul li .txt367{z-index: 367}
ul li .txt368{z-index: 368}
ul li .txt369{z-index: 369}
ul li .txt370{z-index: 370}
ul li .txt371{z-index: 371}
ul li .txt372{z-index: 372}
ul li .txt373{z-index: 373}
ul li .txt374{z-index: 374}
ul li .txt375{z-index: 375}
ul li .txt376{z-index: 376}
ul li .txt377{z-index: 377}
ul li .txt378{z-index: 378}
ul li .txt379{z-index: 379}
ul li .txt380{z-index: 380}
ul li .txt381{z-index: 381}

ul li .txt466{z-index: 466}
ul li .txt467{z-index: 467}
ul li .txt468{z-index: 468}
ul li .txt469{z-index: 469}
ul li .txt470{z-index: 470}
ul li .txt471{z-index: 471}
ul li .txt472{z-index: 472}
ul li .txt473{z-index: 473}
ul li .txt474{z-index: 474}
ul li .txt475{z-index: 475}
ul li .txt476{z-index: 476}
ul li .txt477{z-index: 477}
ul li .txt478{z-index: 478}
ul li .txt479{z-index: 479}
ul li .txt480{z-index: 480}
ul li .txt481{z-index: 481}

ul li .txt566{z-index: 566}
ul li .txt567{z-index: 567}
ul li .txt568{z-index: 568}
ul li .txt569{z-index: 569}
ul li .txt570{z-index: 570}
ul li .txt571{z-index: 571}
ul li .txt572{z-index: 572}
ul li .txt573{z-index: 573}
ul li .txt574{z-index: 574}
ul li .txt575{z-index: 575}
ul li .txt576{z-index: 576}
ul li .txt577{z-index: 577}
ul li .txt578{z-index: 578}
ul li .txt579{z-index: 579}
ul li .txt580{z-index: 580}
ul li .txt581{z-index: 581}

ul li .txt666{z-index: 666}
ul li .txt667{z-index: 667}
ul li .txt668{z-index: 668}
ul li .txt669{z-index: 669}
ul li .txt670{z-index: 670}
ul li .txt671{z-index: 671}
ul li .txt672{z-index: 672}
ul li .txt673{z-index: 673}
ul li .txt674{z-index: 674}
ul li .txt675{z-index: 675}
ul li .txt676{z-index: 676}
ul li .txt677{z-index: 677}
ul li .txt678{z-index: 678}
ul li .txt679{z-index: 679}
ul li .txt680{z-index: 680}
ul li .txt681{z-index: 681}

ul li .txt766{z-index: 766}
ul li .txt767{z-index: 767}
ul li .txt768{z-index: 768}
ul li .txt769{z-index: 769}
ul li .txt770{z-index: 770}
ul li .txt771{z-index: 771}
ul li .txt772{z-index: 772}
ul li .txt773{z-index: 773}
ul li .txt774{z-index: 774}
ul li .txt775{z-index: 775}
ul li .txt776{z-index: 776}
ul li .txt777{z-index: 777}
ul li .txt778{z-index: 778}
ul li .txt779{z-index: 779}
ul li .txt780{z-index: 780}
ul li .txt781{z-index: 781}

</style>
