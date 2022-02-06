<template>
  <v-card
      class="mx-auto ma-2 pa-2"
      dark
      color="grey"
      :style="{
      backgroundPosition:'center',
      backgroundSize:'cover',
      backgroundImage: `linear-gradient( rgba(0,0,0,0.65), rgba(0,0,0,0.65)),
      url(${require('@/assets/img/'+weather.weather[0].main.toLowerCase()+'.jpg')})`
      }"
  >
    <v-btn
        absolute
        top
        right
        color="white"
        icon
        @click="delete_weather"
        style="z-index: 1"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <div class="pt-2">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5" style="white-space: initial">
            {{
              `${fullDaysWeek[time.getDay()]}`
            }}
          </v-list-item-title>
          <v-list-item-subtitle style="white-space: initial">
            {{ `${weather.weather[0].description}` }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </div>
    <div class="pa-2">
      <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
          <v-chip
              v-bind="attrs"
              v-on="on"
              class="ma-2"
              color="white"
              outlined
          >
            <v-icon left>
              mdi-weather-sunny
            </v-icon>
            {{ $moment(weather.sunrise * 1000).format("HH:mm") }} /
            {{ $moment(weather.sunset * 1000).format("HH:mm") }}
          </v-chip>
        </template>
        <span>Sunrise / Sunset</span>
      </v-tooltip>
      <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
          <v-chip
              v-bind="attrs"
              v-on="on"
              class="ma-2"
              color="white"
              outlined
          >
            <v-icon left>
              mdi-weather-night
            </v-icon>
            {{ $moment(weather.moonrise * 1000).format("HH:mm") }} /
            {{ $moment(weather.moonset * 1000).format("HH:mm") }}
          </v-chip>
        </template>
        <span>Moonrise / Moonset</span>
      </v-tooltip>
    </div>
    <v-card-text>
      <div class="d-flex align-center">
        <div class=" white--text" :class="$vuetify.breakpoint.xs?'text-h5':'text-h4'">
          {{ parseInt(weather.temp.day) + units.deg }}
        </div>
        <v-avatar class="pl-4" :width="$vuetify.breakpoint.xs?75:100">
          <v-img
              :style="{mixBlendMode:'screen',filter: 'brightness(200%)'}"
              :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
              :alt="weather.weather[0].description+'image'"
          ></v-img>
        </v-avatar>
        <v-col class="pa-0">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h6" style="white-space: initial">
                Feels like {{ parseInt(weather.feels_like.day) + units.deg }}
              </v-list-item-title>
              <v-list-item-subtitle style="white-space: initial">
                {{
                  `Max ${parseInt(weather.temp.max) + units.deg},
                   Min ${parseInt(weather.temp.min) + units.deg}`
                }}
              </v-list-item-subtitle>
              <v-list-item-subtitle style="white-space: initial" class="d-flex">
                Atmospheric temperature
                {{ parseInt(weather.dew_point) + units.deg }}
                <v-tooltip right color="primary" max-width="400">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon style="height: 1em;    padding-left: 0.3em" small color="grey lighten-1" v-bind="attrs"
                            v-on="on">mdi-help-circle-outline
                    </v-icon>
                  </template>
                  <span> Atmospheric temperature below which water droplets begin to condense and dew can form.</span>
                </v-tooltip>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </div>
    </v-card-text>

    <div class="pa-2">
      <div>
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-chip
                v-bind="attrs"
                v-on="on"
                class="ma-2"
                color="white"
                outlined
            >
              <v-icon left>
                mdi-car-brake-low-pressure
              </v-icon>
              {{ weather.pressure }} hPa
            </v-chip>
          </template>
          <span>Atmospheric pressure on the sea level</span>
        </v-tooltip>
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-chip
                v-bind="attrs"
                v-on="on"
                class="ma-2"
                color="white"
                outlined
            >
              <v-icon left>
                mdi-weather-windy
              </v-icon>
              {{ weather.wind_speed + units.speed }},
              {{ weather.wind_deg + units.deg }}
              {{ weather.wind_gust ? ', ' + weather.wind_gust + units.speed : '' }}
            </v-chip>
          </template>
          <span>Wind</span>
        </v-tooltip>
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-chip
                v-bind="attrs"
                v-on="on"
                class="ma-2"
                color="white"
                outlined
            >
              <v-icon left>
                mdi-cloud
              </v-icon>
              {{ weather.clouds }}%
            </v-chip>
          </template>
          <span>Cloudiness</span>
        </v-tooltip>
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-chip
                v-bind="attrs"
                v-on="on"
                class="ma-2"
                color="white"
                outlined
            >
              <v-icon left>
                mdi-water-percent
              </v-icon>
              {{ weather.humidity }}%
            </v-chip>
          </template>
          <span>Humidity</span>
        </v-tooltip>
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-chip
                v-bind="attrs"
                v-on="on"
                v-if="weather.snow"
                class="ma-2"
                color="white"
                outlined
            >
              <v-icon left>
                mdi-weather-snowy-heavy
              </v-icon>
              {{ weather.snow }}%
            </v-chip>
          </template>
          <span>Snow volume for last hour</span>
        </v-tooltip>
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-chip
                v-bind="attrs"
                v-on="on"
                v-if="weather.rain"
                class="ma-2"
                color="white"
                outlined
            >
              <v-icon left>
                mdi-weather-pouring
              </v-icon>
              {{ weather.rain }}%
            </v-chip>
          </template>
          <span>Rain volume for last hour</span>
        </v-tooltip>
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-chip
                v-bind="attrs"
                v-on="on"
                class="ma-2"
                color="white"
                outlined
            >
              <v-icon left>
                mdi-sun-wireless
              </v-icon>
              {{ weather.uvi }}
            </v-chip>
          </template>
          <span>UV index</span>
        </v-tooltip>
      </div>
    </div>
  </v-card>
</template>
<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import {WeatherDaily} from "@/store/types";
import {mapGetters} from "vuex";

@Component({
  computed: {
    ...mapGetters([
      'fullDaysWeek',
      'units'
    ])
  }
})
export default class CardDailyWeather extends Vue {
  @Prop() readonly weather!: WeatherDaily
  @Prop() readonly delete_weather!: () => void
  private time: Date = new Date(this.weather.dt * 1000)

  @Watch('weather', {deep: true})
  async Weather() {
    this.time = new Date(this.weather.dt * 1000)
  }
}
</script>