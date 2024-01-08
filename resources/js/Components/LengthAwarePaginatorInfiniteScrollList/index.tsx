/*
All Rights Reserved, (c) 2024 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2024-01-08T13:43:10.089Z
Modified: 2024-01-08T13:43:10.089Z

Description: description
*/

import PageSectionsGridSection from "@/Components/PageSectionsGrid/PageSectionsGridSection";
import useIsMounting from "@/hooks/useIsMounting";
import { EventModelType, EventTicketModelType, EventTicketPurchaseModelType, LengthAwarePaginatorType, VenueModelType, VisitorActivityLogModelType, VisitorContactDetailsModelType, VisitorModelType } from "@/types";
import { router } from "@inertiajs/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ReactNode } from "react";

export type LengthAwarePaginatorInfiniteScrollListPropsType<TItemType> = {
    url: (pageNumber: number) => string;
    itemRenderer: (item: TItemType, index: number) => ReactNode;
    loadingMessage?: () => string;
    errorMessage?: (errorMessage?: string) => string;
};

const LengthAwarePaginatorInfiniteScrollList = <TItemType extends unknown>(props: LengthAwarePaginatorInfiniteScrollListPropsType<TItemType>) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [depaginatedItems, setDepaginatedItems] = useState<TItemType[]>([]);
    const [error, setError] = useState<string | false>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const reset = () => {
        setDepaginatedItems([]);
        setError(false);
        setCurrentPage(1);
        setIsLoading(false);
    };

    const fetchMoreItems = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);

        fetch(
            props.url(currentPage),
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
            }
        ).then(async (response) => {
            if (response.ok) return response.json() as Promise<
                { paginatedItems: LengthAwarePaginatorType<TItemType> }
            >;

            throw new Error((await response.json()).message);
        }).then((newPage) => {
            setDepaginatedItems((previousItems) => [...previousItems, ...newPage.paginatedItems.data]);
            setCurrentPage(newPage.paginatedItems.current_page + 1)
            setError(false);
            setIsLoading(false);
        }).catch((error) => {
            if ((error instanceof Error) === false) return;

            let errorMessage: string = error.message;
            if (errorMessage == null || errorMessage == '') errorMessage = 'Error fetching items';
            if (props.errorMessage != null) errorMessage = props.errorMessage(errorMessage);

            setDepaginatedItems([]);
            setError(errorMessage);
            setIsLoading(false);
        });
    }, [currentPage, isLoading]);

    useEffect(() => {
        const cancelEvent = router.on('finish', (event) => {
            reset();
            fetchMoreItems();
        })

        reset();
        fetchMoreItems();

        return () => {
            cancelEvent();
        }
    }, []);


    const handleScroll = useCallback(async () => {
        if (isLoading) return;
        if (containerRef?.current == null) return;

        const atBottomOfContainer = containerRef.current.scrollTop + containerRef.current.clientHeight >= (containerRef.current.scrollHeight - 1);
        if (atBottomOfContainer) await fetchMoreItems();
    }, [isLoading, containerRef, currentPage]);

    return (
        <div className="flex flex-col gap-3 h-fill max-h-96 overflow-y-scroll" ref={containerRef} onScroll={handleScroll}>
            {depaginatedItems.map(props.itemRenderer)}

            {isLoading && <div className="text-gray-500 w-full text-sm text-center">{props.loadingMessage == null ? 'Loading...' : props.loadingMessage()}</div>}

            {(isLoading !== true && error !== false) && <div className="text-red-500 w-full text-sm text-center">{error}</div>}
        </div>
    );
};

export default LengthAwarePaginatorInfiniteScrollList;
