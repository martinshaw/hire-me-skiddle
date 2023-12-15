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
import { ArtistModelType, PageProps } from "@/types";
import { ReactNode } from "react";
import ArtistCategoryTag from "../ArtistIndex/components/ArtistCategoryTag";
import ArtistShowEventCard from "./components/EventCard";

type ArtistShowPropsType = {
    artist: ArtistModelType;
} & AuthenticatedLayoutPropsType;

const ArtistShow = (props: ArtistShowPropsType) => {
    const page = usePage<ArtistShowPropsType & PageProps>();

    return (
        <>
            <Head title="Artist" />

            <div className="py-12">
                {props.artist.events != null ? (
                    <div className="max-w-7xl mx-auto px-0 @sm:px-6 @lg:px-8 flex flex-col gap-6">
                        {(props.artist.events || []).map((event, index) => (
                            <ArtistShowEventCard key={index} event={event} showArtist={false} />
                        ))}
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto px-0 @sm:px-6 @lg:px-8 justify-center items-center m-auto w-full h-full flex flex-col">
                        <div className="text-stone-400">
                            No events found for {props.artist.name} at{" "}
                            {page.props.auth.user.venue?.name}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

ArtistShow.layout = (
    page: ReactNode & { props: ArtistShowPropsType & PageProps }
) => {
    const headerTitle =
        page.props?.auth?.user?.venue?.name == null
            ? page.props.artist.name
            : page.props.artist.name +
              " at " +
              page.props.auth.user.venue?.name;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-3">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        {headerTitle}
                    </h2>

                    <div className="flex flex-col @md:flex-row gap-2 @md:gap-6 justify-start items-start @md:items-center text-sm @md:text-base">
                        {page.props.artist.category !== null && (
                            <ArtistCategoryTag artist={page.props.artist} />
                        )}

                        {page.props.artist.events_count > 0 && (
                            <div className="text-gray-600">
                                {page.props.artist.events_count} event
                                {page.props.artist.events_count > 1 ? "s" : ""}
                            </div>
                        )}
                    </div>

                    {page.props.artist.description !== null && (
                        <div className="select-text text-gray-500 hidden @md:block">
                            {page.props.artist.description}
                        </div>
                    )}
                </div>
            }
            children={page}
        />
    );
};

export default ArtistShow;
