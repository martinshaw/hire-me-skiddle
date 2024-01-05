/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-13T07:32:24.912Z
Modified: 2023-12-13T07:32:24.912Z

Description: description
*/
import AuthenticatedLayout, { AuthenticatedLayoutPropsType } from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { EventTicketPurchaseModelType, PageProps } from "@/types";
import { ReactNode } from "react";
import PageSectionsGrid from "@/Components/PageSectionsGrid";
import PageSectionsGridSection from "@/Components/PageSectionsGrid/PageSectionsGridSection";
import { VIEWPORT_DESKTOP, VIEWPORT_TABLET } from "@/utilities";
import EventCardArtistRow from "../ArtistShow/components/EventCardArtistRow";
import EventCardTicketsRow from "../ArtistShow/components/EventCardTicketsRow";
import EventCardSaleAvailabilityRow from "../ArtistShow/components/EventCardSaleAvailabilityRow";
import EventCardStartEndDateTimeRow from "../ArtistShow/components/EventCardStartEndDateTimeRow";
import EventCardStatusRow from "../ArtistShow/components/EventCardStatusRow";
import SecondaryButton from "@/Components/SecondaryButton";
import toast from "react-hot-toast";
import VisitorContactDetailsPageSection from "./VisitorContactDetailsPageSection";
import EventTicketPurchaseVenueAccessPageSection from "./EventTicketPurchaseVenueAccessPageSection";
import EventTicketPurchasePaymentPageSection from "./EventTicketPurchasePaymentPageSection";
import EventPageSection from "./EventPageSection";

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

                    {props.eventTicketPurchase.visitor != null && <VisitorContactDetailsPageSection visitor={props.eventTicketPurchase.visitor} />}

                    {props.eventTicketPurchase.event_ticket != null && <EventTicketPurchasePaymentPageSection eventTicketPurchase={props.eventTicketPurchase} />}

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
