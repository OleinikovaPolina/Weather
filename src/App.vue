<template>
  <v-app>
    <Header @openSnackbar="openSnackbar"></Header>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <div>
      <v-snackbar
          right
          :color="snackbarData.color"
          v-model="snackbar"
          v-if="snackbarData.text"
      >
        {{ snackbarData.text }}
        <template v-slot:action="{ attrs }">
          <v-btn
              text
              v-bind="attrs"
              @click="snackbar=false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import Header from "@/components/Header.vue"
import {mapGetters} from "vuex"
import {City, Weather} from "@/store/types";

@Component({
  components: {Header},
  computed: {
    ...mapGetters([
      'location',
    ]),
    ...mapGetters('weather', {weather: 'data'}),
    ...mapGetters('city', {city: 'data'})
  }
})
export default class App extends Vue {
  private snackbar: Boolean = true
  private snackbarData: Object = {}
  private location!: Location
  private city!: Array<City>
  private weather!: Array<Weather>


  public openSnackbar(data: Object = {color: 'primary', text: ''}) {
    this.snackbarData = data
    this.snackbar = true
  }

  async mounted() {
    this.$store.commit('ADD_UNIT', localStorage.getItem('unit'))

    if (this.city.length !== this.weather.length) {
      for (let i = this.city.length - 1; i >= 0; i--) {
        if (this.city[i]) {
          this.$store.dispatch('weather/ADD_WEATHER', this.city[i].id)
          this.$store.commit('REMOVE_CITY', this.city[i].id)
        }
      }
    }

    if (Object.keys(this.location).length === 0) {
      await this.$store.dispatch('ADD_LOCATION')
    } else {
      await this.$store.dispatch('weather/ADD_LOCAL_WEATHER')
    }
  }
}
</script>