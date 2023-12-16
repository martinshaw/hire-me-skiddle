import { Link } from "@inertiajs/react";
import { ImgHTMLAttributes, SVGAttributes } from "react";

export default function ApplicationLogo(
    props: ImgHTMLAttributes<HTMLImageElement>
) {
    return (
        <Link href={route("welcome")}>
            <img
                src="/images/Skiddle Icon Logo.png"
                alt="Hire Me (Martin Shaw) at Skiddle"
                {...props}
                className={"select-none w-10 mx-auto " + (props.className || "")}
            />
        </Link>
    );
}
