import { InterUiDistritoMantenimiento } from "../uidistritomantenimiento/InterUiDistritoMantenimiento";
import { InterUiDistritoModalCrud } from "./InterUiDistritoModal";

export interface UiDistritoModalProps {
    onClose: () => void;
    onSubmit: (data: InterUiDistritoModalCrud) => void;
    data?: InterUiDistritoMantenimiento | null;
    mode: 'create' | 'edit' | 'view'
}

