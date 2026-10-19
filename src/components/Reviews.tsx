import { ArrowUpRight } from "lucide-react";
import { AnimatedHeading, Reveal, Stars } from "./Brand";
import { YELL, reviews } from "../content";

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="reviews-section section-shell section-space"
      aria-labelledby="reviews-heading"
    >
      <Reveal className="section-heading-row">
        <div>
          <AnimatedHeading id="reviews-heading">
            Kind words from
            <br />
            our customers.
          </AnimatedHeading>
        </div>
        <a
          href={YELL}
          target="_blank"
          rel="noreferrer"
          className="review-summary"
        >
          <span className="review-score">
            5.0
            <Stars />
          </span>
          <span>
            From 6 reviews on <strong>Yell</strong> <ArrowUpRight size={15} />
          </span>
        </a>
      </Reveal>
      <div className="reviews-grid">
        {reviews.map((review, i) => (
          <Reveal key={review.name} delay={i * 0.06} className="review-card">
            <Stars />
            <blockquote>“{review.quote}”</blockquote>
            <p className="review-service">{review.service}</p>
            <div className="review-person">
              <span className="review-avatar">{review.initials}</span>
              <div>
                <strong>{review.name}</strong>
                <span>
                  {review.date} ·{" "}
                  <a href={`${YELL}#reviews`} target="_blank" rel="noreferrer">
                    Yell <ArrowUpRight size={11} />
                  </a>
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="reviews-source">
        Genuine excerpts from historical Yell reviews, shown with their original
        dates.{" "}
        <a href={YELL} target="_blank" rel="noreferrer">
          Read all reviews <ArrowUpRight size={13} />
        </a>
      </p>
    </section>
  );
}
