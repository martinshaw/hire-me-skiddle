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

const ArtistShowEventCardSaleAvailabilityRow = (props: {
    event: EventModelType;
}) => {
    const ticketPurchasableAtDateIsInTheFuture: boolean =
        props.event.tickets_purchasable_at == null
            ? false
            : new Date(props.event.tickets_purchasable_at) > new Date();

    const container = (children: ReactNode) => (
        <div className="px-6 flex flex-row gap-3 justify-start items-start @md:items-center text-sm @md:text-base">
            <img src="/images/icons/shopping-cart.svg" className="w-4 h-4" />
            <div className="text-gray-600">{children}</div>
        </div>
    );

    if (props.event.tickets_purchasable_at == null)
        return container("Tickets not yet available for sale");

    return container(
        <>
            <span className="block @lg:hidden">
                {ticketPurchasableAtDateIsInTheFuture ? "From" : "Since"}{" "}
                {new Date(
                    props.event.tickets_purchasable_at
                ).toLocaleDateString()}{" "}
                {new Date(
                    props.event.tickets_purchasable_at
                ).toLocaleTimeString()}
            </span>
            <span className="hidden @lg:block">
                Tickets available for sale{" "}
                {ticketPurchasableAtDateIsInTheFuture ? "from" : "since"}{" "}
                {new Date(
                    props.event.tickets_purchasable_at
                ).toLocaleDateString()}{" "}
                {new Date(
                    props.event.tickets_purchasable_at
                ).toLocaleTimeString()}
            </span>
        </>
    );
};

export default ArtistShowEventCardSaleAvailabilityRow;
