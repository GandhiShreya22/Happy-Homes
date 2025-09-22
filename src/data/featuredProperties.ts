export interface Property {
    id: number;
    title: string;
    price: string;
    image: string;
    userImage: string;
    location: string;
    bedrooms: number;
    baths: number;
    size: number;
    listedOn: string;
    category: string;
    badge?: string; // optional e.g., "Featured" or "New"
    link: string;
}

export const featuredProperties: Property[] = [
    {
        id: 1,
        title: "Serenity Condo Suite",
        price: "INR 12,00,000",
        image: "/assets/img/buy/buy-grid-img-01.jpg",
        userImage: "/assets/img/users/user-01.jpg",
        location: "17, Grove Towers, New York, USA",
        bedrooms: 4,
        baths: 4,
        size: 350,
        listedOn: "16 Jan 2023",
        category: "Apartment",
        badge: "New",
        link: "/buy-property-grid",
    },
    {
        id: 2,
        title: "Palm Cove Bungalows",
        price: "INR 37,00,000",
        image: "/assets/img/buy/buy-grid-img-04.jpg",
        userImage: "/assets/img/users/user-04.jpg",
        location: "42, Pine Residency, Miami, USA",
        bedrooms: 5,
        baths: 3,
        size: 700,
        listedOn: "16 Mar 2025",
        category: "Bungalow",
        link: "/buy-property-grid",
    },
    {
        id: 3,
        title: "Loyal Apartment",
        price: "INR 60,00,000",
        image: "/assets/img/buy/buy-grid-img-02.jpg",
        userImage: "/assets/img/users/user-02.jpg",
        location: "25, Willow Crest Apartment, USA",
        bedrooms: 2,
        baths: 2,
        size: 350,
        listedOn: "02 May 2025",
        category: "Apartment",
        link: "/buy-property-grid",
    },
    {
        id: 4,
        title: "Blue Horizon Villa",
        price: "INR 90,00,000",
        image: "/assets/img/buy/buy-grid-img-05.jpg",
        userImage: "/assets/img/users/user-05.jpg",
        location: "76, Golden Oaks, Dallas, USA",
        bedrooms: 2,
        baths: 1,
        size: 400,
        listedOn: "08 Mar 2025",
        category: "Villa",
        link: "/buy-property-grid",
    },
    {
        id: 5,
        title: "Grand Villa House",
        price: "INR 70,00,000",
        image: "/assets/img/buy/buy-grid-img-03.jpg",
        userImage: "/assets/img/users/user-03.jpg",
        location: "10, Oak Ridge Villa, USA",
        bedrooms: 4,
        baths: 3,
        size: 520,
        listedOn: "28 Apr 2025",
        category: "Villa",
        badge: "Featured",
        link: "/buy-property-grid",
    },
    {
        id: 6,
        title: "Wanderlust Lodge",
        price: "INR 85,00,000",
        image: "/assets/img/buy/buy-grid-img-06.jpg",
        userImage: "/assets/img/users/user-06.jpg",
        location: "91, Birch Residences, Boston, USA",
        bedrooms: 3,
        baths: 2,
        size: 550,
        listedOn: "25 Feb 2025",
        category: "Lodge",
        link: "/buy-property-grid",
    },
    {
        id: 7,
        title: "Elite Suite Room",
        price: "₹75 Lakh",
        image: "/assets/img/buy/buy-grid-img-07.jpg",
        userImage: "/assets/img/users/user-07.jpg",
        location: "42, Maple Grove Residences, USA",
        bedrooms: 2,
        baths: 1,
        size: 480,
        listedOn: "14 Apr 2025",
        category: "Suite",
        badge: "Featured",
        link: "/buy-property-grid",
    },
    {
        id: 8,
        title: "Celestial Residency",
        price: "₹82 Lakh",
        image: "/assets/img/buy/buy-grid-img-08.jpg",
        userImage: "/assets/img/users/user-08.jpg",
        location: "28, Hilltop Gardens, San Francisco, USA",
        bedrooms: 2,
        baths: 2,
        size: 354,
        listedOn: "06 Apr 2025",
        category: "Villa",
        badge: "Featured",
        link: "/buy-property-grid",
    },
];
