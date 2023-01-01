import React from 'react'
import { useSearchParams } from 'react-router-dom'

// A custom hook that builds on useSearchParams to parse
// the query string for you.
export function useQuery(query: string) {
  const [queryString] = useSearchParams()

  return React.useMemo(() => queryString.get(query), [query])
}
