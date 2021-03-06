<template>
  <v-row class="mb-2">
    <v-col v-if="gettingLocation">
      <template v-if="localWeather.cod === 404">
        <NotFound></NotFound>
      </template>
      <template v-else-if="localWeather.cod === 0">
        <v-card class="pa-4">
          <NetworkError
              @callback="()=>{$store.dispatch('weather/ADD_LOCAL_WEATHER')}">
          </NetworkError>
        </v-card>
      </template>
      <template v-else-if="Object.keys(localWeather).length !== 0">
        <CardFullWeather :weather="localWeather"
                         :city="{name:location.name}"
                         :path="'ADD_LOCAL_WEATHER'"></CardFullWeather>
      </template>
      <template v-else>
        <CardFullWeatherSkeletonLoader></CardFullWeatherSkeletonLoader>
      </template>
    </v-col>
    <v-col cols="12">
      <div class="text-h6">Favorites</div>
      <div class="d-flex align-stretch flex-wrap">
        <v-responsive max-width="260">
          <v-autocomplete
              v-model="cityId"
              :items="filterCities"
              item-text="name"
              item-value="id"
              flat
              hide-no-data
              hide-details
              label="Search"
              solo-inverted
          ></v-autocomplete>
        </v-responsive>
        <div>
          <v-btn :disabled="!cityId" @click="nameChanged" height="100%" color="primary">Add</v-btn>
        </div>
      </div>
    </v-col>
    <v-col
        v-for="weather in weathers"
        :key="weather.id"
        cols="12"
        sm="6"
    >
      <template v-if="weather.cod === 404">
        <v-card class="fill-height pa-4">
          <NotFound></NotFound>
        </v-card>
      </template>
      <template v-else-if="weather.cod === 0">
        <v-card class="fill-height pa-4">
          <NetworkError
              @callback="()=>{$store.dispatch('weather/ADD_WEATHER', weather.id)}">
          </NetworkError>
        </v-card>
      </template>
      <CardWeather :weather="weather" v-else-if="weather.cod===200"></CardWeather>
      <CardWeatherSkeletonLoader v-else></CardWeatherSkeletonLoader>
    </v-col>
    <v-col style="max-width: 300px" v-if="weathers.length===0" class="text-center mx-auto">
      <v-icon x-large color="primary">
        mdi-weather-cloudy
      </v-icon>
      <div>The cities you select will be displayed here</div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import CardWeather from "@/components/CardWeather.vue"
import CardFullWeather from "@/components/CardFullWeather.vue"
import CardFullWeatherSkeletonLoader from "@/components/CardFullWeatherSkeletonLoader.vue"
import CardWeatherSkeletonLoader from "@/components/CardWeatherSkeletonLoader.vue"
import NotFound from "@/views/NotFound.vue";
import NetworkError from "@/components/NetworkError.vue";
import {mapGetters, mapState} from 'vuex';
import {City, FullWeather, Weather} from "@/store/types";

@Component({
  components: {
    NetworkError,
    NotFound, CardWeatherSkeletonLoader, CardWeather, CardFullWeather, CardFullWeatherSkeletonLoader
  },
  computed: {
    ...mapState([
      'gettingLocation',
      'location']),
    ...mapGetters([
      'filterCities'
    ]),
    ...mapState('weather', {weathers: 'data', localWeather: 'localWeather'})
  }
})
export default class Home extends Vue {
  private cityId: Number = 0
  private filterCities!: Array<City>
  private localWeather!: FullWeather
  private weathers!: Array<Weather>

  public async nameChanged() {
    await this.$store.dispatch('weather/ADD_WEATHER', this.cityId)
    await this.$store.dispatch('city/ADD_CITY', this.filterCities.find((city: any) => city?.id == this.cityId))
    this.cityId = 0
  }
}
</script>
