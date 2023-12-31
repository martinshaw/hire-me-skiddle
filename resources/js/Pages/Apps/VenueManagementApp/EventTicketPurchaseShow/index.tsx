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
    EventTicketPurchaseModelType,
    PageProps,
} from "@/types";
import { ReactNode, useState } from "react";

type EventTicketPurchaseShowPropsType = {
    eventTicketPurchase: EventTicketPurchaseModelType;
} & AuthenticatedLayoutPropsType;

const EventTicketPurchaseShow = (props: EventTicketPurchaseShowPropsType) => {
    const page = usePage<EventTicketPurchaseShowPropsType & PageProps>();

    return (
        <>
            <Head title="Event Ticket Purchase" />

            <div className="py-12">

            </div>
        </>
    );
};

EventTicketPurchaseShow.layout = (
    page: ReactNode & { props: EventTicketPurchaseShowPropsType & PageProps }
) => {
    let headerTitle = "Event Ticket Purchase";
    if ((page?.props as (EventTicketPurchaseShowPropsType & PageProps))?.eventTicketPurchase?.visitor?.full_name != null) {
        headerTitle += " for " + (page?.props as (EventTicketPurchaseShowPropsType & PageProps))?.eventTicketPurchase?.visitor?.full_name;
    }

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

export default EventTicketPurchaseShow;
