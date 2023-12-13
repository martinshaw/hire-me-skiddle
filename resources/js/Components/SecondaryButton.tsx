import { ButtonHTMLAttributes, useState } from "react";

export default function SecondaryButton({
    type = "button",
    className = "",
    disabled,
    children,
    transparent,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { transparent?: boolean }) {
    const [buttonHovered, setButtonHovered] = useState<boolean>(false);

    return (
        <button
            {...props}
            type={type}
            className={
                `select-none inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
            style={
                transparent && buttonHovered !== true
                    ? {
                          backgroundColor: "rgba(255, 255, 255, 0.5)",
                      }
                    : {}
            }
            onMouseEnter={(event) => {
                setButtonHovered(true);
                if (props.onMouseEnter != null) props.onMouseEnter(event);
            }}
            onMouseLeave={(event) => {
                setButtonHovered(false);
                if (props.onMouseLeave != null) props.onMouseLeave(event);
            }}
        >
            {children}
        </button>
    );
}
