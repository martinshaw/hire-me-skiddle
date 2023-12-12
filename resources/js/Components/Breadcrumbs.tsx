/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: Breadcrumbs.tsx
Created:  2023-12-12T13:02:38.722Z
Modified: 2023-12-12T13:02:38.722Z

Description: description
*/

import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export type BreadcrumbItemType = {
    name: string;
    href: string;
    icon: string;
    isActive: boolean;
};

type BreadcrumbsPropsType = {
    items: BreadcrumbItemType[];
};

const Breadcrumbs = (props: BreadcrumbsPropsType) => {
    return (
        <div className="flex flex-row gap-4 justify-center items-center">
            {props.items.map((item, index) => {
                const buttonProps = {
                    className:
                        "flex flex-row gap-2 justify-center items-center",
                };

                const inner = (
                    <>
                        <img src={item.icon} className="h-5 w-5" />
                        <div>{item.name}</div>
                    </>
                );

                return (
                    <>
                        {item.isActive ? (
                            <PrimaryButton {...buttonProps}>
                                {inner}
                            </PrimaryButton>
                        ) : (
                            <SecondaryButton {...buttonProps}>
                                {inner}
                            </SecondaryButton>
                        )}
                        <div className="text-stone-500">
                            {index !== props.items.length - 1 ? <>&rarr;</> : ""}
                        </div>
                    </>
                );
            })}
        </div>
    );
};

export default Breadcrumbs;
