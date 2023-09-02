class LocalStorage {
  get(key: string): any {
    return localStorage.getItem(key)
  }
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }
  remove(key: string) {
    localStorage.removeItem(key)
  }
}

const myLocalStorage = new LocalStorage()

export default myLocalStorage
