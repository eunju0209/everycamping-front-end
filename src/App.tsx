import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import UserInfoProvider from './store/UserInfoProvider';

export default function App() {
  const queryClient = new QueryClient();
  return (
    <UserInfoProvider>
      <QueryClientProvider client={queryClient}>
        <div className='flex flex-col min-h-screen'>
          <Header />
          <section className='grow w-full py-10'>
            <Outlet />
          </section>
          <Footer />
        </div>
      </QueryClientProvider>
    </UserInfoProvider>
  );
}
