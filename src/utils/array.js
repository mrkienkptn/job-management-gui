export const difference = (arrayA, arrayB) => {
  const setBId = new Set(arrayB.map((b) => b._id))
  const _difference = new Set(arrayA)
  for (const elem of _difference) {
    if (setBId.has(elem._id)) {
      _difference.delete(elem)
    }
  }
  return Array.from(_difference)
}
