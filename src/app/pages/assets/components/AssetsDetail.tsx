import React, {useEffect, useState} from 'react'
import {AssetsCreateModel} from '../models/AssetsCreateModel'
import {formatCurrencyUSD} from '../../../helpers/FormatCurrency'

interface AssetDetailProps {
  data: AssetsCreateModel
}

const AssetsDetail: React.FC<AssetDetailProps> = ({data}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [category, setCategory] = useState(null);
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
            <div className='form-group mb-3 row'>
              <div className='col-md-6'>
                <label className='text-gray-500'>Name</label>
                <div className='form-control-plaintext'>{data?.name}</div>
              </div>
              <div className='col-md-6'>
                <label className='text-gray-500'>Category</label>
                <div className='form-control-plaintext'>{data?.categoryDetails?.categoryName}</div>
              </div>
            </div>
            <div className='form-group mb-3 row'>
              <div className='col-md-6'>
                <label className='text-gray-500'>Acquisition value</label>
                <div className='form-control-plaintext'>{formatCurrencyUSD(data?.acquisitionValue ?? 0)}</div>
              </div>
              <div className='col-md-6'>
                <label className='text-gray-500'>Estimated value</label>
                <div className='form-control-plaintext'>
                  {formatCurrencyUSD(data?.estimatedValue ?? 0)}
                </div>
              </div>
            </div>
            <div className='form-group mb-3 row'>
              <div className='col-md-6'>
                <label className='text-gray-500'>Low value</label>
                <div className='form-control-plaintext'>{formatCurrencyUSD(data?.lowValue ?? 0)}</div>
              </div>
              <div className='col-md-6'>
                <label className='text-gray-500'>High value</label>
                <div className='form-control-plaintext'>
                  {formatCurrencyUSD(data?.highValue ?? 0)}
                </div>
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
        {data?.attributes && Object.keys(data.attributes).length > 0 && (
          <div className='form-group mb-3'>
            <label className='text-gray-500 mb-2 fs-5'>Asset Attributes</label>
            <div className='row g-3'>
              {Object.entries(data.attributes)
                .filter(([_, value]) => value && String(value).trim() !== '')
                .map(([key, value], idx) => (
                  <div className='col-md-6 col-lg-4' key={key}>
                    <div className='card card-flush border h-100'>
                      <div className='card-body d-flex flex-column align-items-start p-4'>
                        {/* Icono decorativo (puedes cambiar el SVG o icono si quieres) */}
                        <div className='symbol symbol-30px symbol-circle bg-light-primary mb-3'>
                          <i className='bi bi-info-circle fs-3 text-primary'></i>
                        </div>
                        {/* Título del atributo */}
                        <div className='fw-semibold text-gray-600 mb-1 text-truncate'>
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
                        </div>
                        {/* Valor del atributo */}
                        <div className='fs-6 text-gray-900 text-wrap fw-bold'>{String(value)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              {/* Si no hay ningún atributo con valor, muestra mensaje */}
              {Object.values(data.attributes).filter((v) => v && String(v).trim() !== '').length ===
                0 && (
                <div className='col-12 text-center text-muted py-5'>No attributes captured</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AssetsDetail
