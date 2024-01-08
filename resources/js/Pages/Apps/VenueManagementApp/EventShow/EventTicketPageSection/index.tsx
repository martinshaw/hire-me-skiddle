/*
All Rights Reserved, (c) 2024 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2024-01-08T16:07:39.750Z
Modified: 2024-01-08T16:07:39.750Z

Description: description
*/

import PageSectionsGridSection from "@/Components/PageSectionsGrid/PageSectionsGridSection";
import { EventModelType, EventTicketModelType } from "@/types";
import EventCardTicketsRow from "../../ArtistShow/components/EventCardTicketsRow";
import { Link } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";

export type EventTicketPageSectionPropsType = {
    event: EventModelType;
    eventTicket: EventTicketModelType;
};

const EventTicketPageSection = (props: EventTicketPageSectionPropsType) => {
    return (
        <PageSectionsGridSection title={props.eventTicket.name}>
            <div className="flex flex-col gap-3">

                <EventCardTicketsRow eventOrEventTicket={props.eventTicket} />

                <div className="flex flex-col gap-1.5">
                    <div className="text-gray-500">
                        Original Ticket Price:
                    </div>
                    <div className="select-text text-gray-800">
                        {props.eventTicket?.formatted_original_price}
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <div className="text-gray-500">
                        Current Ticket Price:
                    </div>
                    <div className="select-text text-gray-800">
                        {props.eventTicket?.formatted_current_price}
                    </div>
                </div>

                <div className="flex flex-row gap-3 pt-2">
                    <Link
                        href={route("venue-management-app.event-ticket-purchases.index", {
                            'event': props.event.name,
                            'ticket_type': props.eventTicket.name,
                        })}
                    >
                        <SecondaryButton>View Purchases of This Ticket</SecondaryButton>
                    </Link>
                </div>

            </div>
        </PageSectionsGridSection>
    );
};

export default EventTicketPageSection;
