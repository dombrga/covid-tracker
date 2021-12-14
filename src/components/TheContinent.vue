<template>
  <section class='my-10'>
    <h2 class='section-title text-center' color='#FEF2F2'>Continent</h2>
    <!-- <p class='text-center population'>Population: <span>{{continentData.population | numeral('0,0')}}</span></p> -->

    <div class='pa-2'>
      <v-simple-table class='my-5 pa-'>
        <thead class='grey darken-1'>
          <tr>
            <th>Continent</th>
            <th>Cases</th>
            <th>Deaths</th>
            <th>Recovered</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='(continent, idx) in allContinent' :key=idx>
            <td class='continent'>{{continent.continent}}</td>
            <v-tooltip bottom>
              <template v-slot:activator="{on, attrs}">
                <td
                v-on=on
                v-bind=attrs>{{continent.cases | numeral('0,0')}}</td>
              </template>
              <span>+ {{continent.todayCases | numeral('0,0')}} Today</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{on, attrs}">
                <td
                v-on=on
                v-bind=attrs>{{continent.deaths | numeral('0,0')}}</td>
              </template>
              <span>+ {{continent.todayDeaths | numeral('0,0')}} Today</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{on, attrs}">
                <td
                v-on=on
                v-bind=attrs>{{continent.recovered | numeral('0,0')}}</td>
              </template>
              <span>+ {{continent.todayRecovered | numeral('0,0')}} Today</span>
            </v-tooltip>
            <td>{{continent.population | numeral('0,0')}}</td>
            
          </tr>
        </tbody>
      </v-simple-table>
    </div>
    
    <!-- <div class='autocomplete'>
      <v-autocomplete
      ref='conti'
      clearable
      outlined
      :items=continentNames
      v-model=continent
      @change=setContinentData
      class='text-center' ></v-autocomplete>
    </div>

    <v-row>
      <v-col cols=12 sm=6 md=4>
        <v-card class='confirmed'>
          <v-card-title>Confirmed Cases</v-card-title>
          <p class='today p-case'>+ {{continentData.todayCases | numeral('0,0')}} <span>TODAY</span></p>
          <p class='total grey lighten-3'>{{continentData.cases | numeral('0,0')}} <span>TOTAL</span></p>
        </v-card>
      </v-col>

      <v-col cols=12 sm=6 md=4>
        <v-card min-width='' class='recovered'>
          <v-card-title>Recovered</v-card-title>
          <p class='today p-recovered'>+ {{continentData.todayRecovered | numeral('0,0')}} <span>TODAY</span></p>
          <p class='total grey lighten-3'>{{continentData.recovered | numeral('0,0')}} <span>TOTAL</span></p>
        </v-card>
      </v-col>
        
      <v-col cols=12 sm=12 md=4>
        <v-card min-width='' class='death'>
          <v-card-title>Deaths</v-card-title>
          <p class='today p-death'>+ {{continentData.todayDeaths | numeral('0,0')}} <span>TODAY</span></p>
          <p class='total grey lighten-3'>{{continentData.deaths | numeral('0,0')}} <span>TOTAL</span></p>
        </v-card>
      </v-col>
    </v-row> -->
  </section>
</template>

<script>
export default {
  name: 'TheCountry',
  data: () => ({
    continentData: {},
    continent: 'Asia',

    allContinent: [],
    continentNames: ["Africa", "Asia", "Australia-Oceania", "Europe", "North America", "South America"],
  }),
  mounted: async function() {
    await this.getContinentData()
    this.setContinentData('Asia')
  },
  methods: {
    onResize() { this.windowWidth = window.innerWidth },

    async getContinentData() {
      const continent = await fetch('https://disease.sh/v3/covid-19/continents').then(res => res.json())
      this.allContinent = continent
      // console.log('allContinent', this.allContinent)
    },

    setContinentData(continent) {
      this.continentData = this.allContinent.filter(item => item.continent === continent)[0]
    }

  },
}
</script>

<style scoped>
  tr:nth-child(even) {
    background-color: #F5F5F5;
  }

  .continent[data-v-a59d921a] {
    width: 200px;
    font-size: 18px;
    font-weight: 700;

    /* padding-right: 0 */
  }

  .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    color: #F5F5F5;
  }
</style>