/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-12T12:09:52.094Z
Modified: 2023-12-12T12:09:52.094Z

Description: description
*/

import SecondaryButton from "@/Components/SecondaryButton";

type RootLayoutHeaderRightPropsType = {
    //
};

const RootLayoutHeaderRight = (props: RootLayoutHeaderRightPropsType) => {
    return (
        <div className="flex flex-row gap-4 justify-center items-end">

            <a href="https://martinshaw.co/?from=hire-me-skiddle" target="_blank">
                <SecondaryButton>
                    Take a look at my portfolio &rarr;
                </SecondaryButton>
            </a>

        </div>
    );
};

export default RootLayoutHeaderRight;
