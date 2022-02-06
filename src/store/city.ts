import {GetterTree, MutationTree, ActionTree} from "vuex"
import {City} from './types'


class State {
    data: Array<City> = JSON.parse(localStorage.cities || '[]')
}

const getters = <GetterTree<State, any>>{
    data(state) {
        return state.data
    }
}

const mutations = <MutationTree<State>>{
    ADD_CITY: (state, data) => {
        if (data) {
            state.data.unshift(data)
        }
        localStorage.setItem('cities', JSON.stringify(state.data))
    },
    REMOVE_CITY: (state, id) => {
        state.data = state.data.filter(city => city?.id != id)
        localStorage.setItem('cities', JSON.stringify(state.data))
    },
    REMOVE_ALL_CITY: (state) => {
        state.data = []
        localStorage.setItem('cities', '[]');
    }
};

const actions = <ActionTree<State, any>>{
    REMOVE_ALL_CITY: ({commit}) => {
        commit('city/REMOVE_ALL_CITY', null, {root: true})
        commit('RETURN_ALL_CITY', null, {root: true})
    },
    ADD_CITY: ({commit}, data) => {
        commit('city/ADD_CITY', data, {root: true})
        if (data) {
            commit('REMOVE_CITY', data.id, {root: true})
        }
    },
    REMOVE_CITY: ({commit, state}, id) => {
        commit('ADD_CITY', state.data.find(city => city?.id == id), {root: true})
        commit('city/REMOVE_CITY', id, {root: true})
    }
}

const City = {
    namespaced: true,
    state: new State(),
    getters: getters,
    mutations: mutations,
    actions: actions
};

export default City;