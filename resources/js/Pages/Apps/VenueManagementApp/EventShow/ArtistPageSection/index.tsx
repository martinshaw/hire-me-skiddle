/*
All Rights Reserved, (c) 2024 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2024-01-05T03:27:04.550Z
Modified: 2024-01-05T03:27:04.551Z

Description: description
*/

import PageSectionsGridSection from "@/Components/PageSectionsGrid/PageSectionsGridSection";
import { ArtistModelType, EventModelType } from "@/types";
import EventCardArtistRow from "../../ArtistShow/components/EventCardArtistRow";
import EventCardTicketsRow from "../../ArtistShow/components/EventCardTicketsRow";
import EventCardSaleAvailabilityRow from "../../ArtistShow/components/EventCardSaleAvailabilityRow";
import EventCardStartEndDateTimeRow from "../../ArtistShow/components/EventCardStartEndDateTimeRow";
import EventCardStatusRow from "../../ArtistShow/components/EventCardStatusRow";
import { Link } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import ArtistCategoryTag from "../../ArtistIndex/components/ArtistCategoryTag";

export type ArtistPageSectionPropsType = {
    artist: ArtistModelType;
};

const ArtistPageSection = (props: ArtistPageSectionPropsType) => {
    const humanReadableBornAtDate =
        props.artist.born_at == null
            ? null
            : new Date(props.artist.born_at).toLocaleDateString();

    return (
        <PageSectionsGridSection title="Artist">
            <div className="flex flex-col gap-3">
                {props.artist?.name &&
                    <div className="select-text text-gray-800 font-semibold">
                        {props.artist.name}
                    </div>
                }

                <div className="flex flex-col gap-3">
                    <div className="select-text text-gray-500 font-semibold">
                        {props.artist.description}
                    </div>

                    {props.artist.category !== null && (
                        <ArtistCategoryTag artist={props.artist} />
                    )}

                    {props.artist.born_at !== null && (
                        <div className="text-gray-600">
                            Born {humanReadableBornAtDate}
                        </div>
                    )}
                </div>

                {props.artist.events_count > 1 &&
                    <div className="flex flex-row gap-3 pt-2">
                        <Link
                            href={route("venue-management-app.artists.show", [props.artist?.id])}
                        >
                            <SecondaryButton>View {props.artist.events_count - 1} Other Events</SecondaryButton>
                        </Link>
                    </div>
                }
            </div>
        </PageSectionsGridSection>
    );
}

export default ArtistPageSection;
