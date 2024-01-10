<template>
  <div id="app">
    <div class="navbar">
      <h1>Weather App</h1>
      <ul>
        <li><router-link to="/MeteoDetails">Meteo Details</router-link></li>
        <li><router-link to="/">Weather</router-link></li>
      </ul>
    </div>

    <div class="mainn" v-bind:class="{ warm: state_weather }">
      <div class="search-box">
        <!-- Existing code for the search box -->
      </div>

     
    </div>
  </div>
</template>

<style scoped>
/* Existing styles... */

.navbar {
  background-color: #333;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar h1 {
  margin: 0;
}

.navbar ul {
  list-style: none;
  display: flex;
}

.navbar li {
  margin-right: 20px;
}

.navbar a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}

.map-container {
  width: 60%;
  float: right;
  margin-top: 20px; /* Adjust as needed */
}
</style>
