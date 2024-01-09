import { ButtonHTMLAttributes, Ref, forwardRef } from "react";

type PrimaryButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode;
};

const PrimaryButton = forwardRef(
    (
        {
            className = "",
            disabled,
            children,
            ...props
        }: PrimaryButtonPropsType,
        ref: Ref<HTMLButtonElement>
    ) => {
        return (
            <button
                {...props}
                ref={ref}
                className={
                    `select-none inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white fill-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                        disabled && "opacity-25"
                    } ` + className
                }
                disabled={disabled}
            >
                {children}
            </button>
        );
    }
);


export default PrimaryButton;
