<template>
  <div>
    <div id="logo" class="mt-5">
      <img alt="Logo" src="../assets/fastborderx_logo_mit_text.svg" width="250">
    </div>
    <div class="mt-5">
      <router-link class="btn btn-primary" style="background: #008cb5;" :to="{ name: 'scanner'}">Scan QR-Code</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: function() {
    return {

    }
  },
  mounted: function() {

  },
  methods: {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
