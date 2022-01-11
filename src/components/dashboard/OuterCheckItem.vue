<template>
  <tr>
    <td>
      <p>
        <em>{{v.lineNm}}</em>
      </p>
    </td>
    <td><p>{{v.dailyDefects}} / {{v.dailyInspections}}</p></td>
    <td><p>{{v.monthlyDefects}} / {{v.monthlyInspections}}</p></td>
  </tr>
</template>

<script>
export default {
  name: "OuterCheckItem",
  components:{},
  props:{
    v:Object
  },
    data(){
      return{
          sorted_v: {}
      }
    },
  methods : {
      sort(){
      }
  }
}
</script>

<style scoped>

td.big{border-right:1px solid #002f63;vertical-align: middle;padding: 10px 0;}
tr{border-bottom:1px solid #b7b7b7;}
tr>*{padding: 4px 0;}
th p{border-color: #fff;font-weight: 400;}
p{border-right: 1px solid #707070;margin: 5px 0;line-height: 1; font-family: 'Noto Sans KR'; color: black; font-weight: 600; }
tr>*:last-child p{border-right: 0;}
em{color: #002f63;font-weight: 500;vertical-align: middle; font-family: 'Noto Sans KR';}
td.big span{font-size: 32px;width: 55px;display: inline-block;text-align: right;box-sizing: border-box;vertical-align: middle;line-height: 1;}
tr span{vertical-align:middle;display:inline-block;width: calc(100% - 70px);text-align: right;}
</style>
