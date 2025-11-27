import clsx from "clsx";
import { Field, FieldProps, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import GoogleLoginButton from "../../../modules/auth/components/GoogleLoginButton";
import { login } from "../../../modules/auth/redux/AuthCRUD";
import * as auth from '../../../modules/auth/redux/AuthRedux';
import AuthTemplateWrapper from "../components/templates/AuthTemplateWrapper";

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Wrong email format')
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Email is required'),
    password: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Password is required')
});

const initialValues = {
  email: '',
  password: '',
}

const Login: React.FC = () => {
    const isMountedRef = useRef(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        }
    }, []);

    const _handleLogin = async (values: { email: string, password: string }, setStatus: (status?: any) => void) => {
        setLoading(true);
        try {
            const _data = await login(values.email, values.password);
            if(isMountedRef.current)
                dispatch(auth.actions.login(_data.access));
        }
        catch (error) {
            console.error(error);
            if(isMountedRef.current)
                setStatus('The login detail is incorrect');
        }
        finally {
            if(isMountedRef.current)
                setLoading(false);
        }
    }

    return (
        <AuthTemplateWrapper>
            <div className="text-center mb-10">
                <h1 className="text-dark mb-3">Sign In to Archeota</h1>
                <div className="text-gray-400 fw-bold fs-4">
                    New Here?
                    <Link to='/auth/register' className="ms-2 link-dark fw-bolder">
                        Create an Account
                    </Link>
                </div>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={(v, { setStatus }) => _handleLogin(v, setStatus)}
                validationSchema={schema}
            >
                { ({ status, touched, errors, isValid }) => (
                    <Form>
                        { !!status && (
                            <div className='mb-lg-15 alert alert-danger'>
                                <div className='alert-text font-weight-bold'>{status}</div>
                            </div>
                        )}
                        <div className="fv-row mb-10">
                            <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
                            <Field name='email'>
                            {({ field }: FieldProps) => (
                                <input 
                                    {...field}
                                    type="email" 
                                    placeholder="Email"
                                    name='email'
                                    className={clsx('form-control form-control-lg form-control-solid', { 'is-invalid': touched.email && errors.email }, { 'is-valid': touched.email && !errors.email })} 
                                    autoComplete='off'
                                    value={field.value}
                                />
                            )}
                            </Field>
                            { !!errors.email && (
                                <div className='fv-plugins-message-container'>
                                <span role='alert'>
                                        { errors.email }
                                    </span> 
                                </div>
                            )}
                        </div>
                        <div className="fv-row mb-10">
                            <div className='d-flex justify-content-between mt-n5'>
                                <div className='d-flex flex-stack mb-2'>
                                    <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
                                    <Link
                                        to='/auth/forgot-password'
                                        className='text-gray-600 fs-7 fw-bolder ms-4'
                                        style={{marginLeft: '5px'}}
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>
                            <Field name='password'>
                                {({field}: FieldProps) => (
                                    <input 
                                        {...field}
                                        type="password"
                                        placeholder="Password"
                                        name='password'
                                        className={
                                            clsx('form-control form-control-lg form-control-solid', 
                                                { 'is-invalid': touched.password && errors.password }, 
                                                { 'is-valid': touched.password && !errors.password }
                                            )} 
                                        autoComplete="off"
                                        value={field.value}
                                    />
                                )}
                            </Field>
                            { !!errors.password && (
                                <div className='fv-plugins-message-container'>
                                    <div className='fv-help-block'>
                                        <span role='alert'>
                                            { errors.password }
                                        </span> 
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='text-center'>
                            <button
                                type='submit'
                                className='btn btn-lg btn-dark w-100 mb-5'
                                disabled={loading || !isValid}
                            >
                                { loading ? (
                                    <span className='indicator-progress' style={{display: 'block'}}>
                                        Please wait...
                                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                    </span>
                                ) : (
                                    <span className='indicator-label'>Continue</span>
                                )}
                            </button>
                            <div className='text-center text-muted text-uppercase fw-bolder mb-5'>or</div>
                            <GoogleLoginButton />
                        </div>


                    </Form>
                )}
                
            </Formik>         
        </AuthTemplateWrapper>
    )
}

export default Login;