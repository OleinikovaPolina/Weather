<template>
  <div>
    <v-icon
        large
        color="primary"
    >
      mdi-wifi-off
    </v-icon>
    <v-list-item two-line class="px-0">
      <v-list-item-content>
        <v-list-item-title>
          No internet connection
        </v-list-item-title>
        <v-list-item-subtitle>
          Try again later
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-btn color="primary" @click="$emit('callback')">To retry</v-btn>
  </div>
</template>


<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component
export default class App extends Vue {
  @Prop() private callback!: () => void
}
</script>