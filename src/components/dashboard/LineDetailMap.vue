<template>
    <div class="graph_wrap graph_wrap2 ver17">
        <div class="column_name_area">
            <p :key="i" v-for="(v, i) in 11">{{String.fromCharCode(v + first_col + 64) }}</p>
        </div>
        <div class="row_name_area">
          <p :key="i" v-for="(v, i) in 4"><span>{{first_row - v + 1}}</span></p>
        </div>
        <ul>
            <li>
                <LineDetailTable :key="i" v-for="(item, i) in lines[0]" :cell_data="item" style1=""
                     v-model="hovered_device_nm" @armEvent="change" @originalEvent="original"></LineDetailTable>
            </li>
        </ul>
        <ul>
            <li>
                <LineDetailTable :key="i" v-for="(item, i) in lines[1]" :cell_data="item" style1=""
                     v-model="hovered_device_nm" @armEvent="change" @originalEvent="original"></LineDetailTable>
            </li>
        </ul>
        <ul>
            <li>
                <LineDetailTable :key="i" v-for="(item, i) in lines[2]" :cell_data="item" style1=""
                     v-model="hovered_device_nm" @armEvent="change" @originalEvent="original"></LineDetailTable>
            </li>
        </ul>
        <ul>
            <li>
                <table>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </li>
        </ul>
    </div>
</template>

<script>
import LineDetailTable from "./LineDetailTable"
export default {
  name: "LineDetailMap",
  components:{ LineDetailTable, },
  props:{
    lines: Array,
    id: String,
    first_row:Number,
    first_col:Number,
    hover_device_nm: String
  },
  data() {
    return {
      hovered_device_nm: ""
    }
  },
  methods: {
    change(device_nm){
      // console.log(device_nm)
      this.$emit("hoveredEvent", device_nm);
      console.log('[LineDetailMap]', device_nm)
      this.hovered_device_nm = device_nm;
    },
    original(data){
      // console.log("[lineDetailMap]", data)
      this.hovered_device_nm = data;
    }
  },
  created() {
    console.log('[LineDetailMap]', this.lines)
  }
}
</script>

<style scoped>
    .graph_wrap{position: relative;/* width: 700px; */padding-top: 41px;padding-left: 47px;padding-right: 0;margin: 20px;box-sizing: border-box;/* margin-top: 0; */}
    .graph_wrap .row_name_area{position: absolute;height: 100%;left: 0;width: 100%;top: 0;margin-top: 29px;}
    .graph_wrap .row_name_area p{position:absolute;width: 17px;text-align: left;width: calc(100% + 7.5px);}
    .graph_wrap .row_name_area p span{display:inline-block;width:17px;text-align:right;}
    .graph_wrap .row_name_area p:before{content:"";height: 1px;width: calc(100% - 22px);position:absolute;background:#ddd;top: 50%;left: 22px;transform: translateY(-50%);}
    .graph_wrap .column_name_area{position: absolute;width: calc(100% - 40px);top: 0;height: 100%;left: 0;margin-left: 40px;}
    .graph_wrap .column_name_area p{text-align: center;position: absolute;height: 100%;width: 12px;}
    .graph_wrap .column_name_area p:last-child{/* right: -7.3px!important; *//* left: unset!important; */}
    .graph_wrap .column_name_area p:before{content:"";width:1px;height: calc(100% - 22px);position:absolute;background:#ddd;left: 50%;top: 22px;transform: translateX(-50%);}
    .graph_wrap ul{height: 36px;padding: 3px 0;padding-bottom: 1px;width: 100%;}
    .graph_wrap ul li{height:100%;position: relative;}


    /* 그래프2 */
    .graph_wrap2 ul{padding: 0;height: 115px;width: calc(100% + 7.5px);}
    .graph_wrap2 ul li table td{width: 25%;border-right: 1px solid #eee;height: 28px;border-bottom: 1px solid #eee;position: relative;}
    .graph_wrap2 ul li table{float:left;}
    .graph_wrap2 ul li table tr td:last-child{border-right:0;}
    .graph_wrap2 ul li table tr:last-child td{border-bottom:0}
    .graph_wrap2 ul li table.bg_yellow{background: #feefbf;}
    .graph_wrap2 ul:last-child{height: 29px;}
    .graph_wrap2 ul:last-child table tr:last-child td{border-bottom:1px solid #eee}
    .graph_wrap2 li table{width:10%}
    .graph_wrap2 .row_name_area p:nth-of-type(1){top:0}
    .graph_wrap2 .row_name_area p:nth-of-type(2){top: 116px;}
    .graph_wrap2 .row_name_area p:nth-of-type(3){top: 231px;}
    .graph_wrap2 .row_name_area p:nth-of-type(4){top: 345px;}


    .left{display: inline-block;width: calc(100% - 455px);}
    .left .graph_wrap{display:inline-block;width: calc(100% - 134px);vertical-align: top;margin-bottom: 50px;}
    .left .graph_wrap2{display:inline-block;width: calc(100% - 42px);vertical-align: top;margin-bottom: 50px;box-sizing: border-box;}

    .column_name_area>p:nth-of-type(2){ left:10%}
    .column_name_area>p:nth-of-type(3){ left:20%}
    .column_name_area>p:nth-of-type(4){ left:30%}
    .column_name_area>p:nth-of-type(5){ left:40%}
    .column_name_area>p:nth-of-type(6){ left:50%}
    .column_name_area>p:nth-of-type(7){ left:60%}
    .column_name_area>p:nth-of-type(8){ left:70%}
    .column_name_area>p:nth-of-type(9){ left:80%}
    .column_name_area>p:nth-of-type(10){ left:90%}
    .column_name_area>p:nth-of-type(11){ left:100%}
    .column_name_area>p:nth-of-type(12){ left:110%}

</style>
