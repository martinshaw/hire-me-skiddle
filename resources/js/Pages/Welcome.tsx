import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { ReactNode } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import PrimaryButton from "@/Components/PrimaryButton";

const Welcome = ({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) => {
    return (
        <>
            <Head title="Welcome" />

            <div>
                {auth.user ? (
                    <Link
                        href={route("dashboard")}
                        className="font-semibold text-gray-100 hover:text-gray-400 focus:outline focus:outline-2 focus:rounded-sm "
                    >
                        Dashboard
                    </Link>
                ) : (
                    <div className="flex flex-col gap-5 justify-center items-center">
                        <Link href={route("login")}>
                            <PrimaryButton className="mx-auto">Log in</PrimaryButton>
                        </Link>

                        <Link href={route("register")}>
                            <PrimaryButton className="mx-auto">Register</PrimaryButton>
                        </Link>
                    </div>
                )}
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
};

Welcome.layout = (page: ReactNode) => <GuestLayout children={page} />;

export default Welcome;
