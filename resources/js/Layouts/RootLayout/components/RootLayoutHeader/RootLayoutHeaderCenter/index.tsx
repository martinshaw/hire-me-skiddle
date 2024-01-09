/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-12T12:09:52.094Z
Modified: 2023-12-12T12:09:52.094Z

Description: description
*/

import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { ViewportContainerDimensionVariantTerm } from "../../../hooks/useViewportContainer";

type RootLayoutHeaderCenterPropsType = {
    viewportContainerDimensionsTerm: ViewportContainerDimensionVariantTerm;
    setViewportContainerDimensionsTerm: (term: ViewportContainerDimensionVariantTerm) => void;
};

const RootLayoutHeaderCenter = (props: RootLayoutHeaderCenterPropsType) => {
    const mobileButtonText = (
        <div className="flex flex-row gap-2 justify-center items-center">
            <div>Mobile</div>
            {/* <img src="/images/icons/smartphone.svg" className={"h-5 w-5 " + (props.viewportContainerDimensionsTerm === "mobile" ? 'invert' : '')} /> */}
        </div>
    )

    const tabletButtonText = (
        <div className="flex flex-row gap-2 justify-center items-center">
            <div>Tablet</div>
            {/* <img src="/images/icons/tablet.svg" className={"h-5 w-5 " + (props.viewportContainerDimensionsTerm === "tablet" ? 'invert' : '')} /> */}
        </div>
    )

    const desktopButtonText = (
        <div className="flex flex-row gap-2 justify-center items-center">
            <div>Desktop</div>
            {/* <img src="/images/icons/monitor.svg" className={"h-5 w-5 " + (props.viewportContainerDimensionsTerm === "desktop" ? 'invert' : '')} /> */}
        </div>
    )

    return (
        <div className="flex flex-row gap-2 justify-center items-center">
            {props.viewportContainerDimensionsTerm === "mobile" && <PrimaryButton onClick={() => props.setViewportContainerDimensionsTerm("mobile")}>{mobileButtonText}</PrimaryButton>}
            {props.viewportContainerDimensionsTerm !== "mobile" && <SecondaryButton transparent={true} onClick={() => props.setViewportContainerDimensionsTerm("mobile")}>{mobileButtonText}</SecondaryButton>}

            {props.viewportContainerDimensionsTerm === "tablet" && <PrimaryButton onClick={() => props.setViewportContainerDimensionsTerm("tablet")}>{tabletButtonText}</PrimaryButton>}
            {props.viewportContainerDimensionsTerm !== "tablet" && <SecondaryButton transparent={true} onClick={() => props.setViewportContainerDimensionsTerm("tablet")}>{tabletButtonText}</SecondaryButton>}

            {props.viewportContainerDimensionsTerm === "desktop" && <PrimaryButton onClick={() => props.setViewportContainerDimensionsTerm("desktop")}>{desktopButtonText}</PrimaryButton>}
            {props.viewportContainerDimensionsTerm !== "desktop" && <SecondaryButton transparent={true} onClick={() => props.setViewportContainerDimensionsTerm("desktop")}>{desktopButtonText}</SecondaryButton>}
        </div>
    );
};

export default RootLayoutHeaderCenter;
