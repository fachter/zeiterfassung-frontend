import moment from "moment";

export default class DateHelper {

  static getCalculatedDiffInMinutes(startDateString: string, endDateString: string): number {
    if (startDateString === "" || endDateString === "")
      return 0;
    const diff = moment(endDateString).diff(moment(startDateString));
    return moment.duration(diff).asMinutes()
  }

  static getTotalWorkTimeString(diffInMinutes: number): string {
    const minutes = (diffInMinutes % 60);
    const hours = (diffInMinutes - minutes) / 60;
    return this.getHourString(hours) + (Math.floor(minutes)).toString() + "min";
  }

  private static getHourString(calculatedHours: number) {
    if (calculatedHours !== 0)
      return Math.floor(calculatedHours) + "h ";
    return "";
  }
}