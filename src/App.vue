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

@Component({
  components: {Header}
})
export default class App extends Vue {
  private snackbar: Boolean = true
  private snackbarData: Object = {}


  public openSnackbar(data: Object = {color: 'primary', text: ''}) {
    this.snackbarData = data
    this.snackbar = true
  }

  async mounted() {
    if (this.$store.state.city.data.length !== this.$store.state.weather.data.length) {
      for (var i = this.$store.state.city.data.length - 1; i >= 0; i--) {
        if (this.$store.state.city.data[i]) {
          this.$store.dispatch('weather/ADD_WEATHER', this.$store.state.city.data[i].id)
          this.$store.commit('REMOVE_CITY', this.$store.state.city.data[i].id)
        }
      }
    }
    if (Object.keys(this.$store.state.location).length === 0) {
      await this.$store.dispatch('ADD_LOCATION')
    } else {
      await this.$store.dispatch('weather/ADD_LOCAL_WEATHER')
    }
  }
}
</script>