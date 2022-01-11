<template>
  <div>
    <table>
      <thead>
      <tr>
        <th colspan="2" :class="get_th_style(item.lineNm, is_used)">{{item.lineNm}}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
          <td :class="!is_used?'gray':''">메인</td>
          <td :class="!is_used?'gray':''">서브</td>
      </tr>
      <tr >
        <td v-if="item.main.monthlyArcRate !== undefined">{{Math.floor(item.main.monthlyArcRate*10)/10}}%</td>
        <td v-if="item.main.monthlyArcRate === undefined">-%</td>
        <td v-if="item.sub.monthlyArcRate !== undefined">{{Math.floor(item.sub.monthlyArcRate*10)/10}}%</td>
        <td v-if="item.sub.monthlyArcRate === undefined">-%</td>
      </tr>
      <tr>
        <td v-if="item.main.weeklyArcRate !== undefined">{{Math.floor(item.main.weeklyArcRate*10)/10}}%</td>
        <td v-if="item.main.weeklyArcRate === undefined">-%</td>
        <td v-if="item.sub.weeklyArcRate !== undefined">{{Math.floor(item.sub.weeklyArcRate*10)/10}}%</td>
        <td v-if="item.sub.weeklyArcRate === undefined">-%</td>
      </tr>
      <tr>
        <td v-if="item.main.dailyArcRate !== undefined">{{Math.floor(item.main.dailyArcRate*10)/10}}%</td>
        <td v-if="item.main.dailyArcRate === undefined">-%</td>
        <td v-if="item.sub.dailyArcRate !== undefined">{{Math.floor(item.sub.dailyArcRate*10)/10}}%</td>
        <td v-if="item.sub.dailyArcRate === undefined">-%</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  props: {
    item: {
      type:Object,
    },
    hovered_obj_nm:String,
    is_used:Boolean
  },
  data() {
    return {}
  },
  methods: {
    get_th_style(line_nm, is_used){
      console.log(line_nm, is_used)
      if(this.hovered_obj_nm===line_nm){
        return 'yellow'
      } else if(!is_used){
          return 'gray'
      }
      return ''
    }
  },
  created() {
    console.log('[ArcRateItem][created]', this.item)
  },
  mounted() {
    console.log('[ArcRateItem][mounted]', this.item)
    this.$nextTick(function() {
      console.log('[ArcRate] mounted every screen drown')
      // 모든 화면이 렌더링된 후 실행합니다.
      try {
        $(".bot_slide .slide").not('.slick-initialized').slick({

          infinite: false,
          autoplay: false,
          slidesToShow: 5,
          arrows: true,
          dots: false,
          prevArrow : $('.bot_slide .prev button'),
          nextArrow : $('.bot_slide .next button'),
        });
      } catch (e) {
        console.log('err', e)
      }
    })

  }
}
</script>

<style scoped>
table{text-align:center; width:99%;}
table th{background: #002f63;border-radius: 5px 5px 0 0;padding: 5px 0;color: #fff;border-bottom: 1px solid #fff;}
table th.yellow{background: gold; color:#000;}
table th.gray{background: gray; color:#fff;}
table tbody tr:nth-of-type(1) td:nth-of-type(1){background:#295585;border-right:1px solid #fff;color:#fff;}
table tbody tr:nth-of-type(1) td.gray:nth-of-type(1){background:gray;border-right:1px solid #fff;color:#fff;}
table tbody tr:nth-of-type(1) td:nth-of-type(2){background:#003f84;color:#fff;}
table tbody tr:nth-of-type(1) td.gray:nth-of-type(2){background:gray;color:#fff;}
table tbody tr:nth-of-type(n+2){border-bottom:1px solid #002f63;}
table tbody tr:last-child{border-bottom:2px solid #002f63}
table tbody td{padding: 3.2px 0; font-weight: 600}

</style>
