import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
            <img
                className="-z-10 w-screen h-screen absolute top-0 left-0 object-cover blur-sm"
                srcSet="/images/concert-unsplash-small.jpg 640w, /images/concert-unsplash-big.jpg 1920w"
                sizes="(max-width: 640px) 640px, 1920px"
            />

            {/* <div>
                <Link href="/">
                    <ApplicationLogo/>
                </Link>
            </div> */}

            <div className="flex flex-col gap-10 w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <ApplicationLogo />
                <div>{children}</div>
            </div>
        </div>
    );
}
