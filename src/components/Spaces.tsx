import { useState } from "react";
import type { CSSProperties } from "react";
import { ArrowUpRight, MoveHorizontal } from "lucide-react";
import { AnimatedHeading, Reveal, Eyebrow, Motif } from "./Brand";
import { areas } from "../content";
import CleaningVideo from "./CleaningVideo";

export function WhyUs() {
  return (
    <section
      className="why-section section-space"
      aria-labelledby="why-heading"
    >
      <div className="section-shell why-grid">
        <Reveal className="why-copy">
          <Eyebrow light>IT’S THE LITTLE THINGS</Eyebrow>
          <AnimatedHeading id="why-heading">
            Care you can see.
            <br />
            Service you can feel.
          </AnimatedHeading>
          <p>
            Cleaning is about more than how a space looks. It’s about how it
            feels to be there.
          </p>
          <div className="benefit">
            <span>01</span>
            <div>
              <h3>A clean that fits your space</h3>
              <p>
                A wide range of services for homes, businesses and rental
                properties.
              </p>
            </div>
          </div>
          <div className="benefit">
            <span>02</span>
            <div>
              <h3>Local to your everyday</h3>
              <p>
                Based in Manchester, with published coverage across Greater
                Manchester and nearby towns.
              </p>
            </div>
          </div>
          <div className="benefit">
            <span>03</span>
            <div>
              <h3>It starts with a conversation</h3>
              <p>
                A free initial consultation. Tell us what you need and ask about
                a service that fits.
              </p>
            </div>
          </div>
          <a href="#contact" className="text-link light-link">
            Let’s talk about your space <ArrowUpRight size={18} />
          </a>
        </Reveal>
        <Reveal className="why-image">
          <CleaningVideo
            variant="care"
            src="/videos/care-cleaning.mp4"
            poster="/images/care-cleaning-poster.jpg"
            description="Illustrative footage of professional cleaners in matching uniforms caring for a home, including floors, surfaces and windows"
          />
          <div className="why-image-note">
            <Motif />
            <span>
              Room to breathe.
              <br />
              Time to enjoy.
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Comparison() {
  const [position, setPosition] = useState(50);
  return (
    <section
      className="comparison-section section-shell section-space"
      aria-labelledby="comparison-heading"
    >
      <Reveal className="section-heading-row">
        <div>
          <Eyebrow>A FRESH PERSPECTIVE</Eyebrow>
          <AnimatedHeading id="comparison-heading">
            See the difference.
          </AnimatedHeading>
        </div>
        <div className="comparison-intro">
          <p>Small details. A whole new feeling.</p>
          <span>Illustrative concept · not a customer result</span>
        </div>
      </Reveal>
      <Reveal>
        <div
          className="comparison"
          style={{ "--position": `${position}%` } as CSSProperties}
        >
          <img
            className="comparison-base"
            src="/images/oven.jpg"
            alt="A bright modern kitchen shown with a fresh finish"
            width="1200"
            height="800"
            loading="lazy"
          />
          <div
            className="comparison-before"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <img
              src="/images/oven.jpg"
              alt=""
              width="1200"
              height="800"
              loading="lazy"
            />
            <div className="simulated-haze" />
          </div>
          <span className="comparison-label before-label">
            Before <span>Simulated</span>
          </span>
          <span className="comparison-label after-label">
            After <span>Original photo</span>
          </span>
          <div className="comparison-divider">
            <span>
              <MoveHorizontal size={24} />
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            aria-label="Reveal the illustrative before and after cleaning comparison"
            aria-valuetext={`${position}% simulated before image, ${100 - position}% original after image`}
          />
        </div>
        <div className="comparison-caption">
          <span>
            <MoveHorizontal size={16} />
            Drag to discover the feeling
          </span>
          <p>
            One interior photograph, with a simulated dull finish on the left.
            An illustration of the concept, not evidence of cleaning results.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

export function Areas({ onArea }: { onArea: (area: string) => void }) {
  return (
    <section
      id="areas"
      className="areas-section section-space"
      aria-labelledby="areas-heading"
    >
      <div className="section-shell areas-grid">
        <Reveal>
          <Eyebrow>LOCAL ROOTS. A WIDER REACH.</Eyebrow>
          <AnimatedHeading id="areas-heading">
            Cleaning across
            <br />
            Greater Manchester.
          </AnimatedHeading>
          <p>
            From city homes to neighbourhood spaces.
            <br />
            Thoughtful care, a little closer to home.
          </p>
          <a href="#contact" className="button button-outline">
            Ask About Your Area <ArrowUpRight size={18} />
          </a>
        </Reveal>
        <Reveal className="area-list">
          {areas.map((area, i) => (
            <button key={area} onClick={() => onArea(area)}>
              <span className="area-index">0{i + 1}</span>
              {area}
              <ArrowUpRight size={19} />
            </button>
          ))}
          <p>Don’t see your area? Get in touch to check coverage.</p>
        </Reveal>
      </div>
    </section>
  );
}
