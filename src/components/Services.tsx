import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { AnimatedHeading, Reveal, Eyebrow } from "./Brand";
import { services } from "../content";

export default function Services({
  onSelect,
}: {
  onSelect: (service: string) => void;
}) {
  const [filter, setFilter] = useState("all");
  const filtered = services.filter(
    (service) => filter === "all" || service.category === filter,
  );
  return (
    <section
      id="services"
      className="services section-space"
      aria-labelledby="services-heading"
    >
      <div className="section-shell">
        <Reveal className="section-heading-row">
          <div>
            <Eyebrow>A CLEAN FOR EVERY KIND OF SPACE</Eyebrow>
            <AnimatedHeading id="services-heading">
              Your space. Our care.
            </AnimatedHeading>
          </div>
          <p>
            From the everyday refresh to the big fresh start.
            <br className="desktop-break" /> Find the right clean for you.
          </p>
        </Reveal>
        <div className="service-filters" aria-label="Filter cleaning services">
          {[
            ["all", "All services"],
            ["home", "For your home"],
            ["property", "For your property"],
          ].map(([value, label]) => (
            <button
              type="button"
              key={value}
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {label}
              <span>
                {value === "all" ? "06" : value === "home" ? "04" : "02"}
              </span>
            </button>
          ))}
        </div>
        <div
          className={`services-grid ${filter !== "all" ? "is-filtered" : ""}`}
        >
          {filtered.map((service) => (
            <Reveal
              key={service.name}
              className={`service-item ${service.className}`}
            >
              <button
                className="service-card"
                onClick={() => onSelect(service.name)}
              >
                <div className="service-image">
                  <img
                    src={`/images/${service.image}${service.image === "living-room" ? "-small" : ""}.jpg`}
                    alt={
                      service.name === "Oven Cleaning"
                        ? "A bright fitted kitchen with a cooker and stainless steel extractor"
                        : `${service.name === "Deep Cleaning" ? "A fresh, light-filled bathroom" : service.name === "Airbnb & Short-Let Support" ? "A welcoming guest bedroom" : service.name === "End-of-Tenancy Cleaning" ? "A clean modern open-plan living room" : service.name === "Window & Surface Cleaning" ? "Natural daylight illuminating a calm interior" : "A comfortable and beautifully kept living room"}`
                    }
                    width="800"
                    height="600"
                    loading="lazy"
                  />
                  <span className="service-arrow">
                    <ArrowUpRight size={21} />
                  </span>
                </div>
                <div className="service-content">
                  <span className="micro-label">{service.label}</span>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        <p className="services-note">
          A home, a business, a place in between?{" "}
          <a href="#contact">
            Let’s find your kind of clean. <ArrowUpRight size={14} />
          </a>
        </p>
      </div>
    </section>
  );
}
