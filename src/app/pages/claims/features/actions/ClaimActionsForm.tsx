import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import * as Yup from 'yup';
import { getActionsClaimsById } from "../../../../services/cliamsService";
import { RouteParamsModel } from "../../../shared/models/RouteParamsModel";
import { ClaimsActionsCreateModel } from "../../models/ClaimsActionsCreateModel";
import { ClaimsActionsModel } from "../../models/ClaimsActionsModel";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { NumericFormat } from "react-number-format";
import Select, { Props } from "react-select";

const initialValues: ClaimsActionsCreateModel = {
    tycker_symbol: '',
    company_name: '',
    exchange: '',
    lawsuit_type: '',
    eligibility: '',
    potencial_claim: '',
    total_settlement_fund: '',
    filing_date: '',
    claim_deadline: '',
    law_firm_handing_case: '',
    case_docket_number: '',
    jurisdiction: '',
    claim_status: 'Active',
    official_claim_filing_link: '',
    last_update: ''
};

const validationSchema = Yup.object({
    tycker_symbol: Yup.string().required('Ticker symbol is required'),
    company_name: Yup.string().required('Company name is required'),
    exchange: Yup.string().required('Exchange is required'),
    lawsuit_type: Yup.string().required('Lawsuit Type is required'),
    filing_date: Yup.string().required('Filing Date is required')
});

const claimStatus = [
    { value:'Active', label: 'Active' },
    { value:'In Progress', label: 'In Progress' }, 
    { value:'Closed', label: 'Closed' }
]

const ClaimsActionForm: React.FC = () => {
    const location = useLocation();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const isEdited = location.pathname.includes('/edit');
    const { id: routeId} = useParams<RouteParamsModel>();
    const [formValues, setFormValues] = useState<ClaimsActionsCreateModel>(initialValues);
    useEffect(() => {
        const fetchRecord = async () => {
            if(isEdited && routeId) {
                try {
                    setLoading(true);
                    const _action: ClaimsActionsModel = await getActionsClaimsById(Number(routeId));
                    if(!_action)
                        history.push('/claims/actions');
                    setFormValues({
                        tycker_symbol: _action.tyckerSymbol,
                        company_name: _action.companyName,
                        exchange: _action.exchange,
                        lawsuit_type: _action.lawsuitType,
                        eligibility: _action.eligibility,
                        potencial_claim: _action.potencialClaim,
                        total_settlement_fund: _action.totalSettlementFund,
                        filing_date: _action.filingDate,
                        claim_deadline: _action.claimDeadline,
                        law_firm_handing_case: _action.lawFirmHandingCase,
                        case_docket_number: _action.caseDocketNumber,
                        jurisdiction: _action.jurisdiction,
                        claim_status: _action.claimStatus,
                        official_claim_filing_link: _action.officialClaimFilingLink,
                        last_update: _action.lastUpdate
                    });
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

    const handleSubmit = async (values: any) => {

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
                            onSubmit={handleSubmit} 
                        >
                            {({setFieldValue}) => 
                                <Form className="form">
                                    <div className="card-body">
                                        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
                                            <div className="col">
                                                    <label className="required">Ticker Symbol</label>
                                                    <Field name="tycker_symbol" className="form-control"/>
                                                    <div className="text-danger">
                                                        <ErrorMessage name="tycker_symbol"/>
                                                    </div>
                                            </div>
                                            <div className="col">
                                                    <label className="required">Company Name</label>
                                                    <Field name="company_name" className="form-control"/>
                                                    <div className="text-danger">
                                                        <ErrorMessage name="company_name"/>
                                                    </div>
                                            </div>
                                            <div className="col">
                                                <label className="required">Exchange</label>
                                                <Field name="exchange" className="form-control"/> 
                                                <div className="text-danger">
                                                    <ErrorMessage name="exchange"/>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <label className="required">Lawsuit Type</label>
                                                <Field name="lawsuit_type" className="form-control"/>
                                                <div className="text-danger">
                                                    <ErrorMessage name="lawsuit_type"/>
                                                </div>
                                            </div>
                                        
                                            <div className="col">
                                                <label>Eligibility</label>
                                                <Field name="eligibility" className="form-control"/>
                                            </div>
                                            <div className="col">
                                                <label>Potencial Claim</label>
                                                <Field name="potencial_claim" className="form-control"/>
                                            </div>
                                            <div className="col">
                                                <label>Company Name</label>
                                                <Field name="company_name" className="form-control"/>
                                            </div>
                                            <div className="col">
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

                                            <div className="col">
                                                <label>Filing Date</label>
                                                <Field name="filing_date" className="form-control" type='date'/>
                                            </div>
                                            <div className="col">
                                                <label>Claim Deadline</label>
                                                <Field name="claim_deadline" className="form-control"/>
                                            </div>
                                            <div className="col">
                                                <label>Law Firm Handing Case</label>
                                                <Field name="law_firm_handing_case" className="form-control"/>
                                            </div>
                                            <div className="col">
                                                <label>Case Docket Number</label>
                                                <Field name="case_docket_number" className="form-control"/>
                                            </div>
                                        

                                        
                                            <div className="col">
                                                <label>Jurisdiction</label>
                                                <Field name="jurisdiction" className="form-control"/>
                                            </div>
                                            <div className="col">
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
                                            <div className="col">
                                                <label>Official Claim Filing Link</label>
                                                <Field name="official_claim_filing_link" className="form-control"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer d-flex gap-2">
                                        <button
                                            type='button'
                                            className='btn btn-secondary flex-grow-1'
                                            style={{minWidth: 0}}
                                            onClick={() => history.push('/claims/actions')}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type='submit'
                                            id='kt_sign_in_submit'
                                            className='btn btn-dark flex-grow-1'
                                            style={{minWidth: 0}}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </Form>
                            }
                        </Formik>)
                }
            </div>
        </div>
    </div>
    );
};

export default ClaimsActionForm;