<template>
    <table><!-- class="bg_yellow" -->
      <tbody>
        <tr>
          <td :key="i" v-for="(item, i) in cell[0]" :class="item[2]">
            <p v-if="item['state'] !== 0" :class="(item['is_moved'] ? 'green' :item['is_selected']?'red': item['state'])" @click="handle_click_item(item['device_cd'])" :device_nm="item['device_cd']">{{cell1[i]}}</p>
            <em v-if="item['state'] === 0">{{cell1[i]}}</em>
          </td>
        </tr>
        <tr>
          <td :key="i" v-for="(item, i) in cell[1]" :class="item[2]">
            <p v-if="item['state'] !== 0" :class="(item['is_moved'] ? 'green' :item['is_selected']?'red': item['state'])" @click="handle_click_item(item['device_cd'])" :device_nm="item['device_cd']">{{cell2[i]}}</p>
            <em v-if="item['state'] === 0">{{cell2[i]}}</em>
          </td>
        </tr>
        <tr>
          <td :key="i" v-for="(item, i) in cell[2]" :class="item[2]">
            <p v-if="item['state'] !== 0" :class="(item['is_moved'] ? 'green' :item['is_selected']?'red': item['state'])"  @click="handle_click_item(item['device_cd'])" :device_nm="item['device_cd']">{{cell3[i]}}</p>
            <em v-if="item['state'] === 0">{{cell3[i]}}</em></td>
        </tr>
        <tr>
          <td :key="i" v-for="(item, i) in cell[3]" :class="item[2]">
            <p v-if="item['state'] !== 0" :class="(item['is_moved'] ? 'green' :item['is_selected']?'red': item['state'])" @click="handle_click_item(item['device_cd'])" :device_nm="item['device_cd']">{{cell4[i]}}</p>
            <em v-if="item['state'] === 0">{{cell4[i]}}</em></td>
        </tr>
      </tbody>
    </table>
</template>

<script>
import {EventBus} from "../../event-bus";

export default {
  name: "AdminLineDetailCell",
  props:{
    cell:Array,
  },
  data(){
    return{
      cell1: [33,34,31,32],
      cell2: [43,44,41,42],
      cell3: [13,14,11,12],
      cell4: [23,24,21,22],
    }
  },
  methods:{
    handle_click_item(device_cd){
      console.log('device_cd:', device_cd)
      EventBus.$emit("click-AdminDetailCell-select", {'column':'', 'location':'', 'device_cd':device_cd});
    }
  },
  created() {
  }
}
</script>

<style scoped>


table td{width: 25%;border-right: 1px solid #eee;height: 30px;border-bottom: 1px solid #eee;position: relative;font-size: 14px;text-align: center;}
table{float:left;border-right: 1px solid #ddd; width: 10%}
table tr td:last-child{border-right:0;}
table tr:last-child td{border-bottom:0}
table td.yellow{background-color: #feefbf}
table.bg_yellow{background: #feefbf;}
table tr td p{width: 100%; background-size: 100% auto!important;background-position: center!important;text-align: center;position: relative;font-size: 14px;color:#444444; z-index: 1;padding: 4px 0;}
table tr td p em{position: absolute;top: 50%;left: 48%;transform: translate(-50%,-50%);font-weight: 300; z-index:400;}
table tr td p.yellow{background:url(/images/yellow_cir.png)no-repeat;color:#fff;}
table tr td p.purple{background:url(/images/purple_cir.png)no-repeat;color:#fff;}
table tr td p.red{background:url(/images/red_cir.png)no-repeat;color:#fff;}
table tr td p.green{background:url(/images/green_cir.png)no-repeat;color:#fff;}

</style>
