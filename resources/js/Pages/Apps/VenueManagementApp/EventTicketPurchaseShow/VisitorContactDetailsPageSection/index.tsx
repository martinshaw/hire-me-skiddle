/*
All Rights Reserved, (c) 2024 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2024-01-05T01:27:50.870Z
Modified: 2024-01-05T01:27:50.870Z

Description: description
*/

import PageSectionsGridSection from "@/Components/PageSectionsGrid/PageSectionsGridSection";
import { VisitorContactDetailsModelType, VisitorModelType } from "@/types";
import VisitorContactDetailRow from "./VisitorContactDetailRow";
import { useState } from "react";
import FloatingUiSelect, { FloatingUiSelectOption } from "@/Components/FloatingUiSelect";
import SecondaryButton from "@/Components/SecondaryButton";
import { router } from "@inertiajs/react";

export type VisitorContactDetailsPageSectionPropsType = {
    visitor: VisitorModelType;
};

const VisitorContactDetailsPageSection = (props: VisitorContactDetailsPageSectionPropsType) => {
    const [isEditingVisitorContactDetails, setIsEditingVisitorContactDetails] = useState<boolean>(false);

    const visitorContactDetails: Partial<{ [key in VisitorContactDetailsModelType['type']]: string }> = {
        "note": "Note",
        "email": "Email",
        "phone": "Phone",
        "address": "Address",
        "website": "Website",
        "passport": "Passport",
        "drivers_license": "Driver's License",
        "national_id": "National ID",
        "loyalty_card": "Loyalty Card",
        "student_id": "Student ID",
        "employee_id": "Employee ID",
        "enrolled_group": "Enrolled Group",
        "whatsapp": "WhatsApp",
        "facebook": "Facebook",
        "twitter": "Twitter",
        "instagram": "Instagram",
        "linkedin": "LinkedIn",
        "youtube": "YouTube",
        "tiktok": "TikTok",
        "snapchat": "Snapchat",
        "telegram": "Telegram",
        "viber": "Viber",
        "discord": "Discord",
    } as const;

    return (
        <PageSectionsGridSection title="Visitor">
            <div className="flex flex-col gap-3">
                {props.visitor?.full_name &&
                    <div className="select-text text-gray-800 font-semibold">
                        {props.visitor.full_name}
                    </div>
                }

                <div className="flex flex-col gap-3">
                    {
                        (props.visitor?.contact_details || []).map((contactDetail, index) =>
                            <VisitorContactDetailRow
                                key={contactDetail.id}
                                visitorContactDetail={contactDetail}
                                isEditing={isEditingVisitorContactDetails}
                            />
                        )
                    }
                </div>


                <div className="flex flex-row gap-3 pt-2">
                    <FloatingUiSelect
                        arrow
                        position="top-start"
                        label={() => "Add"}
                        grid={3}
                        onSelect={(index, label) => {
                            if (index == null) return false;

                            const type = Object.entries(visitorContactDetails)[index][0];

                            router.post(
                                route('venue-management-app.visitors.contact-details.create', [props.visitor.id]),
                                { type, value: '' },
                                {
                                    preserveScroll: true,
                                    onSuccess: () => {
                                        setIsEditingVisitorContactDetails(true);
                                    },
                                }
                            );

                            return false;
                        }}
                    >
                        {
                            Object.entries(visitorContactDetails).map(([key, value]) =>
                                <FloatingUiSelectOption key={key} label={value} />
                            )
                        }
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
    );
};

export default VisitorContactDetailsPageSection;
