/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-14T19:33:59.444Z
Modified: 2023-12-14T19:33:59.444Z

Description: description
*/

import { EventModelType } from "@/types";
import { Link } from "@inertiajs/react";
import { ReactNode } from "react";

const EventCardArtistRow = (props: {
    event: EventModelType;
    link: boolean;
}) => {
    if (props.event?.artist?.name == null || props.event?.artist?.id == null)
        return null;

    const container = (children: ReactNode) => (
        <div className="flex flex-row gap-3 justify-start items-start @md:items-center text-sm @md:text-base">
            <img src="/images/icons/user.svg" className="w-4 h-4" />
            <div className="text-gray-600">{children}</div>
        </div>
    );

    const link = (children: ReactNode) => (
        <Link
            href={route("venue-management-app.artists.show", [
                props.event?.artist?.id,
            ])}
            className="underline"
        >
            {children}
        </Link>
    );

    return props.event?.artist?.name == null
        ? null
        : container(
            props.link === true
                ? link(props.event?.artist?.name)
                : props.event?.artist?.name
        );
};

export default EventCardArtistRow;
