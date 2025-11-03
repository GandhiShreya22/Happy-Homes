export interface PropertyCategory {
    id: number;
    name: string;
}

export interface Property {
    id: number;
    title: string;
    slug: string,
    price: number;
    images: string[];
    userImage: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area_sqft: number;
    created_at: string;
    property_category: PropertyCategory;
    badge?: string;
    address: string;
    type: string;
    description: string,
    featured: boolean,
    status: boolean,
    amenities: string[],
    admin_id: number,
    keyword_id: number,
}
