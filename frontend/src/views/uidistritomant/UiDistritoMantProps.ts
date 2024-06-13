import { InterUiDistritoGrid } from "../uidistritogrid/InterUiDistritoGrid";
import { InterUiDistritoMant, InterUiDistritoMantCrud } from "./InterUiDistritoMant";

export interface UiDistritoMantProps extends InterUiDistritoMant {
    onClose: () => void;
    onSubmit: (data: InterUiDistritoMantCrud) => void;
    data?: InterUiDistritoGrid | null;
    mode: 'create' | 'edit' | 'view'
}

