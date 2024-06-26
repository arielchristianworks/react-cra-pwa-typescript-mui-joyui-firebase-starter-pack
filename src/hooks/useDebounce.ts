import { useState, useEffect } from 'react'

export default function useDebounce<T>(value: T, delay: number) {
  const [debouncedVal, setDebouncedVal] = useState<T>(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedVal(value)
    }, delay)

    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return debouncedVal
}
