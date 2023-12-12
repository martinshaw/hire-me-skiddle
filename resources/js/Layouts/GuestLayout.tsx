import ApplicationLogo from "@/Components/ApplicationLogo";
import { PropsWithChildren, ReactNode } from "react";
import RootLayout from "./RootLayout";

const GuestLayout = ({ children }: PropsWithChildren) => {
    return (
        <RootLayout>
            <div className="min-h-full flex flex-col @sm:justify-center items-center pt-6 @sm:pt-0">
                <img
                    className="-z-10 w-full h-full absolute top-0 left-0 object-cover"
                    srcSet="/images/concert-unsplash-small.jpg 640w, /images/concert-unsplash-big.jpg 1920w"
                    sizes="(max-width: 640px) 640px, 1920px"
                />

                <div className="flex flex-col gap-10 w-full @sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden @sm:rounded-lg">
                    <ApplicationLogo />
                    <div>{children}</div>
                </div>
            </div>
        </RootLayout>
    );
};

export default GuestLayout;
