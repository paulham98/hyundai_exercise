<template>
    <div class="status" >
            <WholeRobotStatusTable :key="i" v-for="(line, i) in arc_name_data" :line="line">
            </WholeRobotStatusTable>
    </div>
</template>

<script>
    import WholeRobotStatusTable from "../../components/dashboard/WholeRobotStatusTable"
    export default {
        components:{WholeRobotStatusTable, },
        name: "ArcListMap",
        props:{
            arc_name_data: Object
        },

      methods:{

      },

    }
</script>

<style scoped>
.status::-webkit-scrollbar{width: 0px; height: 0px}
.status .slick-track{margin-left: 0;}/* 210808 추가 */
.status .slick-track .slick-slide{padding-right: 5px;}/* 210808 추가 */
.status>div{margin-right: 5px; }/* 210808수정 display: inline-block; vertical-align: top; width:100% */
.status>div:last-child{margin-right:0;}
.status>div .ms_wrap thead th{background: #002f63;color: #fff;}
.status>div .ms_wrap thead tr:first-child th{border-radius: 5px 5px 0 0;border-bottom: 1px solid #ededed;}
.status>div .ms_wrap thead tr:last-child th:last-child{background: #003f84;border-left: 1px solid #ededed;}
.status>div .ms_wrap tbody{background: #fff;}
.status>div .ms_wrap tbody td:last-child{border-left: 1px solid #ededed;}
.status>div .ms_wrap tbody td{border-bottom: 1px solid #ededed;padding: 10px;position: relative;height: 107px;box-sizing: border-box;vertical-align: top;}
.status>div .ms_wrap tbody td img{position:absolute;}
.status>div .ms_wrap tbody td p{border-radius:500px;text-align:left ;padding-left:50px;margin-bottom: 7px;padding-right: 10px;overflow: hidden;white-space: nowrap;/* text-overflow: ellipsis; */-o-text-overflow: ellipsis;-ms-text-overflow: ellipsis;}
.status>div .ms_wrap tbody td p:last-child{margin-bottom:0}
.status>div .ms_wrap tbody td p.green{background: #2ed400;color:#fff;}
.status>div .ms_wrap tbody td p.blue{background: #0090ff;color:#fff;}
.status>div .ms_wrap tbody td p.red{background: #ff2b2b;color:#fff;}
.status>div .ms_wrap tbody td p.gray{background: #939393;color:#fff;}
.status>div .ms_wrap tbody td p.white{border:1px solid #a7a7a7;color:#a7a7a7}
.status>div .bot th{background: #002f63;border-right: 1px solid #ededed;text-align: center;color: #fff;padding: 5px;}
.status>div .bot tr th:last-child{border-right: 0;}
.status>div .bot td{background: #fff;border-right: 1px solid #ededed;text-align: center;padding: 5px;}
.status>div .bot tr td:last-child{border-right: 0;}
.status>div .bot div{overflow-x: scroll;}
</style>
