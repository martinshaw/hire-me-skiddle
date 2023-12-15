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

const EventCardTicketsRow = (props: { event: EventModelType }) => {
    const container = (children: ReactNode) => (
        <div className="flex flex-row gap-3 justify-start items-start @md:items-center text-sm @md:text-base">
            <img src="/images/icons/credit-card.svg" className="w-4 h-4" />
            <div className="text-gray-600">{children}</div>
        </div>
    );

    if (
        props.event.tickets_purchased == null &&
        props.event.tickets_available == null
    )
        return container("No tickets available for sale");

    if (
        (props.event.tickets_purchased == null ||
            props.event.tickets_purchased === 0) &&
        props.event.tickets_available !== null
    )
        return container(
            <>
                <span className="block @lg:hidden">
                    {props.event.tickets_available.toLocaleString()}&nbsp;
                    available
                </span>
                <span className="hidden @lg:block">
                    {props.event.tickets_available.toLocaleString()}
                    &nbsp;tickets available for sale
                </span>
            </>
        );

    if (
        props.event.tickets_purchased !== null &&
        props.event.tickets_available !== null
    )
        return container(
            <>
                <span className="block @lg:hidden">
                    {props.event.tickets_purchased.toLocaleString()}
                    &nbsp;/&nbsp;
                    {props.event.tickets_available.toLocaleString()}
                    &nbsp;sold&nbsp;(
                    {Math.round(
                        (props.event.tickets_purchased /
                            props.event.tickets_available) *
                            100
                    )}
                    %)
                </span>
                <span className="hidden @lg:block">
                    {props.event.tickets_purchased.toLocaleString()}
                    &nbsp;tickets sold of&nbsp;
                    {props.event.tickets_available.toLocaleString()}
                    &nbsp;available&nbsp;(
                    {Math.round(
                        (props.event.tickets_purchased /
                            props.event.tickets_available) *
                            100
                    )}
                    %)
                </span>
            </>
        );
};

export default EventCardTicketsRow;
