import { InterUiDistritoGrid } from "../uidistritogrid/InterUiDistritoGrid";
import { InterUiDistritoMantenimientoCrud } from "./InterUiDistritoMantenimiento";

export interface UiDistritoMantenimientoProps {
    onClose: () => void;
    onSubmit: (data: InterUiDistritoMantenimientoCrud) => void;
    data?: InterUiDistritoGrid | null;
    mode: 'create' | 'edit' | 'view'
}

