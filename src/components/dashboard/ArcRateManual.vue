<template>
  <div class="bot_slide">
    <div class="prev">
      <button type="button"><img alt=""></button>
      <div class="table_wrap">
        <table>
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
      <ArcRateItem :hovered_obj_nm="hovered_obj_nm" :key="i" v-for="(cl, i) in arc_rate_data" :item="cl"></ArcRateItem>
    </div>
    <div class="next">
      <button type="button"><img alt=""></button>
    </div>
  </div>
</template>

<script>
    // import $ from 'jquery';
    import ArcRateItem from "./ArcRateManualItem";

    export default {
      components: {ArcRateItem},
      model: {
        prop: 'hovered_obj_nm',
      },
      props: {
        arc_rate_data: Array,
        hovered_obj_nm: String,
      },
      data() {
        return {
        }
      },
      methods: {
      },
      created() {
        console.log('[ArcRate][created]', this.arc_rate_data)
      },
      mounted() {
        console.log('[ArcRate] mounted')
      },
      beforeUpdate() {
        console.log('[ArcRate][beforeUpdate created]', this.arc_rate_data)
      },
      update() {
        console.log('[ArcRate] updated')

      }
    }
</script>

<style scoped>

.bot_slide{}
.bot_slide .slick-slide {margin: 0 2px;}
.bot_slide .slick-list {margin: 0 -2px;}

.bot_slide .prev,.bot_slide .next{display: inline-block;}
.bot_slide .prev img,.bot_slide .next img{display:block !important; height:146px; width: 48px;border-radius:5px 5px 5px 5px; border: none;}
.bot_slide .prev button{background:url(/images/prev_icon_hover.png)no-repeat;margin-right:3px;border-radius:5px 5px 5px 5px;}
.bot_slide .prev button.slick-disabled{ background:url(/images/prev_icon.png)no-repeat; width:48px; height: 146px; margin-right:3px;border-radius:5px 5px 5px 5px;}
.bot_slide .next button{background:url(/images/next_icon_hover.png)no-repeat;margin-left:2px;border-radius:5px 5px 5px 5px;}
.bot_slide .next button.slick-disabled{background:url(/images/next_icon.png)no-repeat; margin-right:3px;border-radius:5px 5px 5px 5px;}

.bot_slide .prev thead th{background: #436175;border-radius: 5px 5px 0 0;padding: 6px 0;}
.bot_slide .prev tbody td{padding: 8px 0;}
.bot_slide .prev tbody tr:nth-of-type(1) td{background:#53778e;} /* #608ca8  #436175*/
.bot_slide .prev tbody tr:nth-of-type(2) td{background:#436175;border-top:1px solid #3d6899;border-bottom:1px solid #3d6899;}
.bot_slide .prev tbody tr:nth-of-type(3) td{background:#295585;border-radius:0 0 5px 5px}
.bot_slide .prev table{color:#fff;width: 85px;text-align:center; margin-right:1px;}

.bot_slide .slide{display: inline-block;width: calc(99% - 191px);vertical-align: top;margin-right: 2px;}

.table_wrap{display: inline-block;}


</style>
