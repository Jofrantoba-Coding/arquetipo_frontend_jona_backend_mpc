import { InterUiDistritoMantenimiento } from "./InterUiDistritoMantenimiento";

export interface UiDistritoMantenimientoState {
    distritos: InterUiDistritoMantenimiento[];
    modalOpen: boolean;
    modalMode: 'edit' | 'create' | 'view';
    selectedDistrito: InterUiDistritoMantenimiento | null;
}