<template>
  <div>
    <template v-if="fullWeather.cod === 404">
      <NotFound></NotFound>
    </template>
    <template v-else-if="fullWeather.cod === 0">
      <v-card class="pa-4">
        <NetworkError @callback="()=>{$store.dispatch('weather/ADD_FULL_WEATHER')}"></NetworkError>
      </v-card>
    </template>
    <template v-else-if="load && Object.keys(fullWeather).length !== 0">
      <CardFullWeather :weather="fullWeather"
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
import {mapGetters} from "vuex";
import {FullWeather} from "@/store/types";

@Component({
  components: {NetworkError, NotFound, CardFullWeatherSkeletonLoader, CardFullWeather},
  computed: {
    ...mapGetters([
      'activeCity',
    ]),
    ...mapGetters('weather', {fullWeather: 'fullWeather'}),
    ...mapGetters('city', {city: 'data'})
  }
})
export default class Weather extends Vue {
  private load: Boolean = false
  private fullWeather!: FullWeather

  async mounted() {
    await this.$store.dispatch('ADD_ACTIVE_CITY', this.$route.params.id)
    await this.$store.dispatch('weather/ADD_FULL_WEATHER')
    this.load = true
  }
}
</script>