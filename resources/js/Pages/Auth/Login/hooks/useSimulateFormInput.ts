/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: useSimulateFormInput.ts
Created:  2023-12-13T03:33:54.418Z
Modified: 2023-12-13T03:33:54.418Z

Description: description
*/

import useIsMounting from "@/hooks/useIsMounting";
import { FormEventHandler, useEffect } from "react";
import { LoginFormDataType } from "..";

type UseSimulateFormInputPropsType = {
    data: LoginFormDataType;
    setData: (data: (previousData: LoginFormDataType) => LoginFormDataType) => void;
    simulateFormInput?: {
        email: string;
        password: string;
    };
    submit: () => void;
}

const useSimulateFormInput = (props: UseSimulateFormInputPropsType) => {
    const isMounting = useIsMounting();
    let shouldSimulate = true;

    useEffect(() => {
        if (isMounting || shouldSimulate !== true) return;

        if (props.simulateFormInput == null) return;
        if (props.setData == null) return;

        const simulateTyping = (newValue: string | undefined, field: 'email' | 'password') => (
            new Promise<void>((resolve) => {
                if (newValue == null) return;

                props.setData((currentValue) => ({
                    ...currentValue,
                    [field]: '',
                }));

                const type = (i: number) => {
                    if (i < newValue.length) {
                        props.setData((currentValue) => {
                            console.log('setting to ', {
                                ...currentValue,
                                [field]: currentValue[field] + newValue.charAt(i),
                            });

                            return {
                                ...currentValue,
                                [field]: currentValue[field] + newValue.charAt(i),
                            }
                        });

                        setTimeout(() => type(i + 1), 30);
                    } else {
                        resolve();
                    }
                };
                type(0);
            })
        );

        const waitFor = (ms: number) => (
            new Promise<void>((resolve) => {
                setTimeout(() => resolve(), ms);
            })
        );

        simulateTyping(
            props.simulateFormInput?.email,
            'email'
        )
            .then(() =>
                simulateTyping(
                    props.simulateFormInput?.password,
                    'password'
                )
            )
    },
        [
            isMounting,
            props.simulateFormInput,
            shouldSimulate,
        ]
    );

    useEffect(() => {
        if (isMounting || shouldSimulate !== true) return;

        if (props.data.password !== 'password') return;

        props.submit();

        return () => {
            shouldSimulate = false;
        }
    }, [isMounting, props.data, props.submit, shouldSimulate]);
}

export default useSimulateFormInput;
