/*
All Rights Reserved, (c) 2024 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2024-01-05T03:17:58.725Z
Modified: 2024-01-05T03:17:58.725Z

Description: description
*/

import PageSectionsGridSection from "@/Components/PageSectionsGrid/PageSectionsGridSection";
import SecondaryButton from "@/Components/SecondaryButton";
import { EventTicketPurchaseModelType } from "@/types";
import { VIEWPORT_DESKTOP, VIEWPORT_TABLET } from "@/utilities";
import { Link } from "@inertiajs/react";

export type EventTicketPurchaseVenueAccessPageSectionPropsType = {
    eventTicketPurchase: EventTicketPurchaseModelType;
};

const EventTicketPurchaseVenueAccessPageSection = (props: EventTicketPurchaseVenueAccessPageSectionPropsType) => {
    return (
        <PageSectionsGridSection title="Venue Access">
            <div className="flex flex-col gap-3 w-full">
                {props.eventTicketPurchase.entry_barcode_qr_code && (
                    <div className={"flex flex-col " + VIEWPORT_DESKTOP + ":flex-row gap-3"}>
                        <img className={"w-full m-auto " + VIEWPORT_TABLET + ":w-28 " + VIEWPORT_DESKTOP + ":w-32"} src={props.eventTicketPurchase.entry_barcode_qr_code} />

                        <div className={"w-full " + VIEWPORT_DESKTOP + ":flex-1 flex flex-col gap-3"}>
                            <div className="flex flex-col gap-1.5">
                                <div className="text-gray-500">
                                    Barcode:
                                </div>
                                <div className="select-text text-gray-800">
                                    {props.eventTicketPurchase.entry_barcode}
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <div className="text-gray-500">
                                    Entry Code:
                                </div>
                                <div className="select-text text-gray-800">
                                    {props.eventTicketPurchase.entry_code}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-row gap-3 pt-2">
                    <Link
                        href={route(
                            "venue-management-app.event-ticket-purchases.regenerate-entry-code",
                            [props.eventTicketPurchase.id]
                        )}
                        method="post"
                    >
                        <SecondaryButton>
                            Regenerate
                        </SecondaryButton>
                    </Link>
                    <SecondaryButton>Add Ban</SecondaryButton>
                </div>
            </div>
        </PageSectionsGridSection>
    );
};

export default EventTicketPurchaseVenueAccessPageSection;
