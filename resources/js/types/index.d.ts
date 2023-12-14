export type UserModelType = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    role: 'manager' | 'employee' | 'auditor' | 'safety_officer';
    venue_id: number | null;
    created_at: string;
    updated_at: string;
    deleted_at: string;

    venue: VenueModelType | null;
}

export type VenueModelType = {
    id: number;
    name: string;
    address_line_1: string | null,
    address_line_2: string | null,
    address_line_3: string | null,
    city: string | null,
    postcode: string | null,
    country: string | null,
    logo_url: string | null,
    typical_capacity: number | null,
    max_capacity: number | null,

    created_at: string;
    updated_at: string;
    deleted_at: string;

    events_count: number;
    artists_count: number;
};

export type ArtistModelCategoryType = 'musician' | 'band' | 'dj' | 'comedian' | 'speaker' | 'other';

export type ArtistModelType = {
    id: number;
    name: string;
    description: string | null;
    category: ArtistModelCategoryType | null;
    born_at: string | null;
    venue_id: number | null;

    created_at: string;
    updated_at: string;
    deleted_at: string;

    venue: VenueModelType | null;

    events_count: number;
};

export type EventModelType = {
    id: number;
    name: string;
    description: string | null;
    start_date: string | null;
    end_date: string | null;
    category: 'concert' | 'conference' | 'party' | 'wedding' | 'cinema' | 'theatre' | 'other' | null;

    tickets_purchasable_at: string | null;
    tickets_purchased: number | null;
    tickets_available: number | null;

    cancelled_at: string | null;
    cancelled_by_id: number | null;
    cancelled_by: UserModelType | null;
    cancelled_reason: string | null;

    postponed_at: string | null;
    postponed_by_id: number | null;
    postponed_by: UserModelType | null;
    postponed_reason: string | null;

    artist_id: number | null;
    venue_id: number | null;

    artist: ArtistModelType | null;
    venue: VenueModelType | null;

    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: UserModelType;
    };
};
