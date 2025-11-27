import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import * as Yup from 'yup';
import AnticompleteAtom from "../../../../components/atoms/AnticompleteAtom";
import { ClassifierAtom } from "../../../../components/atoms/ClassifierAtom";
import { CountryInfoAtom } from "../../../../components/atoms/CountryInfoAtom";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import ImageUploader from "../../../../components/molecules/ImageUploader";
import { getCountryOptions } from "../../../../helpers/countryData";
import { useCompanyClassifiers } from "../../../../hooks/company/useCompanyClassifiers";
import { RoleModel } from "../../../../hooks/users/models/RoleModel";
import { ClassifierModel } from "../../models/ClassifierModel";
import { CompanyModel } from "../../models/CompanyModel";
import { UserFormModel } from "../../models/UserFormModel";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../../../setup";
import { UserRoles } from "../../../../enums/userRoles";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email('Wrong email format').required('Email is required'),
  company: Yup.string().required('Company is required'),
  role: Yup.string().required('Role is required'),
  phone_number: Yup.string().required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  country: Yup.string().required('Country is required'),
  national_id: Yup.string().required('National ID is required')
});


type Props = {
    initialValues?: UserFormModel;
    isEdited: boolean;
    imagePreview?: string;
    companies: CompanyModel[];
    roles: RoleModel[];
    loadingRoles: boolean;
    loadingCompanies: boolean;
    loadingForm: boolean;
    sending: boolean;
    onSubmit: (values: UserFormModel, image: File | null, setStatus: (status: string) => void) => Promise<void>;
    onCancel: () => void;
};


const UserManagementForm = ({ initialValues, isEdited, imagePreview, loadingCompanies, companies, loadingForm, loadingRoles, roles, sending, onSubmit, onCancel }: Props) => {
    const isMountedRef = useRef(false);
    const [image, setImage] = useState<File | null>(null);
    const [countryCode, setCountryCode] = useState<string | null>(null);
    const { classifiers, loadClassifiers, loading: classifiersLoading } = useCompanyClassifiers();
    
    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        }
    }, []);

    const _initialValues: UserFormModel = {
        first_name: initialValues ? initialValues.first_name : '',
        last_name: initialValues ? initialValues.last_name : '',
        email: initialValues ? initialValues.email : '',
        company: initialValues ? initialValues.company : -1,
        role: initialValues ? initialValues.role : '',
        address: initialValues ? initialValues.address : '',
        national_id: initialValues ? initialValues.national_id : '',
        country: initialValues ? initialValues.country : '',
        phone_number: initialValues ? initialValues.phone_number : '',
        classification: initialValues?.classification,
        active: initialValues?.active
    };

    useEffect(() => {
        if(!initialValues)
            return;
        loadClassifiers(initialValues.company);
    }, [initialValues])

    return (
        <div className="card-body">
            { loadingForm ? 
                <LoadingSpinner message="Loading..."/> 
                : (
                <Formik
                    validationSchema={validationSchema}
                    initialValues={_initialValues}
                    onSubmit={(v, { setStatus }) => onSubmit(v, image, setStatus)}
                >
                    {({isValid, dirty, setFieldValue, status}) => (
                        <Form className="form" autoComplete="off">
                            { !!status && (
                                <div className='mb-5 alert alert-danger'>
                                    <div className='alert-text font-weight-bold'>{status}</div>
                                </div>
                            )}
                            <AnticompleteAtom fields={[{type: 'text', autoComplete: "username"}, { type: 'password', autoComplete: 'new-password' }]}/>
                            <div className="d-flex flex-column gap-3">
                                <div className="d-flex flex-wrap gap-3">
                                    <div className="flex-grow-1 d-inline-flex flex-column align-items-center">
                                        <ImageUploader 
                                            title="Image"
                                            preview={imagePreview}
                                            onSetImage={setImage}
                                            onRemoveImage={() => setImage(null)}
                                        />
                                    </div>
                                    <div className="flex-grow-1 d-inline-flex flex-column gap-4">
                                        <div className="row gy-3">
                                            <div className="col-12 col-md-6">
                                                <label className="required">First Name</label>
                                                <Field name="first_name" className="form-control" />
                                                <div className="text-danger">
                                                    <ErrorMessage name="first_name" />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <label className="required">Last Name</label>
                                                <Field name="last_name" className="form-control" />
                                                <div className="text-danger">
                                                    <ErrorMessage name="last_name" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row gy-3">
                                            <div className="col-12 col-md-6">
                                                <label className="required">Email</label>
                                                <Field
                                                    name="email"
                                                    className="form-control"
                                                    type="email"
                                                    autoComplete="off"
                                                />
                                                <div className="text-danger">
                                                    <ErrorMessage name="email" />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <label className="required">Company</label>
                                                <Field name="company">
                                                    {({ field, form }: FieldProps) => {
                                                        const _options = companies.map(c => ({ value: c, label: c.name }));
                                                        const _selected = companies.find((c) => c.id === field.value);
                                                        return <Select
                                                                isLoading={loadingCompanies}
                                                                inputId="company"
                                                                placeholder="Select a company"
                                                                value={ _selected ? { value: _selected, label: _selected.name } : null}
                                                                options={_options}
                                                                classNamePrefix="react-select"
                                                                onChange={(value: any) => {
                                                                    form.setFieldValue(field.name, value.value.id);
                                                                    loadClassifiers(value.value.id);
                                                                    setFieldValue('classification', null);
                                                                }}
                                                            />
                                                    }}
                                                </Field>
                                                <div className="text-danger">
                                                    <ErrorMessage name="company" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row gy-3">
                                            <div className="col-12 col-md-6">
                                                <label className="required">Role</label>
                                                <Field name="role">
                                                    {({ field, form }: FieldProps) => {
                                                        const _selected = roles.find((r) => r.code === field.value);
                                                        const _options = roles.map((r) => ({ value: r.code, label: r.description}));
                                                        return (
                                                            <Select 
                                                                isLoading={loadingRoles}
                                                                inputId="role"
                                                                placeholder="Select a role"
                                                                value={ _selected ? { value: _selected.code, label: _selected.description } : null}
                                                                options={_options}
                                                                classNamePrefix="react-select"
                                                                onChange={(value: any) => form.setFieldValue(field.name, value.value)}
                                                            />
                                                        )
                                                    }}
                                                </Field>
                                                <div className="text-danger">
                                                    <ErrorMessage name="role" />
                                                </div>
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <label className="required">Country</label>
                                                <Field name="country">
                                                    {({ field, form }: FieldProps) => {
                                                        const _selected = getCountryOptions.find((opt) => opt.value.country === field.value);
                                                        return <Select
                                                            inputId="country"
                                                            placeholder="Select a country"
                                                            classNamePrefix="react-select"
                                                            options={getCountryOptions}
                                                            value={_selected}
                                                            onChange={({value}: any) => {
                                                                setCountryCode(value.phoneCode? `+${value.phoneCode}`.trim() : null);
                                                                form.setFieldValue(field.name, value.country);
                                                            }}
                                                            formatOptionLabel={(option: any) => (
                                                                <CountryInfoAtom country={option.label}/>
                                                            )}
                                                        />  
                                                    }}
                                                </Field>
                                                <div className="text-danger">
                                                    <ErrorMessage name="country" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row gy-3">
                                            <div className="col-12 col-md-6">
                                                <label>Classification</label>
                                                <Field name="classification">
                                                {({ field, form }: FieldProps) => {
                                                    const _options = classifiers.map(c => ({ value: c, label: c.name }));
                                                    const _selected = classifiers.find((opt) => opt.id === field.value);
                                                    return <Select
                                                        isDisabled={_options.length===0}
                                                        isLoading={classifiersLoading}
                                                        isClearable
                                                        autofocus="off"
                                                        inputId="classification"
                                                        placeholder="Select a classifier"
                                                        classNamePrefix="react-select"
                                                        options={_options}
                                                        value={_selected ? { value: _selected, label: _selected.name }: null}
                                                        onChange={(value?: { value: ClassifierModel, label: string }) => form.setFieldValue(field.name, value ? value.value.id : null)}
                                                        formatOptionLabel={(option: any) => (
                                                            <ClassifierAtom 
                                                                className="fs-9 px-2 py-1"
                                                                color={option.value?.color??''}
                                                                name={option?.label??''}
                                                            />
                                                        )}
                                                    />
                                                }}
                                                </Field>
                                            </div>
                                            { isEdited && (
                                                <div className="col-12 col-md-6 d-flex align-items-center">
                                                    <div className="form-check">
                                                        <Field name="active">
                                                        {({ field, form }: FieldProps) => (
                                                            <input
                                                                name="active"
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="editActive"
                                                                checked={!!field.value}
                                                                onChange={(e) =>
                                                                    form.setFieldValue(field.name, e.target.checked)
                                                                }
                                                            />
                                                        )}
                                                        </Field>
                                                        <label className="form-check-label" htmlFor="editActive">
                                                            Active
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="separator mt-4 mb-3"></div>
                                <div className="col">
                                    <label className="required">Address</label>
                                    <Field name="address" className="form-control" />
                                    <div className="text-danger">
                                        <ErrorMessage name="address" />
                                    </div>
                                </div>
                                <div className="row gy-3">
                                    <div className="col-12 col-md-6">
                                        <label className="required">Phone number</label>
                                        <div className="input-group">
                                            {countryCode && (
                                                <span className="input-group-text">{countryCode}</span>
                                            )}
                                            <Field name="phone_number" className="form-control" />
                                        </div>
                                        <div className="text-danger">
                                            <ErrorMessage name="phone_number" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="required">National ID</label>
                                        <Field name="national_id" className="form-control" />
                                        <div className="text-danger">
                                            <ErrorMessage name="national_id" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer d-flex justify-content-end gap-4 mt-3 p-4 ps-0 pe-0">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    style={{ width: "20rem" }}
                                    onClick={onCancel}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-dark"
                                    style={{ width: "20rem" }}
                                    disabled={!isValid || !dirty || sending}
                                >
                                    {!sending ? (
                                        <span className="indicator-label">Save</span>
                                    ) : (
                                        <span>
                                            Saving...{" "}
                                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
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

export default UserManagementForm;