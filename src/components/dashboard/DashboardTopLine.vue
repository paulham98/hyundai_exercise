<template>
  <div class="top_line">
    <h1>울산 공장{{line_nm}}</h1>
  </div>
</template>

<script>
//import {EventBus} from "../../event-bus";
export default {
  props:{
    line_nm:String
  },
  methods:{

  }
}
</script>

<style scoped>
.top_line{position: relative;text-align: center;margin-bottom: 15px;}
.top_line div{position: absolute;left: 0;top: 50%;transform: translateY(-50%);}
.top_line div button{margin-right: 15px;}
.top_line div img{display: block; float:left}
.top_line div img.active{display: none;}
.top_line div button:hover img{display: none;}
.top_line div button:hover img.active{display: inline-block;}
.top_line h1{color: #014085;font-size: 32px;font-weight: 700;}
</style>
