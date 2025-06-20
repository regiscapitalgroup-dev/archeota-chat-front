
export const normalizeKey = (str: string) =>
    (str || '')
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[_\-]/g, '')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
