import clsx from "clsx";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import * as Yup from 'yup';
import ComponentModalTemplate from "../../../components/templates/ComponentModalTemplate";
import PasswordInputAtom from "../components/atoms/PasswordInputAtom";
import AuthTemplateWrapper from "../components/templates/AuthTemplateWrapper";
import AuthTermsConditions from "../components/templates/AuthTermsConditions";
import { activateAccount } from "../../../services/authService";

const schema = Yup.object().shape({
    password: Yup.string()
        .matches(/[a-z]/, "Debe contener una letra minúscula")
        .matches(/[A-Z]/, "Debe contener una letra mayúscula")
        .matches(/\d/, "Debe contener un número")
        .min(8, 'Minimum 8 characters')
        .max(50, 'Maximum 50 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .when('password', {
            is: (val: string) => val && val.length > 0,
            then: (schema) => schema.oneOf([Yup.ref('password')], 'Passwords must match')
        }).required('Password is required'),
    agreeToTerms: Yup.bool()
        .isTrue('You must accept the terms')
});


const initialValues = {
    password: '',
    confirmPassword: '',
    agreeToTerms: false
}

const Confirmation = () => {
    const history = useHistory();
    const isMountedRef = useRef(false);
    const [loading, setLoading] = useState(false);
    const {id, token} = useParams<{ id: string; token: string }>();

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        }
    }, []);

    useEffect(() => {
        if(!id || !token)
            history.push('/auth/login');
    }, [id, token]);

    const _readTermsAndConditions = async (setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) => {
        const _result = await ComponentModalTemplate({
            children: <AuthTermsConditions/>,
            options: {
                title: 'Terms and conditions',
                showCloseButton: false,
                showCancelButton: false,
                showConfirmButton: false,
                scrollbarPadding: false,
                heightAuto: false,
                width: '40dvw'
            }
        });
        if(isMountedRef.current) {
            setFieldValue('agreeToTerms', _result.isConfirmed);
        }
    }

    const _handleOnSubmit = async ({ password }: { password: string }, setStatus: (status?: any) => void) => {
        setLoading(true);
        try {
            await activateAccount(id, token, password);
            if(isMountedRef.current)
                history.push('/auth/login');
        }
        catch (error) {
            if(isMountedRef.current)
                setStatus((error as any)?.response?.data?.password?.[0] ?? "There was an error while saving the password. Please try again.")
        }
        finally {
            if(isMountedRef.current)
                setLoading(false);
        }
    }

    return (
        <AuthTemplateWrapper>
            <div className="text-center mb-10">
                <h1 className="text-dark mb-3">Confirm your access</h1>
                <div className="text-gray-400 fw-bold fs-4">
                    Please confirm your password below.
                </div>
            </div>
            
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(v, { setStatus }) => _handleOnSubmit(v, setStatus)}
            >
                {({ dirty, isValid, setFieldValue, status })=> (
                    <Form>
                        { !!status && (
                            <div className='mb-5 alert alert-danger'>
                                <div className='alert-text font-weight-bold'>{status}</div>
                            </div>
                        )}
                        <div className="fv-row mb-10">
                            <label className='form-label fs-6 fw-bolder text-dark'>Password</label>
                            <PasswordInputAtom>
                                <Field name='password' type='password' className={clsx('form-control form-control-lg form-control-solid')} />
                            </PasswordInputAtom>
                            <div className="text-danger">
                                <ErrorMessage name='password' />
                            </div>
                        </div>
                        <div className="fv-row mb-10">
                            <label className='form-label fs-6 fw-bolder text-dark'>Confirm password</label>
                            <PasswordInputAtom>
                                <Field
                                    onDrop={(e: any) => e.preventDefault()}
                                    onContextMenu={(e: any) => e.preventDefault()}
                                    onPaste={(e: any) => e.preventDefault()} 
                                    name='confirmPassword' 
                                    type='password' 
                                    className={clsx('form-control form-control-lg form-control-solid')} 
                                />
                            </PasswordInputAtom>
                            <div className="text-danger">
                                <ErrorMessage name='confirmPassword' />
                            </div>
                        </div>
                        <div className="fv-row mb-10">
                            <div className="form-check form-check-custom form-check-solid">
                                <Field name='agreeToTerms'>
                                    {({ field }: FieldProps) => (
                                        <input 
                                            type="checkbox" 
                                            className="form-check-input"
                                            id="agreeToTerms"
                                            name="agreeToTerms"
                                            checked={field.value}
                                            onChange={() => _readTermsAndConditions(setFieldValue)}
                                        />
                                    )}
                                </Field>
                                <label className="form-check-label" htmlFor="agreeToTerms">
                                    I agree to Archeota's Terms and Conditions
                                </label>
                            </div>
                            <div className="text-danger">
                                <ErrorMessage name='agreeToTerms' />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-lg btn-dark w-100 mb-5"
                            disabled={ !dirty || !isValid}
                        >
                            { loading ? (
                                <span className='indicator-progress' style={{display: 'block'}}>
                                    Please wait...
                                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                </span>
                            ):(
                                <span className='indicator-label'>
                                    Set password
                                </span>
                            )}
                        </button>

                    </Form>
                )}
            </Formik>

        </AuthTemplateWrapper>
    )
}

export default Confirmation;