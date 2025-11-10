import { ErrorMessage, Field, FieldProps, Form, Formik, FormikProps } from "formik"
import { ChangeEvent, useState } from "react"
import { useHistory, useLocation, useParams } from "react-router-dom"
import Select from "react-select"
import * as Yup from 'yup'
import LoadingSpinner from "../../../components/LoadingSpinner"
import countries from "../../../constants/countries"
import { useUserRoles } from "../../../hooks/users/useUserRoles"
import { RouteParamsModel } from "../../shared/models/RouteParamsModel"
import { Classifiers } from "../mock/classifiers.mock"
import { UserCreateModel } from "../models/UsersCreateModel"
import clsx from "clsx"

const _countriesOptions = countries.map(c => ({ ...c, value: c.country, label: c.country }))
const _classifiersOptions = Classifiers.map(c => ({ value: c.id, label: c.name, color: c.color }));

const initialValues: UserCreateModel = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  role: '',
  active: true,
  is_staff: false,
  address: '',
  national_id: '',
  country: '',
  phone_number: '',
  classifier_id: undefined
};

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email('Wrong email format').min(4, 'Minimum 4 characters').required('Email is required'),
  password: Yup.string().min(3, 'Minimum 3 characters').required('Password is required'),
  role: Yup.string().required('Role is required'),
  phone_number: Yup.string().required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  country: Yup.string().required('Country is required'),
  national_id: Yup.string().required('ID is required')
})


const UsersForm: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  // const [usersSelected, setUsersSelected] = useState<UserCreateModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [countryCode, setCountryCode] = useState<string | null>(null);

  const isEdited = location.pathname.includes('/edit');
  const { id: routeId } = useParams<RouteParamsModel>();
  const { roles, loading: loadingRoles } = useUserRoles();

  const handleSubmit = (values: any) => {
    history.push('/users')
  }

  const _handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const _file = e.currentTarget.files?.[0];
    if(!_file) return;
    setPreviewImage(URL.createObjectURL(_file));
  };

  const _handleRemoveImage = () => {
    setPreviewImage(null);
  }

  const handleSelectCountry = (value: {value: string, phoneCode: string}, name: string, form: FormikProps<any>) => {
    console.log(value);
    setCountryCode(!!value.phoneCode ? (value.phoneCode.startsWith('+') ?value.phoneCode:`+${value.phoneCode}`).trim() : null);
    form.setFieldValue(name, value.value)
  }


  return (
    <div className='card mb-10'>
      <div className='card-body'>
        <div className='card-header border-0 pt-5 d-flex justify-content-between align-items-center'>
            <h3 className="card-title align-items-start flex-column">
                <span className='fw-bolder text-dark fs-3'>Users</span>
                <span className='text-muted mt-1 fs-7'>{ isEdited ? 'Edit your user': 'Create an user'  }</span>
            </h3>
        </div>
        <div className="card-body">
          { loading ? <LoadingSpinner message="Loading..."/> : (
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              <Form className="form">
                <div className="d-flex flex-column gap-3">

                  <div className="d-flex flex-wrap gap-3">
                    <div className="flex-grow-1 d-inline-flex flex-column align-items-center">
                      <span>Image</span>
                      <div 
                        className="image-input-outline image-input-wrapper rounded border" 
                        style={{
                          width: '15rem',
                          height: '15rem',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          boxShadow: '0 0.5rem 1.5rem 0.5rem rgba(0, 0, 0, 0.075)',
                          backgroundImage: (previewImage ? `url(${previewImage})`: 'url("/media/avatars/user_default.jpg")')
                         }}
                        ></div>

                        <div className="d-inline-flex flex-row gap-3 mt-3">
                          <label className="btn btn-sm btn-light font-weight-bold">
                            <i className="fa fa-pen"></i> { previewImage? 'Change image': 'Upload image' }
                            <input type="file" accept=".png,.jpg,.jpeg" hidden onChange={_handleImageUpload} />
                          </label>
                         {previewImage &&
                            <button type="button" className="btn btn-sm btn-light-danger font-weight-bold" onClick={_handleRemoveImage}>
                              <i className='fa fa-times'></i> Remove
                            </button>
                         }
                        </div>
                    </div>

                    <div className="flex-grow-1 d-inline-flex flex-column gap-4">
                      <div className="row gy-3">
                        <div className="col-12 col-md-6">
                          <label className="required">First Name</label>
                          <Field name="first_name" className="form-control"/>
                          <div className="text-danger">
                            <ErrorMessage name="first_name"/>
                          </div>
                        </div>

                        <div className="col-12 col-md-6">
                          <label className="required">Last Name</label>
                          <Field name="last_name" className="form-control"/>
                          <div className="text-danger">
                            <ErrorMessage name="last_name"/>
                          </div>
                        </div>

                      </div>

                      <div className="row gy-3">
                        <div className="col-12 col-md-6">
                          <label className="required">Email</label>
                          <Field name="email" className="form-control" type='email'/>
                          <div className="text-danger">
                            <ErrorMessage name="email"/>
                          </div>
                        </div>

                        <div className="col-12 col-md-6">
                          <label className="required">Password</label>
                          <div className="input-group">
                            <Field name="password" className="form-control" type={showPassword ? 'text': 'password'} />
                            <span className="input-group-text cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}> 
                              { showPassword ? 
                                <i className="bi bi-eye-slash-fill"></i> 
                                :
                                <i className="bi bi-eye-fill"></i> 
                              }
                            </span>
                          </div>
                          <div className="text-danger">
                            <ErrorMessage name="password"/>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 col-md-6">
                          <label className="required">Role</label>
                          <Field name='role'>
                            {({field, form}: FieldProps) => (
                              <Select
                                loading={loadingRoles}
                                inputId='role'
                                placeholder='Select a role'
                                classNamePrefix="react-select"
                                options={roles.map(r => ({value: r.code, label: r.code}))}
                                onChange={(value: any) => form.setFieldValue(field.name, value.value)}
                              />
                            )}
                          </Field>
                          <div className="text-danger">
                            <ErrorMessage name="role"/>
                          </div>
                        </div>

                        <div className="col-12 col-md-6">
                          <label className="required">Country</label>
                          <Field name="country">
                            {({field, form}: FieldProps) => (
                              <Select
                                inputId='country'
                                placeholder='Select a country'
                                classNamePrefix="react-select"
                                options={_countriesOptions}
                                onChange={(value: any) => handleSelectCountry(value, field.name, form)}
                                formatOptionLabel={(option: any) => (
                                  <div className="d-inline-flex flex-row gap-3 align-items-center">
                                    <img
                                      src={option.flag}
                                      alt={option.label}
                                      style={{ width: "20px", height: "15px", objectFit: "cover" }}
                                    />
                                    <span>{option.label}</span>
                                  </div>
                                )}
                              />
                            )}
                          </Field>

                          <div className="text-danger">
                            <ErrorMessage name="country"/>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                          <div className="col-12 col-md-6">
                            <label>Classification</label>
                            <Field name="classifier_id">
                              {({field, form}: FieldProps) => (
                                <Select
                                  inputId='classifier_id'
                                  placeholder='Select a classifier'
                                  classNamePrefix="react-select"
                                  options={_classifiersOptions}
                                  onChange={(value: any) => form.setFieldValue(field.name, value)}
                                  formatOptionLabel={(option: any) => (
                                    <span className={clsx('badge fw-bolder text-uppercase fs-9 px-2 py-1 text-truncate classifier', option.color)}>
                                      {option.label}
                                    </span>
                                  )}
                                />
                              )}
                            </Field>
                          </div>
                          { isEdited &&
                            <div className="col-12 col-md-6 d-flex align-items-center">
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="editActive" />
                                <label className="form-check-label" htmlFor="editActive">Active</label>
                              </div>
                            </div>
                          }
                      </div>
                    </div>

                  </div>

                  <div className="separator mt-4 mb-3"></div>
                  <div className="col">
                    <label className="required">Address</label>
                    <Field name="address" className="form-control"/>
                    <div className="text-danger">
                      <ErrorMessage name="address"/>
                    </div>
                  </div>

                  <div className="row gy-3">
                    <div className="col-12 col-md-6">
                      <label className="required">Phone number</label>
                      <div className="input-group">
                        { countryCode && 
                          <span className="input-group-text">{ countryCode }</span>
                        }
                        <Field name="phone_number" className="form-control"/>
                      </div>
                      <div className="text-danger">
                        <ErrorMessage name="phone_number"/>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="required">National ID</label>
                      <Field name="national_id" className="form-control"/>
                      <div className="text-danger">
                        <ErrorMessage name="national_id"/>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="card-footer d-flex gap-2 mt-3">
                  <button
                    type='button'
                    className='btn btn-secondary flex-grow-1 mw-5'
                    style={{minWidth: 0}}
                    onClick={() => history.push('/users')}
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    id='kt_sign_in_submit'
                    className='btn btn-dark flex-grow-1'
                    style={{minWidth: 0}}
                  >
                      {
                          !sending ? 
                          (<span className="indicator-label">Save</span>) 
                          : (<span>Saving... <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>)
                      }
                  </button>

                </div>
              </Form>
            </Formik>
          )}
        </div>
      </div>
    </div>
  )
}

export default UsersForm;