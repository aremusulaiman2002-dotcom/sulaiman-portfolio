export interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
  project: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc.",
    image: "/images/testimonials/sarah.jpg",
    content: "Sulaiman delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise are unmatched. The project was completed on time and within budget.",
    rating: 5,
    project: "E-Commerce Website"
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    company: "InnovateCo",
    image: "/images/testimonials/michael.jpg",
    content: "Working with Sulaiman was a game-changer for our mobile app. He transformed our vision into a polished, high-performance application that our users love. His communication throughout the project was excellent.",
    rating: 5,
    project: "Mobile Fitness App"
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "GrowthLab",
    image: "/images/testimonials/emily.jpg",
    content: "The dashboard Sulaiman built revolutionized our data analysis capabilities. His solutions are both technically sound and user-friendly. We've seen a 40% increase in team productivity since implementation.",
    rating: 5,
    project: "Analytics Dashboard"
  },
  {
    name: "David Thompson",
    role: "CTO",
    company: "DataFlow Systems",
    image: "/images/testimonials/david.jpg",
    content: "Sulaiman's expertise in backend development and database optimization helped us scale our platform to handle millions of users. His problem-solving skills and technical knowledge are truly impressive.",
    rating: 5,
    project: "Backend Optimization"
  }
];