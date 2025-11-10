import clsx from "clsx";
import { CSSProperties, useRef, useState } from "react";
import { ClassifierModel } from "../models/ClassifierModel";


type Props = {
    classifiers: ClassifierModel[];
    onChangeClassifier: (classifier: ClassifierModel) => void;
};

const ClassifiersTool: React.FC<Props> = ({ classifiers, onChangeClassifier }: Props) => {
    const styles: CSSProperties = {
        backgroundColor: 'white',
        minWidth: 340,
        maxWidth: '96vw',
        width: 340
    };

    const [selected, setSelected] = useState<ClassifierModel | null>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    
    const handleSelectColor = (color: string) => {
        if(!selected)
            return;
        const _new = {...selected};
        _new.color = color;
        onChangeClassifier(_new);
        setSelected(null);
    }

    const _handleTypeName = (e: React.ChangeEvent<HTMLInputElement>, classifier: ClassifierModel) => {
        const value = e.target.value
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }

        typingTimeoutRef.current = setTimeout(() => {
            if(value.trim().length <= 0)
                return;

            const _classifier = classifiers.find(c => c.id === classifier.id);
            if(!_classifier)
                return;
            _classifier.name = value;
            onChangeClassifier(_classifier);
        }, 500)
    }

    return (
        <div className="card shadow-lg rounded-4" style={styles}>
            <div className="card-body p-4">
                <div className="fw-bold fs-5 mb-3">Classifiers</div>
                <div className="d-flex flex-column gap-2">
                    { classifiers.map((classifier, i) => (
                        <div key={i} className="input-group">
                            <span className="input-group-text bg-white border-end-0">
                                <div onClick={() => setSelected(classifier)} className={clsx("classifier pallet", classifier.color)}></div>
                            </span>
                            <input type="text" className="form-control border-start-0" defaultValue={classifier.name} onChange={(e) => _handleTypeName(e, classifier)}/>
                            <button className="btn btn-danger ps-3 pe-2" type="button">
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
                                    onClick={() => handleSelectColor(`classifier-${i+1}`)} 
                                    className={clsx("classifier pallet", `classifier-${i+1}`, selected.color===`classifier-${i+1}` ? 'selected' : '')}>
                                    <i className={clsx("bi bi-check-lg", i>8 ? 'text-white': 'text-dark')}></i>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
};

export default ClassifiersTool;