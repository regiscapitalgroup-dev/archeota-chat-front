import React, {useEffect, useState} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
// import { createUser, updateUser } from 'tu-servicio-usuarios'
import LoadingSpinner from '../../../components/LoadingSpinner'
import {useHistory} from 'react-router-dom'
import {UserCreateModel} from '../models/UsersCreateModel'
import {createUser, updateUser} from '../../../services/usersService'
import {RolesAutocompleteField} from './UsersRolesField'
import {useUserRoles} from '../../../hooks/users/useUserRoles'

interface UserFormProps {
  initialData?: Partial<UserCreateModel>
  isEdit?: boolean
  onSuccess?: () => void
  loadingInfo?: boolean
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('email is required'),
  nationalId: Yup.number()
    .typeError('Nationality id is required')
    .moreThan(0, 'Nationality id is required')
    .required('Nationality id is required'),

  roleId: Yup.number()
    .typeError('Role is required')
    .moreThan(0, 'Role is required')
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
    name: '',
    email: '',
    phoneNumber: '',
    nationalId: 0,
    roleId: 0,
    corporationId: 0,
    userIds: [],
    ...initialData,
  }

  const handleSubmit = async (values: UserCreateModel) => {
    setLoading(true)
    try {
      if (isEdit) {
        await updateUser(values)
      } else {
        await createUser(values)
      }
      onSuccess && onSuccess()
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
        <LoadingSpinner message='Loading users...' />
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
                  <div className='col-md-6'>
                    <div className='form-group mb-3'>
                      <label className='required'>Name</label>
                      <Field name='name' className='form-control' />
                      <div className='text-danger'>
                        <ErrorMessage name='name' />
                      </div>
                    </div>
                    <div className='form-group mb-3'>
                      <label>Phone Number</label>
                      <Field name='phoneNumber' className='form-control' />
                      <div className='text-danger'>
                        <ErrorMessage name='phoneNumber' />
                      </div>
                    </div>
                    <RolesAutocompleteField
                      name='roleId'
                      isEdit={isEdit}
                      roles={roles}
                      loading={loadingRoles}
                      errorRol={error ? error.message : undefined}
                    />
                  </div>

                  {/* Columna derecha */}
                  <div className='col-md-6'>
                    <div className='form-group mb-3'>
                      <label className='required'>Email</label>
                      <Field name='email' className='form-control' type='email' />
                      <div className='text-danger'>
                        <ErrorMessage name='email' />
                      </div>
                    </div>
                    <div className='form-group mb-3'>
                      <label className='required'>Nationality Id</label>
                      <Field name='nationalId' className='form-control' />
                      <div className='text-danger'>
                        <ErrorMessage name='nationalId' />
                      </div>
                    </div>
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
