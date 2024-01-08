/*
All Rights Reserved, (c) 2024 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2024-01-03T20:40:40.220Z
Modified: 2024-01-03T20:40:40.220Z

Description: description
*/

import { VIEWPORT_DESKTOP, VIEWPORT_TABLET } from "@/utilities";
import { ReactNode } from "react";

export type PageSectionsGridPropsType = {
    children: ReactNode;
}

const PageSectionsGrid = (props: PageSectionsGridPropsType) => {
    return (
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
            {/* Dynamically using Tailwind classes relies on a rule in the `safelist` key of the tailwind.config.js file */}
            <div className={"px-0 " + VIEWPORT_TABLET + ":px-8 " + VIEWPORT_DESKTOP + ":px-8 grid grid-cols-1 " + VIEWPORT_TABLET + ":grid-cols-2 " + VIEWPORT_DESKTOP + ":grid-cols-2 gap-6"}>
                {props.children}
            </div>
        </div>
    );
};

export default PageSectionsGrid;
