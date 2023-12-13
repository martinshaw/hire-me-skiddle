/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: useSimulateFormInput.ts
Created:  2023-12-13T03:33:54.418Z
Modified: 2023-12-13T03:33:54.418Z

Description: description
*/

import { TextInputForwardRefType } from "@/Components/TextInput";
import { RefObject, useEffect } from "react";

type UseSimulateFormInputPropsType = {
    emailInputRef: RefObject<TextInputForwardRefType>;
    passwordInputRef: RefObject<TextInputForwardRefType>;
    submitButtonRef: RefObject<HTMLButtonElement>;
    simulateFormInput?: {
        email: string;
        password: string;
    };
}

const useSimulateFormInput = (props: UseSimulateFormInputPropsType) => {
    useEffect(() => {
        console.log({
            emailInputRef: props.emailInputRef.current,
            passwordInputRef: props.passwordInputRef.current,
            submitButtonRef: props.submitButtonRef.current,
            simulateFormInput: props.simulateFormInput
        })

        if (props.simulateFormInput == null) return;
        if (props.emailInputRef.current == null || props.passwordInputRef.current == null || props.submitButtonRef.current == null) return;
        if (props.emailInputRef.current.self == null || props.passwordInputRef.current.self == null) return;

        props.emailInputRef.current.self.value = props.simulateFormInput.email;
        props.passwordInputRef.current.self.value = props.simulateFormInput.password;
        props.submitButtonRef.current.click();
    },
        [props.simulateFormInput]
    );
}

export default useSimulateFormInput;
