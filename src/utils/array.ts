export const convertArrToObject = (
  arr: any[],
  key: string,
  valueKey: string,
) => {
  if (arr && arr.length == 0) {
    return null
  }

  const result = arr.reduce((result, item) => {
    result[item[key]] = item[valueKey]
    return result
  }, {})

  return result
}
