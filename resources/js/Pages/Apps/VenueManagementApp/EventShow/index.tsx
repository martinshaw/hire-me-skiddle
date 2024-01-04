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
import { Head } from "@inertiajs/react";
import { EventModelType, PageProps } from "@/types";
import { ReactNode } from "react";
import EventCardTicketsRow from "../ArtistShow/components/EventCardTicketsRow";
import EventCardSaleAvailabilityRow from "../ArtistShow/components/EventCardSaleAvailabilityRow";
import EventCardStartEndDateTimeRow from "../ArtistShow/components/EventCardStartEndDateTimeRow";
import EventCardStatusRow from "../ArtistShow/components/EventCardStatusRow";
import EventCardArtistRow from "../ArtistShow/components/EventCardArtistRow";
import { VIEWPORT_DESKTOP, VIEWPORT_TABLET } from "@/utilities";

type EventShowPropsType = {
    event: EventModelType;
} & AuthenticatedLayoutPropsType;

const EventShow = (props: EventShowPropsType) => {
    return (
        <>
            <Head title="Event" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 @sm:px-6 @lg:px-8">
                    abc
                </div>
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

                    <EventCardTicketsRow event={page.props.event} />

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
