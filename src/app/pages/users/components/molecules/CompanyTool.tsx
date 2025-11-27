import { Field, FieldArray, Form, Formik } from "formik";
import { CSSProperties } from "styled-components";
import * as Yup from 'yup';
import { CompanyModel } from "../../models/CompanyModel";


const schema = Yup.object().shape({
  companies: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Required")
    })
  )
});

type Props = {
    sending: boolean;
    loading: boolean;
    companies: CompanyModel[];
    onApply: (companies: { id?:number; name: string, isEdited?: boolean }[]) => void;
}

const CompanyTool = ({ sending, loading, companies, onApply }: Props) => {
    const styles: CSSProperties = {
            backgroundColor: 'white',
            minWidth: 340,
            maxWidth: '96vw',
            width: 340
    };

    
    const _initialValues = {
        companies: companies.map(c => ({...c, isEdited: false}))
    }
    
    return (
        <div className="card shadow-lg rounded-4" style={styles}>
            <div className="card-body p-4">
                <div className="fw-bold fs-5 mb-3"> Companies </div>
                { loading ? (
                    <span className="fs-5 fw-bold d-block w-100 text-center p-3" style={{color: 'gray'}}>Loading...</span>
                ):(
                    <Formik
                        initialValues={_initialValues}
                        validationSchema={schema}
                        enableReinitialize
                        onSubmit={(values) => onApply(values.companies)}
                    >
                        {({values, resetForm, setFieldValue, isValid, dirty, handleChange}) => (
                            <>
                                {values.companies.length===0 && (
                                    <span className="fw-light d-block w-100 text-center p-3 fs-5" style={{color: 'gray'}}>Empty</span>
                                )}
                                <Form>
                                    <FieldArray name="companies">
                                        {({push, remove}) => (
                                            <div className="d-flex flex-column gap-2 overflow-auto" style={{ maxHeight: '25rem' }}>
                                                {values.companies.map((company,i) => (
                                                    <div key={i} className="input-group">
                                                        <Field 
                                                            name={`companies[${i}].name`} 
                                                            placeholder='Company name' 
                                                            className="form-control"
                                                            onChange={(e: any) => {
                                                                handleChange(e);
                                                                if(!!company.id) {
                                                                    setFieldValue(`companies[${i}].isEdited`, _initialValues.companies[i].name!==e?.target?.value);
                                                                }
                                                            }}
                                                        />
                                                        <button className="btn btn-danger ps-3 pe-2" type="button" onClick={() => remove(i)}>
                                                            <i className="bi bi-trash-fill"></i>
                                                        </button>
                                                    </div>
                                                ))}
                                                <button className="w-100 btn btn-light mt-4" type="button"  onClick={() => push({ name: "" })}>
                                                    <i className="bi bi-plus-circle-fill"></i> Add
                                                </button>
                                            </div>
                                        )}
                                    </FieldArray>
                                    <div className="separator mt-4 mb-4"></div>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-light" type="reset" onClick={() => resetForm()}>
                                            Reset
                                        </button>
                                        <button 
                                            className="btn btn-dark" 
                                            type="submit" 
                                            disabled={!isValid || !dirty}
                                        >
                                            { !sending ?
                                                <span className="indicator-level">Apply</span> : 
                                                <span> Applying... <span className="spinner-border spinner-border-sm align-middle ms-2"></span> </span>
                                            }
                                        </button>
                                    </div>
                                </Form>
                            </>
                        )}
                    </Formik>
                )}
            </div>
        </div>
    )
}

export default CompanyTool;