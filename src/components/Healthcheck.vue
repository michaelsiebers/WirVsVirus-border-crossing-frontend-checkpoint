<template>
  <div>
    <div>
      <div class="card border-0">
        <div class="card-header text-white bg-primary">
          Medical history
        </div>
        <div class="card-body p-0 px-3">
            <table class="table text-left m-0" v-if="healthcheckObj">
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
                <tr v-for="health in healthcheckObj" :key="health.pkey" >
                  <td>
                    {{health.due | moment("DD.MM.YYYY") }}
                  </td>
                  <td>
                    {{health.status}}
                  </td>
                </tr>
            </table>
            <span v-if="!healthcheckObj">No data available!</span>
        </div>
      </div>
      <div class="mt-5">
        <button class="btn btn-success" @click="setCheckpoint">Finish</button>
      </div>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)
Vue.use(require('vue-moment'));

export default {
  name: 'Healthcheck',
  props: {
    driverId: String
  },
  data: function() {
    return {
      errors: null,
      healthcheckObj: null
    }
  },
  created: function() {
    this.axios.post('http://localhost:8000/api/healthcheck/show', {driverId: this.driverId})
    .then((response) => {
      this.healthcheckObj = response.data.healthchecks
    })
    .catch((e) => {
      this.errors = e;
    })
  },
  methods: {
    setCheckpoint() {
      this.axios.post('http://localhost:8000/api/healthcheck/add', {status: "OK", pkey_driver: this.driverId, pkey_guard: "a0a10ffa-bec9-4ed8-871e-084218f300f3"})
      .then(() => {
        this.$router.push({name: 'home'}) 
      })
      .catch((e) => {
        this.errors = e;
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
