/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: RootLayout.tsx
Created:  2023-12-12T10:41:54.349Z
Modified: 2023-12-12T10:41:54.349Z

Description: description
*/

import { ReactNode } from "react";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import useViewportContainer from "./hooks/useViewportContainer";
import RootLayoutHeader from "./components/RootLayoutHeader";

import './index.css';

const RootLayout = ({ children }: { children: ReactNode }) => {
    const {
        viewportContainerDimensionsTerm,
        setViewportContainerDimensionsTerm,
        viewportContainerDimensionVariants,
        additionalViewportContainerClassNames,
        viewportContainerStyles,
        viewportInnerStyles,
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
                <SimpleBar
                    autoHide={false}
                    className={
                        "@container overflow-x-hidden" +
                        additionalViewportContainerClassNames
                    }
                    style={viewportContainerStyles}
                >
                    <div className="min-h-full" style={viewportInnerStyles}>
                        {children}
                    </div>
                </SimpleBar>
            </div>
        </div>
    );
};

export default RootLayout;
