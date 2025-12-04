import { Field, FieldProps, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useHistory, useLocation, useParams } from "react-router-dom";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { useClaimTransactionById } from "../../../../hooks/claims/useClaimTransactionById";
import { createTransactionsClaim, updateTransactionsClaim } from "../../../../services/claimsService";
import { RouteParamsModel } from "../../../shared/models/RouteParamsModel";
import { ClaimsTransactionsCreateModel } from "../../models/ClaimsTransactionsCreateModel";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../../../setup";
import { UserRoles } from "../../../../enums/userRoles";
import { useUserCompanies } from "../../../../hooks/company/useUserCompanies";
import CompanyField from "../../components/atoms/CompanyField";
import { CompanyOptions } from "../../components/atoms/models/CompanyOptions";
import { CompanyModel } from "../../../users/models/CompanyModel";
import { useClients } from "../../../../hooks/users/useClients";
import { UsersField } from "../../components/atoms/UsersField";
import { UserListModel } from "../../../users/models/UserListModel";

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
    const { user } = useSelector((root: RootState) => root.auth, shallowEqual);
    const location = useLocation();
    const history = useHistory();
    const isMountedRef = useRef(false);
    const [sending, setSending] = useState(false);
    const isEdited = location.pathname.includes('/edit');
    const { id: routeId } = useParams<RouteParamsModel>();
    const [formValues, setFormValues] = useState<ClaimsTransactionsCreateModel>(initialValues);
    const { transaction, loading, getTransactionById } = useClaimTransactionById();
    const { companies, loading: isLoadingCompanies } = useUserCompanies();
    const [companySelected, setCompanySelected] = useState<CompanyModel|null>(null);
    const { users, loading: isLoadingUsers, loadUsers } = useClients()
    const [userSelected, setUserSelected] = useState<UserListModel|null>(null);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        }
    }, [])

    useEffect(() => {
        if(!user || !user.role)
            return;
        if(user.role === UserRoles.FINAL_USER || user.role === UserRoles.CLIENT)
            setUserSelected({ id: user.pk } as UserListModel)
    }, [user]);

    useEffect(() => {
        if(!transaction) {
            setFormValues(initialValues);
            return;
        }
        setFormValues({
            account: transaction.account,
            account_name: transaction.accountName,
            account_number: transaction.accountNumber,
            account_type: transaction.accountType,
            activity: transaction.activity,
            amount: transaction.amount,
            company: transaction.company,
            data_for: transaction.dataFor,
            description: transaction.description,
            notes: transaction.notes,
            quantity: transaction.quantity,
            symbol: transaction.symbol,
            trade_date: transaction.tradeDate,
            type: transaction.type
        });
    }, [transaction]);

    useEffect(() => {
        if(!isEdited||!routeId)
            return;
        getTransactionById(Number(routeId))
    }, [isEdited, routeId]);

    useEffect(() => {
        if(companies.length === 1)
            setCompanySelected(companies[0]);
    }, [companies]);

    useEffect(() => {
        if(!!user && user?.role !== UserRoles.CLIENT && user?.role !== UserRoles.FINAL_USER)
            loadUsers(companySelected ? companySelected.id : null );
    }, [companySelected]);

    const _handleSelectCompany = (value: CompanyOptions | null) => {
        setCompanySelected(value?.value??null);
        setUserSelected(null);
    }

    const _handleSubmit = async (value: ClaimsTransactionsCreateModel) => {
        if(sending)
            return;
        try {
            setSending(true);    
            if(isEdited) {
                await updateTransactionsClaim(Number(routeId), value);
            }
            else
                await createTransactionsClaim(value, userSelected?.id);
        }
        finally {
            if(isMountedRef.current) {
                setSending(false);
                history.push('/claims/transactions');
            }
        }
    };

    return (
    <div className='card mb-10'>
        <div className='card-body'>
            <div className='card-header border-0 pt-5 d-flex justify-content-between align-items-center'>
                <h3 className="card-title align-items-start flex-column">
                    <span className='fw-bolder text-dark fs-3'>Transactional Brokerage</span>
                    <span className='text-muted mt-1 fs-7'>{ isEdited ? 'Edit transaction brokerage': 'Create transaction brokerage'  }</span>
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
                            onSubmit={_handleSubmit} 
                        > 
                        {({ isValid, dirty }) => (
                            <Form className="form">
                                <div className="card-body d-flex flex-column gap-3">
                                    { !!user && user.role !== UserRoles.CLIENT && user.role !== UserRoles.FINAL_USER && (
                                        <div className="row gy-3">
                                            <CompanyField
                                                disabled={isEdited || companies.length<=1}
                                                companies={companies}
                                                isLoading={isLoadingCompanies}
                                                companySelected={companySelected}
                                                onChange={_handleSelectCompany}
                                                className="col-12 col-md-6"
                                            />
                                            <UsersField
                                                disabled={isEdited}
                                                isLoading={isLoadingUsers}
                                                users={users}
                                                userSelected={userSelected}
                                                onChange={(v) => setUserSelected(v?.value ?? null)}
                                                className="col-12 col-md-6"
                                            />
                                        </div>
                                    )}

                                    <div className="row gy-3">
                                        <div className="col-12 col-md-6">
                                                <label>Data For</label>
                                                <Field name="data_for" className="form-control"/>
                                        </div>
                                        <div className="col-12 col-md-6">
                                                <label>Trade Date</label>
                                                <Field name="trade_date" className="form-control" type="date"/>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <label>Account</label>
                                            <Field name="account" className="form-control"/> 
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <label>Account Name</label>
                                            <Field name="account_name" className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="row gy-3">
                                        <div className="col-12 col-md-6">
                                            <label>Account Type</label>
                                            <Field name="account_type" className="form-control"/>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label>Account Number</label>
                                            <Field name="account_number" className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="row gy-3">
                                        <div className="col">
                                            <label>Activity</label>
                                            <Field name="activity" className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="row gy-3">
                                        <div className="col-12 col-md-6">
                                            <label>Symbol</label>
                                            <Field name="symbol" className="form-control"/>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label>Type</label>
                                            <Field name="type" className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <label>Description</label>
                                            <Field name="description" className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="row gy-3">
                                        <div className="col-12 col-md-6">
                                            <label>Quantity</label>
                                            <Field name="quantity">
                                                {({field, form}: FieldProps) => (
                                                    <NumericFormat
                                                        className="form-control"
                                                        thousandSeparator=","
                                                        decimalScale={0}
                                                        fixedDecimalScale={true}
                                                        allowNegative={false}
                                                        value={field.value ?? 0}
                                                        onValueChange={({value}) => form.setFieldValue(field.name, value??0)}
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label>Amount</label>
                                            <Field name="amount">
                                                {({field, form}: FieldProps) => (
                                                    <NumericFormat 
                                                        className="form-control"
                                                        thousandSeparator=","
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

                                    <div className="row">
                                        <div className="col">
                                            <label>Company</label>
                                            <Field name="company" className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <label>Notes</label>
                                            <Field name="notes" className="form-control" />
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
                                        disabled={sending || !isValid || !dirty || !userSelected}
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

export default ClaimTransactionsForm;