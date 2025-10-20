export const filterData = (data: any[], filters: Record<string, string | string[]>) => 
    data.filter(d => Object.keys(filters).every(k => {
        const _filterValue = filters[k]; 
        if(!_filterValue || _filterValue.length===0) return true;
        return typeof _filterValue == "string" ? 
            String(d[k]).trim().toUpperCase().includes(_filterValue.toUpperCase()) 
            : (_filterValue.includes(d[k])) 
    }));