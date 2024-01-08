import { Link } from "@inertiajs/react";
import { ImgHTMLAttributes, SVGAttributes } from "react";

export default function ApplicationLogo(
    props: ImgHTMLAttributes<HTMLImageElement>
) {
    return (
        <Link href={route("venue-management-app.index")}>
            <img
                src="/images/Skiddle Icon Logo.png"
                alt="Skiddle"
                {...props}
                className={"select-none w-10 mx-auto " + (props.className || "")}
            />
        </Link>
    );
}
