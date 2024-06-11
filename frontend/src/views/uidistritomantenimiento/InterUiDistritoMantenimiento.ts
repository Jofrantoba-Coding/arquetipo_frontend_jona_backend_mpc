export interface InterUiDistritoMantenimientoCrud {
    id?: number | undefined;
    descripcion: string | undefined;
    codigoDistrito: string | undefined;
    orden: number | undefined;
    provincia: {
        id: number | undefined;
    };
}

export interface InterUiDistritoMantenimientoDelete {
    id: number | undefined;
}

export interface InterUiProvincia {
    id: number;
    descripcion: string
}