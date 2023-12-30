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
import { ReactNode } from "react";
import EventTicketPurchaseCard from "./components/EventTicketPurchaseCard";
import LengthAwarePaginatorButtonRow from "@/Components/LengthAwarePaginatorButtonRow";
import ListFilterAndActionBar from "@/Components/ListFilterAndActionBar";

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
                        <ListFilterAndActionBar
                            captions={{
                                event: "Event",
                                artist: "Artist",
                                visitor_name: "Visitor Name",
                                ticket_type: "Ticket Type",
                                price: "Price",
                                purchase_date: "Purchase Date",
                                event_date: "Event Date",
                            }}
                            controls={{
                                event: {
                                    type: "text",
                                    value: () =>
                                        new URLSearchParams(
                                            location.search
                                        ).get("event") || "",
                                    onChange: (
                                        existingFilterQueries,
                                        value
                                    ) => {
                                        router.visit(
                                            route(route().current() || "/", {
                                                ...new URLSearchParams(
                                                    location.search
                                                ),
                                                ...existingFilterQueries,
                                                event: value,
                                            }),
                                            {
                                                preserveScroll: true,
                                                preserveState: true,
                                            }
                                        );
                                    },
                                },
                                artist: {
                                    type: "text",
                                    value: () =>
                                        new URLSearchParams(
                                            location.search
                                        ).get("artist") || "",
                                    onChange: (
                                        existingFilterQueries,
                                        value
                                    ) => {
                                        router.visit(
                                            route(route().current() || "/", {
                                                ...new URLSearchParams(
                                                    location.search
                                                ),
                                                ...existingFilterQueries,
                                                artist: value,
                                            }),
                                            {
                                                preserveScroll: true,
                                                preserveState: true,
                                            }
                                        );
                                    },
                                },
                                visitor_name: {
                                    type: "text",
                                    value: () =>
                                        new URLSearchParams(
                                            location.search
                                        ).get("visitor_name") || "",
                                    onChange: (
                                        existingFilterQueries,
                                        value
                                    ) => {
                                        router.visit(
                                            route(route().current() || "/", {
                                                ...new URLSearchParams(
                                                    location.search
                                                ),
                                                ...existingFilterQueries,
                                                visitor_name: value,
                                            }),
                                            {
                                                preserveScroll: true,
                                                preserveState: true,
                                            }
                                        );
                                    },
                                },
                                ticket_type: {
                                    type: "text",
                                    value: () =>
                                        new URLSearchParams(
                                            location.search
                                        ).get("ticket_type") || "",
                                    onChange: (
                                        existingFilterQueries,
                                        value
                                    ) => {
                                        router.visit(
                                            route(route().current() || "/", {
                                                ...new URLSearchParams(
                                                    location.search
                                                ),
                                                ...existingFilterQueries,
                                                ticket_type: value,
                                            }),
                                            {
                                                preserveScroll: true,
                                                preserveState: true,
                                            }
                                        );
                                    },
                                },
                                price: {
                                    type: "text",
                                    value: () =>
                                        new URLSearchParams(
                                            location.search
                                        ).get("price") || "",
                                    onChange: (
                                        existingFilterQueries,
                                        value
                                    ) => {
                                        router.visit(
                                            route(route().current() || "/", {
                                                ...new URLSearchParams(
                                                    location.search
                                                ),
                                                ...existingFilterQueries,
                                                price: value,
                                            }),
                                            {
                                                preserveScroll: true,
                                                preserveState: true,
                                            }
                                        );
                                    },
                                },
                                purchase_date: {
                                    type: "date",
                                    value: () =>
                                        new URLSearchParams(
                                            location.search
                                        ).get("purchase_date") || "",
                                    onChange: (
                                        existingFilterQueries,
                                        value
                                    ) => {
                                        router.visit(
                                            route(route().current() || "/", {
                                                ...new URLSearchParams(
                                                    location.search
                                                ),
                                                ...existingFilterQueries,
                                                purchase_date: value,
                                            }),
                                            {
                                                preserveScroll: true,
                                                preserveState: true,
                                            }
                                        );
                                    },
                                },
                                event_date: {
                                    type: "date",
                                    value: () =>
                                        new URLSearchParams(
                                            location.search
                                        ).get("event_date") || "",
                                    onChange: (
                                        existingFilterQueries,
                                        value
                                    ) => {
                                        router.visit(
                                            route(route().current() || "/", {
                                                ...new URLSearchParams(
                                                    location.search
                                                ),
                                                ...existingFilterQueries,
                                                event_date: value,
                                            }),
                                            {
                                                preserveScroll: true,
                                                preserveState: true,
                                            }
                                        );
                                    },
                                },
                            }}
                        />
                        <div className="px-0 @sm:px-6 @lg:px-8 grid grid-cols-3 gap-6">
                            {(
                                props.paginatedEventTicketPurchases.data || []
                            ).map((eventTicketPurchase, index) => (
                                <EventTicketPurchaseCard
                                    key={index}
                                    eventTicketPurchase={eventTicketPurchase}
                                />
                            ))}
                        </div>
                        <div className="px-0 @sm:px-6 @lg:px-8 flex flex-row gap-3 justify-center items-center">
                            <LengthAwarePaginatorButtonRow
                                paginator={props.paginatedEventTicketPurchases}
                            />
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
