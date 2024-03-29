/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-13T12:35:25.292Z
Modified: 2023-12-13T12:35:25.292Z

Description: description
*/

import { ArtistModelType, PageProps } from "@/types";
import ArtistCategoryTag from "../ArtistCategoryTag";
import { ArtistIndexPropsType } from "../..";
import { Link, usePage } from "@inertiajs/react";
import { VIEWPORT_DESKTOP, VIEWPORT_TABLET } from "@/utilities";

type ArtistIndexListCardPropsType = {
    artist: ArtistModelType;
};

const ArtistIndexListCard = (props: ArtistIndexListCardPropsType) => {
    const page = usePage<ArtistIndexPropsType & PageProps>();

    const humanReadableBornAtDate =
        props.artist.born_at == null
            ? null
            : new Date(props.artist.born_at).toLocaleDateString();

    const additionalClassNames =
        props.artist.events_count > 0 ? "pt-5 pb-3" : "pt-5 pb-5";

    return (
        <Link
            href={route("venue-management-app.artists.show", [props.artist.id])}
        >
            <div
                className={
                    "bg-white overflow-hidden cursor-pointer transition-all transition-duration-300 ease-in-out shadow-sm hover:shadow-md border border-gray-200 " + VIEWPORT_TABLET + ":rounded-lg " +
                    "flex flex-col gap-3 " +
                    additionalClassNames
                }
            >
                {props.artist.name !== null && (
                    <div className="select-text px-6 text-gray-800 font-semibold">
                        {props.artist.name}
                    </div>
                )}

                <div className="px-6 flex flex-col @md:flex-row gap-2 @md:gap-6 justify-start items-start @md:items-center text-sm @md:text-base">
                    {props.artist.category !== null && (
                        <ArtistCategoryTag artist={props.artist} />
                    )}

                    {props.artist.born_at !== null && (
                        <div className="text-gray-600">
                            Born {humanReadableBornAtDate}
                        </div>
                    )}
                </div>

                {props.artist.description !== null && (
                    <div className="select-text px-6 text-gray-500 hidden @md:block">
                        {props.artist.description}
                    </div>
                )}

                {props.artist.events_count > 0 && (
                    <>
                        <div className="border-b-gray-300 border-b w-full"></div>

                        <div className="flex flex-row gap-3 px-6 justify-between items-center text-gray-500 text-sm">
                            <div>
                                <span className={"hidden " + VIEWPORT_DESKTOP + ":inline-block"}>
                                    Click to see more details about the{" "}
                                </span>
                                <span className={"inline-block " + VIEWPORT_DESKTOP + ":hidden"}>
                                    More about their{" "}
                                </span>{" "}
                                {props.artist.events_count} event{props.artist.events_count > 1 ? "s" : ""}
                                <span className={"hidden " + VIEWPORT_DESKTOP + ":inline-block"}>
                                    {" "}which {props.artist.name} has at{" "}
                                    {page.props?.auth?.user?.venue?.name == null
                                        ? "our venue"
                                        : page.props.auth.user.venue?.name}
                                </span>
                            </div>
                            <div>&rarr;</div>
                        </div>
                    </>
                )}
            </div>
        </Link>
    );
};

export default ArtistIndexListCard;
