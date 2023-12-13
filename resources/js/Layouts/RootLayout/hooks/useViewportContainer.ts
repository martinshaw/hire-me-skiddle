/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: useViewportContainer.ts
Created:  2023-12-12T11:46:57.149Z
Modified: 2023-12-12T11:46:57.149Z

Description: description
*/
import { ReactNode, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { rootLayoutHeaderHeight } from "../components/RootLayoutHeader";

const viewportContainerDimensionVariantTerms = [
    "desktop",
    "tablet",
    "mobile",
] as const;

export type ViewportContainerDimensionVariantTerm =
    (typeof viewportContainerDimensionVariantTerms)[number];

type ViewportContainerDimensionType = { width: number; height: number };

const viewportContainerDimensionsTermCookieName =
    "viewportContainerDimensions" as const;

const useViewportContainer = () => {
    const viewportContainerDimensionVariants: {
        [viewportTerm in ViewportContainerDimensionVariantTerm]: ViewportContainerDimensionType;
    } = {
        desktop: {
            width: window.innerWidth,
            height: window.innerHeight - rootLayoutHeaderHeight,
        },
        tablet: {
            width: (window.innerHeight - rootLayoutHeaderHeight - 50) * 0.75,
            height: window.innerHeight - rootLayoutHeaderHeight - 50,
        },
        mobile: {
            width: (window.innerHeight - rootLayoutHeaderHeight - 200) * 0.5,
            height: window.innerHeight - rootLayoutHeaderHeight - 200,
        },
    };

    const [cookies, setCookie, removeCookie] = useCookies([
        viewportContainerDimensionsTermCookieName,
    ]);

    const [
        viewportContainerDimensionsTerm,
        setViewportContainerDimensionsTerm,
    ] = useState<ViewportContainerDimensionVariantTerm>("desktop");

    useEffect(() => {
        if (cookies[viewportContainerDimensionsTermCookieName]) {
            setViewportContainerDimensionsTerm(
                cookies[viewportContainerDimensionsTermCookieName]
            );
        }
    }, []);

    useEffect(() => {
        setCookie(
            viewportContainerDimensionsTermCookieName,
            viewportContainerDimensionsTerm,
            { path: "/" }
        );
    }, [viewportContainerDimensionsTerm]);

    let additionalViewportContainerClassNames = "";
    if (viewportContainerDimensionsTerm === "mobile")
        additionalViewportContainerClassNames =
            "border-2 border-gray-500 rounded-lg";
    else if (viewportContainerDimensionsTerm === "tablet")
        additionalViewportContainerClassNames =
            "border-2 border-gray-500 rounded-2xl";
    else if (viewportContainerDimensionsTerm === "desktop")
        additionalViewportContainerClassNames = "";

    return {
        viewportContainerDimensionsTerm,
        setViewportContainerDimensionsTerm,
        viewportContainerDimensionVariants,
        additionalViewportContainerClassNames,
    };
}

export default useViewportContainer;
