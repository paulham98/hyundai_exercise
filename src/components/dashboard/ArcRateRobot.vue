<template>
    <div class="bot_slide">
      <slick>
      </slick>
        <div class="prev">
            <button type="button">
              <img alt="">
            </button>
            <div class="table_wrap">
                <table :name="hovered_obj_nm">
                  <thead>
                    <tr>
                      <th rowspan="2">아크율</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>금월</td>
                    </tr>
                    <tr>
                      <td>금주</td>
                    </tr>
                    <tr>
                      <td>전일</td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </div>
        <div class="slide">
            <ArcRateRobotItem :hovered_obj_nm="hovered_obj_nm" :key="i" v-for="(cl, i) in arc_rate_data" :item="cl" :is_used="used_line_cd.has(cl['lineCd'])">
            </ArcRateRobotItem>
        </div>
<!--        <slick>-->
<!--          <div>hello</div>-->
<!--          <div>world</div>-->
<!--        </slick>-->
        <div class="next">
            <button type="button">
              <img alt="">
            </button>
        </div>
    </div>
</template>

<script>
import ArcRateRobotItem from "./ArcRateRobotItem";
import Slick from "vue-slick";
export default {
  components: {ArcRateRobotItem, Slick},
  model: {
    prop: 'hovered_obj_nm',
  },
  props: {
    arc_rate_data: Object,
    hovered_obj_nm: String,
    used_line_cd: Set,
  },
  data() {
    return {
        result: {},
    }
  },
  methods: {
  },
  created() {
    console.log('[ArcRateRobot][@created]', this.arc_rate_data, this.hovered_obj_nm, this.used_line_cd);
  },
  mounted() {
    console.log('[ArcRateRobot] mounted', this.arc_rate_data, this.hovered_obj_nm, this.used_line_cd)
  },
  beforeUpdate() {
    console.log('[ArcRateRobot][beforeUpdate]', this.arc_rate_data, this.used_line_cd);
  },
  updated() {
    console.log('[ArcRateRobot] updated', this.hovered_obj_nm, this.arc_rate_data, this.used_line_cd)
  }
}
</script>

<style scoped>
img{display:flex !important;}
.bot_slide{}
.bot_slide .slick-slide {margin: 0 2px;}
.bot_slide .slick-list {margin: 0 -2px;}

.bot_slide .prev,.bot_slide .next{display: inline-block;}
.bot_slide .prev img,.bot_slide .next img{display:block !important; height:146px; width: 48px;border-radius:5px 5px 5px 5px; border: none;}
.bot_slide .prev button{background:url(/images/prev_icon_hover.png)no-repeat; margin-right:3px;border-radius:5px 5px 5px 5px;}
.bot_slide .prev button.slick-disabled{ background:url(/images/prev_icon.png)no-repeat; width:48px; height: 146px; margin-right:3px;border-radius:5px 5px 5px 5px;}
.bot_slide .next button{background:url(/images/next_icon_hover.png)no-repeat; margin-left:2px;border-radius:5px 5px 5px 5px;}
.bot_slide .next button.slick-disabled{background:url(/images/next_icon.png)no-repeat; margin-right:3px;border-radius:5px 5px 5px 5px;}

.bot_slide .prev thead th{background:#002f63;border-radius: 5px 5px 0 0;padding: 19px 0;}
.bot_slide .prev tbody td{padding: 3.8px 0;}
.bot_slide .prev tbody tr:nth-of-type(1) td{background:#295585;} /* #608ca8  #436175*/
.bot_slide .prev tbody tr:nth-of-type(2) td{background:#003f84;border-top:1px solid #3d6899;border-bottom:1px solid #3d6899;}
.bot_slide .prev tbody tr:nth-of-type(3) td{background:#002f63;border-radius:0 0 5px 5px}
.bot_slide .prev table{color:#fff;width: 85px;text-align:center; margin-right:1px;}
.bot_slide .slide{display: inline-block;width: calc(98% - 177px);vertical-align: top;margin-right: 2px;}
.table_wrap{display: inline-block;}


</style>
