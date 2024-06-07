import { InterUiDistritoMantenimiento } from "../uidistritomantenimiento/InterUiDistritoMantenimiento";
import { InterUiDistritoUpdate } from "./InterUiDistritoModal";

export interface UiDistritoModalProps {
    onClose: () => void;
    onSubmit: (data: InterUiDistritoUpdate) => void;
    data?: Partial<InterUiDistritoMantenimiento> | null;
}

