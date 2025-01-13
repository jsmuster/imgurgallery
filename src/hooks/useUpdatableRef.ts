import { useState, useRef, useCallback } from "react";

const useUpdatableRef = <T>() => {
  const ref = useRef<T | null>(null);
  const [, forceUpdate] = useState<[]>();
  const setRef = useCallback((element: T) => {
    ref.current = element;
    forceUpdate([]);
  }, []);

  return [ref, setRef] as const;
};

export default useUpdatableRef;
