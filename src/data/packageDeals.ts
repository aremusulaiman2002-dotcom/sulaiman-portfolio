import { PackageDeal } from './services';

export const packageDeals: PackageDeal[] = [
  {
    id: 'web-basic',
    name: 'Basic Website',
    price: '$1,499',
    description: 'Perfect for small businesses and personal projects',
    features: [
      'Responsive Design',
      'Up to 5 Pages',
      'Contact Form Integration',
      'Basic SEO Optimization',
      '1 Month Technical Support',
      'Mobile-Friendly Design'
    ],
    popular: false
  },
  {
    id: 'web-professional',
    name: 'Professional Package',
    price: '$2,999',
    description: 'Ideal for growing businesses with advanced needs',
    features: [
      'Everything in Basic Package',
      'Up to 10 Pages',
      'E-commerce Functionality',
      'Advanced SEO Setup',
      'CMS Integration (WordPress/Webflow)',
      '3 Months Priority Support',
      'Google Analytics Integration'
    ],
    popular: true
  },
  {
    id: 'web-enterprise',
    name: 'Enterprise Solution',
    price: '$4,999',
    description: 'Complete digital solution for large businesses',
    features: [
      'Everything in Professional Package',
      'Unlimited Pages',
      'Custom Web Applications',
      'API Integrations',
      'Performance Optimization',
      '6 Months 24/7 Support',
      'Security Enhancements',
      'Custom Domain & SSL'
    ],
    popular: false
  }
];