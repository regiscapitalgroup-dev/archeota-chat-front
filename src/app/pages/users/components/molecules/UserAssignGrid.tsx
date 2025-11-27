import clsx from "clsx";
import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { ClassifierAtom } from "../../../../components/atoms/ClassifierAtom";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { ClientModel } from "../../../../hooks/assignment/models/ClientModel";
import { filterData } from "../../../../services/utilsService";
import { ClassifierModel } from "../../models/ClassifierModel";
import UserAssignGridItem from "../atoms/UserAssignGridItem";

type Props = {
    loading: boolean;
    title: string;
    clients: ClientModel[];
    onChangeSelected: (selected: number[]) => void;
}

const UserAssignGrid: FC<Props> = ({ loading, title, clients, onChangeSelected }: Props) => {
    const [classifiers, setClassifiers] = useState<ClassifierModel[]>([]);
    const [filters, setFilter] = useState({ name: '',  classificationId: '' });
    const filteredData: ClientModel[] = useMemo(() => filterData(clients, filters), [clients, filters]);
    const [selected, setSelected] = useState<number[]>([]);

    const _handleSearch = (e: ChangeEvent<HTMLInputElement>) => 
        setFilter(prev => ({...prev, name: e.target?.value ?? '' }));

    const _handleClassifier = (id: number | null) =>
        setFilter(prev => ({...prev, classificationId: id!==null?`${id}`: '' }));

    const _handleSelectClient = (value: boolean, id: number) =>
        setSelected(prev => 
            value ? ((prev.includes(id)) ? prev : [...prev, id]) :  prev.filter(p => p !== id)
        );

    useEffect(() => {
        const _classifiers = clients.filter(c => !!c.classificationId && !!c.classificationColor && !!c.classificationName)
                                    .map(c => ({ id: c.classificationId, color: c.classificationColor, name: c.classificationName }));
        setClassifiers(_classifiers);
        setSelected([]);
        setFilter({ name: '', classificationId: '' });
    }, [clients]);

    useEffect(() => {
        onChangeSelected(selected);
    }, [selected]);

    return (
        <div className="card shadow-sm flex-fill w-100" style={{ minHeight: '28rem'  }}>
            { loading ? (
                <div className="card-body">
                    <LoadingSpinner></LoadingSpinner>
                </div>
            ) : (
                <>
                    <div className="card-header border-0 pt-5 d-flex flex-column">
                        <h3 className="card-title">
                            <span className="fw-bolder text-dark fs-4">
                                {title}
                            </span>
                        </h3>
                        <div className="input-group mb-3">
                            <span className="input-group-text"><i className="bi bi-search"></i></span>
                            <input type="text" className="form-control" placeholder="Search an user" onChange={_handleSearch}/>
                        </div>
                        <div className="d-flex flex-row gap-2">
                            <span className={clsx("badge cursor-pointer badge-dark classifier", !filters.classificationId?'border-selected':'')} onClick={() => _handleClassifier(null)}>
                                All
                            </span>
                            { classifiers.map((c, i) => (
                                <ClassifierAtom 
                                    key={i}
                                    className={`cursor-pointer ${filters.classificationId===`${c.id}`?'border-selected':''}`}
                                    color={c.color}
                                    name={c.name}
                                    onClick={() => _handleClassifier(c.id)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="card-body py-3 d-inline-flex flex-column gap-3" style={{ overflow: 'auto', maxHeight: '25rem'  }}>
                        {filteredData.length === 0 && <span className="fw-bold text-gray-400 m-auto">Empty</span> }
                        {filteredData.map((u, i) => (
                            <UserAssignGridItem 
                                key={u.id}
                                name={`${u.firstName} ${u.lastName}`} 
                                classifier={{ id: u.classificationId, color: u.classificationColor, name: u.classificationName }}
                                country={u.country}
                                nationalId={u.nationalId}
                                selected={selected.includes(u.id)}
                                onSelect={(value) => _handleSelectClient(value, Number(u.id))}
                            />
                        ))}
                    </div>
                </>
            )}

        </div>
    )
}

export default UserAssignGrid;