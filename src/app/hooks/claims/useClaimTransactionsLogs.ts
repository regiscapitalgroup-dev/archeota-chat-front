import { useState, useEffect } from 'react'
import { getTransactionsLogs } from '../../services/cliamsService'
import { ImportJobLog } from '../../pages/claims/models/ClaimsTransactionsErrorLogModel'


export const useTransactionsLogs = (guid: string) => {
    const [logs, setLogs] = useState<ImportJobLog[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)


    useEffect(() => {
        let isMounted = true
        const fetch = async () => {
            try {
                setLoading(true)
                const data: ImportJobLog[] = await getTransactionsLogs(guid)
                if (isMounted) {
                    setLogs(data)
                }
            } catch (err) {
                if (isMounted) setError(err as Error)
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        if (guid) {
            fetch()
        }

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
