<template>
  <div class="m-1">
    <div class="table table-responsive-sm" style="width: 100%">
      <table class="table-striped" style="width: 100%">
        <thead class="thead-dark">
        <tr>
          <th>
            Datum
          </th>
          <th>
            Stunden <br> (verechnet)
          </th>
          <th>
            Stunden <br> (gesamt)
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="time in data.allTimes.dailyGroupedTimes" :key="time.id" @click="seeSelectedDay(time)">
          <td>
            {{ time.date }}
          </td>
          <td>
            {{ time.timeVerrechnet }}
          </td>
          <td>
            {{ time.timeGesamt }}
          </td>
        </tr>
        </tbody>
        <tfoot>
        <tr class="border-top">
          <td>Gesamt</td>
          <td>{{ data.allTimes.timeVerrechnet }}</td>
          <td>{{ data.allTimes.timeGesamt }}</td>
        </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from "vue-property-decorator";
  import ApplicationState from "@/components/state/ApplicationState";
  import DailyGroupedTimesViewModel from "@/components/view-models/savedTimes/DailyGroupedTimesViewModel";

  @Component
  export default class AllTimes extends Vue {
    private data = ApplicationState.data;

    seeSelectedDay(oneDaysTime: DailyGroupedTimesViewModel) {
      this.data.oneDayTimes = [oneDaysTime];
      this.$router.push("/times")
    }
  }
</script>