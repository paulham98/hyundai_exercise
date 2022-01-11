<template>
  <div class="graph_wrap ver17">
    <div class="column_number_area">
      <p>A</p>
      <p>B</p>
      <p>C</p>
      <p>D</p>
      <p>E</p>
      <p>F</p>
      <p>G</p>
      <p>H</p>
      <p>I</p>
      <p>J</p>
      <p>K</p>
      <p>L</p>
      <p>M</p>
      <p>N</p>
      <p>O</p>
      <p>P</p>
      <p>Q</p>
    </div>
    <div class="row_number_area">
      <p><span>10</span></p>
      <p><span>9</span></p>
      <p><span>8</span></p>
      <p><span>7</span></p>
      <p><span>6</span></p>
      <p><span>5</span></p>
      <p><span>4</span></p>
      <p><span>3</span></p>
    </div>

    <AdminMainMapLineRow  :line="lines[0]" :selected_line_code="selected_line_code"></AdminMainMapLineRow>
    <AdminMainMapLineRow  :line="lines[1]" :selected_line_code="selected_line_code"></AdminMainMapLineRow>
    <AdminMainMapLineRow  :line="lines[2]" :selected_line_code="selected_line_code"></AdminMainMapLineRow>
    <AdminMainMapLineRow  :line="lines[3]" :selected_line_code="selected_line_code"></AdminMainMapLineRow>
    <AdminMainMapLineRow  :line="lines[4]" :selected_line_code="selected_line_code"></AdminMainMapLineRow>
    <AdminMainMapLineRow  :line="lines[5]" :selected_line_code="selected_line_code"></AdminMainMapLineRow>
    <AdminMainMapLineRow  :line="lines[6]" :selected_line_code="selected_line_code"></AdminMainMapLineRow>

  </div>
</template>

<script>
import AdminMainMapLineRow from "@/components/dashboard/AdminMainMapLineRow";

export default {
  name: "AdminMainMapLineMap",
  props:{
    lines: {Array, required: true},
    line_data: {type:Array, required:true},
    selected_line_code : {type:String, required:true}
  },
  components:{
    AdminMainMapLineRow
  }
}
</script>

<style scoped>

.graph_wrap{position: relative;/* width: 700px; */padding-top: 40px;padding-left: 47px;padding-right: 0;margin: 20px;box-sizing: border-box;/* margin-top: 0; */height: 498px;margin-bottom: 0;}
.graph_wrap .row_number_area{position: absolute;height: 100%;left: 0;width: 100%;top: 0;margin-top: 29px;}
.graph_wrap .row_number_area p{position:absolute;width: 17px;text-align: left;width: calc(100% + 7.5px);}
.graph_wrap .row_number_area p span{display:inline-block;width:17px;text-align:right;}
.graph_wrap .row_number_area p:before{content:"";height: 1px;width: calc(100% - 27px);position:absolute;background:#ddd;top: 50%;left: 22px;transform: translateY(-50%);}
.graph_wrap .column_number_area{position: absolute;width: calc(100% - 42px);top: 0;height: 100%;left: 0;margin-left: 40px;}
.graph_wrap .column_number_area p{display:inline-block;text-align: center;position: absolute;height: calc(100% - 13px);;width: 12px;}
.graph_wrap .column_number_area p:last-child{/* right: -7.3px!important; *//* left: unset!important; */}
.graph_wrap .column_number_area p:before{content:"";width:1px;height: calc(100% - 44px);position:absolute;background:#ddd;left: 50%;top: 22px;transform: translateX(-50%);}

.row_number_area>p:nth-of-type(1){top:1px}
.row_number_area>p:nth-of-type(2){top:61px}
.row_number_area>p:nth-of-type(3){top:121px}
.row_number_area>p:nth-of-type(4){top:181px}
.row_number_area>p:nth-of-type(5){top:241px}
.row_number_area>p:nth-of-type(6){top:301px}
.row_number_area>p:nth-of-type(7){top:361px}
.row_number_area>p:nth-of-type(8){top:421px}

.column_number_area>p:nth-of-type(2){left:6.25%}
.column_number_area>p:nth-of-type(3){left:12.5%}
.column_number_area>p:nth-of-type(4){left:18.75%}
.column_number_area>p:nth-of-type(5){left:25%}
.column_number_area>p:nth-of-type(6){left:31.25%}
.column_number_area>p:nth-of-type(7){left:37.5%}
.column_number_area>p:nth-of-type(8){left:43.75%}
.column_number_area>p:nth-of-type(9){left:50%}
.column_number_area>p:nth-of-type(10){left:56.25%}
.column_number_area>p:nth-of-type(11){left:62.5%}
.column_number_area>p:nth-of-type(12){left:68.75%}
.column_number_area>p:nth-of-type(13){left:75%}
.column_number_area>p:nth-of-type(14){left:81.25%}
.column_number_area>p:nth-of-type(15){left:87.5%}
.column_number_area>p:nth-of-type(16){left:93.75%}
.column_number_area>p:nth-of-type(17){left:100%}
.column_number_area>p:nth-of-type(18){left:106.25%}



</style>
