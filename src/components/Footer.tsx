import { ArrowUpRight, ArrowDown, Phone } from "lucide-react";
import { Logo } from "./Brand";
import { PHONE, YELL, services } from "../content";

export default function Footer({
  onService,
}: {
  onService: (service: string) => void;
}) {
  return (
    <footer className="footer">
      <div className="section-shell">
        <div className="footer-top">
          <div>
            <Logo footer />
            <p>A cleaner space. A better feeling.</p>
            <a className="footer-phone" href={PHONE}>
              <Phone size={16} />
              0161 227 8297
            </a>
          </div>
          <div className="footer-links">
            <h3>Around here</h3>
            <a href="#about">About us</a>
            <a href="#services">Our services</a>
            <a href="#areas">Areas we cover</a>
            <a href="#reviews">Customer reviews</a>
            <a href="#contact">Get in touch</a>
          </div>
          <div className="footer-links">
            <h3>A little helping hand</h3>
            {services.slice(0, 4).map((service) => (
              <button
                key={service.name}
                onClick={() => onService(service.name)}
              >
                {service.name}
              </button>
            ))}
            <button onClick={() => onService("Airbnb & Short-Let Support")}>
              Short-let support
            </button>
          </div>
          <div className="footer-address">
            <h3>Rooted in Manchester</h3>
            <address>
              TropicanaClean Ltd
              <br />
              71 Langshaw Street
              <br />
              Manchester, M16 9LE
              <br />
              United Kingdom
            </address>
            <a href={YELL} target="_blank" rel="noreferrer">
              Find us on Yell <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} TropicanaClean Ltd · Website concept
          </p>
          <p>
            Independent website redesign concept. Not affiliated with
            TropicanaClean Ltd.
          </p>
          <a href="#home" aria-label="Back to top">
            Back to top <ArrowDown size={14} className="rotate-180" />
          </a>
        </div>
      </div>
    </footer>
  );
}
