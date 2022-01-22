<template>
  <div>
    <template v-if="$store.state.weather.full_weather.cod === 404">
      <NotFound></NotFound>
    </template>
    <template v-else-if="$store.state.weather.full_weather.cod === 0">
      <v-card class="pa-4">
        <NetworkError @callback="()=>{$store.dispatch('weather/ADD_FULL_WEATHER')}"></NetworkError>
      </v-card>
    </template>
    <template v-else-if="load && Object.keys($store.state.weather.full_weather).length !== 0">
      <CardFullWeather :weather="$store.state.weather.full_weather"
                       :city="$store.state.activeCity"
                       :path="'ADD_FULL_WEATHER'"></CardFullWeather>
    </template>
    <template v-else>
      <CardFullWeatherSkeletonLoader></CardFullWeatherSkeletonLoader>
    </template>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import CardFullWeather from "@/components/CardFullWeather.vue";
import CardFullWeatherSkeletonLoader from "@/components/CardFullWeatherSkeletonLoader.vue";
import NotFound from "@/views/NotFound.vue";
import NetworkError from "@/components/NetworkError.vue";

@Component({
  components: {NetworkError, NotFound, CardFullWeatherSkeletonLoader, CardFullWeather}
})
export default class Weather extends Vue {
  private load: Boolean = false

  async mounted() {
    await this.$store.dispatch('ADD_ACTIVE_CITY', this.$route.params.id)
    await this.$store.dispatch('weather/ADD_FULL_WEATHER')
    this.load = true
  }
}
</script>