/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-14T17:24:33.375Z
Modified: 2023-12-14T17:24:33.375Z

Description: description
*/

import { ArtistModelType, EventModelType } from "@/types";
import ArtistShowEventCardTicketsRow from "../ArtistShowEventCardTicketsRow";
import ArtistShowEventCardSaleAvailabilityRow from "../ArtistShowEventCardSaleAvailabilityRow";
import ArtistShowEventCardStatusRow from "../ArtistShowEventCardStatusRow";
import ArtistShowEventCardStartEndDateTimeRow from "../ArtistShowEventCardStartEndDateTimeRow";

type ArtistShowEventCardPropsType = {
    event: EventModelType;
    artist: ArtistModelType;
};

const ArtistShowEventCard = (props: ArtistShowEventCardPropsType) => {
    return (
        <div className="bg-white overflow-hidden shadow-sm @md:rounded-lg flex flex-col gap-3 hover:shadow-xl transition-all duration-500 ease-in-out cursor-pointer pt-5 pb-5">
            <div className="select-text px-6 text-gray-800 font-semibold">
                {props.event.name}
            </div>

            {props.event.description !== null && (
                <div className="select-text px-6 text-gray-500 hidden @2xl:block">
                    {props.event.description}
                </div>
            )}

            <ArtistShowEventCardTicketsRow event={props.event} />

            <ArtistShowEventCardSaleAvailabilityRow event={props.event} />

            <ArtistShowEventCardStartEndDateTimeRow event={props.event} />

            <ArtistShowEventCardStatusRow event={props.event} />
        </div>
    );
};

export default ArtistShowEventCard;
