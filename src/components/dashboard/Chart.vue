<template>
    <div>
        <ve-line :data="chartData"></ve-line>
    </div>
</template>

<script>
    import VeLine from 'v-charts/lib/line.common'
    export default {
        components: { VeLine },
        data () {
            return {
                chartData: {
                    columns: ['date', 'PV'],
                    rows: [
                        { 'date': '01-01', 'PV': 1231 },
                        { 'date': '01-02', 'PV': 1223 },
                        { 'date': '01-03', 'PV': 2123 },
                        { 'date': '01-04', 'PV': 4123 },
                        { 'date': '01-05', 'PV': 3123 },
                        { 'date': '01-06', 'PV': 7123 }
                    ]
                }
            }
        }
    }
</script>

<style>
    .echarts { width: 800px;height: 400px}
    .modal_wrap{position: fixed;z-index: 9;}
    .modal_wrap::before{content: "";width: 100%;height: 100%;}
    .modal{border-radius: 10px;margin: 30px auto;width: 80%;overflow: hidden;background: #fff;box-shadow: 3px 3px 25px rgba(0,0,0,0.5);}
    .modal .top{background: #002f63;color: #fff;position: relative;padding: 10px 20px;font-size: 20px;}
    .modal .top p{font-weight:bold;}
    .modal .top button{position: absolute;right: 15px;top: 50%;width: 23px;transform: translateY(-50%);height: 23px;}
    .modal .top button::before{content: "";width: 100%;height: 1px;transform: rotate(45deg);top: 50%;background: #fff;position: absolute;left: 0;}
    .modal .top button::after{content: "";width: 100%;height: 1px;transform: rotate(-45deg);top: 50%;background: #fff;position: absolute;left: 0;}
    .modal .left{width:50%;display:inline-block;float:left;padding: 20px;padding-right: 10px;}
    .modal .left img{width:100%;}
    .modal .left .tb_line{border-top:2px solid #002f63;border-bottom:2px solid #002f63;padding: 5px;padding-right: 0;color: #002f63;}
    .modal .left .tb_line p{display:inline-block;font-size: 18px;font-weight: bold;}
    .modal .left .tb_line ul{display:inline-block;float:right;padding: 5px 0;}
    .modal .left .tb_line ul li{display:inline-block;padding: 0 10px;line-height:1;float:left;}
    .modal .left .tb_line ul li:last-child{border-left: 1px solid #7a99bb;}
    .modal .left .table_area{margin-top: -25px;}
    .modal .left .table_area .color_round span{display: inline-block;color: #fff;font-size: 14px;text-align: center;border-radius: 500px;width: 65px;padding: 2px 0;margin-bottom: 10px;}
    .modal .left .table_area .color_round span.purple{background: #a400e9;}
    .modal .left .table_area .color_round span.green{background: #2ed400;}
    .modal .left .table_area .color_round span.sky{background: #0090ff;}
    .modal .left .table_area table{text-align: center;}
    .modal .left .table_area table th{background: #002f63;color: #fff;padding: 5px;font-weight: 400;}
    .modal .left .table_area table th ul li{display:inline-block;float: left;width: 50%;cursor: pointer;padding: 2px 0;}
    .modal .left .table_area table th ul{background:#295585;border-radius:5px;width:100%;overflow: hidden;}
    .modal .left .table_area table th ul:after{content:"";display:block;clear:both;}
    .modal .left .table_area table th ul li.active{background:#fabe00;color: #000;}
    .modal .left .table_area table td{padding: 10px 0;position:relative;font-weight: 400;}
    .modal .left .table_area table tbody td:last-child:before{content:"";width:1px;height: 35%;position:absolute;background:#bdbdbd;left:0;top: 50%;transform: translateY(-50%);}
    .modal .left .table_area table tbody tr{border-bottom:1px solid #40638a;}
    .modal .right{width:50%;display:inline-block;padding: 20px;padding-left: 10px;position: relative;}
    .modal .right .gp_top>*{margin-right: 7px;display: inline-block;}
    .modal .right .gp_top>p:nth-of-type(n+2){margin-left:5px;}
    .modal .right .gp_top>*:last-child{margin-right: 0;}
    .modal .right .gp_top>span{font-size: 13px;}
    .modal .right .gp_top>span em{display: inline-block;border-radius: 500px;width: 7px;height: 7px;margin-right: 4px;vertical-align: middle;margin-top: -2px;}
    .modal .right .gp_top>span.red em{background: #fe0000;}
    .modal .right .gp_top>span.blue em{background: #0000ff;}
    .modal .right .gp_top>span.green em{background: #00ff00;}
    .modal .right .gp_top>span.orange em{background: #ff8500;}
    .modal .right .gp_top>span.purple em{background: #9800ff;}
    .modal .right .gp_top>span.dgreen em{background: #00847e;}


</style>