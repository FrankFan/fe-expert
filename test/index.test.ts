import { describe, it } from 'vitest'
import { assert, expect, test } from 'vitest'
import { calculateCountdownTime } from '../src/utils/datetime'

test('计算时间差', () => {
  const endTimeStamp = '1671360706'
  const result = calculateCountdownTime(endTimeStamp)
  console.log('result ', result)

  expect(result).eq({
    day: 9,
    hour: 22,
    minite: 16,
    second: 8,
  })
})
