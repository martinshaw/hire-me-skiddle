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
import { EventModelType, LengthAwarePaginatorType, PageProps } from "@/types";
import { ReactNode } from "react";
import EventCard from "../ArtistShow/components/EventCard";
import LengthAwarePaginatorFilterableCardGrid from "@/Components/LengthAwarePaginatorFilterableCardGrid";

type EventIndexPropsType = {
    paginatedEvents: LengthAwarePaginatorType<EventModelType>;
} & AuthenticatedLayoutPropsType;

const EventIndex = (props: EventIndexPropsType) => {
    const page = usePage<EventIndexPropsType & PageProps>();

    return (
        <>
            <Head title="Events" />

            <div className="py-12">
                <LengthAwarePaginatorFilterableCardGrid<
                    EventModelType,
                    ['event_name', 'artist_name', 'tickets_purchased', 'tickets_available', 'starts_at', 'ends_at'],
                >
                    paginator={props.paginatedEvents}
                    cardRenderer={(model, index) => (
                        <EventCard key={index} event={model} showDescription={false} linkToArtist={true} />
                    )}
                    filterControls={
                        {
                            event_name: {
                                caption: "Event Name",
                                type: "text",
                            },
                            artist_name: {
                                caption: "Artist Name",
                                type: "text",
                            },
                            tickets_purchased: {
                                caption: "Tickets Purchased",
                                type: "text",
                            },
                            tickets_available: {
                                caption: "Tickets Available",
                                type: "text",
                            },
                            starts_at: {
                                caption: "Starts At",
                                type: "date",
                            },
                            ends_at: {
                                caption: "Ends At",
                                type: "date",
                            },
                        }
                    }
                    noItemsFoundMessage={<>No events found at {page.props.auth.user.venue?.name}</>}
                    // TODO: Needs to be fixed/improved once the issue with container query is resolved (maybe zoom related)
                    cardGridSpan={{
                        mobile: 1,
                        tablet: 3,
                        desktop: 3,
                    }}
                />
            </div>
        </>
    );
};

EventIndex.layout = (
    page: ReactNode & { props: EventIndexPropsType & PageProps }
) => {
    let headerTitle =
        page.props.counts.events === 1
            ? page.props.counts.events.toLocaleString() + " Event"
            : page.props.counts.events.toLocaleString() + " Events";

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

export default EventIndex;
