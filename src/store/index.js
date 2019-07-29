import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
    baseUri: 'http://www.roseonly.com.cn',
    menu: true
}

const getters = {
    getBaseUri () {
        return state.baseUri
    },
    getMenu () {
        return state.menu
    }
}

const mutations = {
    setBaseUri (v) {
        state.baseUri = v
    },
    isShowHideMenu (v) {
        state.menu = v
    }
}

const actions = {
    setBaseUri (context, v) {
        context.commit('setBaseUri', v)
    },
    setMenu (context, v) {
        context.commit('isShowHideMenu', v)
    }
}

const plugins = [createPersistedstate()]

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    plugins
})

export default store
