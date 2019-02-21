import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    counter: 0,
    baseUrl:'http://www.wengwenglove.com/home',
    uid:''
  },
  mutations: {
    increment (state) {
      state.counter++
    },
    updateUid(state,{uid}){
      state.uid = uid;
    }
  },
  action:{
    increment (context) {
        context.commit('increment')
      },
      updateUid(context){
        context.commit('updateUid')
      }
  }
})

export default store