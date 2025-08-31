'use client';
import ErrorBoundary from '@/components/UI/ErrorBoundary';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}