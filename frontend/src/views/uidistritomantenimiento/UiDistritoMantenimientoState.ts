import { InterUiDistritoMantenimientoCrud, InterUiProvincia } from "./InterUiDistritoMantenimiento";

export interface UiDistritoMantenimientoState {
    provincias: InterUiProvincia[];
    defaultData: InterUiDistritoMantenimientoCrud;
    showDeleteConfirmation: boolean
}