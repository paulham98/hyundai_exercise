<template>
  <tr>
    <td>{{ title }}</td>
    <td v-for="(d, i) in nums.length" :key="i" :class="{'ystar':nums[i] === 1, 'bstar':nums[i] === 2}"></td>
  </tr>
</template>

<script>
export default {
  props:{
    title :{
      type: Number,
      required: true
    },
    nums: Array,
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
tr, th, td {
  align: center;
  width: 80px;
  border: 1px solid #444444;
}
.ystar {
  background-color: #ffff00;
}
.bstar {
  background-color: darkblue;
}
</style>