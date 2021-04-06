<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Search
          </v-list-item-title>
          <v-list-item-subtitle>
            Fullname
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-autocomplete auto-select-first filled solo v-on:keyup.enter="search()" :items="nameList" v-model="searchName" label="Name" ></v-autocomplete>
      </v-list-item>
      <v-list-item>
        <v-btn color="primary" elevation="2" @click="search()">Search</v-btn>
      </v-list-item>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Dashboard</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <div id="name_label" style="margin: 30px">
        <v-toolbar-title style="font-size: 40px; font-family:verdana">{{name}}</v-toolbar-title>
      </div>
      <v-row>
        <v-col cols="12" lg="9" md="12">
          <line-chart :height="250" :chart-data="datacollection" :key="chartKey" style="height: 100%;"></line-chart>
        </v-col>
        <v-col cols="12" lg="3" md="12">
          <div id="data_table">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left" style="background-color: #6495ED; color: white">
                      Date
                    </th>
                    <th class="text-left" style="background-color: #6495ED; color: white">
                      Temperature
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in allTemp" :key="item.id">
                    <td>{{ item.date }}</td>
                    <td>{{ item.temp }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import LineChart from '../plugins/LineChart'
import DatabaseServices from '../services/DatabaseServices'

export default {
  components: {
    LineChart
  },
  data () {
    return {
      drawer: null,
        chartKey: 0,
        name: '',
        searchName: '',
        nameList: [],
        movingAvg: false,
        datacollection: {
          labels: [],
          datasets: [{
            label: 'Average Temperature',
            borderColor:'#6495ED',
            fill: false,
            lineTension: 0.1,
            data: []
          },
          {
            label: 'Moving Average',
            borderColor:'#ff3333',
            fill: false,
            data: []
          }]
        },
        allTemp: []
    }
  },
  methods: {
    avgTemp: function(tempArray) {
      let sum = 0
      tempArray.forEach(element => {
        sum += element
      });
      return (sum/tempArray.length).toFixed(1)
    },
    forceRerender() {
      this.chartKey += 1;
    },
    search: function () {
      this.allTemp = []
      this.datacollection.labels = []
      this.datacollection.datasets[0].data = []
      this.name = this.searchName
      this.searchName = ''
      this.getTemp()
    },
    getMovingAvg: function (tempArray) {
      let movingAvgArray = [null, null]
      for (var i = 2; i < tempArray.length; i++){
        let movingAvgValue = 0
        movingAvgValue = ((parseFloat(tempArray[i-2]) + parseFloat(tempArray[i-1]) + parseFloat(tempArray[i]))/3).toFixed(1)
        movingAvgArray.push(movingAvgValue)
      }
      return movingAvgArray
    },
    async getAllName() {
      const respone = await DatabaseServices.getAllName()
      this.nameList = respone.data.data
    },
    async getTemp() {
      let respone = await DatabaseServices.getAllDataByName({ name: this.name })
      this.datacollection.labels = respone.data.graphLabels
      this.datacollection.datasets[0].data = respone.data.graphValues
      this.allTemp = respone.data.allTemp
      this.movingAvg = respone.data.movingAvg

      if (this.movingAvg) {
        const graphMovingAvgValue = this.getMovingAvg(this.datacollection.datasets[0].data)
        this.datacollection.datasets[1].data = graphMovingAvgValue
      }

      // Refresh graph
      this.forceRerender()
    }
  },
  mounted(){
    this.getAllName()
  }
}
</script>
