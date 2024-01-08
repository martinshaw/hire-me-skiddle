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
import { EventModelType, EventTicketModelType, PageProps } from "@/types";
import { ReactNode } from "react";
import EventCardTicketsRow from "../ArtistShow/components/EventCardTicketsRow";
import EventCardSaleAvailabilityRow from "../ArtistShow/components/EventCardSaleAvailabilityRow";
import EventCardStartEndDateTimeRow from "../ArtistShow/components/EventCardStartEndDateTimeRow";
import EventCardStatusRow from "../ArtistShow/components/EventCardStatusRow";
import EventCardArtistRow from "../ArtistShow/components/EventCardArtistRow";
import { VIEWPORT_DESKTOP, VIEWPORT_TABLET } from "@/utilities";
import PageSectionsGrid from "@/Components/PageSectionsGrid";
import ArtistPageSection from "./ArtistPageSection";
import EventTicketPageSection from "./EventTicketPageSection";
import VisitorActivityLogPageSection from "../EventTicketPurchaseShow/VisitorActivityLogPageSection";

type EventShowPropsType = {
    event: EventModelType;
    eventTickets: EventTicketModelType[];
} & AuthenticatedLayoutPropsType;

const EventShow = (props: EventShowPropsType) => {

    const page = usePage<EventShowPropsType & PageProps>();

    return (
        <>
            <Head title="Event" />

            <div className="py-12">
                <PageSectionsGrid>

                    {props.eventTickets.map((eventTicket, index) => (
                        <EventTicketPageSection
                            key={index}
                            eventTicket={eventTicket}
                            event={props.event}
                        />
                    ))}

                    {props.event.artist != null && <ArtistPageSection artist={props.event.artist} />}

                    <VisitorActivityLogPageSection scopes={{
                        venue: page.props.auth.user.venue_id,
                        event: props.event,
                    }} />

                </PageSectionsGrid>
            </div>
        </>
    );
};

EventShow.layout = (
    page: ReactNode & { props: EventShowPropsType & PageProps }
) => {
    const headerTitle =
        page.props?.auth?.user?.venue?.name == null
            ? page.props.event.name
            : page.props.event.name + " at " + page.props.auth.user.venue?.name;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-3">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        {headerTitle}
                    </h2>

                    {page.props.event.description !== null && (
                        <div className={"select-text text-gray-500 hidden " + VIEWPORT_DESKTOP + ":block"}>
                            {page.props.event.description}
                        </div>
                    )}

                    <EventCardArtistRow event={page.props.event} link={true} />

                    <EventCardTicketsRow eventOrEventTicket={page.props.event} />

                    <EventCardSaleAvailabilityRow
                        event={page.props.event}
                    />

                    <EventCardStartEndDateTimeRow
                        event={page.props.event}
                    />

                    <EventCardStatusRow event={page.props.event} />
                </div>
            }
            children={page}
        />
    );
};

export default EventShow;
