/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: RootLayout.tsx
Created:  2023-12-12T10:41:54.349Z
Modified: 2023-12-12T10:41:54.349Z

Description: description
*/

import { ReactNode, useEffect, useState } from "react";
import useViewportContainer from "./hooks/useViewportContainer";
import RootLayoutHeader from "./components/RootLayoutHeader";

const RootLayout = ({ children }: { children: ReactNode }) => {
    const {
        viewportContainerDimensionsTerm,
        setViewportContainerDimensionsTerm,
        viewportContainerDimensionVariants,
        additionalViewportContainerClassNames,
    } = useViewportContainer();

    return (
        <div className="h-screen w-screen flex flex-col">
            <RootLayoutHeader
                viewportContainerDimensionsTerm={
                    viewportContainerDimensionsTerm
                }
                setViewportContainerDimensionsTerm={
                    setViewportContainerDimensionsTerm
                }
            />
            <div className="bg-stone-700 flex-1 w-screen flex flex-col justify-center items-center m-auto">
                <div
                    className={
                        "@container overflow-hidden " +
                        additionalViewportContainerClassNames
                    }
                    style={{
                        height: viewportContainerDimensionVariants[
                            viewportContainerDimensionsTerm
                        ].height,
                        width: viewportContainerDimensionVariants[
                            viewportContainerDimensionsTerm
                        ].width,
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default RootLayout;
