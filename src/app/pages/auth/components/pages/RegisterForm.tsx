import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import Select from "react-select";
import * as Yup from 'yup';
import { getCountryOptions } from "../../../../helpers/countryData";
import { RegisterAccountModel } from "../../models/RegisterAccountModel";
import { CountryInfoAtom } from "../../../../components/atoms/CountryInfoAtom";
import { useState } from "react";

const schema = Yup.object({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email:  Yup.string().email('Wrong email format').required('Email is required'),
    country: Yup.string().required('Country is required'),
    address: Yup.string().required('Address is required'),
    phone_number: Yup.string().required('Phone number is required'),
    national_id: Yup.string().required('National ID is required') 
})

const initialValues = {
    first_name: '',
    last_name:'',
    email:'',
    country:'',
    address:'',
    phone_number:'',
    national_id:''
}

type Props = {
    loading: boolean,
    onSubmit: (values: RegisterAccountModel, setStatus: (status?: string) => void) => void;
}

const RegisterForm = ({ loading, onSubmit }: Props) => {
    const [phoneCode, setPhoneCode] = useState<string | null>(null);
    
    return (
        <>
            <div className="text-center mb-10">
                <h1 className="text-dark mb-3">Create your account</h1>
                <div className="text-gray-400 fw-bold fs-4">
                    Are you have been here?
                    <Link to='/auth/login' className="ms-2 link-dark fw-bolder">
                        Sign in
                    </Link>
                </div>
            </div>

            <Formik
                validationSchema={schema}
                initialValues={initialValues}
                onSubmit={(v, { setStatus }) => onSubmit(v, setStatus)}
            >
                {({ status, isValid, dirty }) => (
                    <Form>
                        { !!status && (
                            <div className="mb-5 alert alert-danger">
                                <div className='alert-text font-weight-bold'>
                                    {status}
                                </div>
                            </div>
                        )}
                        <div className="d-flex flex-column gap-2">
                            <div className="row gy-2">
                                <div className="col-12 col-md-6">
                                    <label className='form-label fs-6 fw-bolder text-dark required'>First name</label>
                                    <Field name='first_name' className="form-control form-control-lg form-control-solid" />
                                    <div className="text-danger">
                                        <ErrorMessage name='first_name' />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className='form-label fs-6 fw-bolder text-dark required'>Last name</label>
                                    <Field name='last_name' className="form-control form-control-lg form-control-solid" />
                                    <div className="text-danger">
                                        <ErrorMessage name='last_name' />
                                    </div>
                                </div>
                            </div>

                            <div className="row gy-2">
                                <div className="col-12 col-md-6">
                                    <label className='form-label fs-6 fw-bolder text-dark required'>Email</label>
                                    <Field name='email' className="form-control form-control-lg form-control-solid" />
                                    <div className="text-danger">
                                        <ErrorMessage name='email' />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className='form-label fs-6 fw-bolder text-dark required'>Country</label>
                                    <Field name='country' className="form-control form-control-lg form-control-solid" >
                                        {({ field, form }: FieldProps) => (
                                            <Select
                                                inputId="country"
                                                placeholder=""
                                                classNamePrefix="form-control-solid"
                                                options={getCountryOptions}
                                                value={getCountryOptions.find((opt) => opt.value === field.value)}
                                                onChange={({value}: any) => {
                                                    setPhoneCode(value.phoneCode? `+${value.phoneCode}`.trim() : null);
                                                    form.setFieldValue(field.name, value.country);
                                                }}
                                                formatOptionLabel={(option: any) => (
                                                    <CountryInfoAtom country={option.label} classNameContainer="text-solid"/>
                                                )}
                                            />
                                        )}
                                    </Field>
                                    <div className="text-danger">
                                        <ErrorMessage name='country' />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <label className='form-label fs-6 fw-bolder text-dark required'>Address</label>
                                    <Field name='address' className="form-control form-control-lg form-control-solid" />
                                    <div className="text-danger">
                                        <ErrorMessage name='address' />
                                    </div>
                                </div>
                            </div>

                            <div className="row gy-2">
                                <div className="col-12 col-md-6">
                                    <label className='form-label fs-6 fw-bolder text-dark required'>Phone number</label>
                                    <div className="input-group">
                                        { phoneCode &&
                                            <div className="input-group-text border-0">
                                                {phoneCode}
                                            </div>
                                        }
                                        <Field name='phone_number' className="form-control form-control-lg form-control-solid" />
                                    </div>
                                    <div className="text-danger">
                                        <ErrorMessage name='phone_number' />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className='form-label fs-6 fw-bolder text-dark required'>National ID</label>
                                    <Field name='national_id' className="form-control form-control-lg form-control-solid" />
                                    <div className="text-danger">
                                        <ErrorMessage name='national_id' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="separator mt-3 "></div>
                        <button
                            type="submit"
                            className="btn btn-lg btn-dark w-100 mt-5"
                            disabled={ loading || !dirty || !isValid}
                        >
                            { loading ? (
                                <span className='indicator-progress' style={{display: 'block'}}>
                                    Please wait...
                                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                </span>
                            ):(
                                <span className='indicator-label'>
                                    Submit
                                </span>
                            )}
                        </button>

                    </Form>
                )}
            </Formik>
        </>
    )
}

export default RegisterForm;