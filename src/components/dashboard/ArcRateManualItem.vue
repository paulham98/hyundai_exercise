<template>
  <div>
    <table>
      <thead>
      <tr>
        <th :class="hovered_obj_nm==item.lineNm?'yellow':''"  >{{item.lineNm}}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td v-if="item.monthlyArcRate !== undefined">{{Math.floor(item.monthlyArcRate*10)/10}}%</td>
        <td v-if="item.monthlyArcRate === undefined">-%</td>
      </tr>
      <tr>
        <td v-if="item.weeklyArcRate !== undefined">{{Math.floor(item.weeklyArcRate*10)/10}}%</td>
        <td v-if="item.weeklyArcRate === undefined">-%</td>
      </tr>
      <tr>
        <td v-if="item.dailyArcRate !== undefined">{{Math.floor(item.dailyArcRate*10)/10}}%</td>
        <td v-if="item.dailyArcRate === undefined">-%</td>
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
    hovered_obj_nm:String
  },
  data() {
    return {}
  },
  methods: {
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
        $(".bot_slide .slide").slick({
          infinite: false,
          autoplay: false,
          slidesToShow: 6,
          arrows: true,
          dots: false,
          prevArrow : $('.bot_slide .prev button'),
          nextArrow : $('.bot_slide .next button'),
        });
      } catch (e) {
        "a"
      }
    })
  }
}
</script>

<style scoped>
table{text-align:center; width:99%;}
table th{background: #396277;border-radius: 5px 5px 0 0;padding: 5px 0; padding-bottom: 7px; color: #fff;border-bottom: 1px solid #fff;}
table th.yellow{background: gold;}
table tbody tr:nth-of-type(1) td:nth-of-type(1){border-bottom:1px solid #396277;}
table tbody tr:nth-of-type(1) td:nth-of-type(2){background:#003f84;color:#fff;}
table tbody tr:nth-of-type(n+2){border-bottom:1px solid #396277;}
table tbody tr:last-child{border-bottom:2px solid #396277}
table tbody td{padding: 9px 0;padding-bottom: 6px;font-weight: 600;}

</style>
