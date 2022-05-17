export function loadSessionState(key: string, defaultValue: any) {
  return JSON.parse(sessionStorage.getItem(key) as string) ?? defaultValue;
}

export function saveSessionState(key: string, object: any) {
  sessionStorage.setItem(key, JSON.stringify(object));
}

export function loadLocalState(key: string, defaultValue: any) {
  return JSON.parse(localStorage.getItem(key) as string) ?? defaultValue;
}

export function saveLocalState(key: string, object: any) {
  localStorage.setItem(key, JSON.stringify(object));
}
