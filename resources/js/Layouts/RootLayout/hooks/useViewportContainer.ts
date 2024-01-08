/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: useViewportContainer.ts
Created:  2023-12-12T11:46:57.149Z
Modified: 2023-12-12T11:46:57.149Z

Description: description
*/
import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { rootLayoutHeaderHeight } from "../components/RootLayoutHeader";

const viewportContainerDimensionVariantTerms = [
    "desktop",
    "tablet",
    "mobile",
] as const;

export type ViewportContainerDimensionVariantTerm =
    (typeof viewportContainerDimensionVariantTerms)[number];

type ViewportContainerDimensionType = { width: number; height: number, zoom?: number };

const viewportContainerDimensionsTermCookieName =
    "viewportContainerDimensions" as const;

const useViewportContainer: () => {
    viewportContainerDimensionsTerm: ViewportContainerDimensionVariantTerm;
    setViewportContainerDimensionsTerm: React.Dispatch<
        React.SetStateAction<ViewportContainerDimensionVariantTerm>
    >;
    viewportContainerDimensionVariants: {
        [viewportTerm in ViewportContainerDimensionVariantTerm]: ViewportContainerDimensionType;
    };
    additionalViewportContainerClassNames: string;
    viewportContainerStyles: CSSProperties;
    viewportInnerStyles: CSSProperties;
} = () => {

    const containerWidthByPixelRatio = (window.innerWidth * window.devicePixelRatio),
        containerHeightByPixelRatio = (window.innerHeight * window.devicePixelRatio) - rootLayoutHeaderHeight;

    // 1180 x 820 (70%) - iPad Air
    const tabletDimensions: ViewportContainerDimensionType = {
        width: 1180,
        height: 820,
        zoom: .9,
    };
    // TODO: There must be a better way to do this but I can't think of it right now and I have spent too much time on this already
    while (
        (tabletDimensions.width >= (containerWidthByPixelRatio - 50) || tabletDimensions.height >= (containerHeightByPixelRatio - 50)) &&
        tabletDimensions.width > 0 && tabletDimensions.height > 0
    ) {
        tabletDimensions.width -= 1;
        tabletDimensions.height -= 1;
    }

    // 360 x 740 (75%) - Samsung Galaxy S8+
    const mobileDimensions: ViewportContainerDimensionType = {
        width: 375,
        height: 667,
        zoom: .8,
    };
    // TODO: There must be a better way to do this but I can't think of it right now and I have spent too much time on this already
    while (
        (mobileDimensions.width >= (containerWidthByPixelRatio - 50) || mobileDimensions.height >= (containerHeightByPixelRatio - 50)) &&
        mobileDimensions.width > 0 && mobileDimensions.height > 0
    ) {
        mobileDimensions.width -= 1;
        mobileDimensions.height -= 1;
    }

    const viewportContainerDimensionVariants: {
        [viewportTerm in ViewportContainerDimensionVariantTerm]: ViewportContainerDimensionType;
    } = {
        desktop: {
            width: containerWidthByPixelRatio,
            height: containerHeightByPixelRatio,
        },
        tablet: tabletDimensions,
        mobile: mobileDimensions,
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

    let viewportContainerStyles: CSSProperties = {
        width: viewportContainerDimensionVariants[
            viewportContainerDimensionsTerm
        ].width,
        height: viewportContainerDimensionVariants[
            viewportContainerDimensionsTerm
        ].height,
    };

    let viewportInnerStyles: CSSProperties = {
        zoom: viewportContainerDimensionVariants[
            viewportContainerDimensionsTerm
        ].zoom,
    };

    return {
        viewportContainerDimensionsTerm,
        setViewportContainerDimensionsTerm,
        viewportContainerDimensionVariants,
        additionalViewportContainerClassNames,
        viewportContainerStyles,
        viewportInnerStyles,
    };

}

export default useViewportContainer;
