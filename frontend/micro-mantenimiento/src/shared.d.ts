declare module "shared/UiButton" {
    import React, { ComponentProps } from "react";

    export interface ButtonInterface {
        type: 'button' | 'submit' | 'link';
        text: string;
        icon?: string;
        disabled?: boolean;
        className?: string;
        callback?: () => void;
        href?: string; 
        color?: 'blue' | 'alternative' | 'dark' | 'light' | 'green' | 'red' | 'yellow' | 'purple';
    }

    export class UiButton extends React.Component<ButtonInterface> {}

    export default UiButton;
}

declare module "shared/UiIcon" {
    import React, { ComponentProps } from "react";

    export interface IconInterface {
        name: string;
        size?: string | number;
        color?: string;
        className?: string;
    }

    export class UiIcon extends React.Component<IconInterface> {}

    export default UiIcon;
}

declare module "shared/UiToast" {
    import React, { ComponentProps } from "react";

    export interface ToastInterface {
        type: 'success' | 'error' | 'loading' | 'default';
        message: string;
        options?: ToastOptions
    }

    export class UiToast extends React.Component<ToastInterface> {}

    export default UiToast;
}

declare module "shared/UiNotFound" {
    import React, { ComponentProps } from "react";

    export class UiNotFound extends React.Component {}

    export default UiNotFound;
}