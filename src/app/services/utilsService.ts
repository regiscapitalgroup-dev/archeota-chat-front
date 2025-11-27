export const normalizeStr = (value: string) => 
    String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

export const filterData = (data: any[], filters: Record<string, string | string[]>) => 
    data.filter(d => Object.keys(filters).every(k => {
        const _filterValue = filters[k]; 
        if(!_filterValue || _filterValue.length===0) return true;
        return typeof _filterValue == "string" && d[k]? 
            normalizeStr(d[k]).toUpperCase().includes(normalizeStr(_filterValue).toUpperCase()) 
            : (_filterValue.includes(normalizeStr(d[k]))) 
    }));


export const getURLImage = (path: string) => {
    const u = new URL(process.env.REACT_APP_API_URL??'');
    return `${u.protocol}//${u.host}${path}`;
}