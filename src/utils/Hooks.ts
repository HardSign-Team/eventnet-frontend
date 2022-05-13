import { useState, useEffect } from "react";
import {
  loadLocalState,
  loadSessionState,
  saveLocalState,
  saveSessionState,
} from "./StoragesUtils";

function useSessionStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    let init = loadSessionState(key, initialValue);
    if (key === "timer" && init > 0) {
      init = init - 1;
    }
    return init;
  });
  const setValue = (value: any) => {
    setStoredValue(value);
  };

  useEffect(() => {
    saveSessionState(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setValue];
}

function useLocalStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    let init = loadLocalState(key, initialValue);
    if (key === "timer" && init > 0) {
      init = init - 1;
    }
    return init;
  });
  const setValue = (value: any) => {
    setStoredValue(value);
  };

  useEffect(() => {
    saveLocalState(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setValue];
}

export { useSessionStorage, useLocalStorage };
