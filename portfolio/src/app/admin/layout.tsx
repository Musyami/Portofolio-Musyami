/**
 * Layout khusus /admin — tanpa Navbar, Footer, dan SplashLoading.
 * Hanya menampilkan konten admin dengan font yang sama.
 */
import './admin.css';

export const metadata = {
  title: 'Admin | Musyami Portfolio',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
