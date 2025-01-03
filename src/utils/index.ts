import { useCallback, useEffect, useRef, useState } from 'react'

export function escapeRegExp(string = '') {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function shortenAddress(address = '', chars = 4) {
  if (!address.length) return ''
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`
}

export function usePrevious(value?: any) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

export function useLocalStorageState(key = '', defaultState = '') {
  const [state, setState] = useState(() => {
    // NOTE: Not sure if this is ok
    const storedState = localStorage.getItem(key)
    if (storedState) {
      return JSON.parse(storedState)
    }
    return defaultState
  })

  const setLocalStorageState = useCallback(
    (newState) => {
      const changed = state !== newState
      if (!changed) {
        return
      }
      setState(newState)
      if (newState === null) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(newState))
      }
    },
    [state, key]
  )

  return [state, setLocalStorageState]
}
