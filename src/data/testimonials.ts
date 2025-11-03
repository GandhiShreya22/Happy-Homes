export interface Testimonial {
  id: number;
  name: string;
  text: string;
  avatar: string;
  rating?: number;
  aos?: { type?: string; duration?: number };
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ananya Mehta",
    text: "Happy Homes made house-hunting super easy! Found my dream 2BHK in Baner within a week and spoke directly with the owner. No middlemen, no stress!",
    avatar: "/assets/img/users/user-02.jpg",
    rating: 5,
    aos: { type: "fade-down", duration: 1000 },
  },
  {
    id: 2,
    name: "Rahul Sinha",
    text: "Found a verified apartment quickly near my office in Whitefield. The process was smooth and transparent. Closed the deal in just three days!",
    avatar: "/assets/img/users/user-01.jpg",
    rating: 4.8,
    aos: { type: "fade-up", duration: 1000 },
  },
  {
    id: 3,
    name: "Priya Nair",
    text: "Most sites show outdated listings, but Happy Homes was accurate and always up-to-date. Every flat I viewed was real and available - super reliable!",
    avatar: "/assets/img/users/user-03.jpg",
    rating: 4.9,
    aos: { type: "fade-down", duration: 1000 },
  },
  {
    id: 4,
    name: "Manoj Gupta",
    text: "Most platforms are full of outdated listings, but Happy Homes was completely different. Every property I viewed was active and updated. It saved me so much time!",
    avatar: "/assets/img/users/user-04.jpg",
    rating: 5,
    aos: { type: "fade-up", duration: 1000 },
  },
  {
    id: 5,
    name: "Kavita Deshmukh",
    text: "I listed my old flat for rent and found a tenant within a week. The dashboard made tracking responses really easy - great experience overall!",
    avatar: "/assets/img/users/user-05.jpg",
    rating: 4.7,
    aos: { type: "fade-down", duration: 1000 },
  },
  {
    id: 6,
    name: "Amit Verma",
    text: "Happy Homes offered affordable property listing plans with great reach. My property got quick visibility and sold faster than expected!",
    avatar: "/assets/img/users/user-06.jpg",
    rating: 4.9,
    aos: { type: "fade-up", duration: 1000 },
  },
  {
    id: 7,
    name: "Sneha Tiwari",
    text: "Moved to Lucknow recently and found a fully furnished flat in a day. Verified owners made the process safe and super convenient! Great platform.",
    avatar: "/assets/img/users/user-07.jpg",
    rating: 5,
    aos: { type: "fade-down", duration: 1000 },
  },
  {
    id: 8,
    name: "Rohit Malhotra",
    text: "Needed a flat near Delhi Metro station - Happy Homes filters helped perfectly. The verified listings and clear property photos saved me a ton of time!",
    avatar: "/assets/img/users/user-08.jpg",
    rating: 4.8,
    aos: { type: "fade-up", duration: 1000 },
  },
];
