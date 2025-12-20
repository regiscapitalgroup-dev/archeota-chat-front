import { Field, FieldProps, Form, Formik } from "formik";
import { useHistory, useLocation, useParams } from "react-router-dom";
import * as Yup from 'yup';
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { useClassLawsuitsById } from "../../../../hooks/claims/useClassLawsuitsById";
import { RouteParamsModel } from "../../../shared/models/RouteParamsModel";
import { ClassLawsuitCreateModel } from "../../models/ClassLawsuitCreateModel";
import { useEffect, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import Select, { Props } from "react-select";
import { createClassLawsuit, updateClassLawsuit } from "../../../../services/claimsService";

const initialValues: ClassLawsuitCreateModel = {
    tycker_symbol: '',
    company_name: '',
    claim_date: '',
    status: '',
    quantity_stock: 0,
    value_per_stock: 0,
    send_format: false,
    register_payment: false,
    accept_claim: false,
}

const validationSchema = Yup.object({
    tycker_symbol: Yup.string().required('Ticker symbol is required'),
    company_name: Yup.string().required('Company name is required')
});

const classStatus = [
    { value:'Active', label: 'Active' },
    { value:'In Progress', label: 'In Progress' }, 
    { value:'Closed', label: 'Closed' }
]


const ClassLawsuitForm = () => {
    const isMountedRef = useRef(false);
    const location = useLocation(); 
    const history = useHistory();
    const isEdited = location.pathname.includes('/edit');
    const { id: routeId} = useParams<RouteParamsModel>();
    const { data, loading } = useClassLawsuitsById(Number(routeId));
    const [sending, setSending] = useState(false);
    const [formValues, setFormValues] = useState<ClassLawsuitCreateModel>(initialValues);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        }
    }, []);

    useEffect(() => {
        if(!data)
            return;
        setFormValues({
            tycker_symbol: data.tyckerSymbol ?? '',
            company_name: data.companyName ?? '',
            claim_date: data.claimDate ?? '',
            status: data.status ?? '',
            quantity_stock: data.quantityStock ?? 0,
            value_per_stock: data.valuePerStock ?? 0,
            send_format: data.sendFormat ?? false,
            register_payment: data.registerPayment ?? false,
            accept_claim: data.acceptClaim ?? false
        });
    }, [data]);

    const _handleSubmit = async (value: ClassLawsuitCreateModel, setStatus: (status: string) => void) => {
        if(!isMountedRef.current)
            return;
        setSending(true);
        try {
            if(isEdited && !!Number(routeId)) 
                await updateClassLawsuit(Number(routeId), value);
            else
                await createClassLawsuit(value);
            history.push('/claims/actions')
        }
        catch {
            setStatus("There was an error while saving the information. Please try again.")
        }
        finally {
            if(isMountedRef.current)
                setSending(false);
        }
    }

    return (
        <div className="card shadow-sm mb-10">
            <div className='card-header border-0 pt-5 d-flex justify-content-between align-items-center'>
                <h3 className="card-title align-items-start flex-column">
                    <span className='fw-bolder text-dark fs-3'>Class Action Lawsuit</span>
                    <span className='text-muted mt-1 fs-7'>{ isEdited ? 'Edit your class action lawsuit': 'Create a class action lawsuit'  }</span>
                </h3>
            </div>
            <div className="card-body">
                { loading ?  <LoadingSpinner message="Loading..." /> : (
                    <Formik
                        enableReinitialize
                        initialValues={formValues}
                        validationSchema={validationSchema}
                        onSubmit={(v, { setStatus }) => _handleSubmit(v, setStatus)}
                    >
                        {({ isValid, dirty, status }) => (
                            <Form className="form d-flex flex-column gap-3">
                                <div className="row gy-3">
                                    <div className="col-12 col-md-6">
                                        <label>Tycker symbol</label>
                                        <Field name="tycker_symbol" className="form-control"/>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label>Company name</label>
                                        <Field name="company_name" className="form-control"/>
                                    </div>
                                </div>

                                <div className="row gy-3">
                                    <div className="col-12 col-md-6">
                                        <label>Claim date</label>
                                        <Field name="claim_date" className="form-control" type="date"/>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label>Status</label>
                                        <Field name="status">
                                            {({ field, form }: FieldProps) => (
                                                <Select 
                                                    inputId='status'
                                                    options={classStatus}
                                                    value={{value:field.value,label:field.value}}
                                                    onChange={({value}: Props) => form.setFieldValue(field.name, value)}
                                                    classNamePrefix="react-select"
                                                />
                                            )}
                                        </Field>
                                    </div>
                                </div>

                                <div className="row gy-3">
                                    <div className="col-12 col-md-6">
                                        <label>Quantity stock</label>  
                                        <Field name="value_per_stock">
                                            {({ field, form }: FieldProps) => (
                                                <NumericFormat 
                                                    className="form-control"
                                                    thousandSeparator=','
                                                    decimalSeparator="."
                                                    decimalScale={2}
                                                    fixedDecimalScale={true}
                                                    allowNegative={false}
                                                    value={field.value ?? 0}
                                                    onValueChange={({value}) => form.setFieldValue(field.name, value??0)}
                                                />
                                            )}
                                        </Field> 
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label>Value Per Stock</label>  
                                        <Field name="value_per_stock">
                                            {({ field, form }: FieldProps) => (
                                                <NumericFormat 
                                                    className="form-control"
                                                    thousandSeparator=','
                                                    decimalSeparator="."
                                                    decimalScale={2}
                                                    fixedDecimalScale={true}
                                                    allowNegative={false}
                                                    value={field.value ?? 0}
                                                    onValueChange={({value}) => form.setFieldValue(field.name, value??0)}
                                                />
                                            )}
                                        </Field> 
                                    </div>
                                </div>

                                <div className="row gy-3">
                                    <div className="col-12 col-md-6">
                                        <div className="form-check">
                                            <Field name="send_format">
                                                {({ field, form }: FieldProps) => (
                                                    <input
                                                        name="send_format"
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="send_format"
                                                        checked={!!field.value}
                                                        onChange={(e) =>
                                                            form.setFieldValue(field.name, e.target.checked)
                                                        }
                                                    />
                                                )}
                                            </Field>
                                            <label className="form-check-label" htmlFor="send_format">
                                                Send Format
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-check">
                                            <Field name="accept_claim">
                                                {({ field, form }: FieldProps) => (
                                                    <input
                                                        name="accept_claim"
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="accept_claim"
                                                        checked={!!field.value}
                                                        onChange={(e) =>
                                                            form.setFieldValue(field.name, e.target.checked)
                                                        }
                                                    />
                                                )}
                                            </Field>
                                            <label className="form-check-label" htmlFor="accept_claim">
                                                Accept Claim
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <div className="form-check">
                                            <Field name="register_payment">
                                                {({ field, form }: FieldProps) => (
                                                    <input
                                                        name="register_payment"
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="register_payment"
                                                        checked={!!field.value}
                                                        onChange={(e) =>
                                                            form.setFieldValue(field.name, e.target.checked)
                                                        }
                                                    />
                                                )}
                                            </Field>
                                            <label className="form-check-label" htmlFor="register_payment">
                                                Register Payment
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-footer d-flex justify-content-end gap-4 mt-3 p-4 ps-0 pe-0">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        style={{ width: "20rem" }}
                                        disabled={sending}
                                        onClick={() => history.push('/claims/actions')}
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
        </div>
    )
}

export default ClassLawsuitForm;