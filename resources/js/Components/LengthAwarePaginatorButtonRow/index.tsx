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
import { VIEWPORT_DESKTOP } from "@/utilities";

export type LengthAwarePaginatorButtonRowPropsType = {
    paginator: LengthAwarePaginatorType<any>;
};

const LengthAwarePaginatorButtonRow = (
    props: LengthAwarePaginatorButtonRowPropsType
) => {
    const buttons = (() => {
        if (props?.paginator?.links == null) return null;

        return <div>
            <div className={"flex-row gap-3 hidden " + VIEWPORT_DESKTOP + ":flex"}>
                {props.paginator.links.map((link, index) => {
                    if (link.label === "&laquo; Previous" && props.paginator.current_page === 1) return null;
                    if (link.label === "Next &raquo;" && props.paginator.current_page === props.paginator.last_page) return null;

                    // Default labels for pagination links work fine, but I prefer to use these
                    if (link.label === "&laquo; Previous") link.label = "&laquo;";

                    const buttonProps = {
                        dangerouslySetInnerHTML: { __html: link.label },
                    };

                    let linkUrl = link.url || "#";
                    if (linkUrl !== '#') {
                        const nextUrlSearchParams = new URLSearchParams(linkUrl.split('?')[1]);
                        const currentUrlSearchParams = new URLSearchParams(location.search);

                        currentUrlSearchParams.forEach((value, key) => {
                            if (key === 'page') return;
                            nextUrlSearchParams.set(key, value);
                        });

                        linkUrl = `${linkUrl.split('?')[0]}?${nextUrlSearchParams.toString()}`;
                    }

                    if (link.label === '...') return <div key={index} className="flex justify-center items-center h-full text-stone-800" {...buttonProps}></div>

                    return (
                        <Link key={index} href={linkUrl || "#"}>
                            {link.active === true ? (
                                <PrimaryButton {...buttonProps} />
                            ) : (
                                <SecondaryButton {...buttonProps} />
                            )}
                        </Link>
                    );
                })}
            </div>
            <div className={"flex-row gap-3 flex " + VIEWPORT_DESKTOP + ":hidden"}>
                {props.paginator.links.map((link, index) => {
                    if (link.label === "&laquo; Previous" && props.paginator.current_page === 1) return null;
                    if (link.label === "Next &raquo;" && props.paginator.current_page === props.paginator.last_page) return null;

                    if (['&laquo;', '&laquo; Previous', 'Next &raquo;'].includes(link.label) === false && link.active !== true) return null;

                    if (link.label === "&laquo; Previous") link.label = "&laquo;";
                    // if (link.label === "1" && props.paginator.current_page === 1) link.label = "Page 1";

                    const buttonProps = {
                        dangerouslySetInnerHTML: { __html: link.label },
                    };

                    let linkUrl = link.url || "#";
                    if (linkUrl !== '#') {
                        const nextUrlSearchParams = new URLSearchParams(linkUrl.split('?')[1]);
                        const currentUrlSearchParams = new URLSearchParams(location.search);

                        currentUrlSearchParams.forEach((value, key) => {
                            if (key === 'page') return;
                            nextUrlSearchParams.set(key, value);
                        });

                        linkUrl = `${linkUrl.split('?')[0]}?${nextUrlSearchParams.toString()}`;
                    }

                    if (link.label === '...') return <div key={index} className="flex justify-center items-center h-full text-stone-800" {...buttonProps}></div>

                    return (
                        <Link key={index} href={linkUrl || "#"}>
                            {link.active === true ? (
                                <div className="flex justify-center items-center h-full text-stone-800" {...buttonProps}></div>
                            ) : (
                                <SecondaryButton {...buttonProps} />
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>;
    })();

    return <div className="flex flex-row gap-3">{buttons}</div>;
};

export default LengthAwarePaginatorButtonRow;
