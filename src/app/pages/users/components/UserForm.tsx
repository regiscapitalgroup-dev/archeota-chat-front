import React, {useState} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import LoadingSpinner from '../../../components/LoadingSpinner'
import {useHistory} from 'react-router-dom'
import {UserCreateModel} from '../models/UsersCreateModel'
import {createUser, updateUser} from '../../../services/usersService'
import {RolesAutocompleteField} from './UsersRolesField'
import {useUserRoles} from '../../../hooks/users/useUserRoles'
import Swal from 'sweetalert2'

interface UserFormProps {
  initialData?: Partial<UserCreateModel>
  isEdit?: boolean
  onSuccess?: () => void
  loadingInfo?: boolean
}

const validationSchema = Yup.object({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('email is required'),
  role: Yup.string()
    .typeError('Role is required')
    .required('Role is required'),
})

const UserForm = ({
  initialData = {},
  isEdit = false,
  onSuccess,
  loadingInfo = false,
}: UserFormProps) => {
  const [loading, setLoading] = useState(false)
  const navigate = useHistory()
  const {roles, loading: loadingRoles, error} = useUserRoles()
  const initialValues: UserCreateModel = {
    first_name: '',
    last_name: '',
    email: '',
    role: '',
    password: '12345',
    ...initialData,
  }

  const handleSubmit = async (values: UserCreateModel) => {
    setLoading(true)
    try {
      if (isEdit) {
        await updateUser(values)
          .then(() => {
            onSuccess && onSuccess()
          })
          .catch((error) => {
            const nonFieldErrors = error?.response?.data?.nonFieldErrors
            Swal.fire({           
              icon: 'error',
              title: 'Oops...',
              text: nonFieldErrors,
              customClass: {
                confirmButton: 'btn-dark',
              },
            })
            console.log('nonFieldErrors', nonFieldErrors)
          })
      } else {
        await createUser(values)
          .then(() => {
            onSuccess && onSuccess()
          })
          .catch((error) => {
            const nonFieldErrors = error?.response?.data?.nonFieldErrors
            Swal.fire({           
              icon: 'error',
              title: 'Oops...',
              text: nonFieldErrors,
              customClass: {
                confirmButton: 'btn-dark',
              },
            })
            console.log('nonFieldErrors', nonFieldErrors)
            console.log('error', error)
          })
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='card card-custom card-stretch'>
      <div className='card-header'>
        <h3 className='card-title'>{isEdit ? 'Edit User' : 'New User'}</h3>
      </div>
      {loadingInfo ? (
        <LoadingSpinner message='Loading data...' />
      ) : (
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({values, setFieldValue}) => (
            <Form className='form'>
              <div className='card-body'>
                <div className='row'>
                  {/* Columna izquierda */}
                  <div className='col-md-12'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='form-group mb-3'>
                          <label className='required'>First Name</label>
                          <Field name='first_name' className='form-control' />
                          <div className='text-danger'>
                            <ErrorMessage name='first_name' />
                          </div>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='form-group mb-3'>
                          <label className='required'>Last Name</label>
                          <Field name='last_name' className='form-control' />
                          <div className='text-danger'>
                            <ErrorMessage name='last_name' />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className='form-group mb-3'>
                      <label className='required'>Email</label>
                      <Field name='email' className='form-control' type='email' />
                      <div className='text-danger'>
                        <ErrorMessage name='email' />
                      </div>
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <RolesAutocompleteField
                      name='role'
                      isEdit={isEdit}
                      roles={roles}
                      loading={loadingRoles}
                      errorRol={error ? error.message : undefined}
                    />
                    {/* <div className='form-group mb-3'>
                      <label className='required'>Nationality Id</label>
                      <Field name='nationalId' className='form-control' />
                      <div className='text-danger'>
                        <ErrorMessage name='nationalId' />
                      </div>
                    </div> */}
                  </div>
                </div>

                {/* Aquí puedes agregar asociaciones por rol si las necesitas */}
                {/* 
        {values.role === 'user' && (
          <div className="form-group mb-3">
            <label>Corporation asociada</label>
            <Field name="corporationId" as="select" className="form-control">
              <option value="">Sin asociación</option>
              {corporationsList.map((corp) => (
                <option key={corp.id} value={corp.id}>
                  {corp.name}
                </option>
              ))}
            </Field>
          </div>
        )}

        {values.role === 'corporation' && (
          <div className="form-group mb-3">
            <label>Users asociados</label>
            <Field name="userIds" as="select" multiple className="form-control">
              {usersList.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Field>
          </div>
        )}
        */}
              </div>

              <div className='card-footer d-flex gap-2'>
                <button
                  type='button'
                  className='btn btn-secondary flex-grow-1'
                  style={{minWidth: 0}}
                  onClick={() => navigate.push('/users')}
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  className='btn btn-dark flex-grow-1'
                  disabled={loading}
                  style={{minWidth: 0}}
                >
                  {!loading ? (
                    <span>Saved</span>
                  ) : (
                    <span>
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

export default UserForm
