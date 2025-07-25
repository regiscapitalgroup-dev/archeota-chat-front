
export interface ErrorLogRowData {
    [colName: string]: string | null;
}

export interface ErrorLogItem {
    rowNumber: number;
    errorMessage: string;
    rowData: ErrorLogRowData;
}

export interface ImportJobLog {
    id: number;
    status: string;
    rowNumber: number;
    errorMessage: string;
    rowData: { [colName: string]: any };
    createdAt: string;
}

