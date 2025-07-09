/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import * as Yup from 'yup'
import clsx from 'clsx'
import * as auth from '../redux/AuthRedux'
import {useFormik} from 'formik'
import {IUpdatePassword, updatePassword} from '../models/UserSettingsModel'
import {recoverAccount} from '../redux/AuthCRUD'

export function ResetPassword() {
  useEffect(() => {
    document.body.classList.add('bg-white')
    return () => {
      document.body.classList.remove('bg-white')
    }
  }, [])

  const resetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(8, 'The password must be at least 8 characters long.')
      .matches(/[A-Z]/, 'The password must contain at least one capital letter.')
      .matches(/[a-z]/, 'The password must contain at least one lowercase letter.')
      .matches(/[0-9]/, 'The password must contain at least one number.')
      .matches(/[^A-Za-z0-9]/, 'The password must contain at least one special character.')
      .required('Password is required'),
    passwordConfirmation: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  })

  const [loading, setLoading] = useState(false)
  const [passwordUpdateData, setPasswordUpdateData] = useState<IUpdatePassword>(updatePassword)
  const [errorAlert, setErrorAlert] = useState(false)

  const {token} = useParams<{token: string}>()
  const {user} = useParams<{user: string}>()
  const history = useHistory()
  const dispatch = useDispatch()
  const formik = useFormik<IUpdatePassword>({
    initialValues: {
      ...passwordUpdateData,
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      setLoading(true)

      if (token) {
        await recoverAccount(token, values.newPassword, user)
          .then((data) => {
            const {access} = data
            setPasswordUpdateData(values)
            setLoading(false)

            dispatch(auth.actions.login(access))
            setTimeout(() => {
              history.push('/dashboard/new')
            }, 1000)
          })
          .catch(() => {
            setLoading(false)
            setErrorAlert(true)
          })
      }
    },
  })

  return (
    <>
      <div className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'>
        {/* begin::Content */}
        <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
          {errorAlert && (
            <div className='alert alert-danger' role='alert'>
              Something went wrong. Please try again or contact support if the problem persists.
            </div>
          )}
          <form
            className='form w-100'
            onSubmit={formik.handleSubmit}
            noValidate
            id='kt_login_signin_form'
          >
            {/* begin::Heading */}
            <div className='text-center mb-10'>
              <h1 className='text-dark mb-3'>Reset your password</h1>
              <div className='text-gray-400 fw-bold fs-4'>
                Please enter and confirm your new password below.
              </div>
            </div>

            {/* begin::Heading */}

            {formik.status ? (
              <div className='mb-lg-15 alert alert-danger'>
                <div className='alert-text font-weight-bold'>{formik.status}</div>
              </div>
            ) : null}

            {/* begin::Form group */}
            <div className='fv-row mb-10'>
              <label className='form-label fs-6 fw-bolder text-dark'>Password</label>

              <div className='position-relative mb-3'>
                <input
                  placeholder='Password'
                  {...formik.getFieldProps('newPassword')}
                  className={clsx(
                    'form-control form-control-lg form-control-solid',
                    {'is-invalid': formik.touched.newPassword && formik.errors.newPassword},
                    {
                      'is-valid': formik.touched.newPassword && !formik.errors.newPassword,
                    }
                  )}
                  type='password'
                  autoComplete='off'
                />
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <div className='fv-plugins-message-container'>
                    <span role='alert'>{formik.errors.newPassword}</span>
                  </div>
                )}
              </div>
            </div>
            {/* end::Form group */}

            {/* begin::Form group */}
            <div className='fv-row mb-10'>
              <div className='d-flex justify-content-between mt-n5'>
                <div className='d-flex flex-stack mb-2'>
                  {/* begin::Label */}
                  <label className='form-label fw-bolder text-dark fs-6 mb-0'>
                    Confirm Password
                  </label>
                  {/* end::Label */}
                </div>
              </div>
              <input
                type='password'
                placeholder='Confirm password'
                autoComplete='off'
                {...formik.getFieldProps('passwordConfirmation')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {
                    'is-invalid':
                      formik.touched.passwordConfirmation && formik.errors.passwordConfirmation,
                  },
                  {
                    'is-valid':
                      formik.touched.passwordConfirmation && !formik.errors.passwordConfirmation,
                  }
                )}
              />
              {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.passwordConfirmation}</span>
                  </div>
                </div>
              )}
            </div>
            {/* end::Form group */}

            {/* begin::Action */}
            <div className='text-center'>
              <button
                type='submit'
                id='kt_sign_in_submit'
                className='btn btn-lg btn-dark w-100 mb-5'
                disabled={formik.isSubmitting || !formik.isValid}
              >
                {!loading && <span className='indicator-label'>Continue</span>}
                {loading && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
            {/* end::Action */}
          </form>
        </div>
        {/* end::Content */}
      </div>
    </>
  )
}
