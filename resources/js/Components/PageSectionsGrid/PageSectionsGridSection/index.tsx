/*
All Rights Reserved, (c) 2024 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2024-01-03T21:09:00.979Z
Modified: 2024-01-03T21:09:00.979Z

Description: description
*/

import { VIEWPORT_DESKTOP, VIEWPORT_TABLET } from "@/utilities";
import { ReactNode } from "react";

export type PageSectionsGridSectionPropsType = {
    title: ReactNode;
    children: ReactNode;
}

const PageSectionsGridSection = (props: PageSectionsGridSectionPropsType) => {
    return (
        <div className="flex flex-col gap-3">

            <h3 className={"font-semibold uppercase text-gray-800 text-sm leading-tight px-4 " + VIEWPORT_TABLET + ":px-0 " + VIEWPORT_DESKTOP + ":px-0"}>
                {props.title}
            </h3>

            <div className={
                "bg-white overflow-hidden transition-all transition-duration-300 ease-in-out shadow-sm border border-gray-200 " + VIEWPORT_TABLET + ":rounded-lg " +
                "flex flex-col gap-3"
            }>
                <div className={"p-4 " + VIEWPORT_TABLET + ":p-4 " + VIEWPORT_DESKTOP + ":p-6"}>
                    {props.children}
                </div>
            </div>

        </div>
    );
};

export default PageSectionsGridSection;
