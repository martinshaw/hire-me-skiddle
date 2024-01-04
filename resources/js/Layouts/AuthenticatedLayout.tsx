import { useState, PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { PageProps, UserModelType } from "@/types";
import RootLayout from "./RootLayout";
import { VIEWPORT_DESKTOP } from "@/utilities";

export type AuthenticatedLayoutPropsType = PropsWithChildren<{
    header?: ReactNode;
}>;

const AuthenticatedLayout = (props: AuthenticatedLayoutPropsType) => {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const page = usePage<AuthenticatedLayoutPropsType & PageProps>();

    const firstName = page.props.auth.user.name.split(" ")[0];
    const remainderOfName = page.props.auth.user.name
        .split(" ")
        .slice(1)
        .join(" ");

    return (
        <RootLayout>
            <div className="select-none min-h-full bg-gray-100 flex flex-col">
                <nav className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 @sm:px-6 @lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="block m-auto h-4/6">
                                    <ApplicationLogo className="w-full h-full object-contain" />
                                </div>

                                <div className="hidden space-x-8 @sm:-my-px @sm:ms-10 @sm:flex">
                                    {page.props.navigation.ongoing_events
                                        .length > 0 && (
                                            <NavLink
                                                href={route(
                                                    "venue-management-app.events.show",
                                                    [
                                                        page.props.navigation
                                                            .ongoing_events[0].id,
                                                    ]
                                                )}
                                                active={route().current(
                                                    "venue-management-app.events.show",
                                                    [
                                                        page.props.navigation
                                                            .ongoing_events[0].id,
                                                    ]
                                                )}
                                            >
                                                Ongoing Event
                                            </NavLink>
                                        )}
                                    <NavLink
                                        href={route(
                                            "venue-management-app.events.index"
                                        )}
                                        active={
                                            route()
                                                .current()
                                                ?.startsWith(
                                                    "venue-management-app.events."
                                                ) || false
                                        }
                                    >
                                        <span className="hidden @lg:inline">{page.props.counts.events.toLocaleString()}&nbsp;</span> Event
                                        {page.props.counts.events === 1
                                            ? ""
                                            : "s"}
                                    </NavLink>
                                    <NavLink
                                        href={route(
                                            "venue-management-app.artists.index"
                                        )}
                                        active={
                                            route()
                                                .current()
                                                ?.startsWith(
                                                    "venue-management-app.artists."
                                                ) || false
                                        }
                                    >
                                        <span className="hidden @lg:inline">{page.props.counts.artists.toLocaleString()}&nbsp;</span> Artist
                                        {page.props.counts.artists === 1
                                            ? ""
                                            : "s"}
                                    </NavLink>
                                    <NavLink
                                        href={route(
                                            "venue-management-app.event-ticket-purchases.index"
                                        )}
                                        active={
                                            route()
                                                .current()
                                                ?.startsWith(
                                                    "venue-management-app.event-ticket-purchases."
                                                ) || false
                                        }
                                    >
                                        <span className="hidden @lg:inline">
                                            {page.props.counts.ticket_purchases.toLocaleString()} Ticket Purchase
                                            {page.props.counts.ticket_purchases === 1
                                                ? ""
                                                : "s"}
                                        </span>
                                        <span className="inline @lg:hidden">
                                            Tickets
                                        </span>
                                    </NavLink>
                                </div>
                            </div>

                            <div className="hidden @sm:flex @sm:items-center @sm:ms-6">
                                <div className="ms-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {firstName}
                                                    <span className={"hidden " + VIEWPORT_DESKTOP + ":block"}>
                                                        &nbsp;{remainderOfName}
                                                    </span>
                                                    <span className={"hidden " + VIEWPORT_DESKTOP + ":block text-stone-400"}>
                                                        &nbsp;at{" "}
                                                        {
                                                            page.props.auth.user
                                                                .venue?.name
                                                        }
                                                    </span>

                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            {/* <Dropdown.Link
                                                href={route("profile.edit")}
                                            >
                                                Profile
                                            </Dropdown.Link> */}
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="-me-2 flex items-center @sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState
                                        )
                                    }
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            (showingNavigationDropdown ? "block" : "hidden") +
                            " @sm:hidden"
                        }
                    >
                        <div className="pt-2 pb-3 space-y-1">
                            {page.props.navigation.ongoing_events.length >
                                0 && (
                                    <ResponsiveNavLink
                                        href={route(
                                            "venue-management-app.events.show",
                                            [page.props.navigation.ongoing_events[0].id],
                                        )}
                                        active={route().current(
                                            "venue-management-app.events.show",
                                            [page.props.navigation.ongoing_events[0].id],
                                        )}
                                        onClick={() => { setShowingNavigationDropdown(false); }}
                                    >
                                        Ongoing Event
                                    </ResponsiveNavLink>
                                )}
                            <ResponsiveNavLink
                                href={route("venue-management-app.events.index")}
                                active={route().current("venue-management-app.events.index")}
                                onClick={() => { setShowingNavigationDropdown(false); }}
                            >
                                {page.props.counts.events.toLocaleString()} Event
                                {page.props.counts.events === 1 ? "" : "s"}
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route("venue-management-app.artists.index")}
                                active={route().current("venue-management-app.artists.index")}
                                onClick={() => { setShowingNavigationDropdown(false); }}
                            >
                                {page.props.counts.artists.toLocaleString()} Artist
                                {page.props.counts.artists === 1 ? "" : "s"}
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route("venue-management-app.event-ticket-purchases.index")}
                                active={route().current("venue-management-app.event-ticket-purchases.index")}
                                onClick={() => { setShowingNavigationDropdown(false); }}
                            >
                                {page.props.counts.ticket_purchases.toLocaleString()} Ticket Purchase
                                {page.props.counts.ticket_purchases === 1 ? "" : "s"}
                            </ResponsiveNavLink>
                        </div>

                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800">
                                    {page.props.auth.user.name}
                                </div>
                                {page.props.auth.user.venue && (
                                    <div className="font-medium text-sm text-gray-500">
                                        {page.props.auth.user.venue.name}
                                    </div>
                                )}
                            </div>

                            <div className="mt-3 space-y-1">
                                {/* <ResponsiveNavLink href={route("profile.edit")}>
                                    Profile
                                </ResponsiveNavLink> */}
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>

                {props.header && (
                    <header className="bg-white border-b border-stone-200">
                        <div className="max-w-7xl mx-auto py-6 px-4 @sm:px-6 @lg:px-8">
                            {props.header}
                        </div>
                    </header>
                )}

                <main
                    className="flex-1"
                    style={{
                        /**
                         * TODO: Need to finally decide on a background pattern.
                         */
                        // backgroundImage: 'url(/images/backgrounds/diamond_upholstery.png)',
                        // backgroundImage: 'url(/images/backgrounds/ecailles.png)',
                        backgroundImage:
                            "url(/images/backgrounds/full-bloom.png)",
                        // backgroundImage: 'url(/images/backgrounds/hypnotize.png)',
                        // backgroundImage: 'url(/images/backgrounds/seigaiha.png)',
                        // backgroundImage: 'url(/images/backgrounds/symphony.png)',
                        // backgroundImage: 'url(/images/backgrounds/texturetastic_gray.png)',

                        backgroundSize: "auto",
                        backgroundRepeat: "repeat",
                        backgroundPosition: "center center",
                    }}
                >
                    {props.children}
                </main>
            </div>
        </RootLayout>
    );
};

export default AuthenticatedLayout;
