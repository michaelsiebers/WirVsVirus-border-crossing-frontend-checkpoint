<template>
  <div>
    <div class="mt-5">
      <router-link class="btn btn-primary" :to="{ name: 'home'}">Return Home</router-link>
    </div>
    <p class="error">{{ error }}</p>

    <p>Scan the QR-Code now</p>
    <div style="width: 100%; height: 100% ">
    <qrcode-stream @decode="onDecode" @init="onInit" />
    </div>
  </div>
</template>

<script>

import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  name: 'Scanner',
  components: { QrcodeStream },
  data: function() {
    return {
      result: '',
      error: ''
    }
  },
  mounted: function() {

  },
  methods: {
    onDecode (result) {
      this.result = result
    },

  async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    }
  },
  watch: {
    result: function () {
      if(this.result != "") {
        this.$router.push({name: 'driver', params: {tourId: this.result}}) 
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
