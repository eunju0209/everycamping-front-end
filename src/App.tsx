import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <section className="grow w-full max-w-screen-2xl m-auto px-5 pt-10">
        <Outlet />
      </section>
      <Footer />
    </div>
  );
}
