<template>
  <v-app >
    <v-app-bar
      app
      color='#E4C2C1'
    >
      <div class="d-flex justify-space-between mx-auto">
        <h1>Covid Tracker</h1>
      </div>
    </v-app-bar>
    <v-main>
      <v-container style=''>
        <TheClock />
        <TheWorld />
        <TheContinent />
        <TheCountry />
      </v-container>
      <TheFooter />
    </v-main>
  </v-app>
</template>

<script>
import TheWorld from '@/components/TheWorld.vue'
import TheContinent from '@/components/TheContinent.vue'
import TheCountry from '@/components/TheCountry.vue'
import TheClock from '@/components/TheClock.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  name: 'App',
  components: {
    TheWorld,
    TheContinent,
    TheCountry,
    TheClock,
    TheFooter
  },
  
};
</script>

<style>
* {
  box-sizing: border-box;
}
  /* typography */
  h1 {
    font-size: 48px;
  }

  h2 {
    font-size: 36px;
  }
  
  p.today {
    font-size: 1.7em;
    font-weight: 700;
  }

  p.total {
    color: #616161;
    font-size: 1.5em;
    font-weight: 700;
  }

  p.total span, p.today span {
    /* color: #757575; */
    font-size: 18px;
    font-weight: 500;
    letter-spacing: -.5px;
  }

  .p-case, .p-death { color: #E53935}
  .p-recovered, p.recovered span { color: #7CB342}

  p.population {
    font-size: 20px;
    margin-bottom: 10px !important;
  }

  p.population span {
    font-weight: 700;
  }

  .v-card__title {
    font-size: 24px;
    font-weight: 600;
  }

  /* others */
  h2 {
    margin: 0 !important
  }

  p {
    margin: 0 !important;
    padding: 0 16px 0
  }

  .v-main {
    background-color: #FEF2F2;
  }
  
  .section-title {
    margin-bottom: 10px;
  }

  .autocomplete {
    width: 250px;
    margin: 0 auto
  }

  div > .v-card.v-sheet {
    height: 220px;
    padding: 15px;
    width: 400px;
    margin: 0 auto 0;
  }

  .confirmed.v-card.v-sheet { border-left: 7px solid #D4E157; }
  .recovered.v-card.v-sheet { border-left: 7px solid #A5D6A7; }
  .death.v-card.v-sheet { border-left: 7px solid #E53935; }

  @media screen and (max-width: 600px) {
    .v-card.v-sheet {
      width: 90%;
    }
  }
</style>>
