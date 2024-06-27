import { InterUiDepartamento, InterUiDistritoMantCreate, InterUiDistritoMantEdit, InterUiProvincia } from "./InterUiDistritoMant";

export interface UiDistritoMantState {
    departamentos: InterUiDepartamento[];
    provincias: InterUiProvincia[];
    defaultData: InterUiDistritoMantCreate | InterUiDistritoMantEdit;
}