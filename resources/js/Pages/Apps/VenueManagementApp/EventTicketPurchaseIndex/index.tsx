/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-13T07:32:24.912Z
Modified: 2023-12-13T07:32:24.912Z

Description: description
*/
import AuthenticatedLayout, {
    AuthenticatedLayoutPropsType,
} from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import {
    EventModelType,
    EventTicketPurchaseModelType,
    LengthAwarePaginatorType,
    PageProps,
} from "@/types";
import { ReactNode, useState } from "react";
import EventTicketPurchaseCard from "./components/EventTicketPurchaseCard";
import LengthAwarePaginatorButtonRow from "@/Components/LengthAwarePaginatorButtonRow";
import SecondaryButton from "@/Components/SecondaryButton";
import LengthAwarePaginatorFilterableCardGrid from "@/Components/LengthAwarePaginatorFilterableCardGrid";

type EventTicketPurchaseIndexPropsType = {
    paginatedEventTicketPurchases: LengthAwarePaginatorType<EventTicketPurchaseModelType>;
} & AuthenticatedLayoutPropsType;

const EventTicketPurchaseIndex = (props: EventTicketPurchaseIndexPropsType) => {
    const page = usePage<EventTicketPurchaseIndexPropsType & PageProps>();

    return (
        <>
            <Head title="Event Ticket Purchases" />

            <div className="py-12">
                <LengthAwarePaginatorFilterableCardGrid<
                    EventTicketPurchaseModelType,
                    ['event', 'artist', 'visitor_name', 'ticket_type', 'price', 'purchase_date', 'event_date']
                >
                    paginator={props.paginatedEventTicketPurchases}
                    cardRenderer={(model, index) => (
                        <EventTicketPurchaseCard
                            key={index}
                            eventTicketPurchase={model}
                        />
                    )}
                    filterControls={
                        {
                            visitor_name: {
                                caption: "Visitor Name",
                                type: "text",
                            },
                            event: {
                                caption: "Event",
                                type: "text",
                            },
                            artist: {
                                caption: "Artist",
                                type: "text",
                            },
                            ticket_type: {
                                caption: "Ticket Type",
                                type: "text",
                            },
                            price: {
                                caption: "Price",
                                type: "text",
                            },
                            purchase_date: {
                                caption: "Purchase Date",
                                type: "date",
                            },
                            event_date: {
                                caption: "Event Date",
                                type: "date",
                            },
                        }
                    }
                    noItemsFoundMessage={<>No event ticket purchases found at {page.props.auth.user.venue?.name}</>}
                />
            </div>
        </>
    );
};

EventTicketPurchaseIndex.layout = (
    page: ReactNode & { props: EventTicketPurchaseIndexPropsType & PageProps }
) => {
    let headerTitle =
        page.props.counts.ticket_purchases === 1
            ? page.props.counts.ticket_purchases.toLocaleString() +
            " Event Ticket Purchase"
            : page.props.counts.ticket_purchases.toLocaleString() +
            " Event Ticket Purchases";

    headerTitle =
        page.props?.auth?.user?.venue?.name == null
            ? headerTitle
            : headerTitle + " at " + page.props.auth.user.venue?.name;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {headerTitle}
                </h2>
            }
            children={page}
        />
    );
};

export default EventTicketPurchaseIndex;
