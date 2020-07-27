import WorkedTimeViewModel from "@/components/view-models/savedTimes/WorkedTimeViewModel";
import AllTimesViewModel from "@/components/view-models/savedTimes/AllTimesViewModel";
import DailyGroupedTimesViewModel from "@/components/view-models/savedTimes/DailyGroupedTimesViewModel";
import DateHelper from "@/components/utils/DateHelper";
import moment from "moment";

export default class TimeByDayGrouper {

  private timeGesamtInMinutes = 0;
  private breakGesamtInMinutes = 0;
  private totalMinutesPerDay = 0;
  private totalBreakMinutesPerDay = 0;

  group(workedTimeViewModels: WorkedTimeViewModel[]): AllTimesViewModel {

    const allTimesViewModel = new AllTimesViewModel();
    this.fillDailyGroupedTimes(this.getTimeMapGroupedByDay(workedTimeViewModels), allTimesViewModel);
    allTimesViewModel.timeGesamt = DateHelper.getTotalWorkTimeString(this.timeGesamtInMinutes);
    allTimesViewModel.timeVerrechnet = DateHelper.getTotalWorkTimeString(
      this.timeGesamtInMinutes - this.breakGesamtInMinutes);
    return allTimesViewModel;
  }

  private fillDailyGroupedTimes(timesGroupedByDay: Map<string, WorkedTimeViewModel[]>, allTimesViewModel: AllTimesViewModel) {
    for (const date of timesGroupedByDay.keys()) {
      this.totalMinutesPerDay = 0;
      this.totalBreakMinutesPerDay = 0;
      const dailyGroupedTimesViewModel = new DailyGroupedTimesViewModel();
      dailyGroupedTimesViewModel.date = date;
      this.calculateMinutesAndAddWorkedTimes(timesGroupedByDay.get(date), dailyGroupedTimesViewModel);
      dailyGroupedTimesViewModel.timeGesamt = DateHelper.getTotalWorkTimeString(this.totalMinutesPerDay);
      dailyGroupedTimesViewModel.timeVerrechnet = DateHelper.getTotalWorkTimeString(
        this.totalMinutesPerDay - this.totalBreakMinutesPerDay);
      this.timeGesamtInMinutes += this.totalMinutesPerDay;
      this.breakGesamtInMinutes += this.totalBreakMinutesPerDay;
      allTimesViewModel.dailyGroupedTimes.push(dailyGroupedTimesViewModel)
    }
  }

  private calculateMinutesAndAddWorkedTimes(workedTimeViewModels: WorkedTimeViewModel[] | undefined,
                                            dailyGroupedTimesViewModel: DailyGroupedTimesViewModel) {
    for (const workedTimeViewModel of workedTimeViewModels as WorkedTimeViewModel[]) {
      dailyGroupedTimesViewModel.savedTimes.push(workedTimeViewModel);
      this.totalMinutesPerDay += DateHelper.getCalculatedDiffInMinutes(
        workedTimeViewModel.startTime, workedTimeViewModel.endTime)
      this.totalBreakMinutesPerDay += workedTimeViewModel.breakInMinutes;
    }
  }

  private getTimeMapGroupedByDay(workedTimeViewModels: WorkedTimeViewModel[]): Map<string, WorkedTimeViewModel[]> {
    const timesGroupedByDay = new Map<string, WorkedTimeViewModel[]>();
    for (const workedTimeViewModel of workedTimeViewModels) {
      const dateString = this.getDateStringFromDateString(workedTimeViewModel.startTime);
      let groupedTimes: WorkedTimeViewModel[] = [];
      if (timesGroupedByDay.has(dateString)) {
        groupedTimes = timesGroupedByDay.get(dateString) as WorkedTimeViewModel[];
      }
      groupedTimes.push(workedTimeViewModel);
      timesGroupedByDay.set(dateString, groupedTimes);
    }
    return timesGroupedByDay;
  }

  private getDateStringFromDateString(dateTimeString: string): string {
    const dateTime = moment(dateTimeString);
    if (dateTime === null)
      return "";
    return this.get2DigitNumberString(dateTime.date()) + "."
      + this.get2DigitNumberString(dateTime.month() + 1)
      + "." + dateTime.year();
  }

  private get2DigitNumberString(number: number): string {
    const numberString = number.toString();
    if (numberString.length === 1)
      return "0" + number;
    return numberString;
  }
}