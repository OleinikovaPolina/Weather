import axios from "axios";
import {GetterTree, MutationTree, ActionTree} from "vuex"
import {Weather, FullWeather} from './types'

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/'
})

class State {
    data: Array<Weather> = []
    fullWeather: FullWeather = <FullWeather>{}
    localWeather: FullWeather = <FullWeather>{}
}

const getters = <GetterTree<State, any>>{}

const mutations = <MutationTree<State>>{
    ADD_WEATHER(state, data) {
        if (data) {
            if (state.data.filter(weather => weather.id === data.id).length > 0) {
                state.data = state.data.map(o => o.id === data.id ? data : o)
            } else {
                state.data.unshift(data)
            }
        }
    },
    REMOVE_ALL_WEATHER(state) {
        state.data = []
    },
    REMOVE_WEATHER(state, id) {
        state.data = state.data.filter(weather => weather.id !== id)
    },
    ADD_FULL_WEATHER(state, data) {
        state.fullWeather = data
    },
    ADD_LOCAL_WEATHER(state, data) {
        state.localWeather = data
    },
};

const actions = <ActionTree<State, any>>{
    async ADD_WEATHER({commit,rootState}, id) {
        commit('weather/ADD_WEATHER', {id: id}, {root: true})
        if (id) {
            await instance.get('/weather', {
                params: {
                    id: id,
                    appid: '7bec99c40964201451827401996c14fc',
                    units: rootState.unit
                }
            }).then(res => {
                commit('weather/ADD_WEATHER', res.data, {root: true})
            }).catch((err) => {
                if (!err.response) {
                    commit('weather/ADD_WEATHER', {id: id, cod: 0}, {root: true})
                }
            })
        } else {
            commit('weather/ADD_WEATHER', {cod: 404}, {root: true})
        }
    },
    async ADD_FULL_WEATHER({commit,rootState}) {
        commit('weather/ADD_FULL_WEATHER', {}, {root: true})
        const city = rootState.activeCity
        if (Object.keys(city).length > 0) {
            await instance.get('/onecall', {
                params: {
                    lat: city.coord.lat,
                    lon: city.coord.lon,
                    exclude: 'minutely',
                    appid: '7bec99c40964201451827401996c14fc',
                    units: rootState.unit
                }
            }).then((res) => {
                commit('weather/ADD_FULL_WEATHER', res.data, {root: true})
            }).catch((err) => {
                if (!err.response) {
                    commit('weather/ADD_FULL_WEATHER', {cod: 0}, {root: true})
                }
            })
        } else {
            commit('weather/ADD_FULL_WEATHER', {cod: 404}, {root: true})
        }
    },
    async ADD_LOCAL_WEATHER({commit, rootState}) {
        commit('weather/ADD_LOCAL_WEATHER', {}, {root: true})
        if (rootState.location.coords) {
            await instance.get('/onecall', {
                params: {
                    lat: rootState.location.coords.latitude,
                    lon: rootState.location.coords.longitude,
                    exclude: 'minutely',
                    appid: '7bec99c40964201451827401996c14fc',
                    units: rootState.unit
                }
            }).then((res) => {
                commit('weather/ADD_LOCAL_WEATHER', res.data, {root: true});
            }).catch((err) => {
                if (!err.response) {
                    commit('weather/ADD_LOCAL_WEATHER', {cod: 0}, {root: true})
                }
            })
        } else {
            commit('weather/ADD_LOCAL_WEATHER', {cod: 404}, {root: true})
        }
    },
}

const Weather = {
    namespaced: true,
    state: new State(),
    getters: getters,
    mutations: mutations,
    actions: actions
}

export default Weather;