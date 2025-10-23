import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { ClaimsTransactionsCreateModel } from "../../models/ClaimsTransactionsCreateModel";
import { RouteParamsModel } from "../../../shared/models/RouteParamsModel";
import { createTransactionClaim, getTransactionsClaimById } from "../../../../services/cliamsService";

const initialValues: ClaimsTransactionsCreateModel = {
    data_for: '',
    trade_date: '',
    account: '',
    account_name: '',
    account_type: '',
    account_number: '',
    activity: '',
    description: '',
    symbol: '',
    quantity: '',
    amount: '',
    notes: '',
    type: '',
    company: '',
};


const ClaimTransactionsForm: React.FC = () => {
    const location = useLocation();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const isEdited = location.pathname.includes('/edit');
    const { id: routeId } = useParams<RouteParamsModel>();
    const [formValues, setFormValues] = useState<ClaimsTransactionsCreateModel>(initialValues);

    useEffect(() => {
        const fetchRecord = async () => {
            if(isEdited && routeId) {
                try {
                    setLoading(true);
                    const _claim = await getTransactionsClaimById(Number(routeId));
                    console.log(_claim);
                }
                catch {
                    setFormValues(initialValues);
                    history.push('/claims/transactions')
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

    const handleSubmit = async (value: ClaimsTransactionsCreateModel) => {
        if(!!sending)
            return;
        console.log(value);
        try {
            setSending(true);    
            if(isEdited) {
    
            }
            else {
                const _create = await createTransactionClaim(value);
                console.log(_create);
            }
        }
        finally {
            setSending(false);
        }
    };

    return (
    <div className='card mb-10'>
        <div className='card-body'>
            <div className='card-header border-0 pt-5 d-flex justify-content-between align-items-center'>
                <h3 className="card-title align-items-start flex-column">
                    <span className='fw-bolder text-dark fs-3'>Stock Transactions</span>
                    <span className='text-muted mt-1 fs-7'>{ isEdited ? 'Edit your stock transaction': 'Create a stock transaction'  }</span>
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
                            onSubmit={handleSubmit} 
                        >
                            {({setFieldValue}) => 
                                <Form className="form">
                                    <div className="card-body">
                                        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
                                            <div className="col">
                                                    <label>Data For</label>
                                                    <Field name="data_for" className="form-control"/>
                                            </div>
                                            <div className="col">
                                                    <label>Trade Date</label>
                                                    <Field name="trade_date" className="form-control"/>
                                            </div>
                                            <div className="col">
                                                <label>Account</label>
                                                <Field name="account" className="form-control"/> 
                                            </div>
                                            <div className="col">
                                                <label>Account Name</label>
                                                <Field name="account_name" className="form-control"/>
                                            </div>
                                        
                                            <div className="col">
                                                <label>Account Type</label>
                                                <Field name="account_type" className="form-control"/>
                                            </div>
                                            <div className="col">
                                                <label>Account Number</label>
                                                <Field name="account_number" className="form-control"/>
                                            </div>
                                            <div className="col">
                                                <label>Activity</label>
                                                <Field name="activity" className="form-control"/>
                                            </div>

                                            <div className="col">
                                                <label>Description</label>
                                                <Field name="description" className="form-control"/>
                                            </div>
                                            <div className="col">
                                                <label>Symbol</label>
                                                <Field name="symbol" className="form-control"/>
                                            </div>
                                            <div className="col">
                                                <label>Quantity</label>
                                                <Field name="quantity" className="form-control"/>
                                            </div>
                                            <div className="col">
                                                <label>Amount</label>
                                                <Field name="amount" className="form-control"/>
                                            </div>
                                            <div className="col">
                                                <label>Notes</label>
                                                <Field name="notes" className="form-control"/>
                                            </div>
                                            <div className="col">
                                                <label>Type</label>
                                                <Field name="type" className="form-control"/>
                                            </div>
                                            <div className="col">
                                                <label>Company</label>
                                                <Field name="company" className="form-control"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer d-flex gap-2">
                                        <button
                                            type='button'
                                            className='btn btn-secondary flex-grow-1'
                                            style={{minWidth: 0}}
                                            onClick={() => history.push('/claims/transactions')}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type='submit'
                                            className='btn btn-dark flex-grow-1'
                                            style={{minWidth: 0}}
                                        >
                                            {
                                                !sending ? 
                                                (<span className="indicator-label">Save</span>) 
                                                : (<span>Saving... <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>)
                                            }
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

export default ClaimTransactionsForm;