<template>
  <footer class='brown darken-1'>
    <span>Developed by: do b</span>
    <span>Data from <a href="https://disease.sh/" target='_blank'>disease.sh</a></span>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style scoped>
a, a:link, a:visited {
    color:#FF5252;
  }

footer {
  color: #E0E0E0;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


</style>