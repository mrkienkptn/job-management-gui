export const renameKey = (obj, newKey, oldKey) => {
  if (oldKey !== newKey) {
    Object.defineProperty(obj, newKey, Object.getOwnPropertyDescriptor(obj, oldKey))
    delete obj[oldKey]
  }
}