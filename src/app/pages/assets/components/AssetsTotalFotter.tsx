import { formatCurrencyUSD } from "../../../helpers/FormatCurrency";

type AssetsTotalFotterWrapperProps = {
    footerData?: { acquisition: number; estimated: number }
  } & any 
  
  export const  AssetsTotalFotter = ({
    footerData,
    ...paginationProps
  }: AssetsTotalFotterWrapperProps) => (
    <>
      <div style={{width: "100%"}}>
        <table className='table table-sm mb-0 w-100' style={{background: "#fafafa"}}>
          <tbody>
            <tr>
              <td className='fw-bold text-end'>Total general:</td>
              <td className='fw-bold text-end'>{formatCurrencyUSD(footerData?.acquisition ?? 0)}</td>
              <td className='fw-bold text-end'>{formatCurrencyUSD(footerData?.estimated ?? 0)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        {paginationProps && paginationProps.paginationComponent && typeof paginationProps.paginationComponent === 'function'
          ? paginationProps.paginationComponent(paginationProps)
          : null}
      </div>
    </>
  )
  