import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {createClaims} from '../../../services/cliamsService'
import {useHistory} from 'react-router-dom'

type Props = {
  onUploadSuccess?: (value: number, guid: string) => void
}

const dropzoneStyle: React.CSSProperties = {
  border: '2px dashed #3699FF',
  borderRadius: 8,
  padding: 40,
  textAlign: 'center',
  background: '#f1faff',
  color: '#3699FF',
  cursor: 'pointer',
  transition: 'border .24s ease-in-out',
}

const UploadClaimsTransactionsFile: React.FC<Props> = ({onUploadSuccess}) => {
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [uploading, setUploading] = useState<boolean>(false)
  const [processing, setProcessing] = useState<boolean>(false)
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null)
  const [fileName, setFileName] = useState<string>('')
  const navigate = useHistory()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return

    const file = acceptedFiles[0]
    setFileName(file.name)
    setUploadProgress(0)
    setUploading(true)
    setUploadSuccess(null)
    setProcessing(false)

    createClaims(file, (progressEvent) => {
      if (progressEvent.total) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setUploadProgress(percent)
        if (percent === 100) setProcessing(true)
      }
    })
      .then((data) => {
        const {importJobId} = data
        setUploadSuccess(true)
        setTimeout(() => {
          onUploadSuccess?.(Math.random() * 100, importJobId)
          navigate.push('/claims/transactions')
        }, 1200)
      })
      .catch(() => setUploadSuccess(false))
      .finally(() => {
        setUploading(false)
        setProcessing(false)
      })
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    noClick: false,
  })

  return (
    <div className='card card-flush py-5 px-5' style={{maxWidth: 500, margin: '0 auto'}}>
      <div
        {...getRootProps()}
        style={{
          ...dropzoneStyle,
          borderColor: isDragActive ? '#0abb87' : '#3699FF',
          background: isDragActive ? '#e8fff3' : '#f1faff',
        }}
        className='mb-4'
      >
        <input {...getInputProps()} />
        <i className='ki-duotone ki-upload fs-1 mb-3'></i>
        <p className='fs-5 fw-bold'>
          {isDragActive ? 'Drop the file here…' : 'Drag and drop your Excel file here'}
        </p>
        <p className='text-gray-500 fs-7'>
          Only files <span className='fw-bold'>.xlsx</span> and{' '}
          <span className='fw-bold'>.xls</span>
        </p>
      </div>

      {uploading && (
        <div className='mb-2'>
          <div className='progress h-8px w-100 mb-2'>
            <div
              className='progress-bar bg-primary'
              role='progressbar'
              style={{width: `${uploadProgress}%`}}
              aria-valuenow={uploadProgress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className='fw-bold'>
            {fileName} — {uploadProgress}%
          </div>
          {uploadProgress === 100 && processing && (
            <div className='d-flex align-items-center mt-2'>
              <span className='spinner-border spinner-border-sm text-primary me-2'></span>
              <span>Processing file...</span>
            </div>
          )}
        </div>
      )}

      {uploadSuccess === true && (
        <div className='alert alert-success py-2'>File uploaded successfully!</div>
      )}

      {uploadSuccess === false && (
        <div className='alert alert-danger py-2'>Error uploading file.</div>
      )}
    </div>
  )
}

export default UploadClaimsTransactionsFile
