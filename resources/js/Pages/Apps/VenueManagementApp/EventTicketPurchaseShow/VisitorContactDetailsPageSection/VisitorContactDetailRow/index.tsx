/*
All Rights Reserved, (c) 2024 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2024-01-03T22:24:25.021Z
Modified: 2024-01-03T22:24:25.021Z

Description: description
*/

import TextInput from "@/Components/TextInput";
import useIsMounting from "@/hooks/useIsMounting";
import { VisitorContactDetailsModelType } from "@/types";
import { useForm } from "@inertiajs/react";
import { ReactNode, useEffect } from "react";
import { useDebounce } from "use-debounce";

export type VisitorContactDetailRowPropsType = {
    visitorContactDetail: VisitorContactDetailsModelType;
    isEditing: boolean;
};

const VisitorContactDetailRow = (props: VisitorContactDetailRowPropsType) => {
    const isMounting = useIsMounting();

    const {
        data: visitorContactDetailFormData,
        setData: setVisitorContactDetailFormData,
        patch: patchVisitorContactDetailForm,
        delete: deleteVisitorContactDetailForm,
        processing: visitorContactDetailFormIsProcessing,
        reset: resetVisitorContactDetailForm,
        errors: visitorContactDetailFormErrors,
    } = useForm<VisitorContactDetailsModelType>(
        props.visitorContactDetail
    );

    const [debouncedVisitorContactDetailFormData] = useDebounce(visitorContactDetailFormData, 800, {});
    useEffect(() => {
        if (isMounting) return;
        if (visitorContactDetailFormIsProcessing) return;

        if (debouncedVisitorContactDetailFormData.value === '') {
            deleteVisitorContactDetailForm(
                route(
                    "venue-management-app.visitors.contact-details.delete",
                    [
                        props.visitorContactDetail.visitor_id,
                        props.visitorContactDetail.id,
                    ],
                ),
            );
            return;
        }

        patchVisitorContactDetailForm(
            route(
                "venue-management-app.visitors.contact-details.update",
                [
                    props.visitorContactDetail.visitor_id,
                    props.visitorContactDetail.id,
                ],
            ),
        );
    }
    , [debouncedVisitorContactDetailFormData]);

    const [contactDetailType, contactDetailValue]: [ReactNode, ReactNode] = (() => {
        switch (visitorContactDetailFormData.type) {
            case 'note': return ['Note', visitorContactDetailFormData.value];
            case 'email': return ['Email', <a className="underline" href={"mailto:" + visitorContactDetailFormData.value}>{visitorContactDetailFormData.value}</a>];
            case 'phone': return ['Phone', <a className="underline" href={"tel:" + visitorContactDetailFormData.value}>{visitorContactDetailFormData.value}</a>];
            case 'address': return ['Address', visitorContactDetailFormData.value];
            case 'website': return ['Website', <a className="underline" href={visitorContactDetailFormData.value}>{visitorContactDetailFormData.value}</a>];
            case 'passport': return ['Passport', visitorContactDetailFormData.value];
            case 'drivers_license': return ['Driver\'s License', visitorContactDetailFormData.value];
            case 'national_id': return ['National ID', visitorContactDetailFormData.value];
            case 'loyalty_card': return ['Loyalty Card', visitorContactDetailFormData.value];
            case 'student_id': return ['Student ID', visitorContactDetailFormData.value];
            case 'employee_id': return ['Employee ID', visitorContactDetailFormData.value];
            case 'enrolled_group': return ['Enrolled Group', visitorContactDetailFormData.value];
            case 'whatsapp': return ['WhatsApp', <a className="underline" href={"https://wa.me/" + visitorContactDetailFormData.value}>{visitorContactDetailFormData.value}</a>];
            case 'facebook': return ['Facebook', <a className="underline" href={"https://facebook.com/" + visitorContactDetailFormData.value}>{visitorContactDetailFormData.value}</a>];
            case 'twitter': return ['Twitter', <a className="underline" href={"https://twitter.com/" + visitorContactDetailFormData.value}>{visitorContactDetailFormData.value}</a>];
            case 'instagram': return ['Instagram', <a className="underline" href={"https://instagram.com/" + visitorContactDetailFormData.value}>{visitorContactDetailFormData.value}</a>];
            case 'linkedin': return ['LinkedIn', <a className="underline" href={"https://linkedin.com/" + visitorContactDetailFormData.value}>{visitorContactDetailFormData.value}</a>];
            case 'youtube': return ['YouTube', <a className="underline" href={"https://youtube.com/" + visitorContactDetailFormData.value}>{visitorContactDetailFormData.value}</a>];
            case 'tiktok': return ['TikTok', <a className="underline" href={"https://tiktok.com/" + visitorContactDetailFormData.value}>{visitorContactDetailFormData.value}</a>];
            case 'snapchat': return ['Snapchat', <a className="underline" href={"https://snapchat.com/" + visitorContactDetailFormData.value}>{visitorContactDetailFormData.value}</a>];
            case 'telegram': return ['Telegram', <a className="underline" href={"https://telegram.com/" + visitorContactDetailFormData.value}>{visitorContactDetailFormData.value}</a>];
            case 'viber': return ['Viber', <a className="underline" href={"https://viber.com/" + visitorContactDetailFormData.value}>{visitorContactDetailFormData.value}</a>];
            case 'discord': return ['Discord', <a className="underline" href={"https://discord.com/" + visitorContactDetailFormData.value}>{visitorContactDetailFormData.value}</a>];
            default: return [visitorContactDetailFormData.type, visitorContactDetailFormData.value]
        }
    })()

    return (
        <div className="flex flex-col gap-1.5">
            <div className="text-gray-500">{contactDetailType}:</div>
            {props.isEditing ?
                <TextInput
                    className="w-full"
                    value={visitorContactDetailFormData.value || ''}
                    onChange={(e) => {
                        setVisitorContactDetailFormData(
                            "value",
                            e.target.value
                        );
                    }}
                /> :
                <div className="select-text text-gray-800">{contactDetailValue}</div>
            }
        </div>
    );
};

export default VisitorContactDetailRow;
