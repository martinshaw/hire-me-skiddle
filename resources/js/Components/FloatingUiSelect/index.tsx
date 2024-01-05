/*
All Rights Reserved, (c) 2024 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2024-01-04T13:42:28.746Z
Modified: 2024-01-04T13:42:28.746Z

Description: description
*/

import { ReactNode, createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import {
    autoUpdate,
    flip,
    useFloating,
    useInteractions,
    useListNavigation,
    useTypeahead,
    useClick,
    useListItem,
    useDismiss,
    useRole,
    FloatingFocusManager,
    FloatingList,
    Placement,
    arrow,
    FloatingArrow,
} from "@floating-ui/react";
import SimpleBar from "simplebar-react";
import SecondaryButton from "../SecondaryButton";

interface FloatingUiSelectContextValue {
    activeIndex: number | null;
    selectedIndex: number | null;
    getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
    handleSelect: (index: number | null) => void;
}

const FloatingUiSelectContext = createContext<FloatingUiSelectContextValue>(
    {} as FloatingUiSelectContextValue
);

type FloatingUiSelectPropsType = {
    position?: Placement;
    arrow?: boolean;
    label?: (currentLabel?: string | null) => ReactNode;
    grid?: number;

    onSelect?: (index: number | null, label: string | null) => boolean;
    children: ReactNode;
};

const FloatingUiSelect = (props: FloatingUiSelectPropsType) => {
    props = {
        position: "bottom",
        arrow: true,
        label: (currentLabel) => currentLabel == null || currentLabel === "" ? "Select" : currentLabel,
        grid: 1,

        ...props,
    };

    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

    const arrowRef = useRef(null);

    const { refs, floatingStyles, context } = useFloating({
        placement: props.position,
        open: isOpen,
        onOpenChange: setIsOpen,
        whileElementsMounted: autoUpdate,
        middleware: [flip(), arrow({ element: arrowRef })],
    });

    const elementsRef = useRef<Array<HTMLElement | null>>([]);
    const labelsRef = useRef<Array<string | null>>([]);

    const handleSelect = useCallback((index: number | null) => {
        let isSelectable: boolean = true;

        if (props.onSelect != null) {
            isSelectable = props.onSelect(index, index == null ? null : labelsRef.current[index]);
        }

        if (isSelectable) {
            setSelectedIndex(index);
            setSelectedLabel(index == null ? null : labelsRef.current[index]);
        }

        setIsOpen(false);
    }, []);

    function handleTypeaheadMatch(index: number | null) {
        if (isOpen) setActiveIndex(index);
        else handleSelect(index);
    }

    const listNav = useListNavigation(context, {
        listRef: elementsRef,
        activeIndex,
        selectedIndex,
        onNavigate: setActiveIndex,
    });

    const typeahead = useTypeahead(context, {
        listRef: labelsRef,
        activeIndex,
        selectedIndex,
        onMatch: handleTypeaheadMatch,
    });

    const click = useClick(context);

    const dismiss = useDismiss(context);

    const role = useRole(context, { role: "listbox" });

    const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
        [listNav, typeahead, click, dismiss, role]
    );

    const floatingUiSelectContextValue = useMemo(
        () => ({
            activeIndex,
            selectedIndex,
            getItemProps,
            handleSelect,
        }),
        [activeIndex, selectedIndex, getItemProps, handleSelect]
    );

    return (
        <>
            <div ref={refs.setReference} tabIndex={0} {...getReferenceProps()}>
                <SecondaryButton>
                    {props.label == null ? "Select" : props.label(selectedLabel)}
                </SecondaryButton>
            </div>
            <FloatingUiSelectContext.Provider value={floatingUiSelectContextValue}>
                {isOpen && (
                    // <FloatingFocusManager context={context} modal={false}>
                    <div
                        ref={refs.setFloating}
                        style={floatingStyles}
                        {...getFloatingProps()}
                    >
                        {/* <FloatingArrow
                                ref={arrowRef}
                                context={context}
                                className="
                                    fill-white
                                    [&>path:first-of-type]:stroke-pink-500
                                    [&>path:last-of-type]:stroke-gray-400
                                "
                            /> */}
                        <FloatingList
                            elementsRef={elementsRef}
                            labelsRef={labelsRef}
                        >
                            <div
                                className={
                                    "grid grid-cols-" + props.grid + " gap-1 " +
                                    "bg-white p-1.5 m-1.5 rounded-lg border border-gray-300 shadow shadow-md "// +
                                    // "max-h-80"
                                }
                            >

                                    {props.children}

                            </div>
                        </FloatingList>
                    </div>
                    // </FloatingFocusManager>
                )}
            </FloatingUiSelectContext.Provider>
        </>
    );
}

type FloatingUiSelectOptionPropsType = {
    label: string;
};

const FloatingUiSelectOption = (props: FloatingUiSelectOptionPropsType) => {
    const { activeIndex, selectedIndex, getItemProps, handleSelect } = useContext(FloatingUiSelectContext);

    const { ref, index } = useListItem({ label: props.label });

    const isActive = activeIndex === index;
    const isSelected = selectedIndex === index;

    return (
        <button
            ref={ref}
            role="option"
            aria-selected={isActive && isSelected}
            tabIndex={isActive ? 0 : -1}
            className={
                "px-3 py-1 rounded-lg " +
                (isActive ? "bg-gray-200 " : "") +
                (isSelected ? "font-bold " : "")
            }
            {...getItemProps({
                onClick: () => handleSelect(index),
            })}
        >
            {props.label}
        </button>
    );
}

export default FloatingUiSelect;
export {
    FloatingUiSelectOption,
    FloatingUiSelectContext,
    type FloatingUiSelectPropsType,
    type FloatingUiSelectOptionPropsType,
};
