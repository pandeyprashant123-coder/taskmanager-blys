import { useState, useEffect } from "react";

function useLocalStorage(key:string, initialValue:any) {
  const isClient = typeof window !== "undefined";

//   const getStorage = () => window.localStorage

  const [storedValue, setStoredValue] = useState(() => {
    if (!isClient) return initialValue;
    try {
    //   const storage = getStorage(rememberMe);
      const stored = window.localStorage.getItem(key);
      return stored ? stored : initialValue;
    } catch (error) {
      console.error("Error reading storage", error);
      return initialValue;
    }
  });

  const setValue = (value:any) => {
    if (!isClient) return;
    try {
    //   const storage = getStorage(remember);
      const valueToStore =
        typeof value === "function" ? value(storedValue) : value;

      setStoredValue(valueToStore);
      if (valueToStore !== null) {
        window.localStorage.setItem(key, valueToStore);
      } else {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error("Error writing to storage", error);
    }
  };

  const clearValue = () => {
    if (!isClient) return;
    try {
    //   const storage = getStorage(rememberMe);
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error("Error clearing storage", error);
    }
  };

  useEffect(() => {
    if (!isClient) return;
    try {
    //   const storage = getStorage(rememberMe);
      const stored = window.localStorage.getItem(key);
      if (stored) {
        setStoredValue(stored);
      }
    } catch (error) {
      console.error("Error rehydrating storage", error);
    }
  }, [key]);

  return [storedValue, setValue, clearValue] as const;
}

export default useLocalStorage;
