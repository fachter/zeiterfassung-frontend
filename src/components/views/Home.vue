<template>
  <div class="home">
    <h1>
      Hier kommen ein paar Informationen über die aktuellen Arbeitszeiten dieser Woche hin
    </h1> 
    <hr/>
    Aktuelle Stunden: 30
    <hr/>
    Fehlende Stunden: 10
    <hr/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from "vue-property-decorator";

  @Component
  export default class Home extends Vue {
  }
</script>
