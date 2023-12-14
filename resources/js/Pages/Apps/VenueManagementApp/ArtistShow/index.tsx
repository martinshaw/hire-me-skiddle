/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-13T07:32:24.912Z
Modified: 2023-12-13T07:32:24.912Z

Description: description
*/
import AuthenticatedLayout, { AuthenticatedLayoutPropsType } from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { ArtistModelType, PageProps } from "@/types";
import { ReactNode } from "react";

type ArtistShowPropsType = {
    artist: ArtistModelType;
} & AuthenticatedLayoutPropsType;

const ArtistShow = (props: ArtistShowPropsType) => {
    return (
        <>
            <Head title="Artist" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">jkl</div>
                    </div>
                </div>
            </div>
        </>
    );
};

ArtistShow.layout = (page: ReactNode) => (
    <AuthenticatedLayout
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Artist
            </h2>
        }
        children={page}
    />
);

export default ArtistShow;
