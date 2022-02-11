import Vue from 'vue'
import Vuex from 'vuex'
import {GetterTree, MutationTree, ActionTree} from "vuex"
import WeatherModule from "@/store/weather"
import CityModule from "@/store/city"
import {City, typeUnits} from './types'

Vue.use(Vuex)

class State {
    citiesAll: Array<City> = require("@/assets/city.list.min.json")
    cities: Array<City> = require("@/assets/city.list.min.json")
    unit: typeUnits = 'metric'
    unitsData: { [key in typeUnits]: Object } = {
        standard: {deg: 'K', speed: 'm/s'},
        metric: {deg: '°C', speed: 'm/s'},
        imperial: {deg: '°F', speed: 'm/h'}
    }
    activeCity: City = <City>{}
    gettingLocation: Boolean = !!localStorage.getItem('location')
    location: Object = JSON.parse(localStorage.getItem('location') || '{}')
    daysWeek: Array<string> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    fullDaysWeek: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
}

const getters = <GetterTree<State, any>>{
    filterCitiesAll(state) {
        return state.citiesAll.filter(x => x.country === 'RU')
    },
    filterCities(state) {
        return state.cities.filter(x => x.country === 'RU')
    },
    units(state) {
        return state.unitsData[state.unit]
    }
}

const mutations = <MutationTree<State>>{
    ADD_GETTING_LOCATION(state, data) {
        state.gettingLocation = data
    },
    ADD_LOCATION(state, data) {
        state.location = data
        if (data.name) {
            localStorage.setItem('location', JSON.stringify(data))
        } else {
            localStorage.removeItem('location')
        }
    },
    ADD_UNIT(state, data) {
        if (!['standard', 'metric', 'imperial'].includes(data)) {
            data = 'metric'
        }
        state.unit = data
        localStorage.setItem('unit', data)
    },
    REMOVE_CITY(state, id) {
        state.cities = state.cities.filter(city => city?.id != id)
    },
    ADD_CITY(state, data) {
        state.cities.unshift(data)
    },
    RETURN_ALL_CITY(state) {
        state.cities = require("@/assets/city.list.min.json")
    },
    ADD_ACTIVE_CITY(state, data) {
        state.activeCity = data
    }
};

const actions = <ActionTree<State, any>>{
    ADD_LOCATION({commit, dispatch}) {
        if (!("geolocation" in navigator)) {
            return
        }
        navigator.geolocation.getCurrentPosition(res => {
            commit('ADD_LOCATION', res)
            dispatch('weather/ADD_LOCAL_WEATHER')
            commit('ADD_GETTING_LOCATION', true)
        }, () => {
            commit('ADD_LOCATION', {})
            commit('ADD_GETTING_LOCATION', false)
        })
    },
    ADD_ACTIVE_CITY({commit, rootState, state}, id) {
        const data = rootState.city.data.find((city: any) => city?.id == id)
        if (data === undefined) {
            commit('ADD_ACTIVE_CITY', state.cities.filter(x => x?.id == id)[0], {root: true})
        } else {
            commit('ADD_ACTIVE_CITY', data, {root: true})
        }
    }
}

export default new Vuex.Store({
    state: new State(),
    mutations: mutations,
    getters: getters,
    actions: actions,
    modules: {
        weather: WeatherModule,
        city: CityModule,
    }
})

