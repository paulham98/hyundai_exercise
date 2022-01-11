import Vue from 'vue'
import Vuex from 'vuex'
import {fetchApi31, fetchEntireLines} from '../api/dashboard/endpoints'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state:{
    lines:[],
    line_outlines:[],
    line_data:[]
  },
  mutations:{
    SET_LINES(state, data){
      state.lines = data;
    },
    SET_LINE_OUTLINES(state, data){
      state.line_outlines = data;
    }
  },
  actions:{
    FETCH_LINES(context) {
      fetchEntireLines()
        .then(data=>{
          context.commit('SET_LINES', data.data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    FETCH_API31(context, robot_data_key) {
      fetchApi31(robot_data_key)
        .then(data=>{
          context.commit('SET_LINE_OUTLINES', data.data.value)
        })
        .catch(err=>{
          console.log(err)
        })
    }
  }
})

