import CurrentTime from "@/components/utils/CurrentTime";

describe("CurrentTime", () => {
  describe("getCurrentTime", () => {
    test("givenEmptyDate_thenReturnEmptyString", () => {
      expect(CurrentTime.getCurrentTime(new Date(""))).toBe("");
    });

    const cases: [number, number, string][] = [
      [10, 20, "10:20"],
      [11, 33, "11:33"],
      [20, 55, "20:55"],
      [8, 55, "08:55"],
      [18, 5, "18:05"],
      [1, 1, "01:01"],
    ];

    test.each(cases)("givenSomeDates_thenReturnFormattedString", (hours, minutes, expectedResult) => {
      expect(CurrentTime.getCurrentTime(new Date(
          2020, 12, 9, hours, minutes, 30, 40))).toBe(expectedResult);
    })
  });
});