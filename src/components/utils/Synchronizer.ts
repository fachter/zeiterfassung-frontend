import AxiosCaller from "@/components/utils/AxiosCaller";
import ApplicationState from "@/components/state/ApplicationState";
import TimeByDayGrouper from "@/components/utils/TimeByDayGrouper";
import WorkedTimeViewModel from "@/components/view-models/savedTimes/WorkedTimeViewModel";
import WorkedTimeRequestResponseViewModel from "@/components/view-models/savedTimes/WorkedTimeRequestResponseViewModel";
import moment from "moment";

export default class Synchronizer {

  private axiosCaller = new AxiosCaller();

  public fetchKundenForUser() {
    this.axiosCaller.postRequest("/kunden")
      .then((res) => {
        ApplicationState.data.configs.kunden = res.data;
      })
      .catch((err) => console.log(err));
  }

  public fetchProjekteForUser() {
    this.axiosCaller.postRequest("/projekte")
      .then((res) => {
        ApplicationState.data.configs.projekte = res.data;
      })
      .catch((err) => console.log(err));
  }

  public async fetchTimesForUserAsync() {
    this.axiosCaller.asyncPostRequest("/times")
      .then((res) => {
        const times: WorkedTimeRequestResponseViewModel[] = res.data;
        const timeByDayGrouper = new TimeByDayGrouper();
        ApplicationState.data.allTimes = timeByDayGrouper.group(this.getWorkedTimeViewModelFromResponse(times));
      });
  }

  public fetchTimesForUser() {
    this.axiosCaller.postRequest("/times")
      .then((res) => {
        const times: WorkedTimeRequestResponseViewModel[] = res.data;
        const timeByDayGrouper = new TimeByDayGrouper();
        ApplicationState.data.allTimes = timeByDayGrouper.group(this.getWorkedTimeViewModelFromResponse(times));
      });
  }

  private getWorkedTimeViewModelFromResponse(workedTimesResponse: WorkedTimeRequestResponseViewModel[]): WorkedTimeViewModel[] {
    const workedTimes: WorkedTimeViewModel[] = [];
    for (const workedTimeReponse of workedTimesResponse)
      workedTimes.push(this.getWorkedTimeFromResponse(workedTimeReponse));

    return workedTimes;
  }

  private getWorkedTimeFromResponse(workedTimeReponse: WorkedTimeRequestResponseViewModel) {
    const workedTime = new WorkedTimeViewModel();
    workedTime.id = workedTimeReponse.id;
    workedTime.beschreibung = workedTimeReponse.beschreibung;
    workedTime.startTime = this.getDateFromTimestamp(workedTimeReponse.startTimestamp);
    workedTime.endTime = this.getDateFromTimestamp(workedTimeReponse.endTimestamp);
    workedTime.breakInMinutes = workedTimeReponse.breakInMinutes;
    workedTime.kundenViewModel = workedTimeReponse.kundenViewModel;
    workedTime.projektViewModel = workedTimeReponse.projektViewModel;
    return workedTime;
  }

  private getDateFromTimestamp(timestamp: number): string {
    return moment(timestamp).format();
  }
}