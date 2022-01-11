<template>
  <div class="table_scr">
    <table>
      <colgroup>
        <!--            <col style="width:30%;">-->
        <!--            <col style="width:70%;">-->
      </colgroup>
      <thead>
      <tr v-if="mode === 'MANUAL'">
        <th class="gray">Ser.</th>
        <th class="gray" width="120px">용접기</th>
        <th class="navy">위치</th>
        <th class="navy">셀</th>
        <th class="navy">저장</th>
      </tr>
      <tr v-if="mode === 'ROBOT'">
        <th class="gray" width="100px">로봇코드</th>
        <th class="gray" width="180px">로봇호기</th>
        <th class="gray" width="30px">M/S</th>
        <th class="navy" width="80px">위치</th>
        <th class="navy" width="40px">셀</th>
        <th class="navy" width="60px">저장</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="filtered_arc_items.length===0"><td colspan="5">용접기가 없습니다.</td></tr>
        <AdminLineDetailArcItem :selected_line_data="selected_line_data" :mode="mode" :selected_arc_device_cd="selected_arc_device_cd" :p_position="v.position" :p_column="v.column" :key="i" v-for="(v, i) in filtered_arc_items" :arc_item="v"></AdminLineDetailArcItem>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminLineDetailArcItem from "./AdminLineDetailArcItem";
export default {
  name: "AdminLineDetailRightTableManual",
  components:{AdminLineDetailArcItem},
  props:{
    filtered_arc_items:Array,
    mode:String,
    selected_arc_device_cd:String,
    selected_line_data: Array,
  },
  updated() {
    // console.log('filtered_arc_item', this.filtered_arc_items[0].column)
  }
}
</script>

<style scoped>
.table_scr{height: 100%;overflow-y: scroll;}
table{width: 100%;}
table th{color: #fff;font-weight: 600;padding: 5px 0;border-right: 1px solid #fff;position: sticky;top:0;}
table th.gray{background: #5e5e5e;}
table th.navy{background: #002f63;}
table tbody tr:nth-of-type(2n){background: #ededed;}
</style>
