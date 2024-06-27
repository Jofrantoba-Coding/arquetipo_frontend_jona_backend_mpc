import { InterUiDistritoGrid } from "./InterUiDistritoGrid";

export interface UiDistritoGridState {
    distritos: InterUiDistritoGrid[];
    modalOpen: boolean;
    modalMode: 'edit' | 'create' | 'view' | 'delete';
    selectedDistrito: InterUiDistritoGrid | null;
    currentPage: number;
    isLoading: boolean
}