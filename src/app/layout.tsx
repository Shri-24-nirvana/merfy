import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Career Progression Simulator | Interactive Business Simulation Platform',
  description:
    'A high-fidelity business simulation platform where management and commerce students develop and demonstrate practical business leadership skills.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-text-primary antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
