/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-14T17:24:33.375Z
Modified: 2023-12-14T17:24:33.375Z

Description: description
*/

import { EventModelType } from "@/types";
import { Link } from "@inertiajs/react";
import EventCardTicketsRow from "../EventCardTicketsRow";
import EventCardSaleAvailabilityRow from "../EventCardSaleAvailabilityRow";
import EventCardStartEndDateTimeRow from "../EventCardStartEndDateTimeRow";
import EventCardStatusRow from "../EventCardStatusRow";
import EventCardArtistRow from "../EventCardArtistRow";
import { VIEWPORT_DESKTOP, VIEWPORT_TABLET } from "@/utilities";

type EventCardPropsType = {
    event: EventModelType;
    showArtist?: boolean;
    showDescription?: boolean;
    linkToArtist?: boolean;
};

const EventCard = (props: EventCardPropsType) => {
    return (
        <Link
            href={route("venue-management-app.events.show", [props.event.id])}
        >
            <div className={
                "bg-white overflow-hidden cursor-pointer transition-all transition-duration-300 ease-in-out shadow-sm hover:shadow-md border border-gray-200 " + VIEWPORT_TABLET + ":rounded-lg " +
                "flex flex-col gap-3 py-5"
            }>
                <div className="select-text px-6 text-gray-800 font-semibold">
                    {props.event.name}
                </div>

                {props.event.description !== null && props.showDescription !== false && (
                    <div className={"select-text px-6 text-gray-500 hidden " + VIEWPORT_DESKTOP + ":block"}>
                        {props.event.description}
                    </div>
                )}

                <div className="flex flex-col gap-3 px-6">
                    {props.showArtist !== false && <EventCardArtistRow event={props.event} link={props.linkToArtist === true} />}

                    <EventCardTicketsRow eventOrEventTicket={props.event} />

                    <EventCardSaleAvailabilityRow
                        event={props.event}
                    />

                    <EventCardStartEndDateTimeRow
                        event={props.event}
                    />

                    <EventCardStatusRow event={props.event} />
                </div>
            </div>
        </Link>
    );
};

export default EventCard;
