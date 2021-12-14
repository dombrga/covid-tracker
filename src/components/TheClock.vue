<template>
  <section class='sec-clock'>
    <v-card class='ml-auto dark' color='0' flat>
      <v-card-title>{{time}}</v-card-title>
      <v-card-subtitle>GMT+8</v-card-subtitle>
    </v-card>
  </section>
</template>

<script>
export default {
  name: 'TheClock',
  data: () => ({
    time: null,
    interval: null
  }),
  beforeDestroy: function() {
    clearInterval(this.interval)
  },
  created: function() {
    this.interval = setInterval(() => {
      const dt = new Date()
      this.time = `${dt.getHours().toString().padStart(2, 0)}:${dt.getMinutes().toString().padStart(2, 0)}:${dt.getSeconds().toString().padStart(2, 0)}`;
    }, 1000)
  },
}
</script>

<style scoped>
  p {
    /* text-align: right; */
  }

  .sec-clock {
    position: relative;
  }

  .v-card.v-sheet {
    max-width: 200px;
    opacity: .6;
    z-index: 1;

    position: fixed;
    right: 40px
  }

  @media screen and (max-width: 960px) {
    .sec-clock { display: none }
    .v-card.v-sheet {
      max-width: 120px;
      right: 20px
    }

    .v-card__title, .v-card__subtitle {
      font-size: .8em;
    }
  }

</style>