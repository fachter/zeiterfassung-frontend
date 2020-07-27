import CommandInterface from "@/components/utils/CommandInterface";
import EnterTimeViewModel from "@/components/view-models/EnterTimeViewModel";
import DateHelper from "@/components/utils/DateHelper";
import ErrorMessages from "@/components/state/ErrorMessages";

export default class ChangeTimeCommand implements CommandInterface {

  private savedTimes: EnterTimeViewModel;

  constructor(savedTimes: EnterTimeViewModel) {
    this.savedTimes = savedTimes;
  }

  execute(): void {
    if (this.savedTimes.startTime.value !== "" && this.savedTimes.endTime.value !== "") {
      const dateDifferenceInMinutes = this.getDateDifferenceInMinutes();
      this.savedTimes.fullTime.value = DateHelper.getTotalWorkTimeString(dateDifferenceInMinutes);
      this.savedTimes.timeWithoutBreak.value = DateHelper.getTotalWorkTimeString(dateDifferenceInMinutes - this.getBreakInMinutes())
    }
  }

  private getDateDifferenceInMinutes() {
    let startDateTime = null;
    if (this.savedTimes.startTime.value !== "") {
      startDateTime = this.getDateFromString(this.savedTimes.startTime.value);
      if (this.savedTimes.startTime.value !== startDateTime.toISOString())
        this.savedTimes.startTime.value = startDateTime.toISOString();
    }
    let endDateTime = null;
    if (this.savedTimes.endTime.value !== "") {
      endDateTime = this.getDateFromString(this.savedTimes.endTime.value);
      if (this.savedTimes.endTime.value !== endDateTime.toISOString())
        this.savedTimes.endTime.value = endDateTime.toISOString();
    }
    return DateHelper.getCalculatedDiffInMinutes(this.getDateString(startDateTime), this.getDateString(endDateTime));
  }

  private getDateString(dateTime: Date|null): string {
    if (dateTime === null)
      return "";
    return dateTime.toISOString();
  }

  private getDateFromString(value: string) {
    const date = new Date(value);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  private getBreakInMinutes(): number {
    const number: number = +this.savedTimes.break.value;
    if (Number.isInteger(number))
      return number;
    this.savedTimes.break.errors = [ErrorMessages.INVALID_BREAK_INPUT]
    return 0;
  }
}