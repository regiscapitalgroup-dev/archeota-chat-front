import React from 'react'
import ReactApexChart from 'react-apexcharts'
import {useClaimsByStatus} from '../../../hooks/dashboard/useClaimsByStatus'

interface StatusClaimsChartProps {
  selectedUser?: any
}

const StatusClaimsChart: React.FC<StatusClaimsChartProps> = ({selectedUser}) => {
  const {data: claims} = useClaimsByStatus(selectedUser ? selectedUser.id : null)
  
  if (!claims?.totalsByStatus || claims.totalsByStatus.length === 0) {
    return <div className="text-center p-4">No data available</div>
  }

  const categories = claims.totalsByStatus.map((d: any) =>
    d.status === '' || d.status === 'NULL' ? 'Stateless' : d.status
  )
  
  const totals = claims.totalsByStatus.map((d: any) => d.total)

  const options = {
    chart: {type: 'bar' as const, toolbar: { show: false }},
    xaxis: {categories},
  }

  const series = [{name: 'Claims', data: totals}]

  return <ReactApexChart options={options} series={series} type='bar' height={350} />
}

export default StatusClaimsChart