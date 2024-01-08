/*
All Rights Reserved, (c) 2024 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2024-01-05T03:27:04.550Z
Modified: 2024-01-05T03:27:04.551Z

Description: description
*/

import LengthAwarePaginatorInfiniteScrollList from "@/Components/LengthAwarePaginatorInfiniteScrollList";
import PageSectionsGridSection from "@/Components/PageSectionsGrid/PageSectionsGridSection";
import { EventModelType, EventTicketModelType, EventTicketPurchaseModelType, LengthAwarePaginatorType, VenueModelType, VisitorActivityLogModelType, VisitorContactDetailsModelType, VisitorModelType } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";

export type VisitorActivityLogPageSectionPropsType = {
    scopes?: {
        venue?: VenueModelType | number | null;
        visitor?: VisitorModelType | number | null;
        event?: EventModelType | number | null;
        eventTicketPurchase?: EventTicketPurchaseModelType | number | null;
        eventTicket?: EventTicketModelType | number | null;
        visitorContactDetail?: VisitorContactDetailsModelType | number | null;
    }
};

const VisitorActivityLogPageSection = (props: VisitorActivityLogPageSectionPropsType) => {
    const scopeIds: { [key: string]: number | null } = {
        venue: props.scopes?.venue == null ? null : typeof props.scopes?.venue === 'number' ? props.scopes?.venue : props.scopes?.venue.id,
        visitor: props.scopes?.visitor == null ? null : typeof props.scopes?.visitor === 'number' ? props.scopes?.visitor : props.scopes?.visitor.id,
        event: props.scopes?.event == null ? null : typeof props.scopes?.event === 'number' ? props.scopes?.event : props.scopes?.event.id,
        eventTicketPurchase: props.scopes?.eventTicketPurchase == null ? null : typeof props.scopes?.eventTicketPurchase === 'number' ? props.scopes?.eventTicketPurchase : props.scopes?.eventTicketPurchase.id,
        eventTicket: props.scopes?.eventTicket == null ? null : typeof props.scopes?.eventTicket === 'number' ? props.scopes?.eventTicket : props.scopes?.eventTicket.id,
        visitorContactDetail: props.scopes?.visitorContactDetail == null ? null : typeof props.scopes?.visitorContactDetail === 'number' ? props.scopes?.visitorContactDetail : props.scopes?.visitorContactDetail.id,
    };

    return (
        <PageSectionsGridSection title="Activity Log">
            <LengthAwarePaginatorInfiniteScrollList<VisitorActivityLogModelType>
                url={(pageNumber) => route(
                    "venue-management-app.visitor-activity-logs.index",
                    {
                        page: pageNumber,
                        scopes: scopeIds,
                    },
                )}
                itemRenderer={(activityLog: VisitorActivityLogModelType, index: number) => (
                    <div key={index} className="flex flex-row gap-3 p-2 mr-1 hover:bg-gray-100 cursor-pointer rounded-md transition-all duration-300">
                        <div className="flex flex-col gap-1.5 flex-1 justify-center">
                            <div className="select-text text-gray-800">
                                {activityLog.message}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5 justify-center">
                            <div
                                className="select-text text-gray-500 text-sm"
                                title={(new Date(activityLog.created_at).toLocaleDateString()) + ' ' + (new Date(activityLog.created_at).toLocaleTimeString())}
                            >
                                {new Date(activityLog.created_at).toLocaleDateString()}
                                {" "}
                                {new Date(activityLog.created_at).toLocaleTimeString()}
                            </div>
                        </div>
                    </div>
                )}
                errorMessage={() => 'Error fetching activity logs'}
                loadingMessage={() => 'Loading more activity logs...'}
            />
        </PageSectionsGridSection>
    );
}

export default VisitorActivityLogPageSection;
