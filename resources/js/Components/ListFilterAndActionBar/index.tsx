/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-16T17:20:08.996Z
Modified: 2023-12-16T17:20:08.996Z

Description: description
*/

import {
    ChangeEventHandler,
    MouseEventHandler,
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from "react";
import Dropdown from "../Dropdown";
import SecondaryButton from "../SecondaryButton";
import { AuthenticatedLayoutPropsType } from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";

export type ListFilterAndActionBarPropsType<TFilterKeys extends string[]> = {
    captions: Record<TFilterKeys[number], string>;
    controls: Record<
        TFilterKeys[number],
        {
            type: "text" | "date";
            value: () => string;
            onChange: (
                existingFilterQueries: Record<TFilterKeys[number], string>,
                newValue: string
            ) => void;
        }
    >;
    formLabelMaxWidthClassName?: string;
};

const ListFilterAndActionBar = <TFilterKeys extends string[]>(
    props: ListFilterAndActionBarPropsType<TFilterKeys>
) => {
    const page = usePage<AuthenticatedLayoutPropsType & PageProps>();

    const [filterFieldsVisible, setFilterFieldsVisible] = useState<
        TFilterKeys[number][]
    >([]);

    const [filterQueries, setFilterQueries] = useState<
        Record<TFilterKeys[number], string>
    >({} as Record<TFilterKeys[number], string>);

    useEffect(() => {
        console.log("location.search changed before", location.search, filterFieldsVisible, filterQueries);

        setFilterFieldsVisible(
            Object.keys((new URLSearchParams(location.search)).entries()).reduce(
                (previousValue, currentValue) => {
                    if (Object.keys(props.captions).includes(currentValue)) return [...previousValue, currentValue];

                    return previousValue;
                },
                [] as TFilterKeys[number][]
            )
        )

        setFilterQueries(
            Object.keys(props.controls).reduce(
                (previousValue, currentValue) => ({
                    ...previousValue,
                    [currentValue]: props.controls[currentValue as TFilterKeys[number]].value(),
                }),
                {} as Record<TFilterKeys[number], string>
            )
        );

        console.log("location.search changed after", location.search, filterFieldsVisible, filterQueries);
    }, [location.search]);

    const handleFilterButtonClicked = useCallback(
        (filterKey: TFilterKeys[number]) => {
            if (filterFieldsVisible.includes(filterKey)) {
                setFilterFieldsVisible((previousState) =>
                    previousState.filter((value) => value !== filterKey)
                );
            } else {
                setFilterFieldsVisible((previousState) => [
                    ...previousState,
                    filterKey,
                ]);
            }
        },
        []
    );

    const textControl: (key: TFilterKeys[number]) => ReactNode = useCallback(
        (key) => (
            <div className="flex-1 flex flex-row gap-6 justify-start items-center">
                <label
                    htmlFor={key}
                    className={
                        "block text-sm font-medium text-gray-700 text-right " +
                        (props.formLabelMaxWidthClassName == null
                            ? "w-40"
                            : props.formLabelMaxWidthClassName)
                    }
                >
                    {props.captions[key]}
                </label>
                <div className="flex-1 flex flex-row gap-6 justify-start items-center">
                    <input
                        type="text"
                        name={key}
                        id={key}
                        value={filterQueries[key] || ''}
                        onChange={(e) => props.controls[key].onChange(filterQueries, e.currentTarget.value)}
                        className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md max-w-md"
                    />
                </div>
            </div>
        ),
        []
    );

    const dateControl: (key: TFilterKeys[number]) => ReactNode = useCallback(
        (key) => (
            <div className="flex-1 flex flex-row gap-6 justify-start items-center">
                <label
                    htmlFor={key}
                    className={
                        "block text-sm font-medium text-gray-700 text-right " +
                        (props.formLabelMaxWidthClassName == null
                            ? "w-40"
                            : props.formLabelMaxWidthClassName)
                    }
                >
                    {props.captions[key]}
                </label>
                <div className="flex-1 flex flex-row gap-6 justify-start items-center">
                    <input
                        type="date"
                        name={key}
                        id={key}
                        value={filterQueries[key] || ''}
                        onChange={(e) => props.controls[key].onChange(filterQueries, e.currentTarget.value)}
                        className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md max-w-md"
                    />
                </div>
            </div>
        ),
        []
    );

    return (
        <div className="px-0 @sm:px-6 @lg:px-8 flex flex-col gap-3 justify-stretch items-start">
            <div className="flex-1 flex flex-row gap-6 justify-start items-center">
                <Dropdown>
                    <Dropdown.Trigger>
                        <SecondaryButton>Filter</SecondaryButton>
                    </Dropdown.Trigger>

                    <Dropdown.Content align="left">
                        {Object.keys(props.captions).map((key, index) => (
                            <Dropdown.Link
                                href="#"
                                onClick={() => handleFilterButtonClicked(key)}
                                key={index}
                            >
                                {props.captions[key as TFilterKeys[number]]}
                            </Dropdown.Link>
                        ))}
                    </Dropdown.Content>
                </Dropdown>
            </div>
            {Object.keys(props.controls).map((key, index) => (
                <div
                    key={index}
                    className={
                        filterFieldsVisible.includes(key as TFilterKeys[number])
                            ? "flex-1 flex flex-row gap-6 justify-start items-center w-full"
                            : "hidden"
                    }
                >
                    {props.controls[key as TFilterKeys[number]].type === "text"
                        ? textControl(key as TFilterKeys[number])
                        : dateControl(key as TFilterKeys[number])}
                </div>
            ))}
        </div>
    );
};

export default ListFilterAndActionBar;
