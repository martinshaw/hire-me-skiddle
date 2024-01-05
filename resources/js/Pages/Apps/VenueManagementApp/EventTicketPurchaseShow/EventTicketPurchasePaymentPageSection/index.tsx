/*
All Rights Reserved, (c) 2024 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2024-01-05T03:24:49.443Z
Modified: 2024-01-05T03:24:49.443Z

Description: description
*/

import PageSectionsGridSection from "@/Components/PageSectionsGrid/PageSectionsGridSection";
import SecondaryButton from "@/Components/SecondaryButton";
import { EventTicketPurchaseModelType } from "@/types";
import { Link } from "@inertiajs/react";

export type EventTicketPurchasePaymentPageSectionPropsType = {
    eventTicketPurchase: EventTicketPurchaseModelType;
};

const EventTicketPurchasePaymentPageSection = (props: EventTicketPurchasePaymentPageSectionPropsType) => {
    return (
        <PageSectionsGridSection title="Payment">
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                        <div className="text-gray-500">
                            Amount Paid:
                        </div>
                        <div className="select-text text-gray-800">
                            {props.eventTicketPurchase.formatted_purchase_price}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="text-gray-500">
                            Payment Made:
                        </div>
                        <div className="select-text text-gray-800">
                            {new Date(props.eventTicketPurchase.created_at).toLocaleDateString()}
                            {" "}
                            {new Date(props.eventTicketPurchase.created_at).toLocaleTimeString()}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="text-gray-500">
                            Original Ticket Price:
                        </div>
                        <div className="select-text text-gray-800">
                            {props.eventTicketPurchase.event_ticket?.formatted_original_price}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="text-gray-500">
                            Current Ticket Price:
                        </div>
                        <div className="select-text text-gray-800">
                            {props.eventTicketPurchase.event_ticket?.formatted_current_price}
                        </div>
                    </div>

                    {props.eventTicketPurchase.refunded_at != null &&
                        <div className="flex flex-col gap-1.5">
                            <div className="text-gray-500">
                                Refunded At:
                            </div>
                            <div className="select-text text-gray-800">
                                {new Date(props.eventTicketPurchase.refunded_at).toLocaleDateString()}
                                {" "}
                                {new Date(props.eventTicketPurchase.refunded_at).toLocaleTimeString()}
                            </div>
                        </div>
                    }
                </div>

                <div className="flex flex-row gap-3 pt-2">
                    <Link
                        href={route(
                            "venue-management-app.event-ticket-purchases.refund",
                            [props.eventTicketPurchase.id]
                        )}
                        method="post"
                        disabled={props.eventTicketPurchase.refunded_at != null}
                    >
                        <SecondaryButton
                            disabled={props.eventTicketPurchase.refunded_at != null}
                        >
                            Refund
                        </SecondaryButton>
                    </Link>

                    <SecondaryButton
                        onClick={() => {
                            toast("This feature would be implemented in a real-world application.")
                        }}
                    >
                        Resell
                    </SecondaryButton>
                </div>
            </div>
        </PageSectionsGridSection>
    );
};

export default EventTicketPurchasePaymentPageSection;
