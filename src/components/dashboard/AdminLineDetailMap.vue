<template>
  <div>
    <div class="table_outer">
      <AdminLineDetailCell :key="i" :mode="mode" :cell="v" v-for="(v, i) in line_data[0]"></AdminLineDetailCell>
    </div>
    <div class="table_outer">
      <AdminLineDetailCell :key="i" :mode="mode" :cell="v" v-for="(v, i) in line_data[1]"></AdminLineDetailCell>
    </div>
    <div class="table_outer">
      <AdminLineDetailCell :key="i" :mode="mode" :cell="v" v-for="(v, i) in line_data[2]"></AdminLineDetailCell>
    </div>
  </div>
</template>

<script>
import AdminLineDetailCell from "./AdminLineDetailCell";
export default {
  name: "AdminLineDetailMap",
  props:{
    mode:String,
    line_data:Array
  },
  components:{AdminLineDetailCell}
}
</script>

<style scoped>
div.table_outer{padding: 0;width: calc(100% + 7px); line-height: normal;}
div.table_outer:last-child table tr:last-child td{border-bottom:1px solid #eee}
</style>
