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

const EventCardStatusRow = (props: { event: EventModelType }) => {
    const container = (children: ReactNode) => (
        <div className="flex flex-row gap-2 @md:gap-6 justify-start items-start @md:items-center text-sm @md:text-base">
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

    const minutesToHoursAndMinutesFormat = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        if (hours === 0)
            return (
                remainingMinutes + " minute" + (remainingMinutes > 1 ? "s" : "")
            );

        return (
            hours +
            " hour" +
            (hours > 1 ? "s" : "") +
            " and " +
            remainingMinutes +
            " minute" +
            (remainingMinutes > 1 ? "s" : "")
        );
    };

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
        new Date(props.event.starts_at) <= new Date() &&
        new Date(props.event.ends_at) >= new Date()
    )
        return container(
            "This event started " +
                minutesToHoursAndMinutesFormat(
                    Math.round(
                        (new Date().getTime() -
                            new Date(props.event.starts_at).getTime()) /
                            60000
                    )
                ) +
                " ago and ends in " +
                minutesToHoursAndMinutesFormat(
                    Math.round(
                        (new Date(props.event.ends_at).getTime() -
                            new Date().getTime()) /
                            60000
                    )
                )
        );

    // If event starts in the next 24 hours, show a countdown
    if (
        new Date(props.event.starts_at) > new Date() &&
        new Date(props.event.starts_at) <
            new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    )
        return container(
            "This event starts in " +
                minutesToHoursAndMinutesFormat(
                    Math.round(
                        (new Date(props.event.starts_at).getTime() -
                            new Date().getTime()) /
                            60000
                    )
                )
        );

    if (new Date(props.event.ends_at) < new Date())
        return container(
            "This event ended at " +
                humanReadableEndsAtDate +
                " " +
                humanReadableEndsAtTime
        );

    return null;
};

export default EventCardStatusRow;
