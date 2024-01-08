/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-12T12:09:52.094Z
Modified: 2023-12-12T12:09:52.094Z

Description: description
*/

import { Link } from "@inertiajs/react";

const RootLayoutHeaderLeft = () => {
    return (
        <div className="flex flex-row gap-4 justify-center items-center text-stone-800">
            <Link href={route("why-hire-me.index")}>
                <div className="">Hire me (Martin Shaw) at Skiddle</div>
            </Link>
        </div>
    );
};

export default RootLayoutHeaderLeft;
