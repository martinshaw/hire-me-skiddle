/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-13T07:32:24.912Z
Modified: 2023-12-13T07:32:24.912Z

Description: description
*/
import AuthenticatedLayout, {
    AuthenticatedLayoutPropsType,
} from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { EventModelType, PageProps } from "@/types";
import { ReactNode } from "react";

type EventIndexPropsType = {
    events: EventModelType[];
} & AuthenticatedLayoutPropsType;

const EventIndex = (props: EventIndexPropsType) => {
    return (
        <>
            <Head title="Events" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto @sm:px-6 @lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm @sm:rounded-lg">
                        <div className="p-6 text-gray-900">abc</div>
                    </div>
                </div>
            </div>
        </>
    );
};

EventIndex.layout = (
    page: ReactNode & { props: EventIndexPropsType & PageProps }
) => {
    const headerTitle =
        page.props?.auth?.user?.venue?.name == null
            ? "Events"
            : "Events at " + page.props.auth.user.venue?.name;

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

export default EventIndex;
