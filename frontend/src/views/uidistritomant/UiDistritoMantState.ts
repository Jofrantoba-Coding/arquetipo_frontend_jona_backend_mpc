import { InterUiDistritoMantCrud, InterUiProvincia } from "./InterUiDistritoMant";

export interface UiDistritoMantState {
    provincias: InterUiProvincia[];
    defaultData: InterUiDistritoMantCrud;
    showDeleteConfirmation: boolean
}