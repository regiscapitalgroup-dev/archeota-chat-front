import { ClassifierAtom } from "../../../../components/atoms/ClassifierAtom";
import { CountryInfoAtom } from "../../../../components/atoms/CountryInfoAtom";
import { ClassifierModel } from "../../models/ClassifierModel";

type Props = {
    selected: boolean;
    name: string;
    country: string;
    nationalId: string;
    classifier: ClassifierModel | undefined;
    onSelect: (value: boolean) => void;
};

const UserAssignGridItem = ({ selected, name, country, nationalId, classifier, onSelect }: Props) => {
    return (
        <label className="card shadow-sm cursor-pointer">
            <div className="card-body d-flex flex-row">
                <div className="row w-100">
                    <div className="col-12 col-lg-6">
                        <span>{name}</span>
                        <div>
                            <CountryInfoAtom country={country}/>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <span className="d-block text-nowrap"> {nationalId} </span>
                        { classifier && (
                            <ClassifierAtom 
                                name={classifier.name}
                                color={classifier.color}
                            />
                        )}
                    </div>
                </div>
                <div className="form-check ms-auto mt-auto mb-auto">
                    <input type="checkbox" className="form-check-input" checked={!!selected} onChange={(e) => onSelect(!!e.target.checked)} />
                </div>
            </div>
        </label>
    )
};

export default UserAssignGridItem;