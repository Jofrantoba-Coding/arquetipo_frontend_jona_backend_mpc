import { InterUiDistritoGrid } from "./InterUiDistritoGrid";

export interface UiDistritoGridProps {
    loadingData?: (page: number) => void;
    distritos?: InterUiDistritoGrid[];
}