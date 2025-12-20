import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import * as Yup from 'yup';
import { createActionsClaim, getActionsClaimsById, updateActionsClaim } from "../../../../services/claimsService";
import { RouteParamsModel } from "../../../shared/models/RouteParamsModel";
import { ClaimsActionsCreateModel } from "../../models/ClaimsActionsCreateModel";
import { ClaimsActionsModel } from "../../models/ClaimsActionsModel";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { NumericFormat } from "react-number-format";
import Select, { Props } from "react-select";
import CompanyField from "../../components/atoms/CompanyField";
import { useUserCompanies } from "../../../../hooks/company/useUserCompanies";
import { CompanyModel } from "../../../users/models/CompanyModel";

const initialValues: ClaimsActionsCreateModel = {
    company_id: 0,
    tycker_symbol: '',
    company_name: '',
    exchange: '',
    lawsuit_type: '',
    eligibility: '',
    start_eligibility_date: '',
    final_eligibility_date: '',
    potencial_claim: '',
    total_settlement_fund: '',
    filing_date: '',
    claim_deadline: '',
    law_firm_handing_case: '',
    case_docket_number: '',
    value_per_share: 0,
    jurisdiction: '',
    claim_status: 'Active',
    claim_format_name: '',
    method_send_claim_format: '',
    email: '',
    official_claim_filing_link: '',
    last_update: ''
};

const validationSchema = Yup.object({
    tycker_symbol: Yup.string().required('Ticker symbol is required'),
    company_name: Yup.string().required('Company name is required'),
    exchange: Yup.string().required('Exchange is required'),
    lawsuit_type: Yup.string().required('Lawsuit Type is required'),
    filing_date: Yup.string().required('Filing Date is required'),
    start_eligibility_date: Yup.string().required('Start eligibility date is required'),
    final_eligibility_date: Yup.string().required('Final eligibility date is required'),
    claim_format_name: Yup.string().required('Claim format name is required'),
    method_send_claim_format: Yup.string().required('Method send claim format is required'),
    email: Yup.string().required('Email is required'),
    value_per_share: Yup.number().typeError('Value per share must be a number').required('Value per share is required').moreThan(0, 'Value per share must be more than 0')
});

const claimStatus = [
    { value:'Active', label: 'Active' },
    { value:'In Progress', label: 'In Progress' }, 
    { value:'Closed', label: 'Closed' }
]

const sendMethods = [
    { value: 'Email', label: 'Email' },
    { value: 'Post Mail', label: 'Post Mail' },
    { value: 'In Site', label: 'In Site' },
]

const ClaimsActionForm: React.FC = () => {
    const isMountedRef = useRef(false);
    const location = useLocation();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const isEdited = location.pathname.includes('/edit');
    const { id: routeId} = useParams<RouteParamsModel>();
    const [formValues, setFormValues] = useState<ClaimsActionsCreateModel>(initialValues);
    const { companies, loading: loadingCompanies  } = useUserCompanies();
    const [ companySelected, setCompanySelected ] = useState<CompanyModel | null>(null);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        }
    }, []);

    useEffect(() => {
        const fetchRecord = async () => {
            if(isEdited && routeId) {
                try {
                    setLoading(true);
                    const _action: ClaimsActionsModel = await getActionsClaimsById(Number(routeId));
                    if(!_action)
                        history.push('/claims/actions');
                    setFormValues({
                        company_id: _action.company,
                        tycker_symbol: _action.tyckerSymbol,
                        company_name: _action.companyName,
                        exchange: _action.exchange,
                        lawsuit_type: _action.lawsuitType,
                        eligibility: _action.eligibility,
                        start_eligibility_date: _action.startEligibilityDate,
                        final_eligibility_date: _action.finalEligibilityDate,
                        potencial_claim: _action.potencialClaim,
                        total_settlement_fund: _action.totalSettlementFund,
                        filing_date: _action.filingDate,
                        claim_deadline: _action.claimDeadline,
                        law_firm_handing_case: _action.lawFirmHandingCase,
                        case_docket_number: _action.caseDocketNumber,
                        value_per_share: _action.valuePerShare,
                        jurisdiction: _action.jurisdiction,
                        claim_status: _action.claimStatus,
                        claim_format_name: _action.claimFormatName,
                        email: _action.email,
                        method_send_claim_format: _action.methodSendClaimFormat,
                        official_claim_filing_link: _action.officialClaimFilingLink,
                        last_update: _action.lastUpdate
                    });
                    _setCompany(_action.company)
                }
                catch {
                    setFormValues(initialValues);
                    history.push('/claims/actions');
                }
                finally {
                    setLoading(false);
                }
            }
            else 
                setFormValues(initialValues);
        };

        fetchRecord();
    }, [isEdited, routeId]);

    useEffect(() => {
        if(companies.length == 1)
            setCompanySelected(companies[0]);
        _setCompany(formValues.company_id);
    }, [companies]);

    const _setCompany = (company_id: number) => {
        const company = companies.find(c => c.id === company_id);
        if(!company)
            return;
        setCompanySelected(company)
    }

    const handleSubmit = async (values: ClaimsActionsCreateModel, setStatus: (status: string) => void) => {
        if(sending || !isMountedRef.current)
            return;
        try {
            values.company_id = companySelected?.id ?? 0;
            setSending(true);
            if(isEdited)
                await updateActionsClaim(Number(routeId), values);
            else
                await createActionsClaim(values);
            history.push('/claims/actions');
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
    <div className='card mb-10'>
        <div className='card-body'>
            <div className='card-header border-0 pt-5 d-flex justify-content-between align-items-center'>
                <h3 className="card-title align-items-start flex-column">
                    <span className='fw-bolder text-dark fs-3'>Claims Actions</span>
                    <span className='text-muted mt-1 fs-7'>{ isEdited ? 'Edit your claim action': 'Create a claim action'  }</span>
                </h3>
            </div>
            <div className="card-body">
                {
                    loading ? (
                        <LoadingSpinner message="Loading..." />
                    ) : ( 
                        <Formik
                            enableReinitialize
                            initialValues={formValues}
                            validationSchema={validationSchema}                    
                            onSubmit={(v, { setStatus }) => handleSubmit(v, setStatus)}
                        >
                            {({ isValid, dirty, status }) => (
                                <Form className="form">
                                    <div className="card-body d-flex flex-column gap-3">
                                        { !!status && (
                                            <div className='mb-5 alert alert-danger'>
                                                <div className='alert-text font-weight-bold'>{status}</div>
                                            </div>
                                        )}
                                        <div className="row gy-3">
                                            <div className="col-12 col-md-6">
                                                <CompanyField
                                                    classLabel="required"
                                                    companies={companies}
                                                    companySelected={companySelected}
                                                    isLoading={loadingCompanies}
                                                    onChange={(v) => setCompanySelected(v?.value??null)}
                                                    disabled={companies.length <= 1 || isEdited}
                                                />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                    <label className="required">Ticker Symbol</label>
                                                    <Field name="tycker_symbol" className="form-control"/>
                                                    <div className="text-danger">
                                                        <ErrorMessage name="tycker_symbol"/>
                                                    </div>
                                            </div>
                                        </div>

                                        <div className="row gy-3">
                                            <div className="col-12 col-md-6">
                                                <label className="required">Exchange</label>
                                                <Field name="exchange" className="form-control"/> 
                                                <div className="text-danger">
                                                    <ErrorMessage name="exchange"/>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                    <label className="required">Company Name</label>
                                                    <Field name="company_name" className="form-control"/>
                                                    <div className="text-danger">
                                                        <ErrorMessage name="company_name"/>
                                                    </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <label className="required">Lawsuit Type</label>
                                                <Field name="lawsuit_type" className="form-control"/>
                                                <div className="text-danger">
                                                    <ErrorMessage name="lawsuit_type"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <label>Eligibility</label>
                                                <Field name="eligibility" className="form-control"/>
                                            </div>
                                        </div>

                                        <div className="row gy-3">
                                            <div className="col-12 col-md-6">
                                                <label className="required">Start Eligibility Date</label>
                                                <Field name="start_eligibility_date" className="form-control" type="date"/>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <label className="required">Final Eligibility Date</label>
                                                <Field name="final_eligibility_date" className="form-control" type="date"/>
                                            </div>
                                        </div>

                                        <div className="row gy-3">
                                            <div className="col-12 col-md-6">
                                                <label>Potencial Claim</label>
                                                <Field name="potencial_claim" className="form-control"/>
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <label>Total Settlement Fund</label>
                                                <Field name="total_settlement_fund">
                                                    {({field, form}: FieldProps) => (
                                                        <NumericFormat
                                                            className="form-control"
                                                            thousandSeparator=','
                                                            decimalSeparator="."
                                                            prefix="$"
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
                                                <label className="required">Filing Date</label>
                                                <Field name="filing_date" className="form-control" type='date'/>
                                                <div className="text-danger">
                                                    <ErrorMessage name="filing_date"/>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <label>Claim Deadline</label>
                                                <Field name="claim_deadline" className="form-control" type='date'/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <label>Law Firm Handing Case</label>
                                                <Field name="law_firm_handing_case" className="form-control"/>
                                            </div>
                                        </div>

                                        <div className="row gy-3">
                                            <div className="col-12 col-md-6">
                                                <label className="required">Value per share</label>
                                                <Field name="value_per_share">
                                                    {({field, form}: FieldProps) => (
                                                        <NumericFormat
                                                            className="form-control"
                                                            thousandSeparator=','
                                                            decimalSeparator="."
                                                            prefix="$"
                                                            decimalScale={2}
                                                            fixedDecimalScale={true}
                                                            allowNegative={false}
                                                            value={field.value ?? 0}
                                                            onValueChange={({value}) => form.setFieldValue(field.name, value??0)}
                                                            onBlur={() => form.setFieldTouched(field.name, true)}
                                                        />
                                                    )}
                                                </Field>
                                                <div className="text-danger">
                                                    <ErrorMessage name="value_per_share"/>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <label>Case Docket Number</label>
                                                <Field name="case_docket_number" className="form-control"/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <label>Jurisdiction</label>
                                                <Field name="jurisdiction" className="form-control"/>
                                            </div>  
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <label>Official Claim Filing Link</label>
                                                <Field name="official_claim_filing_link" className="form-control"/>
                                            </div>
                                        </div>

                                        <div className="row gy-3">
                                            <div className="col-12 col-md-6">
                                                <label>Claim Status</label>
                                                <Field name="claim_status" >
                                                    {({field, form}: FieldProps) => (
                                                        <Select
                                                            inputId='claim_status'
                                                            options={claimStatus}
                                                            value={{value:field.value,label:field.value}}
                                                            onChange={({value}: Props) => form.setFieldValue(field.name, value)}
                                                            classNamePrefix="react-select"
                                                        />
                                                    )}
                                                </Field>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <label className="required">Claim Format Name</label>
                                                <Field name="claim_format_name" className="form-control"/>
                                            </div>
                                        </div>

                                        <div className="row gy-3">
                                            <div className="col-12 col-md-6">
                                                <label className="required">Method send claim format</label>
                                                <Field name="method_send_claim_format">
                                                    {({field, form}: FieldProps) => (
                                                        <Select
                                                            inputId='method_send_claim_format'
                                                            options={sendMethods}
                                                            value={{value:field.value,label:field.value}}
                                                            onChange={({value}: Props) => form.setFieldValue(field.name, value)}
                                                            classNamePrefix="react-select"
                                                        />
                                                    )}
                                                </Field>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <label className="required">Email</label>
                                                <Field name="email" className="form-control"/>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="card-footer d-flex justify-content-end gap-4 mt-3 p-4 ps-0 pe-0">
                                        <button
                                            type='button'
                                            className='btn btn-secondary'
                                            style={{ width: "20rem" }}
                                            onClick={() => history.push('/claims/actions')}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type='submit'
                                            className='btn btn-dark'
                                            style={{ width: "20rem" }}
                                            disabled={!isValid || !dirty || sending || !companySelected}
                                        >
                                            {
                                                !sending ? 
                                                (<span className="indicator-label">Save</span>) 
                                                : (<span>Saving... <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>)
                                            }
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>)
                }
            </div>
        </div>
    </div>
    );
};

export default ClaimsActionForm;