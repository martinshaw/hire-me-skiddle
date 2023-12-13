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
import { Link } from "@inertiajs/react";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import Breadcrumbs, { BreadcrumbItemType } from "@/Components/Breadcrumbs";

const navigableApplications: {
    name: string;
    href: string;
    icon: string;
    routePrefix: string;
}[] = [
    {
        name: "Venue Management App",
        href: route("login", { to: route("venue-management-app.index") }),
        icon: "/images/icons/music.svg",
        routePrefix: "venue-management-app",
    },
    {
        name: "Social Media Video Maker",
        href: route("social-media-video-maker.index"),
        icon: "/images/icons/video.svg",
        routePrefix: "social-media-video-maker",
    },
    {
        name: "Why Hire Me?",
        href: route("why-hire-me.index"),
        icon: "/images/icons/user.svg",
        routePrefix: "why-hire-me",
    },
];

type RootLayoutHeaderCenterPropsType = {
    //
};

const RootLayoutHeaderCenter = (props: RootLayoutHeaderCenterPropsType) => {
    return (
        <div className="flex flex-row gap-4 justify-center items-center">
            <Breadcrumbs
                transparentButtons={true}
                items={
                    navigableApplications.map((app) => ({
                        ...app,
                        isActive: (route().current() || "").startsWith(
                            app.routePrefix
                        ),
                    })) as BreadcrumbItemType[]
                }
            />
        </div>
    );
};

export default RootLayoutHeaderCenter;
