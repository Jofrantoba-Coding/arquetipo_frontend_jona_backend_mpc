export interface InterUiDistritoMant {
    loadingData?: () => void
}

export interface InterUiDistritoMantCrud {
    id?: number | undefined;
    descripcion: string | undefined;
    codigoDistrito: string | undefined;
    orden: number | undefined;
    provincia: {
        id: number | undefined;
    };
}

export interface InterUiDistritoMantDelete {
    id: number | undefined;
}

export interface InterUiProvincia {
    id: number;
    descripcion: string
}