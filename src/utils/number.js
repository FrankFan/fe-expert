import DEC from 'decimal.js'

function toNumber(val) {
  if (!val || Number.isNaN(Number(val)) || !DEC(Number(val)).isFinite()) {
    return 0
  }
  return val
}

// 处理返回结果
function handleReturn(result, dp) {
  let strResult = result.toString()
  if (result.toFixed && (dp || typeof dp === 'number')) {
    const dpTmp = Number(toNumber(dp))
    if (lt(result, 0)) {
      strResult = result.toFixed(dpTmp, DEC.ROUND_UP)
    } else {
      strResult = result.toFixed(dpTmp, DEC.ROUND_DOWN)
    }
  } else if (result.toFixed) {
    strResult = result.toFixed()
  }
  return strResult
}

/**
 * 千分位格式化 高精度
 */
function toThousands(value, dp) {
  const amount = handleReturn(DEC(toNumber(value)), dp)
  let regexp = '(\\d)(?=(\\d{3})+\\.)'
  if (amount.indexOf('.') === -1) {
    regexp = '(\\d)(?=(\\d{3})+$)'
  }
  return amount.replace(new RegExp(regexp, 'g'), '$1,')
}

export { toThousands }
