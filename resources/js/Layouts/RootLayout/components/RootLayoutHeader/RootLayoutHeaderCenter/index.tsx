/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-12T12:09:52.094Z
Modified: 2023-12-12T12:09:52.094Z

Description: description
*/

import Breadcrumbs, { BreadcrumbItemType } from "@/Components/Breadcrumbs";

const navigableApplications: {
    name: string;
    href: string;
    icon: string;
    isActive: (currentRoute: string) => boolean;
}[] = [
    {
        name: "Why Hire Me?",
        href: route("why-hire-me.index"),
        icon: "/images/icons/user.svg",
        isActive: (currentRoute: string) =>
            currentRoute.indexOf('why-hire-me') > -1
    },
    {
        name: "Venue Management App",
        href: route("login", { to: route("venue-management-app.index") }),
        icon: "/images/icons/music.svg",
        isActive: (currentRoute: string) =>
            currentRoute.indexOf('venue-management-app') > -1 ||
            currentRoute.indexOf('login') > -1
    },
    // {
    //     name: "Social Media Video Maker",
    //     href: route("social-media-video-maker.index"),
    //     icon: "/images/icons/video.svg",
    //     routePrefix: "social-media-video-maker",
    // },
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
                        isActive: app.isActive(route().current() as (string | null) || ""),
                    })) as BreadcrumbItemType[]
                }
            />
        </div>
    );
};

export default RootLayoutHeaderCenter;
