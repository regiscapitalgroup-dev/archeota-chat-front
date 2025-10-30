import { useState, useEffect, useRef } from 'react'
import { getTransactionsClaims } from '../../services/cliamsService'
import { ClaimTransactionModel } from '../../pages/claims/models/ClaimsTransactionsModel'

type ApiResponse = {
  count: number
  next: string | null
  previous: string | null
  results: ClaimTransactionModel[]
}

export const useTransactionsClaim = (pageSize = 10, reload: number, user?: string) => {
  const [transactions, setTransactions] = useState<ClaimTransactionModel[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const [page, setPage] = useState<number>(1)
  const [count, setCount] = useState<number>(0)
  const isMounted = useRef(true);
  
  useEffect(() => { 
    isMounted.current = true;
    return () =>{
      isMounted.current = false 
  }}, []);

  const loadData = async () => {
    try {
      setLoading(true)
      const data: ApiResponse = await getTransactionsClaims(page, user)
      if (isMounted.current) {
        setTransactions(data.results)
        setCount(data.count)
      }
    }
    catch (err) {
      if (isMounted.current) setError(err as Error)
    } 
    finally {
      if (isMounted.current) setLoading(false)
    }
  };

  useEffect(() => {
    loadData();
  }, [page, user])

  return {
    transactions,
    loading,
    error,
    page,
    setPage,
    loadData,
    count,
    pageSize,
  }
}
