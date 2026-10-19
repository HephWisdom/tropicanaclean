import { useState } from "react";
import { MotionConfig } from "motion/react";
import Header from "./components/Header";
import { Hero, TrustStrip, Introduction } from "./components/Welcome";
import Services from "./components/Services";
import { WhyUs, Comparison, Areas } from "./components/Spaces";
import Reviews from "./components/Reviews";
import QuoteForm from "./components/QuoteForm";
import Footer from "./components/Footer";

export default function App() {
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const scrollToQuote = (field: string) => {
    document
      .getElementById("contact")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    document.getElementById(field)?.focus({ preventScroll: true });
  };
  const chooseService = (value: string) => {
    setService(value);
    scrollToQuote("service");
  };
  const chooseArea = (value: string) => {
    setLocation(value);
    scrollToQuote("location");
  };
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <TrustStrip />
        <Introduction />
        <Services onSelect={chooseService} />
        <WhyUs />
        <Comparison />
        <Areas onArea={chooseArea} />
        <Reviews />
        <QuoteForm
          service={service}
          setService={setService}
          location={location}
          setLocation={setLocation}
        />
      </main>
      <Footer onService={chooseService} />
    </MotionConfig>
  );
}
