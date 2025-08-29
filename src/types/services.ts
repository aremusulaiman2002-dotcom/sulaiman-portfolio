// src/types/services.ts
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
}

export interface ServiceCategory {
  category: string;
  icon: string;
  items: ServiceItem[];
}

export interface PackageDeal {
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