import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  House,
  MessageCircle,
  Star,
} from "lucide-react";
import { AnimatedHeading, Reveal, Eyebrow, Motif, Stars } from "./Brand";
import { YELL } from "../content";
import CleaningVideo from "./CleaningVideo";

export function Hero() {
  return (
    <section
      className="hero section-shell"
      id="home"
      aria-labelledby="hero-heading"
    >
      <div className="hero-copy">
        <Reveal>
          <AnimatedHeading as="h1" id="hero-heading">
            A cleaner space.
            <br />A better{" "}
            <span className="feeling">
              feeling.
              <svg viewBox="0 0 250 16" aria-hidden="true">
                <path
                  className="feeling-stroke"
                  pathLength="1"
                  d="M3 11Q115 -3 245 8"
                />
                <path
                  className="feeling-stroke feeling-stroke-second"
                  pathLength="1"
                  d="M22 14Q120 6 220 12"
                />
              </svg>
            </span>
          </AnimatedHeading>
          <p className="hero-description">
            Thoughtful cleaning services for homes, businesses and properties
            across Manchester and Greater Manchester.
          </p>
          <div className="hero-actions">
            <a className="button" href="#contact">
              Get a Free Quote <ArrowUpRight size={19} />
            </a>
            <a className="text-link" href="#services">
              Explore Our Services <ArrowRight size={18} />
            </a>
          </div>
          <a
            href={YELL}
            className="hero-rating"
            target="_blank"
            rel="noreferrer"
          >
            <span className="rating-number">5.0</span>
            <span>
              <Stars />
              <span className="rating-caption">
                From 6 reviews on <strong>Yell</strong>{" "}
                <ArrowUpRight size={12} />
              </span>
            </span>
          </a>
        </Reveal>
        <p className="hero-footnote">
          <span /> Less to do. More to enjoy.
        </p>
      </div>
      <Reveal className="hero-visual" delay={0.12}>
        <CleaningVideo
          src="/videos/hero-cleaning.mp4"
          poster="/images/hero-cleaning-poster.jpg"
          width={960}
          height={960}
          description="Illustrative footage of a bright, welcoming home and a uniformed cleaner carefully tending wooden surfaces and plants"
        />
        <div className="photo-caption">
          <span className="location-dot" />
          <MapPin size={15} /> Manchester, with care.
        </div>
        <div className="fresh-seal">
          <span>FRESH SPACES</span>
          <Motif />
          <span>BETTER DAYS</span>
        </div>
      </Reveal>
    </section>
  );
}

export function TrustStrip() {
  return (
    <div className="trust-strip">
      <div className="section-shell trust-inner">
        <div>
          <MapPin />
          <span>
            Rooted in <strong>Manchester</strong>
          </span>
        </div>
        <div>
          <House />
          <span>
            Homes <strong>& businesses</strong>
          </span>
        </div>
        <div>
          <MessageCircle />
          <span>
            Free initial <strong>consultation</strong>
          </span>
        </div>
        <a href={YELL} target="_blank" rel="noreferrer">
          <Star />
          <span>
            <strong>5.0 on Yell</strong> · 6 reviews
          </span>
          <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
}

export function Introduction() {
  return (
    <section
      id="about"
      className="introduction section-shell section-space"
      aria-labelledby="intro-heading"
    >
      <Reveal className="intro-image">
        <img
          src="/images/detail.jpg"
          alt="Sunlight falling over a thoughtfully arranged neutral interior"
          width="800"
          height="1000"
          loading="lazy"
        />
        <span className="image-index">01 / THE FEELING OF HOME</span>
      </Reveal>
      <Reveal className="intro-copy">
        <Eyebrow>WELCOME TO TROPICANACLEAN</Eyebrow>
        <AnimatedHeading id="intro-heading">
          Beautiful spaces
          <br />
          begin with
          <br />
          <span className="muted-green">thoughtful care.</span>
        </AnimatedHeading>
        <p>
          A home you can unwind in. A workspace that feels ready for the day.
          The little things make a big difference.
        </p>
        <p>
          TropicanaClean provides cleaning and housekeeping services for homes,
          businesses and rental properties across Manchester.
        </p>
        <a href="#services" className="text-link underline-link">
          A little more about what we do <ArrowUpRight size={18} />
        </a>
        <Motif className="intro-motif" />
      </Reveal>
    </section>
  );
}
