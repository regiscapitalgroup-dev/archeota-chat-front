import { useState, useEffect } from 'react'
import { getTransactionsLogs } from '../../services/cliamsService'
import { ClaimTransactionModel } from '../../pages/claims/models/ClaimsTransactionsModel'

type ApiResponse = {
    count: number
    next: string | null
    previous: string | null
    results: ClaimTransactionModel[]
}

export const useTransactionsLogs = (guid: string) => {
    const [logs, setLogs] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)


    useEffect(() => {
        let isMounted = true
        const fetch = async () => {
            try {
                setLoading(true)
                const data: ApiResponse = await getTransactionsLogs(guid)
                if (isMounted) {
                    setLogs(data.results)
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
    }, [guid])

    return {
        loading,
        error,
        logs
    }
}
