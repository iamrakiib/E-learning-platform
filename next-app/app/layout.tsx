import type { Metadata } from 'next';
import '../app/globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import { Chatbot } from '../components/Chatbot';

export const metadata: Metadata = {
  title: 'CourseHub | Learning Platform',
  description: 'Connect to courses, enroll, and track your learning journey.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="layout-shell">
            <Navbar />
            <main>
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <Chatbot />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
