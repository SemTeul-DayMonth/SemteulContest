import dayjs from "dayjs";

export function getPageCounts(pageMode, data, currentDate) {
  let pageCounts = new Array(31);
  pageCounts.fill(0);

  if (data) {
    data.getPages.pages.forEach(({ date, pageType }) => {
      if (
        dayjs(date).format("YYYY-MM") === currentDate.format("YYYY-MM") &&
        (pageMode === "todo" ? pageType === pageMode : true)
      ) {
        const dayIdx = dayjs(date).format("D");
        pageCounts[dayIdx] += 1;
      }
    });
  }

  return pageCounts;
}

export function changeDateIndex(yearIndex, monthIndex, weekIndex, weekCount) {
  // prev
  if (weekIndex < 0) {
    weekIndex = weekCount - 1;
    monthIndex -= 1;
  }
  if (monthIndex < 1) {
    monthIndex = 12;
    yearIndex -= 1;
  }

  //next
  if (monthIndex > 12) {
    monthIndex = 1;
    yearIndex += 1;
  }

  return [yearIndex, monthIndex, weekIndex];
}
