<template>
  <section class='my-10'>
    <h2 class='section-title text-center world' color='#FEF2F2'>World</h2>
    <p class='text-center population'>Populaton: <span>{{world.population | numeral('0,0')}}</span></p>
    <v-row>
      <v-col cols=12 sm=6 md=4>
        <v-card class='confirmed'>
          <v-card-title>Confirmed Cases</v-card-title>
          <p class='today p-case'>+ {{world.todayCases | numeral('0,0')}} <span>TODAY</span></p>
          <p class='total grey lighten-3'>{{world.cases | numeral('0,0')}} <span>TOTAL</span></p>
        </v-card>
      </v-col>

      <v-col cols=12 sm=6 md=4>
        <v-card class='recovered'>
          <v-card-title>Recovered</v-card-title>
          <p class='today p-recovered'>+ {{world.todayRecovered | numeral('0,0')}} <span>TODAY</span></p>
          <p class='total grey lighten-3'>{{world.recovered | numeral('0,0')}} <span>TOTAL</span></p>
        </v-card>
      </v-col>
        
      <v-col cols=12 sm=12 md=4>
        <v-card class='death'>
          <v-card-title>Deaths</v-card-title>
          <p class='today p-death'>+ {{world.todayDeaths | numeral('0,0')}} <span>TODAY</span></p>
          <p class='total grey lighten-3'>{{world.deaths | numeral('0,0')}} <span>TOTAL</span></p>
        </v-card>
      </v-col>
    </v-row>

    <EverydayLine :height='400' :chart-data=lineData css-classes='chart' />
  </section>
</template>

<script>
import EverydayLine from './chart/EverydayLine.js'

export default {
  name: 'TheWorld',
  components: {
    EverydayLine
  },
  data: () => ({
    world: {},

    // line chart
    lineData: {}
  }),
  mounted: function() {
    this.getCountryData();
  },
  methods: {
    async getCountryData() {
      const data = await fetch('https://disease.sh/v3/covid-19/all').then(res => res.json())
      this.world = data

      const world = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all').then(res => res.json())
      this.datalineChart(world)
    },

    datalineChart(world) {
      // ------ compute increase per day for the last 30 days -------

      // sort keys, which are dates, in ascending order
      let labels = Object.keys(world['cases']).sort((a, b) => {
        if(new Date(a) < new Date(b)) {
          return -1
        }
      }).slice(-31)

      const cases = []
      const deaths = []
      const recovered = []
      for(let i=0; i<labels.length; i++) {
        let cs = Math.abs(world['cases'][labels[i]] - world['cases'][labels[i+1]])
        const dt = Math.abs(world['deaths'][labels[i]] - world['deaths'][labels[i+1]])
        const rc = Math.abs(world['recovered'][labels[i]] - world['recovered'][labels[i+1]])

        // if(labels[i] === '12/9/20') {
        //   cs = 671998 // hard-coded because api data for this date is wrong. New data taken in https://ourworldindata.org/coronavirus-data
        // }

        cases.push(cs)
        deaths.push(dt)
        recovered.push(rc)
      }

      const datasets = [
        {
          label: 'Covid Cases',
          data: cases,
          borderColor: 'blue',
          fill: false,
          showLine: true,
          // pointRadius: 0,
          borderWidth: .5,
        },
        {
          label: 'Covid Deaths',
          data: deaths,
          borderColor: 'red',
          fill: false,
          showLine: true,
          // pointRadius: 0,
          borderWidth: .5,
          hidden: true
        },
        {
          label: 'Covid Recovered',
          data: recovered,
          borderColor: 'green',
          fill: false,
          showLine: true,
          // pointRadius: 0,
          borderWidth: .5,
          hidden: true
        },
      ]
      
      labels = labels.slice(1)
      this.lineData = {labels: labels, datasets: datasets}
    }
  },
}
</script>

<style scoped>
  .chart {
    padding: 50px
  }

  .stig { margin-bottom: 20px;}
</style>