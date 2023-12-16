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
import { EventModelType, PageProps } from "@/types";
import { ReactNode } from "react";
import EventCard from "../ArtistShow/components/EventCard";

type EventIndexPropsType = {
    events: EventModelType[];
} & AuthenticatedLayoutPropsType;

const EventIndex = (props: EventIndexPropsType) => {
    const page = usePage<EventIndexPropsType & PageProps>();

    return (
        <>
            <Head title="Events" />

            <div className="py-12">
                {props.events != null ? (
                    <div className="max-w-7xl mx-auto px-0 @sm:px-6 @lg:px-8 flex flex-col gap-6">
                        {(props.events || []).map((event, index) => (
                            <EventCard key={index} event={event} linkToArtist={true} />
                        ))}
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto px-0 @sm:px-6 @lg:px-8 justify-center items-center m-auto w-full h-full flex flex-col">
                        <div className="text-stone-400">
                            No events found at{" "}
                            {page.props.auth.user.venue?.name}
                        </div>
                    </div>
                )}
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
