/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-13T07:32:24.912Z
Modified: 2023-12-13T07:32:24.912Z

Description: description
*/
import AuthenticatedLayout, { AuthenticatedLayoutPropsType } from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { EventTicketPurchaseModelType, PageProps } from "@/types";
import { ReactNode } from "react";
import PageSectionsGrid from "@/Components/PageSectionsGrid";
import VisitorContactDetailsPageSection from "./VisitorContactDetailsPageSection";
import EventTicketPurchaseVenueAccessPageSection from "./EventTicketPurchaseVenueAccessPageSection";
import EventTicketPurchasePaymentPageSection from "./EventTicketPurchasePaymentPageSection";
import EventPageSection from "./EventPageSection";
import VisitorActivityLogPageSection from "./VisitorActivityLogPageSection";

type EventTicketPurchaseShowPropsType = {
    eventTicketPurchase: EventTicketPurchaseModelType;
} & AuthenticatedLayoutPropsType;

const EventTicketPurchaseShow = (props: EventTicketPurchaseShowPropsType) => {
    const page = usePage<EventTicketPurchaseShowPropsType & PageProps>();

    return (
        <>
            <Head title="Event Ticket Purchase" />

            <div className="py-12">
                <PageSectionsGrid>

                    {props.eventTicketPurchase.event != null && <EventPageSection event={props.eventTicketPurchase.event} />}

                    {props.eventTicketPurchase.entry_barcode != null && <EventTicketPurchaseVenueAccessPageSection eventTicketPurchase={props.eventTicketPurchase} />}

                    {props.eventTicketPurchase.event_ticket != null && <EventTicketPurchasePaymentPageSection eventTicketPurchase={props.eventTicketPurchase} />}

                    {props.eventTicketPurchase.visitor != null && <VisitorContactDetailsPageSection visitor={props.eventTicketPurchase.visitor} />}

                    <VisitorActivityLogPageSection scopes={{
                        venue: page.props.auth.user.venue_id,
                        // event: props.eventTicketPurchase.event,
                        eventTicketPurchase: props.eventTicketPurchase,
                        // eventTicket: props.eventTicketPurchase.event_ticket,
                        visitor: props.eventTicketPurchase.visitor,
                    }} />

                </PageSectionsGrid>
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
