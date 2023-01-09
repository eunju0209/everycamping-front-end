import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <section className='grow w-full max-w-screen-2xl m-auto px-5 py-10 relative'>
          <Outlet />
        </section>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
