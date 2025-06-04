import React, {useEffect, useState} from 'react'
import {Formik, Form, Field, ErrorMessage, FieldProps} from 'formik'
import * as Yup from 'yup'
import {AssetsCreateModel} from '../models/AssetsCreateModel'
import {createAssets, updateAssets} from '../../../services/assetsService'
import {NumericFormat} from 'react-number-format'

interface AssetFormProps {
  initialData?: any
  isEdit: boolean
  onSuccess: () => void
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  value: Yup.number().min(0, 'Value must be positive').required('Value is required'),
  valueOverTime: Yup.number()
    .min(0, 'Value over time must be positive')
    .required('Value over time is required'),
})

const AssetsForm: React.FC<AssetFormProps> = ({initialData, isEdit, onSuccess}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const initialValues: AssetsCreateModel = {
    id: 0,
    name: '',
    value: 0,
    valueOverTime: 0,
    photo: '',
    syntasisSummary: '',
    fullConversationHistory: '',
  }
  const [formValues, setFormValues] = useState<AssetsCreateModel>(initialValues)

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = e.currentTarget.files?.[0]
    if (file) {
      const file = e.currentTarget.files?.[0]
      if (file) {
        setPreviewImage(URL.createObjectURL(file))
        setFieldValue('photo', file)
      }
    }
  }

  const handleRemoveImage = (setFieldValue: (field: string, value: any) => void) => {
    setPreviewImage(null)
    setFieldValue('photo', '')
  }

  const handleSubmit = async (values: any) => {
    setLoading(true)
    try {
      if (isEdit) {
        await updateAssets(values)
      } else {
        await createAssets(values)
      }
      onSuccess()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isEdit && initialData) {
      setFormValues(initialData)
      setPreviewImage(initialData.photo || null)
    }
  }, [initialData, isEdit])

  return (
    <div className='card card-custom card-stretch'>
      <div className='card-header'>
        <h3 className='card-title'>New Assets</h3>
      </div>

      <Formik
        enableReinitialize
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({setFieldValue}) => (
          <Form className='form'>
            <div className='card-body'>
              <div className='row'>
                {/* Columna izquierda con campos */}
                <div className='col-lg-8'>
                  <div className='form-group row mb-3'>
                    <div className='col-md-12'>
                      <label className='required'>Name</label>
                      <Field name='name' className='form-control' />
                      <div className='text-danger'>
                        <ErrorMessage name='name' />
                      </div>
                    </div>
                  </div>

                  <div className='form-group row mb-3'>
                    <div className='col-md-6'>
                      <label className='required'>Value</label>
                      <Field name='value'>
                        {({field, form}: FieldProps) => (
                          <NumericFormat
                            className='form-control'
                            thousandSeparator=','
                            decimalSeparator='.'
                            prefix='$'
                            decimalScale={2}
                            fixedDecimalScale={true}
                            allowNegative={false}
                            value={field.value ?? 0}
                            onValueChange={({floatValue}) => {
                              form.setFieldValue(field.name, floatValue ?? 0)
                            }}
                          />
                        )}
                      </Field>
                      <div className='text-danger'>
                        <ErrorMessage name='value' />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <label className='required'>Value over time</label>
                      <Field name='valueOverTime'>
                        {({field, form}: FieldProps) => (
                          <NumericFormat
                            className='form-control'
                            thousandSeparator=','
                            decimalSeparator='.'
                            prefix='$'
                            decimalScale={2}
                            fixedDecimalScale={true}
                            allowNegative={false}
                            value={field.value ?? 0}
                            onValueChange={({floatValue}) => {
                              form.setFieldValue(field.name, floatValue ?? 0)
                            }}
                          />
                        )}
                      </Field>
                      <div className='text-danger'>
                        <ErrorMessage name='valueOverTime' />
                      </div>
                    </div>
                  </div>

                  <div className='form-group mb-3'>
                    <label>Syntasis summary</label>
                    <Field as='textarea' name='syntasisSummary' className='form-control' rows={3} />
                  </div>

                  <div className='form-group mb-3'>
                    <label>Full conversation history</label>
                    <Field
                      as='textarea'
                      name='fullConversationHistory'
                      className='form-control'
                      rows={3}
                    />
                  </div>
                </div>

                {/* Columna derecha con subida de imagen */}
                <div className='col-lg-4 d-flex flex-column align-items-center'>
                  <label className='font-weight-bold'>Image</label>
                  <div
                    className='image-input image-input-outline'
                    style={{
                      width: '100%',
                      maxWidth: '250px',
                      position: 'relative',
                    }}
                  >
                    <div
                      className='image-input-wrapper rounded border'
                      style={{
                        width: '100%',
                        paddingTop: '100%',
                        backgroundImage: previewImage
                          ? `url(${previewImage})`
                          : 'url("/media/users/blank.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                      }}
                    ></div>

                    <div className='d-flex justify-content-center mt-2'>
                      <label className='btn btn-sm btn-light font-weight-bold mr-2 mb-0'>
                        <i className='fa fa-pen'></i> {previewImage ? 'Change' : 'Upload image'}
                        <input
                          type='file'
                          accept='.png, .jpg, .jpeg'
                          hidden
                          onChange={(e) => handleImageUpload(e, setFieldValue)}
                        />
                      </label>
                      {previewImage && (
                        <button
                          type='button'
                          className='btn btn-sm btn-light-danger font-weight-bold mb-0'
                          onClick={() => handleRemoveImage(setFieldValue)}
                        >
                          <i className='fa fa-times'></i> Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='card-footer d-flex gap-2'>
              <button
                type='submit'
                id='kt_sign_in_submit'
                className='btn btn-dark flex-grow-1'
                style={{minWidth: 0}}
              >
                {!loading && <span className='indicator-label'>Saved</span>}
                {loading && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>

              {/*    <button type='reset' className='btn btn-secondary flex-grow-1' style={{minWidth: 0}}>
                Cancel
              </button> */}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AssetsForm
