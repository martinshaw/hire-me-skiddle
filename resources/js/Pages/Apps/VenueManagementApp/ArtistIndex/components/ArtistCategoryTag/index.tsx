/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-13T12:02:33.620Z
Modified: 2023-12-13T12:02:33.620Z

Description: description
*/

import { ArtistModelType, ArtistModelCategoryType } from "@/types";

type ArtistCategoryTagPropsType = {
    artist: ArtistModelType;
};

const ArtistCategoryTag = (props: ArtistCategoryTagPropsType) => {
    const categoriesInformation: {[key in ArtistModelCategoryType]: {
        caption: string;
        icon: string;
    } | null} = {
        band: { caption: 'Band', icon: '/images/icons/mic.svg' },
        comedian: { caption: 'Comedian', icon: '/images/icons/smile.svg' },
        dj: { caption: 'DJ', icon: '/images/icons/disc.svg' },
        speaker: { caption: 'Speaker', icon: '/images/icons/speaker.svg' },
        musician: { caption: 'Musician', icon: '/images/icons/music.svg' },
        other: null,
    };

    const categoryInformation = props.artist.category == null ? null : categoriesInformation[props.artist.category as ArtistModelCategoryType];

    return categoryInformation == null ? null : (
        <div className="flex flex-row gap-3 justify-start items-center">
            <img src={categoryInformation.icon} className="w-4 h-4" />
            <div className="text-gray-600">
                {categoryInformation.caption}
            </div>
        </div>
    );
};

export default ArtistCategoryTag;
