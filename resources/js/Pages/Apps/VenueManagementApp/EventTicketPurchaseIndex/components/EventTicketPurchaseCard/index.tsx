/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-16T04:58:37.492Z
Modified: 2023-12-16T04:58:37.492Z

Description: description
*/

import { EventTicketPurchaseModelType } from "@/types";
import { VIEWPORT_TABLET } from "@/utilities";
import { Link } from "@inertiajs/react";

export type EventTicketPurchaseCardPropsType = {
    eventTicketPurchase: EventTicketPurchaseModelType;
};

const EventTicketPurchaseCard = (props: EventTicketPurchaseCardPropsType) => {
    const eventStartAtDate: Date | null =
        props.eventTicketPurchase.event?.starts_at == null
            ? null
            : new Date(props.eventTicketPurchase.event?.starts_at);

    const ticketPurchasedAtDate: Date | null =
        props.eventTicketPurchase.created_at == null
            ? null
            : new Date(props.eventTicketPurchase.created_at);

    return (
        <Link
            href={route("venue-management-app.event-ticket-purchases.show", [props.eventTicketPurchase.id])}
        >
            <div className={"bg-white overflow-hidden cursor-pointer transition-all transition-duration-300 ease-in-out shadow-sm hover:shadow-md border border-gray-200 " + VIEWPORT_TABLET + ":rounded-lg "}>
                <div className="px-4 py-5 sm:px-6 flex flex-row gap-3 justify-start items-start">
                    <div className="flex flex-col gap-1 justify-start items-start w-full">
                        <div className="w-full flex flex-row justify-between text-md font-medium text-gray-900">
                            <div>
                                {props.eventTicketPurchase.visitor?.first_name}{" "}
                                {props.eventTicketPurchase.visitor?.middle_name}{" "}
                                {props.eventTicketPurchase.visitor?.last_name}
                            </div>
                            <div className="text-gray-400 text-right flex float-right items-center align-center">
                                {" #"}
                                {props.eventTicketPurchase?.id}
                            </div>
                        </div>
                        <div className="text-sm font-medium flex flex-col gap-1">
                            <span className="text-gray-900">
                                {props.eventTicketPurchase.event_ticket?.name}
                            </span>
                        </div>
                        <div className="text-sm font-medium flex flex-col gap-1">
                            <span className="text-gray-900">
                                {props.eventTicketPurchase.event?.name}
                            </span>
                            <span className="text-gray-500">
                                {props.eventTicketPurchase.event?.artist?.name}
                            </span>
                        </div>
                        {eventStartAtDate && (
                            <div className="text-sm font-medium text-gray-900">
                                Event starts at{" "}
                                {eventStartAtDate.toLocaleDateString()}{" "}
                                {eventStartAtDate.toLocaleTimeString()}
                            </div>
                        )}
                        {props.eventTicketPurchase.formatted_purchase_price && (
                            <div className="text-sm font-medium text-gray-900">
                                Purchased for{" "}
                                {props.eventTicketPurchase.formatted_purchase_price}{" "}
                                at {ticketPurchasedAtDate?.toLocaleDateString()}{" "}
                                {ticketPurchasedAtDate?.toLocaleTimeString()}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default EventTicketPurchaseCard;
