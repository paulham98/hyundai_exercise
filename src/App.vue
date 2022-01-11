<template>
  <div class="app">
    <router-view/>
  </div>

</template>

<script>

export default {
    name: 'App',
    components: {
    },
    data() {
      return {
        data1: [],
        data1_1: [],
        data2: [],
        data2_1: [],
        robot_cnt: 0,
        robot_arc_cnt: 0,
        robot_wait_cnt: 0,
        robot_off_cnt: 0,

        manual_cnt: 0,
        manual_arc_cnt: 0,
        manual_wait_cnt: 0,
        manual_off_cnt: 0,
      }
    },
    methods:{

    },
    created() {
      console.log('[env]', process.env)
    }
}

</script>

<style>
.app{padding: 15px;/* width: 3880px; */}

</style>
