import { useState, useEffect, useRef } from "react";
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

interface IUseInterval {
  (callback: () => void, interval: number): void;
}

const useInterval: IUseInterval = (callback, interval) => {
  const savedCallback = useRef<(() => void) | null>(null);
  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    let id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [interval]);
};

export { useSessionStorage, useLocalStorage, useInterval };
