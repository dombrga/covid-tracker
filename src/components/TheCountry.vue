<template>
  <section class='my-10'>
    <h2 class='section-title text-center' color='#FEF2F2'>By Country</h2>
    
    <div class='autocomplete'>
      <v-autocomplete
      clearable
      outlined
      v-model=country
      :items=countries
      @change=setCountryData
      class='text-center' ></v-autocomplete>
    </div>

    <p class='text-center population'>Population: <span>{{countryData.population | numeral('0,0')}}</span></p>

    <div class='mb-10'>
      <v-row>
        <v-col cols=12 sm=6 md=4>
          <v-card class='confirmed'>
            <v-progress-circular v-if=isLoading :indeterminate=isLoading></v-progress-circular>
            <v-card-title>Confirmed Cases</v-card-title>
            <template v-if=!isLoading>
              <p class='today p-case' >+ {{countryData.todayCases}} <span>TODAY</span></p>
              <p class='total grey lighten-3'>{{countryData.cases | numeral('0,0')}} <span>TOTAL</span></p>
            </template>
          </v-card>
        </v-col>

        <v-col cols=12 sm=6 md=4>
          <v-card min-width='' class='recovered'>
            <v-progress-circular v-if=isLoading :indeterminate=isLoading></v-progress-circular>
            <v-card-title>Recovered</v-card-title>
            <template v-if=!isLoading>
              <p class='today p-recovered'>+ {{countryData.todayRecovered}} <span>TODAY</span></p>
              <p class='total grey lighten-3'>{{countryData.recovered | numeral('0,0')}} <span>TOTAL</span></p>
            </template>
          </v-card>
        </v-col>
          
        <v-col cols=12 sm=12 md=4>
          <v-card min-width='' class='death' >
            <v-progress-circular v-if=isLoading :indeterminate=isLoading></v-progress-circular>
            <v-card-title>Deaths</v-card-title>
            <template v-if=!isLoading>
              <p class='today p-death'>+ {{countryData.todayDeaths}} <span>TODAY</span></p>
              <p class='total grey lighten-3'>{{countryData.deaths | numeral('0,0')}} <span>TOTAL</span></p>
            </template>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div id='map' class='mx-auto'>
    </div>
  </section>
</template>

<script>
import { countryList, toNumFormat } from '@/helpers/variables.js'

export default {
  name: 'TheCountry',
  components: {  },
  data: () => ({
    countries: countryList,
    // country data related
    isLoading: false,
    country: 'Russia',
    countryData: {},

    // map related
    geo: process.env.VUE_APP_GEO,
    L: global.L,
    map: null,
  }),
  mounted: async function() {
    this.initMap()
  },
  methods: {
    async getCountryData() {
      const countries = await fetch('https://disease.sh/v3/covid-19/countries').then(res => res.json())
      return countries
    },

    async setCountryData(country) {
      this.isLoading = true
      const data = await fetch('https://disease.sh/v3/covid-19/countries/' + country).then(res => res.json())
      this.countryData = data
      // console.log('geo location', this.countryData)

      this.map.setView([data.countryInfo.lat, data.countryInfo.long], 5)
      this.isLoading = false
    },

    async initMap() {
      // initialize the map
      this.map = this.L.map('map')

      // set tile layer
      this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      // put circle markers and popup
      for(const c of await this.getCountryData()) {
        const circle = this.L.circle([c.countryInfo.lat, c.countryInfo.long], {radius: c.cases/40, color: 'red'}).addTo(this.map)
        const content = `<h3 class='mb-1'>${c.country}</h3>
        <p class='ma-0 pa-0'>Cases: ${toNumFormat(c.cases)}</p>
        <p class='ma-0 pa-0'>Recovered: ${toNumFormat(c.recovered)}</p>
        <p class='ma-0 pa-0'>Deaths: ${toNumFormat(c.deaths)}</p>
        `
        circle.bindPopup(content)
      }

      // initial data and map state
      await this.setCountryData('Russia')
      this.map.setView([20, 0], 2)
    },

  },
}
</script>

<style scoped>
  #map {
    width: 90%;
    height: 500px;
    z-index: 0;
  }
  
  .v-progress-circular {
    position: absolute;
    top: 45%;
    left: 46%
  }
  
  
</style>