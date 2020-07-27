import TimeByDayGrouper from "@/components/utils/TimeByDayGrouper";
import AllTimesViewModel from "@/components/view-models/savedTimes/AllTimesViewModel";
import WorkedTimeViewModel from "@/components/view-models/savedTimes/WorkedTimeViewModel";
import ProjektViewModel from "@/components/view-models/configs/ProjektViewModel";
import KundenViewModel from "@/components/view-models/configs/KundenViewModel";
import DailyGroupedTimesViewModel from "@/components/view-models/savedTimes/DailyGroupedTimesViewModel";

function getNewWorkedTimeViewModel(date: number, hoursStart: number, hoursEnd: number): WorkedTimeViewModel {
  const startTime = new Date();
  startTime.setFullYear(2020, 1, date);
  startTime.setHours(hoursStart);
  startTime.setMinutes(0);
  const endTime = new Date();
  endTime.setFullYear(2020, 1, date);
  endTime.setHours(hoursEnd);
  endTime.setMinutes(0);
  const workedTimeViewModel = new WorkedTimeViewModel();
  workedTimeViewModel.startTime = startTime.toISOString();
  workedTimeViewModel.endTime = endTime.toISOString();
  workedTimeViewModel.projektViewModel = new ProjektViewModel("Test Projekt");
  workedTimeViewModel.kundenViewModel = new KundenViewModel("Test Kunde");
  workedTimeViewModel.beschreibung = "Test Beschreibung";
  return workedTimeViewModel;
}

describe("TimeByDayGrouper", () => {
  describe("group", () => {
    let timeByDayGrouper: TimeByDayGrouper;

    beforeEach(() => {
      timeByDayGrouper = new TimeByDayGrouper();
    })

    test("givenEmptyArray", () => {
      const expectedResult = new AllTimesViewModel();
      expectedResult.timeGesamt = "0min";
      expectedResult.timeVerrechnet = "0min";
      expectedResult.dailyGroupedTimes = [];

      const result = timeByDayGrouper.group([]);

      expect(result).toEqual(expectedResult);
    });

    test("givenOneTime", () => {
      const workedTimeViewModel = getNewWorkedTimeViewModel(1,10,12)

      const expectedResult = new AllTimesViewModel();
      expectedResult.timeGesamt = "2h 0min";
      expectedResult.timeVerrechnet = "2h 0min";
      const dailyGroupedTimeViewModel = new DailyGroupedTimesViewModel();
      dailyGroupedTimeViewModel.date = "01.02.2020";
      dailyGroupedTimeViewModel.timeGesamt = "2h 0min";
      dailyGroupedTimeViewModel.timeVerrechnet = "2h 0min";
      dailyGroupedTimeViewModel.savedTimes = [workedTimeViewModel];
      expectedResult.dailyGroupedTimes = [dailyGroupedTimeViewModel];

      const result = timeByDayGrouper.group([workedTimeViewModel])

      expect(result).toEqual(expectedResult);
    })

    test("given2TimesSameDay", () => {
      const workedTimeViewModel1 = getNewWorkedTimeViewModel(1, 10, 12);
      const workedTimeViewModel2 = getNewWorkedTimeViewModel(1, 12, 14);

      const expectedResult = new AllTimesViewModel();
      expectedResult.timeGesamt = "4h 0min";
      expectedResult.timeVerrechnet = "4h 0min";
      const dailyGroupedTimeViewModel = new DailyGroupedTimesViewModel();
      dailyGroupedTimeViewModel.date = "01.02.2020";
      dailyGroupedTimeViewModel.timeGesamt = "4h 0min";
      dailyGroupedTimeViewModel.timeVerrechnet = "4h 0min";
      dailyGroupedTimeViewModel.savedTimes = [workedTimeViewModel1, workedTimeViewModel2];
      expectedResult.dailyGroupedTimes = [dailyGroupedTimeViewModel];

      const result = timeByDayGrouper.group([workedTimeViewModel1, workedTimeViewModel2])

      expect(result).toEqual(expectedResult);
    });

    test("given2TimesDifferntDaysSorted", () => {
      const workedTimeViewModel1 = getNewWorkedTimeViewModel(1, 10, 13);
      const workedTimeViewModel2 = getNewWorkedTimeViewModel(2, 10, 12);
      workedTimeViewModel1.breakInMinutes = 30;
      workedTimeViewModel2.breakInMinutes = 20;

      const expectedResult = new AllTimesViewModel();
      expectedResult.timeGesamt = "5h 0min";
      expectedResult.timeVerrechnet = "4h 10min";
      const dailyGroupedTimesViewModel1 = new DailyGroupedTimesViewModel();
      dailyGroupedTimesViewModel1.date = "01.02.2020";
      dailyGroupedTimesViewModel1.timeGesamt = "3h 0min";
      dailyGroupedTimesViewModel1.timeVerrechnet = "2h 30min";
      dailyGroupedTimesViewModel1.savedTimes = [workedTimeViewModel1];
      const dailyGroupedTimesViewModel2 = new DailyGroupedTimesViewModel();
      dailyGroupedTimesViewModel2.date = "02.02.2020";
      dailyGroupedTimesViewModel2.timeGesamt = "2h 0min";
      dailyGroupedTimesViewModel2.timeVerrechnet = "1h 40min";
      dailyGroupedTimesViewModel2.savedTimes = [workedTimeViewModel2];
      expectedResult.dailyGroupedTimes = [dailyGroupedTimesViewModel1, dailyGroupedTimesViewModel2];

      const result = timeByDayGrouper.group([workedTimeViewModel1, workedTimeViewModel2]);

      expect(result).toEqual(expectedResult);
    })

    test("given3Times2DifferentDaysMixed", () => {
      const workedTimeViewModel1 = getNewWorkedTimeViewModel(1, 10, 13);
      const workedTimeViewModel2 = getNewWorkedTimeViewModel(2, 10, 12);
      const workedTimeViewModel3 = getNewWorkedTimeViewModel(1, 13, 17);
      workedTimeViewModel1.breakInMinutes = 30;
      workedTimeViewModel2.breakInMinutes = 20;
      workedTimeViewModel3.breakInMinutes = 60;

      const expectedResult = new AllTimesViewModel();
      expectedResult.timeGesamt = "9h 0min";
      expectedResult.timeVerrechnet = "7h 10min";
      const dailyGroupedTimesViewModel1 = new DailyGroupedTimesViewModel();
      dailyGroupedTimesViewModel1.date = "01.02.2020";
      dailyGroupedTimesViewModel1.timeGesamt = "7h 0min";
      dailyGroupedTimesViewModel1.timeVerrechnet = "5h 30min";
      dailyGroupedTimesViewModel1.savedTimes = [workedTimeViewModel1, workedTimeViewModel3];
      const dailyGroupedTimesViewModel2 = new DailyGroupedTimesViewModel();
      dailyGroupedTimesViewModel2.date = "02.02.2020";
      dailyGroupedTimesViewModel2.timeGesamt = "2h 0min";
      dailyGroupedTimesViewModel2.timeVerrechnet = "1h 40min";
      dailyGroupedTimesViewModel2.savedTimes = [workedTimeViewModel2];
      expectedResult.dailyGroupedTimes = [dailyGroupedTimesViewModel1, dailyGroupedTimesViewModel2];

      const result = timeByDayGrouper.group(
        [workedTimeViewModel1, workedTimeViewModel2, workedTimeViewModel3]);

      expect(result).toEqual(expectedResult);
    })
  })
})