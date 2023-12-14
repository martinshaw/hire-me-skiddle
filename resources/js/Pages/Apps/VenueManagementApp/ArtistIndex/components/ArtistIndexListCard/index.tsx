/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-13T12:35:25.292Z
Modified: 2023-12-13T12:35:25.292Z

Description: description
*/

import { ArtistModelType } from "@/types";
import ArtistCategoryTag from "../ArtistCategoryTag";

type ArtistIndexListCardPropsType = {
    artist: ArtistModelType;
};

const ArtistIndexListCard = (props: ArtistIndexListCardPropsType) => {
    const humanReadableBornAtDate =
        props.artist.born_at == null
            ? null
            : new Date(props.artist.born_at).toLocaleDateString();

    return (
        <div
            className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex flex-col gap-3 py-6"
        >
            {props.artist.name !== null && (
                <div className="select-text px-6 text-gray-800 font-semibold">
                    {props.artist.name}
                </div>
            )}

            <div className="px-6 flex flex-col @md:flex-row gap-2 @md:gap-6 justify-start items-start @md:items-center">
                {props.artist.category !== null && (
                    <ArtistCategoryTag
                        artist={props.artist}
                    />
                )}

                {props.artist.born_at !== null && (
                    <div className="text-gray-600">
                        Born {humanReadableBornAtDate}
                    </div>
                )}
            </div>

            {props.artist.description !== null && (
                <div className="select-text px-6 pt-6 @md:pt-0 text-gray-500">
                    {props.artist.description}
                </div>
            )}
        </div>
    );
};

export default ArtistIndexListCard;
