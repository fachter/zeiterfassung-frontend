import EnterTimeViewModel from "@/components/view-models/EnterTimeViewModel";
import ChangeTimeCommand from "@/components/utils/ChangeTimeCommand";

describe("ChangeTimeCommand", () => {
  let enterTimeViewModel: EnterTimeViewModel;
  let changeTimeCommand: ChangeTimeCommand;

  beforeEach(() => {
    enterTimeViewModel = new EnterTimeViewModel();
    changeTimeCommand = new ChangeTimeCommand(enterTimeViewModel);

  })
  test("givenEmptyValuesForFields", () => {
    changeTimeCommand.execute();
    expect(enterTimeViewModel.fullTime.value).toBe("");
  });

  test("givenSameDateTime", () => {
    const now = new Date(Date.now()).toISOString();
    enterTimeViewModel.startTime.value = now;
    enterTimeViewModel.endTime.value = now;

    changeTimeCommand.execute();

    expect(enterTimeViewModel.fullTime.value).toBe("0min");
  });

  test("given10MinWork", () => {
    const now = new Date(Date.now());
    now.setMinutes(10);
    enterTimeViewModel.startTime.value = now.toISOString();
    now.setMinutes(20);
    enterTimeViewModel.endTime.value = now.toISOString();

    changeTimeCommand.execute();

    expect(enterTimeViewModel.fullTime.value).toBe("10min");
  });

  test("given1HourWorked", () => {
    const now = new Date(Date.now());
    now.setHours(10);
    enterTimeViewModel.startTime.value = now.toISOString();
    now.setHours(11);
    enterTimeViewModel.endTime.value = now.toISOString();

    changeTimeCommand.execute();

    expect(enterTimeViewModel.fullTime.value).toBe("1h 0min");
  });

  test("given20MinutesWorkedInDifferentHours", () => {
    const now = new Date(Date.now());
    now.setHours(10);
    now.setMinutes(50);
    enterTimeViewModel.startTime.value = now.toISOString();
    now.setHours(11);
    now.setMinutes(10);
    enterTimeViewModel.endTime.value = now.toISOString();

    changeTimeCommand.execute();

    expect(enterTimeViewModel.fullTime.value).toBe("20min");
  });

  test("given2HoursWorkedInDifferentDays", () => {
    const startDate = new Date();
    startDate.setFullYear(2020, 1, 20);
    startDate.setHours(23);
    startDate.setMinutes(0);
    enterTimeViewModel.startTime.value = startDate.toISOString();
    const endDate = new Date();
    endDate.setFullYear(2020, 1, 21);
    endDate.setHours(1);
    endDate.setMinutes(0);
    enterTimeViewModel.endTime.value = endDate.toISOString();

    changeTimeCommand.execute();

    expect(enterTimeViewModel.fullTime.value).toBe("2h 0min");
  });

  test("given2HoursWorkedInDifferentMonths", () => {
    const startDate = new Date();
    startDate.setFullYear(2020, 0, 31);
    startDate.setHours(23);
    startDate.setMinutes(0);
    enterTimeViewModel.startTime.value = startDate.toISOString();
    const endDate = new Date();
    endDate.setFullYear(2020, 1, 1);
    endDate.setHours(1);
    endDate.setMinutes(0);
    enterTimeViewModel.endTime.value = endDate.toISOString();

    changeTimeCommand.execute();

    expect(enterTimeViewModel.fullTime.value).toBe("2h 0min");
  });

  test("given2HoursWorkedInDifferentYears", () => {
    const startDate = new Date();
    startDate.setFullYear(2019, 11, 31);
    startDate.setHours(23);
    startDate.setMinutes(0);
    enterTimeViewModel.startTime.value = startDate.toISOString();
    const endDate = new Date();
    endDate.setFullYear(2020, 0, 1);
    endDate.setHours(1);
    endDate.setMinutes(0);
    enterTimeViewModel.endTime.value = endDate.toISOString();

    changeTimeCommand.execute();

    expect(enterTimeViewModel.fullTime.value).toBe("2h 0min");
  });

  test("given2DaysWorked", () => {
    const startDate = new Date();
    startDate.setFullYear(2020, 0, 1);
    startDate.setHours(22);
    startDate.setMinutes(0);
    enterTimeViewModel.startTime.value = startDate.toISOString();
    const endDate = new Date();
    endDate.setFullYear(2020, 0, 3);
    endDate.setHours(22);
    endDate.setMinutes(0);
    enterTimeViewModel.endTime.value = endDate.toISOString();

    changeTimeCommand.execute();

    expect(enterTimeViewModel.fullTime.value).toBe("48h 0min");
  });

  test("given5MinAnd10Seconds20MilliSecondsWorked_thenParseTo5Min", () => {
    const startDate = new Date();
    startDate.setFullYear(2020, 1, 1);
    startDate.setHours(22);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    enterTimeViewModel.startTime.value = startDate.toISOString();
    const endDate = new Date();
    endDate.setFullYear(2020, 1, 1);
    endDate.setHours(22);
    endDate.setMinutes(5);
    endDate.setSeconds(10);
    endDate.setMilliseconds(20);
    enterTimeViewModel.endTime.value = endDate.toISOString();

    changeTimeCommand.execute();

    expect(enterTimeViewModel.fullTime.value).toBe("5min");
  });

  test("givenStartTimeHasMoreSecondsThanEndTime_thenIgnoreSeconds", () => {
    const startDate = new Date();
    startDate.setFullYear(2020, 1, 1);
    startDate.setHours(22);
    startDate.setMinutes(0);
    startDate.setSeconds(50);
    startDate.setMilliseconds(20);
    enterTimeViewModel.startTime.value = startDate.toISOString();
    const endDate = new Date();
    endDate.setFullYear(2020, 1, 1);
    endDate.setHours(22);
    endDate.setMinutes(5);
    endDate.setSeconds(0);
    endDate.setMilliseconds(0);
    enterTimeViewModel.endTime.value = endDate.toISOString();

    changeTimeCommand.execute();

    expect(enterTimeViewModel.fullTime.value).toBe("5min");
  });

  test("givenStartTimeHasTimeZone_thenKeepTimezone", () => {
    const startDate = new Date();
    enterTimeViewModel.startTime.value = startDate.toISOString();
    const expectedStartDate = new Date(startDate.getFullYear(), startDate.getMonth(),
      startDate.getDate(), startDate.getHours(), startDate.getMinutes(), 0, 0)
    const endDate = new Date();
    enterTimeViewModel.endTime.value = endDate.toISOString();
    const expectedEndDate = new Date(endDate.getFullYear(), endDate.getMonth(),
      endDate.getDate(), endDate.getHours(), endDate.getMinutes(), 0, 0)

    changeTimeCommand.execute();

    expect(enterTimeViewModel.startTime.value).toBe(expectedStartDate.toISOString());
    expect(enterTimeViewModel.endTime.value).toBe(expectedEndDate.toISOString());
  });

  test("givenTimeWith10MinBreak_thenChangeTimeWithBreak", () => {
    enterTimeViewModel.startTime.value = new Date(2020, 1, 1, 12, 0, 0, 0).toISOString();
    enterTimeViewModel.endTime.value = new Date(2020, 1, 1, 14, 0, 0, 0).toISOString();
    enterTimeViewModel.break.value = "30";

    changeTimeCommand.execute();

    expect(enterTimeViewModel.timeWithoutBreak.value).toBe("1h 30min");
  });

  test("givenBreakWithInvalidInput_thenWriteErrorMessage", () => {
    enterTimeViewModel.startTime.value = new Date(2020, 1, 1, 12, 0, 0, 0).toISOString();
    enterTimeViewModel.endTime.value = new Date(2020, 1, 1, 14, 0, 0, 0).toISOString();
    enterTimeViewModel.break.value = "wrong";

    changeTimeCommand.execute();

    expect(enterTimeViewModel.fullTime.value).toBe("2h 0min");
    expect(enterTimeViewModel.break.errors.length).toBe(1);
  })

  test("givenBreakWithDecimalInput_thenWriteErrorMessage", () => {
    enterTimeViewModel.startTime.value = new Date(2020, 1, 1, 12, 0, 0, 0).toISOString();
    enterTimeViewModel.endTime.value = new Date(2020, 1, 1, 14, 0, 0, 0).toISOString();
    enterTimeViewModel.break.value = "30.5";

    changeTimeCommand.execute();

    console.log(enterTimeViewModel.timeWithoutBreak.value);
    expect(enterTimeViewModel.fullTime.value).toBe("2h 0min");
    expect(enterTimeViewModel.break.errors).toEqual(["Bitte geben Sie die Pause als ganze Zahl in Minuten ein!"]);
  })

  test("givenNoBreak_thenDoNotWriteError", () => {
    enterTimeViewModel.startTime.value = new Date(2020, 1, 1, 12, 0, 0, 0).toISOString();
    enterTimeViewModel.endTime.value = new Date(2020, 1, 1, 14, 0, 0, 0).toISOString();
    enterTimeViewModel.break.value = "";

    changeTimeCommand.execute();

    expect(enterTimeViewModel.timeWithoutBreak.value).toBe(enterTimeViewModel.fullTime.value);
    expect(enterTimeViewModel.timeWithoutBreak.errors.length).toBe(0);
  })
});