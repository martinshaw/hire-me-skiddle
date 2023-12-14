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

const ArtistShowEventCardStatusRow = (props: { event: EventModelType }) => {
    const container = (children: ReactNode) => (
        <div className="px-6 flex flex-row gap-2 @md:gap-6 justify-start items-start @md:items-center text-sm @md:text-base">
            <div className="text-gray-600">{children}</div>
        </div>
    );

    const humanReadableEndsAtDate: string | null =
        props.event.ends_at == null
            ? null
            : new Date(props.event.ends_at).toLocaleDateString();

    const humanReadableEndsAtTime: string | null =
        props.event.ends_at == null
            ? null
            : new Date(props.event.ends_at).toLocaleTimeString();

    if (props.event.starts_at == null)
        return container("A start date has not been set for this event yet");
    if (props.event.ends_at == null)
        return container("An end date has not been set for this event yet");

    if (props.event.cancelled_at !== null)
        return container(
            "This event was cancelled at " +
                new Date(props.event.cancelled_at).toLocaleDateString() +
                " " +
                new Date(props.event.cancelled_at).toLocaleTimeString() +
                ' because "' +
                props.event.cancelled_reason +
                '"'
        );
    if (props.event.postponed_at !== null)
        return container(
            "This event was postponed at " +
                new Date(props.event.postponed_at).toLocaleDateString() +
                " " +
                new Date(props.event.postponed_at).toLocaleTimeString() +
                ' because "' +
                props.event.postponed_reason +
                '"'
        );

    if (
        new Date(props.event.starts_at) >= new Date() &&
        new Date(props.event.ends_at) <= new Date()
    )
        return container(
            "This event started " +
                Math.round(
                    (new Date().getTime() -
                        new Date(props.event.starts_at).getTime()) /
                        60000
                ) +
                " minutes ago and ends in " +
                Math.round(
                    (new Date(props.event.ends_at).getTime() -
                        new Date().getTime()) /
                        60000
                ) +
                " minutes"
        );

    if (new Date(props.event.starts_at) > new Date())
        return container(
            "This event starts in " +
                Math.round(
                    (new Date(props.event.starts_at).getTime() -
                        new Date().getTime()) /
                        60000
                ) +
                " minutes"
        );

    if (new Date(props.event.ends_at) < new Date())
        return container("This event ended at " + humanReadableEndsAtDate + " " + humanReadableEndsAtTime);

    return null;
};

export default ArtistShowEventCardStatusRow;
