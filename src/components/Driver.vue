<template>
  <div>
    <div v-if="tourObj">
      <div class="card border-0" v-if="tourObj.driver2tour.pkey_driver">
        <div class="card-header text-white bg-primary">
          Personal information
        </div>
        <div class="card-body p-0 px-3">
            <table class="table table-borderless text-left m-0">
                <tr class="">
                  <td style="width: 40%" class="p-0 pr-2 ">
                    Name:
                  </td>
                  <td class="p-0">
                    {{driverObj.firstname}} {{driverObj.lastname}}
                  </td>
                </tr>
                <tr class="">
                  <td style="width: 40%" class="p-0 pr-2 ">
                    Address:
                  </td>
                  <td class="p-0">
                    {{driverObj.street}}, {{driverObj.place}}
                  </td>
                </tr>
                <tr class="">
                  <td style="width: 40%" class="p-0 pr-2 ">
                    E-Mail:
                  </td>
                  <td class="p-0">
                    {{driverObj.email}}
                  </td>
                </tr>
                <tr class="">
                  <td style="width: 40%" class="p-0 pr-2 ">
                    Phone:
                  </td>
                  <td class="p-0">
                    {{driverObj.mobile}}
                  </td>
                </tr>
                <tr class="">
                  <td style="width: 40%" class="p-0 pr-2 ">
                    PP ID:
                  </td>
                  <td class="p-0">
                    {{driverObj.passportid}}
                  </td>
                </tr>
            </table>
        </div>
      </div>
      <div class="card border-0" v-if="companyObj">
        <div class="card-header text-white bg-primary">
          Company + Truck information
        </div>
        <div class="card-body p-0 px-3">
            <table class="table table-borderless text-left m-0">
                <tr>
                  <td style="width: 40%" class="p-0 pr-2 ">
                    Name:
                  </td>
                  <td class="p-0">
                    {{companyObj.company.companyname}}
                  </td>
                </tr>
                <tr>
                  <td style="width: 40%" class="p-0 pr-2 ">
                    Address:
                  </td>
                  <td class="p-0">
                    {{companyObj.company.street}}, {{companyObj.company.place}}
                  </td>
                </tr>
                <tr>
                  <td style="width: 40%" class="p-0 pr-2 ">
                    Plate:
                  </td>
                  <td class="p-0">
                    {{carregistration}}
                  </td>
                </tr>
            </table>
        </div>
      </div>
      <div class="card border-0">
        <div class="card-header text-white bg-primary">
          Trip information
        </div>
        <div class="card-body p-0 px-3">
            <table class="table table-borderless text-left m-0">
                <tr v-for="(border, index) in tourObj.tour2border" :key="border.pkey" >
                  <td style="width: 40%" class="p-0 pr-2 ">
                    {{getTourType(tourObj.tour2border, index)}}
                  </td>
                  <td class="p-0">
                    {{border.pkey_border.ridefrom.countryname}} -> {{border.pkey_border.rideto.countryname}}
                  </td>
                </tr>
            </table>
        </div>
      </div>
      <div class="card border-0">
        <div class="card-header text-white bg-primary">
          Trip history
        </div>
        <div class="card-body p-0 px-3">
            <table class="table table-borderless text-left m-0">
                <tr v-for="tour in driverObj.driver2tour" :key="tour.pkey" >
                  <td class="p-0 pr-2 ">
                    {{tour.pkey_tour.start_date | moment("DD.MM.YYYY") }} - {{tour.pkey_tour.end_date | moment("DD.MM.YYYY") }}
                    <br >
                    <span v-for="(border, index) in tour.pkey_tour.tour2border" :key="border.pkey">
                      {{getBorder(border, tour.pkey_tour.tour2border, index)}} 
                    </span>
                  </td>
                </tr>
            </table>
        </div>
      </div>
   <!-- <div class="card border-0" v-for="(fields, index) in tripHistory" :key="index">
      <div class="card-header text-white bg-primary">
        {{fields.fieldGroupName}}
      </div>
      <div class="card-body p-0 px-3">
          <table class="table table-borderless text-left m-0">
              <tr class="" v-for="(field) in fields.gFields" :key="field.id">
                <td style="width: 40%" class="p-0 pr-2 ">
                  {{field.name}}
                </td>
              </tr>
          </table>
      </div>
    </div>-->
      <div class="mt-5">
        <router-link class="btn btn-success" :to="{ name: 'healthcheck', params: {driverId: this.driverObj.pkey}}">Confirm</router-link>
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
  name: 'Driver',
  props: {
    tourId: String
  },
  data: function() {
    return {
      errors: null,
      tourObj: null,
      driverObj: null,
      companyObj: null,
      carregistration: null
    }
  },
  mounted: function() {

  },
  created: function() {
    this.axios.post('https://api.fastbordercrossing.org/api/tour/show', {tourId: this.tourId})
    .then((response) => {
      this.tourObj = response.data.tour
      if(this.tourObj) {
        this.driverObj = this.tourObj.driver2tour.pkey_driver
        this.companyObj = this.tourObj.driver2tour.pkey_driver.driver2company[0]
        this.carregistration = this.tourObj.driver2tour.pkey_carregistration.carregistration
      }
    })
    .catch((e) => {
      this.errors = e;
    })
  },
  methods: {
    getTourType (tours, index) {
      let tourType = '';
      if(tours.length == 1) {
        return "Origin/Dest"
      }
      switch(index) {
        case 0:
          tourType = 'Origin';
          break;
        case tours.length - 1:
          tourType = 'Dest'
          break;
        default:
          tourType = 'Transit'
          break;
      }
      return tourType;
    },
    getBorder(border, borderArray, index) {
      let borderName = "";
      if ( borderArray.length == 1 || borderArray.length - 1 == index) {
        borderName = border.pkey_border.ridefrom.countryname + " -> " + border.pkey_border.rideto.countryname;
      } else {
        borderName = border.pkey_border.ridefrom.countryname + " -> ";
      }
      return borderName;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
