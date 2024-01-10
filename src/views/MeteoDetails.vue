
<template>
  <div id="app">
    <div class="mainn" v-bind:class="{ warm: state_weather }">
    
      <div class="search-box">
        <input
          class="search-bar"
          type="text"
          placeholder="Search..."
          v-model="data.city"
          @keyup.enter="getApi()"
        />
        <div v-if="data.weather">
          <div class="header">
            <h1>{{ data.weather.name }}</h1>
            <h3>{{ new Date().toLocaleString() }}</h3>
          </div>
          <div class="temp">
            <h2>{{ Math.round(data.weather.main.temp) }}&deg;</h2>
          </div>
          <div class="state">
            <h3>{{ data.weather.weather[0].main }}</h3>
          </div>
        </div>
      </div>
<br><br>
<br><br>


      <div class="forecast-table-container">
        <table class="forecast-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Temperature (°C)</th>
              <th>Weather</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="forecast in data.forecast.list" :key="forecast.dt">
              <td>{{ new Date(forecast.dt * 1000).toLocaleDateString() }}</td>
               <td>{{ new Date(forecast.dt * 1000).toLocaleTimeString() }}</td> 
              <td>{{ Math.round(forecast.main.temp  - 273.15) }} °C</td>
              <td>{{ forecast.weather[0].main }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  
</template>

<script >
import axios from "axios";
import { ref, onMounted } from 'vue';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';
export default {
  name: "weather",
  data() {
    return {
      data: {
        city: "",
        weather: null,
        forecast: {},
        state_weather: false,
      },
    };
  },
  mounted: async function () {
    this.getApi();
  },
  methods: {
    async getApi() {
      if (this.data.city === "") {
        this.data.city = "Sfax";
      }
      const weatherResponse = await axios.get(
        `https://worker-delicate-rice-bb6a.aminaturki123.workers.dev/weather?q=${this.data.city}`
      );
      const forecastResponse = await axios.get(
        `https://worker-delicate-rice-bb6a.aminaturki123.workers.dev/forecast?q=${this.data.city}`
      );

      this.data.weather = weatherResponse.data;
      this.data.forecast = forecastResponse.data;
      this.data.city = "";

      if (this.data.weather.main.temp > 16) {
        this.state_weather = true;
      } else {
        this.state_weather = false;
      }
    },
  },




};


</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'monsterrat', sans-serif;
}

#app {
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

.mainn {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(to bottom, rgba(18, 75, 156, 0.35), rgba(2, 15, 22, 0.75));
}

.mainn.warm {
  background-image: linear-gradient(to bottom, rgba(248, 8, 8, 0.35), rgba(246, 6, 6, 0.75));
}

.search-box {
  width: 100%;
  position: relative;
}

.search-box .search-bar {
  display: block;
  width: 20%;
  padding: 15px;
  color: #313131;
  font-size: 20px;
  appearance: none;
  border: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}

.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px;
  background-color: rgba(255, 255, 255, 0.75);
}

.temp {
  display: inline-block;
  padding: 10px 25px;
  color: #FFF;
  font-size: 102px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.header {
  padding-top: 20px;
  font-size: 20px;
  color: azure;
  box-shadow: rgba(3, 3, 3, 0.3);
}

.state {
  position: absolute;
  color: #FFF;
  font-size: 48px;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  text-align: center;
}

.forecast-table-container {
  margin-top: 20px;
}

.forecast-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.forecast-table th,
.forecast-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.forecast-table th {
  background-color: #f2f2f2;
}
</style>
