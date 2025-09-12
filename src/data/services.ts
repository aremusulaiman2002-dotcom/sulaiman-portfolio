// src/data/services.ts

// Interfaces
export interface Service {
  id: number;
  title: string;
  description: string;
  emoji: string;
  features: string[];
  price: {
    basic: string;
    professional: string;
    enterprise: string;
  };
  deliveryTime: string; 
  mostPopular: boolean;
}

export interface ServiceItem {
  name: string;
  price: string;
  details: string;
  mostPopular?: boolean;
}

export interface ServiceCategory {
  category: string;
  icon: string;
  items: ServiceItem[];
}

export interface PackageDeal {
  id: string; // ADDED ID FIELD
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
}

export interface ValueProposition {
  icon: string;
  title: string;
  description: string;
}

// Raw service data
export const services: ServiceCategory[] = [
  {
    category: "Web Development",
    icon: "💻",
    items: [
      { 
        name: "Business Website", 
        price: "$999", 
        details: "5 pages, responsive design, SEO basics, contact form, 1-year hosting",
        mostPopular: false
      },
      { 
        name: "E-commerce Store", 
        price: "$2,499", 
        details: "Product catalog, payment integration, inventory management, admin dashboard",
        mostPopular: false
      },
      { 
        name: "Web Application", 
        price: "$4,999+", 
        details: "Custom functionality, user accounts, database integration, API development",
        mostPopular: false
      },
      { 
        name: "Website Redesign", 
        price: "$1,499", 
        details: "Modern redesign, performance optimization, mobile responsiveness",
        mostPopular: false
      }
    ]
  },
  {
    category: "Graphic Design",
    icon: "🎨",
    items: [
      { 
        name: "Logo Design", 
        price: "$299", 
        details: "3 concepts, unlimited revisions, all file formats, color variations",
        mostPopular: false
      },
      { 
        name: "Brand Identity", 
        price: "$899", 
        details: "Logo, color palette, typography, brand guidelines, social media kit",
        mostPopular: false
      },
      { 
        name: "Marketing Materials", 
        price: "$499", 
        details: "Social media graphics, brochures, business cards, email templates",
        mostPopular: false
      },
      { 
        name: "UI/UX Design", 
        price: "$1,299", 
        details: "User research, wireframing, prototyping, design system",
        mostPopular: false
      }
    ]
  },
  {
    category: "IT & Tech Services",
    icon: "🔧",
    items: [
      { 
        name: "IT Consultation", 
        price: "$150/hr", 
        details: "Technology assessment, strategy planning, implementation guidance",
        mostPopular: false
      },
      { 
        name: "System Maintenance", 
        price: "$299/mo", 
        details: "Regular updates, security monitoring, backup management, performance optimization",
        mostPopular: false
      },
      { 
        name: "Tech Support", 
        price: "$99/mo", 
        details: "24/7 assistance, remote troubleshooting, priority response, documentation",
        mostPopular: false
      },
    ]
  }
];

// Helper function to convert ServiceItem to Service
export const mapServiceItemToService = (
  category: ServiceCategory,
  item: ServiceItem,
  id: number
): Service => {
  const priceMatch = item.price.match(/\d+/);
  const basePrice = priceMatch ? parseInt(priceMatch[0]) : 0;
  
  let basicPrice = item.price;
  let professionalPrice = "";
  let enterprisePrice = "";
  
  if (item.price.includes('/hr')) {
    professionalPrice = `$${Math.round(basePrice * 0.9 * 10)}/10hrs`;
    enterprisePrice = `$${Math.round(basePrice * 0.8 * 40)}/40hrs`;
  } else if (item.price.includes('/mo')) {
    professionalPrice = `$${Math.round(basePrice * 0.9 * 12)}/year`;
    enterprisePrice = `$${Math.round(basePrice * 0.8 * 12)}/year`;
  } else {
    professionalPrice = `$${Math.round(basePrice * 1.5)}`;
    enterprisePrice = `$${Math.round(basePrice * 2.5)}`;
  }
  
  return {
    id,
    title: item.name,
    description: item.details,
    emoji: category.icon,
    features: item.details.split(', '),
    price: {
      basic: basicPrice,
      professional: professionalPrice,
      enterprise: enterprisePrice
    },
    deliveryTime: "2-4 weeks",
    mostPopular: item.mostPopular || false
  };
};

// Generate sample services from the service data
let serviceIdCounter = 1;
export const sampleServices: Service[] = services.flatMap(category => 
  category.items.map(item => {
    const service = mapServiceItemToService(category, item, serviceIdCounter);
    serviceIdCounter++;
    return service;
  })
);

// Package deals data - UPDATED WITH ID FIELDS
export const packageDeals: PackageDeal[] = [
  {
    id: 'starter-package',
    name: "Starter Package",
    price: "$1,799",
    description: "Perfect for small businesses getting started online",
    features: [
      "5-page Business Website",
      "Logo Design",
      "Basic SEO Setup",
      "1 Year Hosting & Domain",
      "3 Months Technical Support",
    ],
    popular: false
  },
  {
    id: 'business-package',
    name: "Business Package",
    price: "$3,999",
    description: "Comprehensive solution for growing businesses",
    features: [
      "10-page Business Website",
      "Complete Brand Identity",
      "E-commerce Functionality",
      "Advanced SEO Optimization",
      "1 Year Hosting & Domain",
      "6 Months Priority Support",
      "Performance Optimization",
      "Monthly Analytics Reports"
    ],
    popular: true
  },
  {
    id: 'enterprise-package',
    name: "Enterprise Package",
    price: "$7,499",
    description: "End-to-end solution for established businesses",
    features: [
      "Custom Web Application",
      "Complete Brand Strategy",
      "Advanced E-commerce Platform",
      "Ongoing IT Support",
      "2 Years Hosting & Domain",
      "1 Year Support & Maintenance",
      "Priority Response (24h)",
      "Monthly Analytics Reports",
      "API Integration",
      "Third-party Service Integration",
      "Training & Documentation",
    ],
    popular: false
  }
];

// Value propositions data
export const valueProps: ValueProposition[] = [
  {
    icon: "Zap",
    title: "Fast Delivery",
    description: "Projects completed in 2-4 weeks"
  },
  {
    icon: "Shield", 
    title: "Quality Guarantee",
    description: "30-day support and revision period"
  },
  {
    icon: "Clock",
    title: "Ongoing Support", 
    description: "Optional maintenance plans available"
  }
];

// Utility functions
export const getServiceById = (id: number): Service | undefined => {
  return sampleServices.find(service => service.id === id);
};

export const getServicesByCategory = (category: string): Service[] => {
  return sampleServices.filter(service => {
    const categoryObj = services.find(c => c.icon === service.emoji);
    return categoryObj?.category === category;
  });
};

export const getPopularServices = (): Service[] => {
  return sampleServices.filter(service => service.mostPopular);
};