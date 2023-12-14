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
import { ArtistModelType, PageProps } from "@/types";
import { ReactNode } from "react";
import ArtistIndexListCard from "./components/ArtistIndexListCard";

export type ArtistIndexPropsType = {
    artists: ArtistModelType[];
} & AuthenticatedLayoutPropsType;

const ArtistIndex = (props: ArtistIndexPropsType) => {
    return (
        <>
            <Head title="Artists" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto @sm:px-6 @lg:px-8 flex flex-col gap-6">
                    {props.artists.map((artist, index) => (
                        <ArtistIndexListCard artist={artist} key={index} />
                    ))}
                </div>
            </div>
        </>
    );
};

ArtistIndex.layout = (
    page: ReactNode & { props: ArtistIndexPropsType & PageProps }
) => {
    const headerTitle =
        page.props?.auth?.user?.venue?.name == null
            ? "Artists"
            : "Artists at " + page.props.auth.user.venue?.name;

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
