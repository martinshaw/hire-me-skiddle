/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-16T16:26:14.519Z
Modified: 2023-12-16T16:26:14.519Z

Description: description
*/

import { LengthAwarePaginatorType } from "@/types";
import { Link } from "@inertiajs/react";
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";

export type LengthAwarePaginatorButtonRowPropsType = {
    paginator: LengthAwarePaginatorType<any>;
};

const LengthAwarePaginatorButtonRow = (
    props: LengthAwarePaginatorButtonRowPropsType
) => {
    const buttons = (() => {
        if (props?.paginator?.links == null) return null;

        return props.paginator.links.map((link, index) => {
            const buttonProps = {
                dangerouslySetInnerHTML: {__html: link.label},
            };

            return (
                <Link key={index} href={link.url || "#"}>
                    {link.active === true ? (
                        <PrimaryButton {...buttonProps} />
                    ) : (
                        <SecondaryButton {...buttonProps} />
                    )}
                </Link>
            );
        });
    })();

    return <div className="flex flex-row gap-3">{buttons}</div>;
};

export default LengthAwarePaginatorButtonRow;
