export interface Testimonial {
    id: number;
    name: string;
    text: string;
    avatar: string;         // public path, leading slash
    rating?: number;        // 1..5
    aos?: { type?: string; duration?: number };
  }
  
  export const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Lily Brooks",
      text: "Booking our dream home was incredibly easy with Happy Homes — the interface was user-friendly.",
      avatar: "/assets/img/users/user-02.jpg",
      rating: 5,
      aos: { type: "fade-down", duration: 1000 },
    },
    {
      id: 2,
      name: "Daniel Cooper",
      text: "Happy Homes made home booking a breeze. Super easy and stress-free! listing Portal of all time",
      avatar: "/assets/img/users/user-01.jpg",
      rating: 5,
      aos: { type: "fade-up", duration: 1000 },
    },
    {
      id: 3,
      name: "Karen Maria",
      text: "From browsing to booking, everything felt effortless great design, clear information.",
      avatar: "/assets/img/users/user-03.jpg",
      rating: 5,
      aos: { type: "fade-down", duration: 1000 },
    },
    {
      id: 4,
      name: "John Carter",
      text: "Finding the perfect home was a breeze. The platform was smooth, intuitive, and made experience.",
      avatar: "/assets/img/users/user-04.jpg",
      rating: 5,
      aos: { type: "fade-up", duration: 1000 },
    },
    {
      id: 5,
      name: "Daniel Cooper",
      text: "Happy Homes made home booking a breeze. Super easy and stress-free! listing Portal of all time",
      avatar: "/assets/img/users/user-06.jpg",
      rating: 5,
      aos: { type: "fade-down", duration: 1000 },
    },
  ];
  