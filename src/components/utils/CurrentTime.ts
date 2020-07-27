export default class CurrentTime {

  static getCurrentTime(date: Date): string {
    if (date.getHours() && date.getMinutes())
      return this.getFormattedTime(date);
    return "";
  }

  private static getFormattedTime(date: Date): string {
    return this.getFormattedStringValue(date.getHours())
      + ":"
      + this.getFormattedStringValue(date.getMinutes());
  }

  // no-inspect
  private static getFormattedStringValue(value: number): string {
    if (value < 10)
      return "0" + value.toString();
    return value.toString();
  }
}