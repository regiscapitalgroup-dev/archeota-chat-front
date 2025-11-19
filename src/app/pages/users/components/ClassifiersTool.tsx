import clsx from "clsx";
import { CSSProperties, useRef, useState } from "react";
import { ClassifierModel } from "../models/ClassifierModel";
import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from 'yup';
import Swal from "sweetalert2";


interface ClassifierManipulated extends ClassifierModel {
    isNew: boolean;
}

type Props = {
    classifiers: ClassifierModel[];
    onChangeClassifier: (classifier: ClassifierModel) => void;
};


const validationSchema = Yup.object({
    classifiers: Yup.array().of(
        Yup.object({
            name: Yup.string().required("Name is required")
        })
    )
})

const ClassifiersTool: React.FC<Props> = ({ classifiers: initialValues, onChangeClassifier }: Props) => {
    const styles: CSSProperties = {
        backgroundColor: 'white',
        minWidth: 340,
        maxWidth: '96vw',
        width: 340
    };

    const _init = {
        classifiers: initialValues.map(i => ({...i, isNew: false}))
    };
    const [classifiers, setClassifiers] = useState<{classifiers: ClassifierManipulated[]}>(_init);
    const [selected, setSelected] = useState<ClassifierModel | null>(null);
    const [sending, setSending] = useState(false);

    const _handleSelectColor = (color: string, setFieldValue: (field: string, value: any) => void) => {
        if(!selected)
            return;
        setFieldValue(`classifiers[${selected.id}].color`, color);
        setSelected(null);
    }

    const _onApply = ({ classifiers }: {classifiers: ClassifierManipulated[]}) => {
        setSending(true);
        console.log(classifiers);
        setTimeout(() => setSending(false), 1000);
    }

    const _delete = (cb: Function, idx: number) => {

        const _removeItem = () => {
            setClassifiers(prev => ({ classifiers: prev.classifiers.filter((_, i) => i!==idx) }));
            cb(idx);
        };
        // console.log(classifiers.classifiers[idx].isNew);
        
        // if(classifiers.classifiers[idx].isNew) {
            return _removeItem();
        // }
        // else
        //     Swal.fire({
        //         title: 'Are you sure?',
        //         text: 'The users with this classification will be empty',
        //         icon: 'warning',
        //         showCancelButton: true,
        //         confirmButtonText: 'Yes, delete',
        //         cancelButtonText: 'No, cancel',
        //         customClass: {
        //             confirmButton: 'btn-dark'
        //         },
        //         scrollbarPadding: false,
        //         heightAuto: false
        //     })
        //     .then(r => {
        //         if(r.isConfirmed)
        //             _removeItem();
        //     });
    }

    const _add = (cb: Function) => {
        const _new = {
            id: Math.max(...classifiers.classifiers.map(c => c.id))+1, 
            name: '', 
            color: 'classifier-1', 
            isNew: true
        };
        setClassifiers(prev => ({ classifiers: [...prev.classifiers, _new] }));
        cb(_new);
    }

    const _reset = () => setClassifiers({classifiers: initialValues.map(i => ({...i, isNew: false}))});    
    return (
        <div className="card shadow-lg rounded-4" style={styles}>
            <div className="card-body p-4">
                <div className="fw-bold fs-5 mb-3">Classifiers</div>
                <Formik
                    initialValues={classifiers}
                    onSubmit={_onApply}
                    enableReinitialize
                    validationSchema={validationSchema}
                >
                    {({values, setFieldValue, isValid, dirty}) => (
                        <Form>
                            <FieldArray name="classifiers">
                                {({push, remove}) => (
                                    <>
                                        <div className="d-flex flex-column gap-2 overflow-auto" style={{ maxHeight: '25rem' }}>
                                            {values.classifiers.map((classifier, i) => (
                                                <div key={i} className="input-group">
                                                    <span className="input-group-text bg-white border-end-0">
                                                        <div onClick={() => setSelected({...classifier, id: i})} className={clsx("classifier pallet", classifier.color)}></div>
                                                    </span>
                                                    <Field name={`classifiers[${i}].name`} placeholder='Name' className="form-control border-start-0"/>
                                                    <button className="btn btn-danger ps-3 pe-2" type="button" onClick={() => _delete(remove, i)}>
                                                        <i className="bi bi-trash-fill"></i>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        { selected && (
                                            <>
                                                <div className="separator mt-4 mb-4"></div>
                                                <div className="d-flex flex-row flex-wrap gap-4 justify-content-center mt-2">
                                                    { Array.from({ length: 16 }).map((_, i) => (
                                                        <div
                                                            key={i}
                                                            onClick={() => _handleSelectColor(`classifier-${i+1}`, setFieldValue)} 
                                                            className={clsx("classifier pallet", `classifier-${i+1}`, selected.color===`classifier-${i+1}` ? 'selected' : '')}>
                                                            <i className={clsx("bi bi-check-lg", i>7 ? 'text-white': 'text-dark')}></i>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}

                                        <button className="w-100 btn btn-light mt-4" type="button" onClick={() => _add(push)}>
                                            <i className="bi bi-plus-circle-fill"></i> Add
                                        </button>
                                    </>
                                )}
                            </FieldArray>
                            <div className="separator mt-4 mb-4"></div>
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-light" type="reset" onClick={_reset}>
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
                    )}
                </Formik>

                
            </div>
        </div>
    )
};

export default ClassifiersTool;