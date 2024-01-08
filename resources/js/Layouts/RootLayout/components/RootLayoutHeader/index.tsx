/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: RootLayoutHeader.tsx
Created:  2023-12-12T11:52:23.776Z
Modified: 2023-12-12T11:52:23.776Z

Description: description
*/

import { ViewportContainerDimensionVariantTerm } from "../../hooks/useViewportContainer";
import RootLayoutHeaderLeft from "./RootLayoutHeaderLeft";
import RootLayoutHeaderCenter from "./RootLayoutHeaderCenter";
import RootLayoutHeaderRight from "./RootLayoutHeaderRight";

type RootLayoutHeaderPropsType = {
    viewportContainerDimensionsTerm: ViewportContainerDimensionVariantTerm;
    setViewportContainerDimensionsTerm: (
        term: ViewportContainerDimensionVariantTerm
    ) => void;
};

export const rootLayoutHeaderHeight = 50;

const RootLayoutHeader = (props: RootLayoutHeaderPropsType) => {
    return (
        <div
            className="select-none bg-gradient-to-r from-blue-100 to-emerald-100 w-screen flex flex-row gap-4 justify-between items-center px-4"
            style={{ height: rootLayoutHeaderHeight + "px" }}
        >
            <RootLayoutHeaderLeft />

            <RootLayoutHeaderCenter />

            <RootLayoutHeaderRight
                viewportContainerDimensionsTerm={
                    props.viewportContainerDimensionsTerm
                }
                setViewportContainerDimensionsTerm={
                    props.setViewportContainerDimensionsTerm
                }
            />
        </div>
    );
};

export default RootLayoutHeader;
