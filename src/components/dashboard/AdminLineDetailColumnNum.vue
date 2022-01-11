<template>
  <div class="column_number_area">
    <p :key="i" v-for="(v, i) in 11">{{String.fromCharCode(v + first_col + 64) }}</p>
  </div>
</template>

<script>
export default {
  name: "AdminLineDetailColumnNum",
  props:{
    first_col:Number,
  },
  data(){
    return{
    }
  }
}
</script>

<style scoped>
.column_number_area{position: absolute;width: calc(100% - 40px);top: 0;height: 100%;left: 0;margin-left: 40px;}
.column_number_area p{text-align: center;position: absolute;height: 100%;width: 12px;}
.column_number_area p:last-child{/* right: -7.3px!important; *//* left: unset!important; */}
.column_number_area p:before{content:"";width:1px;height: calc(100% - 22px);position:absolute;background:#ddd;left: 50%;top: 22px;transform: translateX(-50%);}
.column_number_area>p:nth-of-type(1){}
.column_number_area>p:nth-of-type(2){left: 10%}
.column_number_area>p:nth-of-type(3){left: 20%}
.column_number_area>p:nth-of-type(4){left: 30%}
.column_number_area>p:nth-of-type(5){left: 40%}
.column_number_area>p:nth-of-type(6){left: 50%}
.column_number_area>p:nth-of-type(7){left: 60%}
.column_number_area>p:nth-of-type(8){left: 70%}
.column_number_area>p:nth-of-type(9){left: 80%}
.column_number_area>p:nth-of-type(10){left: 90%}
.column_number_area>p:nth-of-type(11){left: 100%}
</style>
