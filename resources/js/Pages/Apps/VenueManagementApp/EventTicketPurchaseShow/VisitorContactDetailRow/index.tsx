/*
All Rights Reserved, (c) 2024 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2024-01-03T22:24:25.021Z
Modified: 2024-01-03T22:24:25.021Z

Description: description
*/

import { VisitorContactDetailsModelType } from "@/types";
import { ReactNode } from "react";

export type VisitorContactDetailRowPropsType = {
    visitorContactDetail: VisitorContactDetailsModelType;
};

const VisitorContactDetailRow = (props: VisitorContactDetailRowPropsType) => {
    const [contactDetailType, contactDetailValue]: [ReactNode, ReactNode] = (() => {
        switch (props.visitorContactDetail.type) {
            case 'note': return ['Note', props.visitorContactDetail.value];
            case 'email': return ['Email', <a className="underline" href={"mailto:" + props.visitorContactDetail.value}>{props.visitorContactDetail.value}</a>];
            case 'phone': return ['Phone', <a className="underline" href={"tel:" + props.visitorContactDetail.value}>{props.visitorContactDetail.value}</a>];
            case 'address': return ['Address', props.visitorContactDetail.value];
            case 'website': return ['Website', <a className="underline" href={props.visitorContactDetail.value}>{props.visitorContactDetail.value}</a>];
            case 'passport': return ['Passport', props.visitorContactDetail.value];
            case 'drivers_license': return ['Driver\'s License', props.visitorContactDetail.value];
            case 'national_id': return ['National ID', props.visitorContactDetail.value];
            case 'loyalty_card': return ['Loyalty Card', props.visitorContactDetail.value];
            case 'student_id': return ['Student ID', props.visitorContactDetail.value];
            case 'employee_id': return ['Employee ID', props.visitorContactDetail.value];
            case 'enrolled_group': return ['Enrolled Group', props.visitorContactDetail.value];
            case 'whatsapp': return ['WhatsApp', <a className="underline" href={"https://wa.me/" + props.visitorContactDetail.value}>{props.visitorContactDetail.value}</a>];
            case 'facebook': return ['Facebook', <a className="underline" href={"https://facebook.com/" + props.visitorContactDetail.value}>{props.visitorContactDetail.value}</a>];
            case 'twitter': return ['Twitter', <a className="underline" href={"https://twitter.com/" + props.visitorContactDetail.value}>{props.visitorContactDetail.value}</a>];
            case 'instagram': return ['Instagram', <a className="underline" href={"https://instagram.com/" + props.visitorContactDetail.value}>{props.visitorContactDetail.value}</a>];
            case 'linkedin': return ['LinkedIn', <a className="underline" href={"https://linkedin.com/" + props.visitorContactDetail.value}>{props.visitorContactDetail.value}</a>];
            case 'youtube': return ['YouTube', <a className="underline" href={"https://youtube.com/" + props.visitorContactDetail.value}>{props.visitorContactDetail.value}</a>];
            case 'tiktok': return ['TikTok', <a className="underline" href={"https://tiktok.com/" + props.visitorContactDetail.value}>{props.visitorContactDetail.value}</a>];
            case 'snapchat': return ['Snapchat', <a className="underline" href={"https://snapchat.com/" + props.visitorContactDetail.value}>{props.visitorContactDetail.value}</a>];
            case 'telegram': return ['Telegram', <a className="underline" href={"https://telegram.com/" + props.visitorContactDetail.value}>{props.visitorContactDetail.value}</a>];
            case 'viber': return ['Viber', <a className="underline" href={"https://viber.com/" + props.visitorContactDetail.value}>{props.visitorContactDetail.value}</a>];
            case 'discord': return ['Discord', <a className="underline" href={"https://discord.com/" + props.visitorContactDetail.value}>{props.visitorContactDetail.value}</a>];
            default: return [props.visitorContactDetail.type, props.visitorContactDetail.value]
        }
    })()

    return (
        <div className="flex flex-col gap-1.5">
            <div className="text-gray-500">{contactDetailType}:</div>
            <div className="select-text text-gray-800">{contactDetailValue}</div>
        </div>
    );
};

export default VisitorContactDetailRow;
