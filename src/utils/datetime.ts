import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

export function calculateCountdownTime(endTimeStamp: string) {
  const endTimeUnix = Number(endTimeStamp)
  const startT = dayjs()
  const endT = dayjs.unix(endTimeUnix)
  const diff = endT.diff(startT) // 时间差

  let diffDays = dayjs.duration(diff).days() < 0 ? 0 : dayjs.duration(diff).days()
  const diffHours = dayjs.duration(diff).hours() < 0 ? 0 : dayjs.duration(diff).hours()
  const diffMinutes = dayjs.duration(diff).minutes() < 0 ? 0 : dayjs.duration(diff).minutes()
  const diffSeconds = dayjs.duration(diff).seconds() < 0 ? 0 : dayjs.duration(diff).seconds()
  // 月份数大于1就得加到天上
  const diffMonths = dayjs.duration(diff).months()
  if (diffMonths >= 1) {
    const currentMonth = dayjs().format('MM')
    // 有31天的大月
    const bigMonth = [1, 3, 5, 7, 8, 10, 12]
    const addNum = bigMonth.includes(Number(currentMonth))
    if (addNum) {
      diffDays = diffDays + 31
    } else {
      if (currentMonth === '02') {
        diffDays = diffDays + 28
      } else {
        diffDays = diffDays + 30
      }
    }
  }

  return {
    day: diffDays,
    hour: diffHours,
    minute: diffMinutes,
    second: diffSeconds,
  }
}
