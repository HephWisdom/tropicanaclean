import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Phone,
  Check,
  ChevronDown,
} from "lucide-react";
import { AnimatedHeading, Reveal, Motif } from "./Brand";
import { PHONE, services } from "../content";

type Errors = Record<string, string>;
export default function QuoteForm({
  service,
  setService,
  location,
  setLocation,
}: {
  service: string;
  setService: (s: string) => void;
  location: string;
  setLocation: (s: string) => void;
}) {
  const [errors, setErrors] = useState<Errors>({});
  const [complete, setComplete] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (complete) successRef.current?.focus();
  }, [complete]);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors: Errors = {};
    if (!String(data.get("fullName") ?? "").trim())
      nextErrors.fullName = "Please enter your name.";
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get("email") ?? "").trim())
    )
      nextErrors.email = "Please enter a valid email address.";
    if (String(data.get("phone") ?? "").replace(/\D/g, "").length < 7)
      nextErrors.phone = "Please enter a valid phone number.";
    if (!service) nextErrors.service = "Please choose a cleaning service.";
    if (!location.trim())
      nextErrors.location = "Please enter your town or postcode.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const field = formRef.current?.elements.namedItem(
        Object.keys(nextErrors)[0],
      ) as HTMLElement | null;
      field?.focus();
      return;
    }
    event.currentTarget.reset();
    setService("");
    setLocation("");
    setComplete(true);
  };
  const errorProps = (name: string) => ({
    "aria-invalid": errors[name] ? (true as const) : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });
  const error = (name: string) =>
    errors[name] && (
      <span className="field-error" id={`${name}-error`}>
        {errors[name]}
      </span>
    );
  return (
    <section
      id="contact"
      className="contact-section section-space"
      aria-labelledby="contact-heading"
    >
      <div className="section-shell contact-grid">
        <Reveal className="contact-copy">
          <AnimatedHeading id="contact-heading">
            Let’s make your
            <br />
            space feel
            <br />
            <span className="muted-green">wonderful.</span>
          </AnimatedHeading>
          <p>
            Tell us a little about your space and the clean you have in mind. A
            fresher start begins here.
          </p>
          <div className="contact-call">
            <span>Prefer a proper conversation?</span>
            <a href={PHONE}>
              <Phone size={23} />
              0161 227 8297 <ArrowUpRight size={21} />
            </a>
            <span>Free initial consultation</span>
          </div>
          <Motif className="contact-motif" />
        </Reveal>
        <Reveal className="quote-panel">
          <div className="form-heading">
            <h3>Your fresh start.</h3>
            <span>QUOTE REQUEST</span>
          </div>
          <p className="demo-notice">
            <span>DEMO</span>Try the form. Your details are never sent or
            stored.
          </p>
          {complete ? (
            <div
              className="form-success"
              role="status"
              tabIndex={-1}
              ref={successRef}
            >
              <span className="success-icon">
                <Check size={30} />
              </span>
              <h3>That’s how easy a fresh start could be.</h3>
              <p>
                Demo complete. No enquiry was sent, and your details have been
                cleared. To make a real enquiry, call TropicanaClean directly.
              </p>
              <a href={PHONE} className="button">
                <Phone size={17} />
                Call 0161 227 8297
              </a>
              <button
                className="text-link"
                onClick={() => {
                  setComplete(false);
                  setTimeout(
                    () => formRef.current?.querySelector("input")?.focus(),
                    0,
                  );
                }}
              >
                Try the form again <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate>
              <div className="form-row">
                <label htmlFor="fullName">
                  Full name <span>*</span>
                  <input
                    id="fullName"
                    name="fullName"
                    autoComplete="off"
                    placeholder="Alex Taylor"
                    required
                    maxLength={100}
                    {...errorProps("fullName")}
                  />
                  {error("fullName")}
                </label>
                <label htmlFor="email">
                  Email <span>*</span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="off"
                    placeholder="alex@example.com"
                    required
                    maxLength={150}
                    {...errorProps("email")}
                  />
                  {error("email")}
                </label>
              </div>
              <div className="form-row">
                <label htmlFor="phone">
                  Phone <span>*</span>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="off"
                    placeholder="Your contact number"
                    required
                    maxLength={30}
                    {...errorProps("phone")}
                  />
                  {error("phone")}
                </label>
                <label htmlFor="service">
                  Cleaning service <span>*</span>
                  <span className="select-wrap">
                    <select
                      id="service"
                      name="service"
                      value={service}
                      onChange={(event) => setService(event.target.value)}
                      required
                      {...errorProps("service")}
                    >
                      <option value="">Choose a service</option>
                      {services.map((item) => (
                        <option key={item.name}>{item.name}</option>
                      ))}
                      <option>Business Cleaning</option>
                      <option>Other / Let’s discuss</option>
                    </select>
                    <ChevronDown size={16} />
                  </span>
                  {error("service")}
                </label>
              </div>
              <label htmlFor="location">
                Property location <span>*</span>
                <input
                  id="location"
                  name="location"
                  autoComplete="off"
                  placeholder="Your town or postcode"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  maxLength={120}
                  required
                  {...errorProps("location")}
                />
                {error("location")}
              </label>
              <label htmlFor="message">
                A little about your space{" "}
                <span className="optional">(optional)</span>
                <textarea
                  id="message"
                  name="message"
                  placeholder="What would make your everyday a little easier?"
                  rows={3}
                  maxLength={2000}
                />
              </label>
              {Object.keys(errors).length > 0 && (
                <p className="form-error-summary" role="alert">
                  Please check the highlighted fields.
                </p>
              )}
              <button className="button quote-submit" type="submit">
                Preview Quote Request <ArrowUpRight size={19} />
              </button>
              <p className="form-bottom-note">
                A demo interaction only. For an actual quote,{" "}
                <a href={PHONE}>give us a call.</a>
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
