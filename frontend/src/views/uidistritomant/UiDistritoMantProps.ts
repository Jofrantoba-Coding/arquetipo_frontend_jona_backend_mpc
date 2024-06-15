import { InterUiDistritoGrid } from "../uidistritogrid/InterUiDistritoGrid";
import { InterUiDistritoMant, InterUiDistritoMantCreate, InterUiDistritoMantEdit, InterUiDistritoMantDelete } from "./InterUiDistritoMant";
import * as Yup from 'yup';
import { INVALID } from '../../constants/validation';

export interface UiDistritoMantProps extends InterUiDistritoMant {
    onClose: () => void;
    onSubmit: (data: InterUiDistritoMantCreate | InterUiDistritoMantEdit) => void;
    handleChangeDepartamento: (event: any) => void;
    handleCreate: (data: InterUiDistritoMantCreate | InterUiDistritoMantEdit) => void;
    handleUpdate: (data: InterUiDistritoMantCreate | InterUiDistritoMantEdit) => void;
    handleDelete: (data: InterUiDistritoMantDelete) => void;
    data?: InterUiDistritoGrid | null;
    mode: 'create' | 'edit' | 'view' | 'delete'
}

export const validationUpdateSchema = Yup.object({
    id: Yup.number().required(INVALID.REQUIRED).positive(INVALID.ID),
    descripcion: Yup.string().required(INVALID.REQUIRED),
    codigoDistrito: Yup.string().required(INVALID.REQUIRED),
    orden: Yup.number().required(INVALID.REQUIRED).min(0, INVALID.MIN_ZERO),
    provincia: Yup.object({
        id: Yup.number().required(INVALID.REQUIRED).positive(INVALID.ID)
    }).required(INVALID.REQUIRED)
});

export const validationCreateSchema = Yup.object({
    descripcion: Yup.string().required(INVALID.REQUIRED),
    codigoDistrito: Yup.string().required(INVALID.REQUIRED),
    orden: Yup.number().required(INVALID.REQUIRED).min(0, INVALID.MIN_ZERO),
    provincia: Yup.object({
        id: Yup.number().required(INVALID.REQUIRED).positive(INVALID.ID)
    }).required(INVALID.REQUIRED)
});