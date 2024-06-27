declare module "container/Button" {
    import React, { ComponentProps } from "react";
    import { type VariantProps } from "class-variance-authority";
    type ButtonElementProps = ComponentProps<"button">;
    export interface ButtonProps
        extends ButtonElementProps,
        VariantProps<typeof buttonStyles> {
        label?: string;
        icon?: React.ReactNode;
        rightIcon?: React.ReactNode;
        buttonWrapperClassName?: string;
    }
    const buttonStyles: (
        props?:
            | ({
                buttonType?:
                | "error"
                | "default"
                | "success"
                | "primary"
                | "secondary"
                | "warning"
                | "info"
                | null
                | undefined;
                size?: "default" | "sm" | "lg" | "xl" | "xxl" | null | undefined;
                padding?: "default" | "sm" | "lg" | "xl" | "xxl" | null | undefined;
                rounded?:
                | "none"
                | "default"
                | "full"
                | "sm"
                | "lg"
                | "xl"
                | "xxl"
                | null
                | undefined;
                isFullWidth?: boolean | null | undefined;
            } & import("class-variance-authority/dist/types").ClassProp)
            | undefined
    ) => string;
    function Button({
        label,
        buttonType,
        rounded,
        padding,
        size,
        isFullWidth,
        className,
        ...buttonProps
    }: ButtonProps): React.JSX.Element;
    export default Button;
}