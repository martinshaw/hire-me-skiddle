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
import { Head, usePage } from "@inertiajs/react";
import {
    EventModelType,
    EventTicketPurchaseModelType,
    LengthAwarePaginatorType,
    PageProps,
} from "@/types";
import { ReactNode } from "react";
import EventTicketPurchaseCard from "./components/EventTicketPurchaseCard";
import LengthAwarePaginatorButtonRow from "@/Components/LengthAwarePaginatorButtonRow";

type EventTicketPurchaseIndexPropsType = {
    paginatedEventTicketPurchases: LengthAwarePaginatorType<EventTicketPurchaseModelType>;
} & AuthenticatedLayoutPropsType;

const EventTicketPurchaseIndex = (props: EventTicketPurchaseIndexPropsType) => {
    const page = usePage<EventTicketPurchaseIndexPropsType & PageProps>();

    return (
        <>
            <Head title="Event Ticket Purchases" />

            <div className="py-12">
                {(props.paginatedEventTicketPurchases?.data || []).length >
                0 ? (
                    <div className="max-w-7xl mx-auto flex flex-col gap-6">
                        <div className="px-0 @sm:px-6 @lg:px-8 flex flex-col gap-6">
                            {(
                                props.paginatedEventTicketPurchases.data || []
                            ).map((eventTicketPurchase, index) => (
                                <EventTicketPurchaseCard
                                    eventTicketPurchase={eventTicketPurchase}
                                />
                            ))}
                        </div>
                        <div className="px-0 @sm:px-6 @lg:px-8 flex flex-row gap-3 justify-center items-center">
                            <LengthAwarePaginatorButtonRow paginator={props.paginatedEventTicketPurchases} />
                        </div>
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto px-0 @sm:px-6 @lg:px-8 justify-center items-center m-auto w-full h-full flex flex-col">
                        <div className="text-stone-400">
                            No event ticket purchases found at{" "}
                            {page.props.auth.user.venue?.name}
                        </div>
                    </div>
                )}
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
