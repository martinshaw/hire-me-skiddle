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
import { ArtistModelType, LengthAwarePaginatorType, PageProps } from "@/types";
import { ReactNode } from "react";
import ArtistIndexListCard from "./components/ArtistIndexListCard";
import LengthAwarePaginatorFilterableCardGrid from "@/Components/LengthAwarePaginatorFilterableCardGrid";

export type ArtistIndexPropsType = {
    paginatedArtists: LengthAwarePaginatorType<ArtistModelType>;
} & AuthenticatedLayoutPropsType;

const ArtistIndex = (props: ArtistIndexPropsType) => {
    const page = usePage<ArtistIndexPropsType & PageProps>();

    return (
        <>
            <Head title="Artists" />

            <div className="py-12">
                <LengthAwarePaginatorFilterableCardGrid<
                    ArtistModelType,
                    ['artist_name', 'artist_type']
                >
                    paginator={props.paginatedArtists}
                    cardRenderer={(model, index) => (
                        <ArtistIndexListCard artist={model} key={index} />
                    )}
                    filterControls={
                        {
                            artist_name: {
                                caption: "Artist Name",
                                type: "text",
                            },
                            artist_type: {
                                caption: "Artist Type",
                                type: "text",
                            },
                        }
                    }
                    noItemsFoundMessage={<>No artists found at {page.props.auth.user.venue?.name}</>}
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

ArtistIndex.layout = (
    page: ReactNode & { props: ArtistIndexPropsType & PageProps }
) => {
    let headerTitle =
        page.props.counts.artists === 1
            ? page.props.counts.artists.toLocaleString() + " Artist"
            : page.props.counts.artists.toLocaleString() + " Artists";

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

export default ArtistIndex;
