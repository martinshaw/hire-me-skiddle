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
    events?: EventModelType[];

    events_count: number;
};

export type EventModelType = {
    id: number;
    name: string;
    description: string | null;
    starts_at: string | null;
    ends_at: string | null;
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
};

export type EventTicketModelType = {
    id: number;
    name: string;
    current_price: number;
    original_price: number;
    base_currency: number;

    formatted_original_price?: string | null;
    formatted_current_price?: string | null;

    tickets_purchasable_at: string | null;
    tickets_purchased: number | null;
    tickets_available: number | null;

    event_id: number;
    venue_id: number;

    event?: EventModelType | null;
    venue?: VenueModelType | null;

    created_at: string;
    updated_at: string;
    deleted_at: string;
};

export type VisitorModelType = {
    id: number;

    first_name: string;
    middle_name: string | null;
    last_name: string | null;
    full_name: string | null;

    contact_details?: VisitorContactDetailsModelType[] | null;

    created_at: string;
    updated_at: string;
    deleted_at: string;
};

export type VisitorContactDetailsModelType = {
    id: number;

    type:
        | 'note'
        | 'email'
        | 'phone'
        | 'address'
        | 'website'
        | 'passport'
        | 'drivers_license'
        | 'national_id'
        | 'loyalty_card'
        | 'student_id'
        | 'employee_id'
        | 'enrolled_group'
        | 'whatsapp'
        | 'facebook'
        | 'twitter'
        | 'instagram'
        | 'linkedin'
        | 'youtube'
        | 'tiktok'
        | 'snapchat'
        | 'telegram'
        | 'viber'
        | 'discord';
    value: string;

    venue_id: number;
    visitor_id: number;

    created_at: string;
    updated_at: string;
    deleted_at: string | null;
};

export type VisitorBanModelType = {
    id: number;

    reason: string | null;

    visitor_id: number | null;
    event_id: number | null;
    venue_id: number | null;
    user_id: number | null;

    visitor?: VisitorModelType | null;
    event?: EventModelType | null;
    venue?: VenueModelType | null;
    user?: UserModelType | null;

    created_at: string;
    updated_at: string;
    deleted_at: string | null;
};

export type EventTicketPurchaseModelType = {
    id: number;
    purchase_price: number;
    purchase_currency: number;

    entry_barcode: string;
    entry_code: string;

    resold_at: string | null;
    resold_by_id: string | null;
    resold_as_id: string | null;

    refunded_at: string | null;
    refunded_by_id: string | null;
    refunded_reason: string | null;

    event_ticket_id: number;
    event_id: number;
    venue_id: number;
    visitor_id: number;

    formatted_purchase_price: string;
    entry_barcode_qr_code: string;

    event?: EventModelType | null;
    event_ticket?: EventTicketModelType | null;
    venue?: VenueModelType | null;
    visitor?: VisitorModelType | null;

    created_at: string;
    updated_at: string;
    deleted_at: string;
};

export type VisitorActivityLogModelType = {
    id: number;

    type:
        | 'other'
        | 'visitor_created'
        | 'visitor_updated'
        | 'visitor_deleted'
        | 'visitor_banned'
        | 'visitor_unbanned'
        | 'visitor_contact_detail_created'
        | 'visitor_contact_detail_updated'
        | 'visitor_contact_detail_deleted'
        | 'event_created'
        | 'event_updated'
        | 'event_deleted'
        | 'event_ticket_created'
        | 'event_ticket_updated'
        | 'event_ticket_deleted'
        | 'event_ticket_purchase_created'
        | 'event_ticket_purchase_updated'
        | 'event_ticket_purchase_deleted'
        | 'event_ticket_purchase_checked_in'
        | 'event_ticket_purchase_checked_out'
        | 'event_ticket_purchase_refunded'
        | 'event_ticket_purchase_cancelled'
        | 'event_ticket_purchase_uncancelled';
    importance:
        | 'info'
        | 'needs_manager_attention'
        | 'needs_employee_attention'
        | 'needs_auditor_attention'
        | 'needs_safety_officer_attention';
    message: string;
    location:
        | 'website'
        | 'mobile_app'
        | 'in_person'
        | 'over_phone'
        | 'over_email';

    visitor_id: string | null;
    event_id: string | null;
    venue_id: string | null;
    user_id: string | null;
    event_ticket_purchase_id: string | null;
    event_ticket_id: string | null;
    visitor_ban_id: string | null;
    visitor_contact_detail_id: string | null;

    visitor?: VisitorModelType | null;
    event?: EventModelType | null;
    venue?: VenueModelType | null;
    user?: UserModelType | null;
    eventTicketPurchase?: EventTicketPurchaseModelType | null;
    eventTicket?: EventTicketModelType | null;
    visitorBan?: VisitorBanModelType | null;
    contactDetail?: VisitorContactDetailsModelType | null;

    created_at: string,
    updated_at: string;
    deleted_at: string | null;
};

export type LengthAwarePaginatorType<TModelType> = {
    data: TModelType[];
    query: string[];
    fragment: string | null;
    page_name: string;
    on_each_side: number;
    total?: number;
    from?: number;
    to?: number;
    current_page: number;
    last_page?: number;
    first_page_url?: string;
    last_page_url?: string;
    prev_page_url?: string | null;
    next_page_url?: string;
    links?: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    length?: number;
    path?: string;
    per_page?: number;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: UserModelType;
    };
    counts: {
        events: number;
        artists: number;
        ticket_purchases: number;
    };
    navigation: {
        ongoing_events: EventModelType[];
    };
};
