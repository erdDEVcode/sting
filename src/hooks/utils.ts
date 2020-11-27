import { useState } from "react"

export const useResult = <T>(initialValue?: T) => {
  const [value, setValue] = useState<T | undefined>(initialValue)
  const [error, setError] = useState()
  return [value, error, setValue, setError]
}
