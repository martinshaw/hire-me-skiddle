/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-30T05:02:16.933Z
Modified: 2023-12-30T05:02:16.933Z

Description: description
*/

import { LengthAwarePaginatorType } from "@/types";
import SecondaryButton from "../SecondaryButton";
import { ReactNode, useEffect, useState } from "react";
import LengthAwarePaginatorButtonRow from "../LengthAwarePaginatorButtonRow";
import { router } from "@inertiajs/react";
import { useDebounce } from "use-debounce";
import useIsMounting from "@/hooks/useIsMounting";
import { VIEWPORT_DESKTOP, VIEWPORT_TABLET } from "@/utilities";

type LengthAwarePaginatorFilterableCardGridPropsFilterControlType = {
    caption: string;
    type: "text" | "date" | "number";
};

export type LengthAwarePaginatorFilterableCardGridPropsType<TModelType extends any, TFilterKeys extends string[]> = {
    paginator: LengthAwarePaginatorType<any>;
    cardRenderer: (model: TModelType, index: number) => ReactNode;
    noItemsFoundMessage: ReactNode;
    filterControls: Record<
        TFilterKeys[number],
        LengthAwarePaginatorFilterableCardGridPropsFilterControlType
    >
    cardGridSpan?: {
        mobile: number;  // 1
        tablet: number;  // 3
        desktop: number; // 4
    }
};

const LengthAwarePaginatorFilterableCardGrid = <TModelType extends any, TFilterKeys extends string[]>(props: LengthAwarePaginatorFilterableCardGridPropsType<TModelType, TFilterKeys>) => {
    const isMounting = useIsMounting();

    const cardGridSpan = props.cardGridSpan == null ? {
        mobile: 1,
        tablet: 3,
        desktop: 4,
    } : props.cardGridSpan;

    const [filterQueries, setFilterQueries] = useState<Record<TFilterKeys[number], string>>(
        ([...(new URLSearchParams(location.search)).entries()]).reduce(
            (carry, entry) => {
                return (Object.keys(props.filterControls).includes(entry[0]) && entry[1] != null) ?
                    { ...carry, [entry[0]]: entry[1] } :
                    carry;
            },
            {} as Record<TFilterKeys[number], string>,
        )
    );
    const [debouncedFilterQueries] = useDebounce(filterQueries, 1000, {});

    const [filterBarVisible, setFilterBarVisible] = useState<boolean>(Object.keys(filterQueries).length > 0);

    useEffect(() => {
        if (isMounting) return;
        if (Object.keys(debouncedFilterQueries).length === 0) return;

        const searchParams = new URLSearchParams(location.search);

        const newSearchParamData: Record<string, string> = debouncedFilterQueries;
        Object.keys(searchParams).forEach((key) => {
            newSearchParamData[key] = searchParams.get(key) || '';
        });

        newSearchParamData['page'] = '1';

        router.reload({
            data: newSearchParamData,
            preserveState: true,
            preserveScroll: true,
        });
    }, [debouncedFilterQueries]);

    useEffect(() => {
        if (isMounting) return;
        if (filterBarVisible) return;

        // get current url without search params
        const currentUrl = location.href.split('?')[0];

        router.visit(currentUrl, {
            data: {
                'page': '1',
            },
            preserveState: false,
            preserveScroll: true,
        });
    }, [filterBarVisible]);

    const textControl: (control: LengthAwarePaginatorFilterableCardGridPropsFilterControlType, key: TFilterKeys[number]) => ReactNode = (control, key) => (
        <div className="flex-1 flex flex-row gap-6 justify-start items-center">
            <div className="flex-1 flex flex-row gap-6 justify-start items-center">
                <input
                    type="text"
                    name={key}
                    id={key}
                    value={filterQueries[key] || ''}
                    placeholder={control.caption || ''}
                    onChange={event => { setFilterQueries((previousState) => ({ ...previousState, [key]: event.target?.value || '' })) }}
                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md max-w-md"
                />
            </div>
        </div>
    )

    const dateControl: (control: LengthAwarePaginatorFilterableCardGridPropsFilterControlType, key: TFilterKeys[number]) => ReactNode = (control, key) => (
        <div className="flex-1 flex flex-row gap-6 justify-start items-center">
            <div className="flex-1 flex flex-row gap-6 justify-start items-center">
                <input
                    type="text"
                    name={key}
                    id={key}
                    value={filterQueries[key] || ''}
                    placeholder={control.caption || ''}
                    onFocus={event => { event.currentTarget.type = 'date'; }}
                    onBlur={event => { if (!event.currentTarget.value) event.currentTarget.type = 'text'; }}
                    onChange={event => { setFilterQueries((previousState) => ({ ...previousState, [key]: event.target?.value || '' })) }}
                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md max-w-md"
                />
            </div>
        </div>
    )

    const numberControl: (control: LengthAwarePaginatorFilterableCardGridPropsFilterControlType, key: TFilterKeys[number]) => ReactNode = (control, key) => (
        <div className="flex-1 flex flex-row gap-6 justify-start items-center">
            <div className="flex-1 flex flex-row gap-6 justify-start items-center">
                <input
                    type="text"
                    name={key}
                    id={key}
                    value={filterQueries[key] || ''}
                    placeholder={control.caption || ''}
                    onFocus={event => { event.currentTarget.type = 'number'; }}
                    onBlur={event => { if (!event.currentTarget.value) event.currentTarget.type = 'text'; }}
                    onChange={event => { setFilterQueries((previousState) => ({ ...previousState, [key]: event.target?.value || '' })) }}
                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md max-w-md"
                />
            </div>
        </div>
    )

    const paginationCaption: ReactNode = (() => {
        if (props.paginator?.total === 0) return null;
        if (!debouncedFilterQueries || Object.keys(debouncedFilterQueries || {}).length <= 0) return null;

        // let fromOrdinal = 'th';
        // if (props.paginator.from === 1) fromOrdinal = 'st';
        // if (props.paginator.from === 2) fromOrdinal = 'nd';
        // if (props.paginator.from === 3) fromOrdinal = 'rd';

        // let toOrdinal = 'th';
        // if (props.paginator.to === 1) toOrdinal = 'st';
        // if (props.paginator.to === 2) toOrdinal = 'nd';
        // if (props.paginator.to === 3) toOrdinal = 'rd';

        return <div className="flex-1 gap-6 text-center text-sm text-stone-600 pb-2">
            {/*Showing {props.paginator.from}<sup className="inline">{fromOrdinal}</sup> to {props.paginator.to}<sup className="inline">{toOrdinal}</sup> of {props.paginator.total} results with filters applied.*/}
            Showing {props.paginator.total} result{props.paginator.total === 1 ? '' : 's'} with filters applied.
        </div>
    })()

    return (
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <div className="px-4 @sm:px-6 @lg:px-8 flex flex-row gap-6">
                <div className="">
                    <SecondaryButton
                        onClick={() => setFilterBarVisible((previousState) => !previousState)}
                    >
                        {Object.keys(filterQueries || {}).length > 0 ? <>Clear</> : <>Filters</>}
                    </SecondaryButton>
                </div>
                <div className="flex-1 flex justify-end">
                    <LengthAwarePaginatorButtonRow
                        paginator={props.paginator}
                    />
                </div>
            </div>

            <div className="px-4 @sm:px-6 @lg:px-8 flex flex-col gap-3">
                {paginationCaption}

                <div className={"duration-300 flex flex-col " + VIEWPORT_DESKTOP + ":flex-row gap-3 px-px " + VIEWPORT_DESKTOP + ":gap-3 " + VIEWPORT_DESKTOP + ":overflow-hidden " + VIEWPORT_DESKTOP + ":pt-1 " + (filterBarVisible ? (VIEWPORT_DESKTOP + ':h-11 h-auto') : ('overflow-hidden ' + VIEWPORT_DESKTOP + ':h-0 h-0'))}>
                    {Object.keys(props.filterControls).map((key, index) => (
                        <div
                            key={index}
                        >
                            {(() => {
                                switch (props.filterControls[key as TFilterKeys[number]].type) {
                                    case 'text': return textControl(props.filterControls[key as TFilterKeys[number]], key as TFilterKeys[number]);
                                    case 'date': return dateControl(props.filterControls[key as TFilterKeys[number]], key as TFilterKeys[number]);
                                    case 'number': return numberControl(props.filterControls[key as TFilterKeys[number]], key as TFilterKeys[number]);
                                    default: return null;
                                }
                            })()}
                        </div>
                    ))}
                </div>
            </div>

            {(props.paginator?.data || []).length > 0 ? (
                <>
                    {/* Dynamically using Tailwind classes relies on a rule in the `safelist` key of the tailwind.config.js file */}
                    <div className={"px-0 " + VIEWPORT_TABLET + ":px-6 " + VIEWPORT_DESKTOP + ":px-8 grid grid-cols-" + cardGridSpan.mobile + " " + VIEWPORT_TABLET + ":grid-cols-" + cardGridSpan.tablet + " " + VIEWPORT_DESKTOP + ":grid-cols-" + cardGridSpan.desktop + " gap-6"}>
                        {(props.paginator.data || []).map(props.cardRenderer)}
                    </div>
                </>
            ) : (
                <div className="max-w-7xl mx-auto px-4 text-center @sm:px-6 @lg:px-8 justify-center items-center m-auto w-full h-full flex flex-col">
                    <div className="text-stone-400">
                        {props.noItemsFoundMessage}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LengthAwarePaginatorFilterableCardGrid;
