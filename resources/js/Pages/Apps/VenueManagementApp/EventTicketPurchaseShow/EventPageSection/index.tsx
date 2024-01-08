/*
All Rights Reserved, (c) 2024 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2024-01-05T03:27:04.550Z
Modified: 2024-01-05T03:27:04.551Z

Description: description
*/

import PageSectionsGridSection from "@/Components/PageSectionsGrid/PageSectionsGridSection";
import { EventModelType } from "@/types";
import EventCardArtistRow from "../../ArtistShow/components/EventCardArtistRow";
import EventCardTicketsRow from "../../ArtistShow/components/EventCardTicketsRow";
import EventCardSaleAvailabilityRow from "../../ArtistShow/components/EventCardSaleAvailabilityRow";
import EventCardStartEndDateTimeRow from "../../ArtistShow/components/EventCardStartEndDateTimeRow";
import EventCardStatusRow from "../../ArtistShow/components/EventCardStatusRow";
import { Link } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";

export type EventPageSectionPropsType = {
    event: EventModelType;
};

const EventPageSection = (props: EventPageSectionPropsType) => {
    return (
        <PageSectionsGridSection title="Event">
            <div className="flex flex-col gap-3">
                {props.event?.name &&
                    <div className="select-text text-gray-800 font-semibold">
                        {props.event.name}
                    </div>
                }

                <div className="flex flex-col gap-3">
                    {props.event?.artist &&
                        <EventCardArtistRow event={props.event} link />
                    }

                    {props.event &&
                        <EventCardTicketsRow eventOrEventTicket={props.event} />
                    }

                    {props.event &&
                        <EventCardSaleAvailabilityRow
                            event={props.event}
                        />
                    }

                    {props.event &&
                        <EventCardStartEndDateTimeRow
                            event={props.event}
                        />
                    }

                    {props.event &&
                        <EventCardStatusRow event={props.event} />
                    }
                </div>

                <div className="flex flex-row gap-3 pt-2">
                    <Link
                        href={route("venue-management-app.events.show", [props.event?.id])}
                    >
                        <SecondaryButton>View Event</SecondaryButton>
                    </Link>
                </div>
            </div>
        </PageSectionsGridSection>
    );
}

export default EventPageSection;
