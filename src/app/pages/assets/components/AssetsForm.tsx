import React, {useEffect, useState} from 'react'
import {Formik, Form, Field, ErrorMessage, FieldProps} from 'formik'
import * as Yup from 'yup'
import {AssetsCreateModel} from '../models/AssetsCreateModel'
import {createAssets, updateAssets} from '../../../services/assetsService'
import {NumericFormat} from 'react-number-format'
import LoadingSpinner from '../../../components/LoadingSpinner'
import {CategoryAutocompleteField} from './AssetsCategoryField'
import {DynamicAttributesFields} from './AssetsDynamicAttributesFields'
import {useHistory} from 'react-router-dom'
import {useAssetDraft} from '../../../context/AssetDraftContext'
import {useAssetsCategories} from '../../../hooks/assets/useAssetsCategories'
import {normalizeKey} from '../../../helpers/NormalzeKey'
interface AssetFormProps {
  initialData?: any
  isEdit: boolean
  onSuccess: () => void
  loadingInfo: boolean
}

const validationSchema = Yup.object({
  name: Yup.string().required('Asset name is required'),
  valueOverTime: Yup.number()
    .moreThan(0, 'Value over must be greater than 0')
    .required('Value over time is required'),
  category: Yup.string().required('Category is required'),
})

const AssetsForm: React.FC<AssetFormProps> = ({initialData, isEdit, onSuccess, loadingInfo}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [collapse, setCollapse] = useState<boolean>(false)
  const navigate = useHistory()
  const {draft, setDraft} = useAssetDraft()
  const {categories, loading: loadingCat, error} = useAssetsCategories()
  const initialValues: AssetsCreateModel = {
    id: 0,
    name: '',
    acquisitionValue: 0,
    estimatedValue: 0,
    photo: '',
    syntasisSummary: '',
    fullConversationHistory: '',
    category: 0,
    attributes: {},
    prefilledFromDraft: false,
    highValue: 0,
    lowValue: 0,
    categoryDetails: {
      attributes: null,
      categoryName: '',
      id: 0,
    },
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
      setCollapse(true)
      setFormValues({
        ...initialData,
        category: initialData.categoryDetails?.id ? Number(initialData.categoryDetails.id) : 0,
      })
      setPreviewImage(initialData.photo || null)
    }
  }, [initialData, isEdit])

  useEffect(() => {
    if (!isEdit && draft && categories.length) {
      let matchedCategory = categories.find(
        (cat) => cat.categoryName?.toLowerCase() === draft.category.toLowerCase()
      )
      let categoryId = matchedCategory ? matchedCategory.id : ''

      let mergedAttributes: {[key: string]: any} = {}

      if (matchedCategory && matchedCategory.attributes) {
        const draftAttributesNormalized = Object.fromEntries(
          Object.entries(draft.attributes || {}).map(([k, v]) => [normalizeKey(k), v])
        )

        Object.keys(matchedCategory.attributes).forEach((key) => {
          const normalizedKey = normalizeKey(key)
          mergedAttributes[key] =
            draftAttributesNormalized[normalizedKey] !== undefined
              ? draftAttributesNormalized[normalizedKey]
              : ''
        })
        setCollapse(true)
      }

      setFormValues((prev) => ({
        ...prev,
        category: Number(categoryId),
        attributes: mergedAttributes,
        prefilledFromDraft: true,
      }))
      setDraft(null)
    }
  }, [isEdit, draft, setDraft, categories])

  return (
    <div className='card card-custom card-stretch'>
      <div className='card-header'>
        <h3 className='card-title'>{`${isEdit ? 'Edit Assets' : 'New Assets'}`}</h3>
      </div>
      {loadingInfo ? (
        <LoadingSpinner message='Loading asset...' />
      ) : (
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
                        <label className='required'>Asset name</label>
                        <Field name='name' className='form-control' />
                        <div className='text-danger'>
                          <ErrorMessage name='name' />
                        </div>
                      </div>
                    </div>
                    <CategoryAutocompleteField
                      name='category'
                      isEdit={isEdit}
                      categories={categories}
                      loading={loadingCat}
                      errorCat={error ? error.message : undefined}
                    />
                    <div className='form-group row mb-3'>
                      <div className='col-md-6'>
                        <label>Acquisition Value</label>
                        <Field name='acquisitionValue'>
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
                      </div>
                      <div className='col-md-6'>
                        <label className='required'>Estimated Value</label>
                        <Field name='estimatedValue'>
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
                          <ErrorMessage name='estimatedValue' />
                        </div>
                      </div>
                    </div>

                    <div className='form-group row mb-3'>
                      <div className='col-md-6'>
                        <label>Low Value</label>
                        <Field name='lowValue'>
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
                      </div>
                      <div className='col-md-6'>
                        <label>High Value</label>
                        <Field name='highValue'>
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
                      </div>
                    </div>

                    <div className='form-group mb-3'>
                      <label>Overview</label>
                      <Field
                        as='textarea'
                        name='syntasisSummary'
                        className='form-control'
                        rows={3}
                      />
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
                <div className='col-lg-12'>
                  <div className='accordion text-dark mt-4' id='kt_accordion'>
                    <div className='accordion-item '>
                      <h2 className='accordion-header' id='headingOne'>
                        <button
                          className='accordion-button'
                          type='button'
                          data-bs-toggle='collapse'
                          data-bs-target='#collapseOne'
                          aria-expanded='true'
                          aria-controls='collapseOne'
                        >
                          More information
                        </button>
                      </h2>
                      <div
                        id='collapseOne'
                        className={`accordion-collapse collapse${collapse ? ' show' : ''}`}
                        aria-labelledby='headingOne'
                        data-bs-parent='#kt_accordion'
                      >
                        <div className='accordion-body'>
                          <DynamicAttributesFields
                            attrField='attributes'
                            prefilledFromDraft={formValues.prefilledFromDraft}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='card-footer d-flex gap-2'>
                <button
                  type='button'
                  className='btn btn-secondary flex-grow-1'
                  style={{minWidth: 0}}
                  onClick={() => navigate.push('/assets')}
                >
                  Cancel
                </button>

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
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  )
}

export default AssetsForm
