import { useState, useEffect } from 'react'
import { getTransactionsClaims } from '../../services/cliamsService'
import { ClaimTransactionModel } from '../../pages/claims/models/ClaimsTransactionsModel'

type ApiResponse = {
  count: number
  next: string | null
  previous: string | null
  results: ClaimTransactionModel[]
}

export const useTransactionsClaim = (pageSize = 10, reload:number) => {
  const [transactions, setTransactions] = useState<ClaimTransactionModel[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const [page, setPage] = useState<number>(1)
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    let isMounted = true
    const fetch = async () => {
      try {
        setLoading(true)
        const data: ApiResponse = await getTransactionsClaims(page)
        if (isMounted) {
          setTransactions(data.results)
          setCount(data.count)
        }
      } catch (err) {
        if (isMounted) setError(err as Error)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetch()
    return () => {
      isMounted = false
    }
  }, [page, reload])

  return {
    transactions,
    loading,
    error,
    page,
    setPage,
    count,
    pageSize,
  }
}
