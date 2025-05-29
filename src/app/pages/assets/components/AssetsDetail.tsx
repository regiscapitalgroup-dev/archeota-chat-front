import React, {useEffect, useState} from 'react'
import {AssetsCreateModel} from '../models/AssetsCreateModel'
import { formatCurrencyUSD } from '../../../helpers/FormatCurrency'

interface AssetDetailProps {
  data: AssetsCreateModel
}

const AssetsDetail: React.FC<AssetDetailProps> = ({data}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  useEffect(() => {
    if (data?.photo && typeof data.photo === 'string') {
      setPreviewImage(data.photo)
    }
  }, [data])

  return (
    <div className='card card-custom card-stretch'>
      <div className='card-header'>
        <h3 className='card-title'>Asset Detail</h3>
      </div>

      <div className='card-body'>
        <div className='row'>
          {/* Columna izquierda */}
          <div className='col-lg-8'>
            <div className='form-group mb-3'>
              <label className='text-gray-500'>Name</label>
              <div className='form-control-plaintext'>{data?.name}</div>
            </div>

            <div className='form-group mb-3 row'>
              <div className='col-md-6'>
                <label className='text-gray-500'>Value</label>
                <div className='form-control-plaintext'>{ formatCurrencyUSD(data?.value ?? 0) }</div>
              </div>
              <div className='col-md-6'>
                <label className='text-gray-500'>Value over time</label>
                <div className='form-control-plaintext'>{ formatCurrencyUSD(data?.valueOverTime ?? 0) }</div>
              </div>
            </div>

            <div className='form-group mb-3'>
              <label className='text-gray-500'>Syntasis summary</label>
              <div className='form-control-plaintext'>{data?.syntasisSummary}</div>
            </div>

            <div className='form-group mb-3'>
              <label className='text-gray-500'>Full conversation history</label>
              <div className='form-control-plaintext'>{data?.fullConversationHistory}</div>
            </div>
          </div>

          {/* Columna derecha con imagen */}
          <div className='col-lg-4 d-flex flex-column align-items-center'>
            <div
              className='image-input-wrapper rounded border'
              style={{
                width: '100%',
                maxWidth: '250px',
                paddingTop: '100%',
                backgroundImage: previewImage
                  ? `url(${previewImage})`
                  : 'url("/media/avatars/blank_image.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssetsDetail
