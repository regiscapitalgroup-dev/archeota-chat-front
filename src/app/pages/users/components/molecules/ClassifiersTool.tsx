import clsx from "clsx";
import { Field, FieldArray, Form, Formik } from "formik";
import { CSSProperties, useState } from "react";
import Select from "react-select";
import * as Yup from 'yup';
import { ClassifierModel } from "../../models/ClassifierModel";
import { ClassifierManipulatedModel } from "./models/ClassifierManipulatedModel";
import { CompanyModel } from "../../models/CompanyModel";

const validationSchema = Yup.object({
    classifiers: Yup.array().of(
        Yup.object({
            name: Yup.string().required("Name is required")
        })
    )
})

type Props = {
    loading: boolean;
    sending: boolean;
    companies: CompanyModel[];
    onSelectCompany: (company: CompanyModel) => void;
    classifiers: ClassifierModel[];
    onChangeClassifier: (classifier: ClassifierManipulatedModel[]) => void;
};
const ClassifiersTool: React.FC<Props> = ({ sending, loading, companies, onSelectCompany, classifiers: initialValues, onChangeClassifier }: Props) => {
    const [colorSelected, setColorSelected] = useState<{ index: number, color: string } | null>(null);
    const [showClassifiers, setShowClassifiers] = useState(false);

    const styles: CSSProperties = {
        backgroundColor: 'white',
        minWidth: 340,
        maxWidth: '96vw',
        width: 340
    };

    const _init = {
        classifiers: initialValues.map(c => ({ ...c, isEdited: false }))
    };

    const _handleSelectCompany = (e: { value: {id: number, name: string}, name: string }) => {
        onSelectCompany(e.value);
        if(!showClassifiers)
            setShowClassifiers(true);
    }
   
    return (
        <div className="card shadow-lg rounded-4" style={styles}>
            <div className="card-body p-4">
                <div className="fw-bold fs-5 mb-3">Classifiers</div>
                <div className="form-control p-0 border-0 mb-3">
                    <span className="form-label">Company</span>
                    <Select 
                        placeholder='Select a company'
                        options={companies.map(c => ({ value: c, label: c.name }))}
                        onChange={_handleSelectCompany}
                        classNamePrefix="react-select"
                    />
                </div>
                <div className="separator"></div>
                { showClassifiers && (
                    !loading ? (
                        <Formik
                            initialValues={_init}
                            onSubmit={(values) => onChangeClassifier(values.classifiers)}
                            enableReinitialize
                            validationSchema={validationSchema}
                        >
                            {({values, setFieldValue, resetForm, isValid, dirty, handleChange}) => {
                                const pickColor = (color: string) => {
                                    if(colorSelected === null)
                                        return;
                                    setFieldValue(`classifiers[${colorSelected.index}].color`, color);
                                    setFieldValue(`classifiers[${colorSelected.index}].isEdited`, true);
                                    setColorSelected(null);
                                }
                                return (
                                    <>
                                    {values.classifiers.length===0 && (
                                        <span className="fw-light d-block w-100 text-center p-3 fs-5" style={{color: 'gray'}}>Empty</span>
                                    )}
                                        <Form>
                                            <FieldArray name="classifiers">
                                                {({push, remove}) => (
                                                    <>
                                                        <div className="d-flex flex-column gap-2 overflow-auto mt-3" style={{ maxHeight: '25rem' }}>
                                                            {values.classifiers.map((classifier, i) => (
                                                                <div key={i} className="input-group">
                                                                    <span className="input-group-text bg-white border-end-0">
                                                                        <div onClick={() => setColorSelected({ index: i, color: classifier.color })} className={clsx("classifier pallet", classifier.color)}></div>
                                                                    </span>
                                                                    <Field name={`classifiers[${i}].name`} placeholder='Name' className="form-control border-start-0" onChange={(e: any) => {
                                                                        handleChange(e);
                                                                        if(!!classifier.id) {
                                                                            setFieldValue(`classifiers[${i}].isEdited`, _init.classifiers[i].name!==e?.target?.value);
                                                                        } 
                                                                    }}/>    
                                                                    <button className="btn btn-danger ps-3 pe-2 z-index-0" type="button" onClick={() => remove(i)}>
                                                                        <i className="bi bi-trash-fill"></i>
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        { colorSelected !== null && (
                                                            <>
                                                                <div className="separator mt-4 mb-4"></div>
                                                                <div className="d-flex flex-row flex-wrap gap-4 justify-content-center mt-2">
                                                                    { Array.from({ length: 16 }).map((_, i) => (
                                                                        <div
                                                                            key={i}
                                                                            onClick={() => pickColor(`classifier-${i+1}`)} 
                                                                            className={clsx("classifier pallet", `classifier-${i+1}`, colorSelected.color===`classifier-${i+1}` ? 'selected' : '')}
                                                                        >
                                                                            <i className={clsx("bi bi-check-lg", i>7 ? 'text-white': 'text-dark')}></i>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </>
                                                        )}
                                                        <button className="w-100 btn btn-light mt-4" type="button" onClick={() => push({ name: '', color: 'classifier-1' })}>
                                                            <i className="bi bi-plus-circle-fill"></i> Add
                                                        </button>
                                                    </>
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
                                )
                            }}
                        </Formik>
                    ) : (
                        <span className="fs-5 fw-bold d-block w-100 text-center p-3" style={{color: 'gray'}}>Loading...</span>
                    )
                )}
            </div>
        </div>
    )
};

export default ClassifiersTool;