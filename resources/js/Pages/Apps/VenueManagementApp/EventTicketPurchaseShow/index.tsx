/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-13T07:32:24.912Z
Modified: 2023-12-13T07:32:24.912Z

Description: description
*/
import AuthenticatedLayout, { AuthenticatedLayoutPropsType } from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { EventTicketPurchaseModelType, PageProps } from "@/types";
import { ReactNode, useState } from "react";
import PageSectionsGrid from "@/Components/PageSectionsGrid";
import PageSectionsGridSection from "@/Components/PageSectionsGrid/PageSectionsGridSection";
import { VIEWPORT_DESKTOP, VIEWPORT_TABLET } from "@/utilities";
import EventCardArtistRow from "../ArtistShow/components/EventCardArtistRow";
import EventCardTicketsRow from "../ArtistShow/components/EventCardTicketsRow";
import EventCardSaleAvailabilityRow from "../ArtistShow/components/EventCardSaleAvailabilityRow";
import EventCardStartEndDateTimeRow from "../ArtistShow/components/EventCardStartEndDateTimeRow";
import EventCardStatusRow from "../ArtistShow/components/EventCardStatusRow";
import SecondaryButton from "@/Components/SecondaryButton";
import VisitorContactDetailRow from "./VisitorContactDetailRow";
import toast from "react-hot-toast";
import FloatingUiSelect, { FloatingUiSelectOption } from "@/Components/FloatingUiSelect";

type EventTicketPurchaseShowPropsType = {
    eventTicketPurchase: EventTicketPurchaseModelType;
} & AuthenticatedLayoutPropsType;

const EventTicketPurchaseShow = (props: EventTicketPurchaseShowPropsType) => {
    const page = usePage<EventTicketPurchaseShowPropsType & PageProps>();

    const [isEditingVisitorContactDetails, setIsEditingVisitorContactDetails] = useState<boolean>(false);

    return (
        <>
            <Head title="Event Ticket Purchase" />

            <div className="py-12">
                <PageSectionsGrid>

                    <PageSectionsGridSection title="Event">
                        <div className="flex flex-col gap-3">
                            {props.eventTicketPurchase.event?.name &&
                                <div className="select-text text-gray-800 font-semibold">
                                    {props.eventTicketPurchase.event.name}
                                </div>
                            }

                            <div className="flex flex-col gap-3">
                                {props.eventTicketPurchase.event?.artist &&
                                    <EventCardArtistRow event={props.eventTicketPurchase.event} link />
                                }

                                {props.eventTicketPurchase.event &&
                                    <EventCardTicketsRow event={props.eventTicketPurchase.event} />
                                }

                                {props.eventTicketPurchase.event &&
                                    <EventCardSaleAvailabilityRow
                                        event={props.eventTicketPurchase.event}
                                    />
                                }

                                {props.eventTicketPurchase.event &&
                                    <EventCardStartEndDateTimeRow
                                        event={props.eventTicketPurchase.event}
                                    />
                                }

                                {props.eventTicketPurchase.event &&
                                    <EventCardStatusRow event={props.eventTicketPurchase.event} />
                                }
                            </div>

                            <div className="flex flex-row gap-3 pt-2">
                                <Link
                                    href={route("venue-management-app.events.show", [props.eventTicketPurchase.event?.id])}
                                >
                                    <SecondaryButton>View Event</SecondaryButton>
                                </Link>
                            </div>
                        </div>
                    </PageSectionsGridSection>

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

                    <PageSectionsGridSection title="Visitor">
                        <div className="flex flex-col gap-3">
                            {props.eventTicketPurchase.visitor?.full_name &&
                                <div className="select-text text-gray-800 font-semibold">
                                    {props.eventTicketPurchase.visitor.full_name}
                                </div>
                            }

                            <div className="flex flex-col gap-3">
                                {
                                    (props.eventTicketPurchase.visitor?.contact_details || []).map((contactDetail, index) =>
                                        <VisitorContactDetailRow
                                            key={contactDetail.id}
                                            visitorContactDetail={contactDetail}
                                            isEditing={isEditingVisitorContactDetails}
                                        />
                                    )
                                }
                            </div>

                            {/* value="note" */}
                            {/* value="email" */}
                            {/* value="phone" */}
                            {/* value="address" */}
                            {/* value="website" */}
                            {/* value="passport" */}
                            {/* value="drivers_license" */}
                            {/* value="national_id" */}
                            {/* value="loyalty_card" */}
                            {/* value="student_id" */}
                            {/* value="employee_id" */}
                            {/* value="enrolled_group" */}
                            {/* value="whatsapp" */}
                            {/* value="facebook" */}
                            {/* value="twitter" */}
                            {/* value="instagram" */}
                            {/* value="linkedin" */}
                            {/* value="youtube" */}
                            {/* value="tiktok" */}
                            {/* value="snapchat" */}
                            {/* value="telegram" */}
                            {/* value="viber" */}
                            {/* value="discord" */}

                            <div className="flex flex-row gap-3 pt-2">
                                <FloatingUiSelect
                                    arrow
                                    position="top-start"
                                    label={() => "Add"}
                                    onSelect={(index, label) => {
                                        console.log(index, label)

                                        return false;
                                    }}
                                >
                                    <FloatingUiSelectOption label="Note" />
                                    <FloatingUiSelectOption label="Email" />
                                    <FloatingUiSelectOption label="Phone" />
                                    <FloatingUiSelectOption label="Address" />
                                    <FloatingUiSelectOption label="Website" />
                                    <FloatingUiSelectOption label="Passport" />
                                    <FloatingUiSelectOption label="Driver's License" />
                                    <FloatingUiSelectOption label="National ID" />
                                    <FloatingUiSelectOption label="Loyalty Card" />
                                    <FloatingUiSelectOption label="Student ID" />
                                    <FloatingUiSelectOption label="Employee ID" />
                                    <FloatingUiSelectOption label="Enrolled Group" />
                                    <FloatingUiSelectOption label="WhatsApp" />
                                    <FloatingUiSelectOption label="Facebook" />
                                    <FloatingUiSelectOption label="Twitter" />
                                    <FloatingUiSelectOption label="Instagram" />
                                    <FloatingUiSelectOption label="LinkedIn" />
                                    <FloatingUiSelectOption label="YouTube" />
                                    <FloatingUiSelectOption label="TikTok" />
                                    <FloatingUiSelectOption label="Snapchat" />
                                    <FloatingUiSelectOption label="Telegram" />
                                    <FloatingUiSelectOption label="Viber" />
                                    <FloatingUiSelectOption label="Discord" />
                                </FloatingUiSelect>

                                <SecondaryButton onClick={() => {
                                    setIsEditingVisitorContactDetails(previousState => !previousState);
                                }}>{
                                        isEditingVisitorContactDetails ?
                                            "Finished Editing" :
                                            "Edit Contact Details"
                                    }</SecondaryButton>

                            </div>
                        </div>
                    </PageSectionsGridSection>

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

                </PageSectionsGrid>
            </div>
        </>
    );
};

EventTicketPurchaseShow.layout = (
    page: ReactNode & { props: EventTicketPurchaseShowPropsType & PageProps }
) => {
    let headerTitle = "Event Ticket Purchase";
    if ((page?.props as (EventTicketPurchaseShowPropsType & PageProps))?.eventTicketPurchase?.visitor?.full_name != null) {
        headerTitle += " for " + (page?.props as (EventTicketPurchaseShowPropsType & PageProps))?.eventTicketPurchase?.visitor?.full_name;
    }

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

export default EventTicketPurchaseShow;
