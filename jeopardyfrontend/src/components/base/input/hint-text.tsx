"use client";

import type { ReactNode, Ref } from "react";
import type { TextProps as AriaTextProps } from "react-aria-components";
import { Text as AriaText } from "react-aria-components";
import { cx } from "../../../utils/cx";

interface HintTextProps extends AriaTextProps {
    /** Indicates that the hint text is an error message. */
    isInvalid?: boolean;
    /** Ref to the underlying text element. */
    ref?: Ref<HTMLElement>;
    /** Controls the hint's text size; `sm` renders it one step smaller. The text also shrinks automatically inside a small input field. */
    size?: "sm" | "md";
    /** The helper text, or the error message when `isInvalid` is set. */
    children: ReactNode;
}

export const HintText = ({ isInvalid, className, size = "md", ...props }: HintTextProps) => {
    return (
        <AriaText
            {...props}
            slot={isInvalid ? "errorMessage" : "description"}
            className={cx(
                "text-sm text-gray-500",

                // Size
                size === "sm" && "text-xs",
                "in-data-[input-size=sm]:text-xs",

                // Invalid state
                isInvalid && "text-red-600",
                "group-invalid:text-red-600",

                className,
            )}
        />
    );
};

HintText.displayName = "HintText";
