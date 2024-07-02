declare module "microMantenimiento/UiDistritoGrid" {
    import React, { ComponentProps } from "react";

    export interface UiDistritoGridProps {
        loadingData?: (page: number) => void;
        distritos?: InterUiDistritoGrid[];
        currentPage?: number;
    }

    export class UiDistritoGrid extends React.Component<UiDistritoGridProps> {}

    export default UiDistritoGrid;
}