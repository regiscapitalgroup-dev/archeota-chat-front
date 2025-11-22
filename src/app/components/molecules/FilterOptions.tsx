import AccordionGroup from "./AccordionGroup";
import { FilterProp } from "./models/FilterProp.Model";

type Props<T> = {
    filters: T;
    props: FilterProp[];
    setFilters: (filters: T) => void;
    onReset: () => void;
    closePopup?: () => void;
};

const FilterOptions = <T,>({ filters, props, setFilters, onReset, closePopup } : Props<T>) => (
    <div className="filter-popup card shadow-lg rounded-4" style={{  minWidth: 340 }}>
        <div className="card-body p-4">
            <div className="fw-bold fs-5 mb-3">Filter Options</div>
            <div style={{ maxHeight: '38rem', overflow: 'auto' }}>
                { props.filter(p => p.type === "text" || p.type === "date").map((p, i) => (
                    <div key={i} className="mb-3">
                        <label className="form-label"> {p.label} </label>
                        { p.type == "text" ?
                            <input type="text" className="form-control" value={(filters as Record<string, string>)[p.key]} onChange={(e) => setFilters({...filters, [p.key]: e.target.value})}/>
                            :
                            <input type="date" className="form-control" value={(filters as Record<string, string>)[p.key]} onChange={(e) => setFilters({...filters, [p.key]: e.target.value})}/>
                        }
                    </div>
                ))}

                <div className="filter-selectors">
                    <AccordionGroup items={
                        props.filter(p => Array.isArray(p.type) && p.type.every(option => typeof option === "string") && p.type.length > 0).map((p) => (
                            {
                                title: p.label,
                                children: (p.type as string[]).map((cbox, i) => (
                                    <div key={cbox+i} className="form-check form-check-custom form-check-solid mb-3">
                                        <input 
                                            type="checkbox" 
                                            className="form-check-input" 
                                            id={`${cbox}_cbox`}
                                            checked={(filters as Record<string, string[]>)[p.key]?.includes(cbox)}
                                            onChange={() => 
                                                setFilters({
                                                    ...filters, 
                                                    [p.key]: 
                                                    ((filters as Record<string, string[]>)[p.key].includes(cbox) ? 
                                                        (filters as Record<string, string[]>)[p.key].filter(v => v !== cbox)
                                                        : [...((filters as Record<string, string[]>)[p.key] || []), cbox]
                                                    )})
                                            }
                                        />
                                        <label className="form-check-label" htmlFor={`${cbox}_cbox`}>
                                            {cbox}
                                        </label>
                                    </div>
                                ))
                            }
                        ))
                    }/>
                </div>
            </div>
            <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-light" onClick={onReset}>
                    Reset
                </button>
                <button type="button" className="btn btn-dark" onClick={closePopup}>
                    Apply
                </button>
            </div>
        </div>
    </div>
)

export default FilterOptions;