<template>
  <div>
    <div v-for="day in data.oneDayTimes" :key="day.date">
      <h3>{{day.date}}</h3>
      <div class="table table-responsive-sm" style="width: 100%">
        <table class="table-striped" style="width: 100%">
          <thead class="thead-dark">
          <tr>
            <th>Von</th>
            <th>Bis</th>
            <th>Beschreibung</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="time in day.savedTimes" :key="time.id" @click="seeSelectedTime(time)">
            <td>{{getDateString(time.startTime)}}</td>
            <td>{{getDateString(time.endTime)}}</td>
            <td>{{time.beschreibung}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

  import {Component, Vue} from "vue-property-decorator";
  import ApplicationState from "@/components/state/ApplicationState";
  import WorkedTimeViewModel from "@/components/view-models/savedTimes/WorkedTimeViewModel";
  import RouterLink from "@/components/state/RouterLink";
  import moment from "moment";

  @Component
  export default class SelectedTimes extends Vue {
    private data = ApplicationState.data;

    created() {
      if (ApplicationState.data.oneDayTimes.length === 0) {
        this.$router.push(RouterLink.ALL_TIMES);
      }
    }

    getDateString(dateString: string): string {
      const date = moment(dateString);
      return date.format("HH:mm");
    }

    seeSelectedTime(day: WorkedTimeViewModel) {
      ApplicationState.data.selectedTime = day;
      this.$router.push("/time")
    }
  }
</script>