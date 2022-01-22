import axios from "axios";
import {GetterTree, MutationTree, ActionTree} from "vuex"
import {Weather, FullWeather} from './types'

class State {
    data: Array<Weather> = []
    full_weather: FullWeather = <FullWeather>{}
    local_weather: FullWeather = <FullWeather>{}
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
        state.full_weather = data
    },
    ADD_LOCAL_WEATHER(state, data) {
        state.local_weather = data
    },
};

const actions = <ActionTree<State, any>>{
    async ADD_WEATHER(state, id) {
        state.commit('weather/ADD_WEATHER', {id: id}, {root: true})
        if (id) {
            await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    id: id,
                    appid: '7bec99c40964201451827401996c14fc',
                    units: state.rootState['units']
                }
            }).then(res => {
                state.commit('weather/ADD_WEATHER', res.data, {root: true})
            }).catch((err) => {
                if (!err.response) {
                    state.commit('weather/ADD_WEATHER', {id: id, cod: 0}, {root: true})
                }
            })
        } else {
            state.commit('weather/ADD_WEATHER', {cod: 404}, {root: true})
        }
    },
    async ADD_FULL_WEATHER(state) {
        state.commit('weather/ADD_FULL_WEATHER', {}, {root: true})
        const city = state.rootState.activeCity
        if (Object.keys(city).length > 0) {
            await axios.get('https://api.openweathermap.org/data/2.5/onecall', {
                params: {
                    lat: city.coord.lat,
                    lon: city.coord.lon,
                    exclude: 'minutely',
                    appid: '7bec99c40964201451827401996c14fc',
                    units: state.rootState.units
                }
            }).then((res) => {
                state.commit('weather/ADD_FULL_WEATHER', res.data, {root: true})
            }).catch((err) => {
                if (!err.response) {
                    state.commit('weather/ADD_FULL_WEATHER', {cod: 0}, {root: true})
                }
            })
        } else {
            state.commit('weather/ADD_FULL_WEATHER', {cod: 404}, {root: true})
        }
    },
    async ADD_LOCAL_WEATHER(state) {
        state.commit('weather/ADD_LOCAL_WEATHER', {}, {root: true})
        if (state.rootState.location.coords) {
            await axios.get('https://api.openweathermap.org/data/2.5/onecall', {
                params: {
                    lat: state.rootState.location.coords.latitude,
                    lon: state.rootState.location.coords.longitude,
                    exclude: 'minutely',
                    appid: '7bec99c40964201451827401996c14fc',
                    units: state.rootState.units
                }
            }).then((res) => {
                state.commit('weather/ADD_LOCAL_WEATHER', res.data, {root: true});
            }).catch((err) => {
                if (!err.response) {
                    state.commit('weather/ADD_LOCAL_WEATHER', {cod: 0}, {root: true})
                }
            })
        } else {
            state.commit('weather/ADD_LOCAL_WEATHER', {cod: 404}, {root: true})
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