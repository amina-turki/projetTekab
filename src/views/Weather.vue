
<template>
  <div id="app">
    <div class="mainn" >
    <div style="flex-direction: row;">
    
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
   <div>
   <div id="map" style="height:50vh; width:90vh"></div>
</div>
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

  // composition API
  data() {
    return {
      data: {
        city: "",
        weather: null,
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

    this.data.weather = weatherResponse.data;
    this.data.city = "";

    // Update marker position based on weather coordinates
    if (this.marker && this.data.weather.coord) {
      this.marker.setLatLng([this.data.weather.coord.lat, this.data.weather.coord.lon]);
    }

    if (this.data.weather.main.temp > 16) {
      this.state_weather = true;
    } else {
      this.state_weather = false;
    }
  },
},


  setup() {
  const initialMap = ref(null);
  const marker = ref(null);

  onMounted(async () => {
    initialMap.value = L.map('map').setView([34.796889261824674, 10.478897094726562], 4);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(initialMap.value);

    // Add marker to the initial position
    marker.value = L.marker([34.796889261824674, 10.478897094726562]).addTo(initialMap.value);

    // Fetch weather data and update marker position
    await this.getApi();
  });

  return {
    initialMap,
    marker
  };
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

</style>
