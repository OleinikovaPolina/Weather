import {GetterTree, MutationTree, ActionTree} from "vuex"
import {City} from './types'


class State {
    data: Array<City> = JSON.parse(localStorage.cities || '[]')
}

const getters = <GetterTree<State, any>>{}

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
    REMOVE_ALL_CITY: (state) => {
        state.commit('city/REMOVE_ALL_CITY', null, {root: true})
        state.commit('RETURN_ALL_CITY', null, {root: true})
    },
    ADD_CITY: (state, data) => {
        state.commit('city/ADD_CITY', data, {root: true})
        if (data) {
            state.commit('REMOVE_CITY', data.id, {root: true})
        }
    },
    REMOVE_CITY: (state, id) => {
        state.commit('ADD_CITY', state.state.data.find(city => city?.id == id), {root: true})
        state.commit('city/REMOVE_CITY', id, {root: true})
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