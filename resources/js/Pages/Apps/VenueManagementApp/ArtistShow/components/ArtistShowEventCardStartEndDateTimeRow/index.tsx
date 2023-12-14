/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-14T19:33:59.444Z
Modified: 2023-12-14T19:33:59.444Z

Description: description
*/

import { EventModelType } from "@/types";
import { ReactNode } from "react";

const ArtistShowEventCardStartEndDateTimeRow = (props: {
    event: EventModelType;
}) => {
    const humanReadableStartsAtDate: string | null =
        props.event.starts_at == null
            ? null
            : new Date(props.event.starts_at).toLocaleDateString();

    const humanReadableStartAtTime: string | null =
        props.event.starts_at == null
            ? null
            : new Date(props.event.starts_at).toLocaleTimeString();

    const humanReadableEndsAtDate: string | null =
        props.event.ends_at == null
            ? null
            : new Date(props.event.ends_at).toLocaleDateString();

    const humanReadableEndsAtTime: string | null =
        props.event.ends_at == null
            ? null
            : new Date(props.event.ends_at).toLocaleTimeString();

    return (
        <div className="px-6 flex flex-col @md:flex-row gap-2 @md:gap-6 justify-start items-start @md:items-center text-sm @md:text-base text-gray-600">
            <div className="hidden @md:block">
                {humanReadableStartsAtDate} {humanReadableStartAtTime}{" "}
                <span className="text-stone-400">-</span>{" "}
                {humanReadableEndsAtDate} {humanReadableEndsAtTime}
            </div>
            <div className="block @md:hidden">
                Starts {humanReadableStartsAtDate} {humanReadableStartAtTime}
            </div>
            <div className="block @md:hidden">
                Ends {humanReadableEndsAtDate} {humanReadableEndsAtTime}
            </div>
        </div>
    );
};

export default ArtistShowEventCardStartEndDateTimeRow;
