"use client";

import { useState, type FormEvent } from "react";
import {
  Phone,
  Check,
  ShieldCheck,
  KeyRound,
  MapPin,
  PhoneCall,
  MousePointer2,
  BarChart3,
  CheckCircle2,
  Plus,
  Play,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { SiteFooter } from "@/components/site-footer";
import { ConsentVideo } from "@/components/consent-video";
import { SiteHeader } from "@/components/site-header";
import { ClientLogos } from "@/components/client-logos";
import { testimonials, youtubeId } from "@/content/testimonials";
import type { LandingPageContent } from "@/sanity/initial-data";

const trades = [
  "Landscaping & hardscaping",
  "Roofing",
  "Remodeling",
  "Concrete & paving",
  "Moving",
  "Other home services",
];

const faqs = [
  [
    "Are you selling the same leads to other contractors?",
    "No. People see your business and contact you directly. We don't take one person's details and sell them to five different companies. You're building a source of inquiries for your own business.",
  ],
  [
    "What do you actually do to bring the calls in?",
    "We put your business in front of people looking for the work you do. That usually means Google Ads, a clear page showing your work, and a simple way to call or request an estimate. We can also help you show up in Google's regular search results. We handle the setup and ongoing work.",
  ],
  [
    "How much do I need to spend?",
    "That depends on your area, the jobs you want, and what you make on each job. We look at those numbers before recommending a budget. You'll see the ad budget and our fee separately, so you know where your money is going.",
  ],
  [
    "I've tried this before. What would be different?",
    "First, we'd look at what happened. Were the calls for the wrong service? Outside your area? Were good inquiries going unanswered? We want to find the actual problem before asking you to spend another dollar.",
  ],
  [
    "Can you guarantee a certain number of jobs?",
    "No one can honestly promise that every inquiry will become a job. We can help you attract the right people and track what happens next. The estimate, your pricing, and how quickly you follow up all matter too. We'll agree on what a good inquiry looks like before we start.",
  ],
  [
    "What if my crew is already booked out?",
    "Tell us. We can adjust the ad budget around the work you can actually take on, or focus on the types of jobs you want next. You shouldn't have to keep pushing for more calls when you can't handle them.",
  ],
  [
    "Do I need to learn any of the technical stuff?",
    "No. We take care of that. You tell us where you work, what jobs you want, and which inquiries are turning into customers. We explain the results in normal language, and your accounts and information stay yours.",
  ],
];

interface HomePageClientProps {
  content: LandingPageContent;
}

export function HomePageClient({ content }: HomePageClientProps) {
  const [trade, setTrade] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const [activeVideo, setActiveVideo] = useState<
    (typeof testimonials)[number] | null
  >(null);

  function chooseTrade(value: string) {
    setTrade(value);
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!trade) {
      setError("Please choose the type of work you do.");
      setStatus("error");
      return;
    }
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setError("");
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, trade }),
      });
      if (!response.ok)
        throw new Error(
          "We couldn't send your details just now. Please try again, or call us on (954) 787-3401.",
        );
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <>
      <SiteHeader />

      <main id="main">
        {/* ---------------------------------------------------------------- */}
        {/* HERO SECTION (Screenshot 1) */}
        {/* ---------------------------------------------------------------- */}
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-grain" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="partner-badges" aria-label="Our partners">
                <img
                  className="google-partner-badge"
                  src="/google-partner.svg"
                  alt="Google Partner"
                />
                <img
                  className="hostinger-partner-badge"
                  src="/hostinger-partner.webp"
                  alt="Hostinger Partner"
                  width="240"
                  height="240"
                />
              </div>

              {/* Main Heading (Sanity managed) */}
              <h1 id="hero-heading">
                {content.heroHeadingLine1} <br />
                <span>
                  {content.heroHeadingLine2}
                </span>
              </h1>

              {/* Red-box text in Screenshot 1 (Sanity managed) */}
              <p className="hero-description">
                {content.heroDescription}
              </p>

              <div className="hero-actions">
                <a href="#contact" className="button button-blue">
                  {content.heroCtaButtonText}
                </a>
                <a href="#results" className="text-link light">
                  {content.heroCtaSecondaryText}
                </a>
              </div>

              <div className="hero-proof">
                <div className="proof-mark">
                  <Check size={24} strokeWidth={2.5} />
                </div>
                <p>
                  <strong>{content.heroProofTitle}</strong>
                  <span>{content.heroProofSubtitle}</span>
                </p>
              </div>

              <div className="hero-small">
                <span>
                  <Check size={15} /> {content.heroTrust1}
                </span>
                <span>
                  <Check size={15} /> {content.heroTrust2}
                </span>
              </div>
            </div>

            <div id="contact" className="contact-card">
              {status === "success" ? (
                <div className="form-success" role="status">
                  <CheckCircle2 size={52} />
                  <span className="eyebrow">DETAILS RECEIVED</span>
                  <h2>Let's talk about your next jobs.</h2>
                  <p>
                    Thanks for reaching out. We'll contact you using the details
                    you shared to learn more about your business.
                  </p>
                  <a className="button button-dark" href="tel:+19547873401">
                    Prefer to talk now? Call us
                  </a>
                  <button
                    className="text-link"
                    onClick={() => setStatus("idle")}
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <>
                  <div className="form-kicker">
                    <span>LET'S START WITH YOUR AREA</span>
                    <span className="free-tag">FREE</span>
                  </div>
                  <h2>
                    Could this work <br />
                    for your business?
                  </h2>
                  <p className="form-intro">
                    Tell us a little about what you do. We'll look at the
                    demand, the costs, and whether the numbers make sense.
                  </p>
                  <form onSubmit={submit}>
                    <div className="field-grid">
                      <label>
                        First name
                        <input
                          name="firstName"
                          autoComplete="given-name"
                          placeholder="First name"
                          required
                          maxLength={80}
                        />
                      </label>
                      <label>
                        Last name
                        <input
                          name="lastName"
                          autoComplete="family-name"
                          placeholder="Last name"
                          required
                          maxLength={80}
                        />
                      </label>
                    </div>
                    <div className="field-grid">
                      <label>
                        Email
                        <input
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@company.com"
                          required
                          maxLength={200}
                        />
                      </label>
                      <label>
                        Phone
                        <input
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="(555) 000-0000"
                          required
                          minLength={7}
                          maxLength={30}
                        />
                      </label>
                    </div>
                    <div className="field-grid">
                      <div className="field">
                        <label id="trade-label" htmlFor="trade">
                          What work do you do?
                        </label>
                        <Select value={trade} onValueChange={setTrade}>
                          <SelectTrigger
                            id="trade"
                            aria-labelledby="trade-label"
                            className="trade-select"
                          >
                            <SelectValue placeholder="Choose your trade" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            {trades.map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <label>
                        City / service area
                        <input
                          name="city"
                          placeholder="e.g. Denver, CO"
                          autoComplete="address-level2"
                          required
                          maxLength={120}
                        />
                      </label>
                    </div>
                    <label className="company-field">
                      Business name
                      <input
                        name="company"
                        autoComplete="organization"
                        placeholder="Your company"
                        required
                        maxLength={150}
                      />
                    </label>
                    <div className="honeypot" aria-hidden="true">
                      <label>
                        Leave this blank
                        <input
                          name="website_url"
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </label>
                    </div>
                    {error && (
                      <p role="alert" className="form-error">
                        {error}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="button button-dark form-submit"
                    >
                      {status === "sending"
                        ? "Sending your details..."
                        : "Let's look at my area"}
                    </button>
                    <p className="form-note">
                      <ShieldCheck size={14} /> No pressure. No obligation.
                    </p>
                    <p className="form-consent">
                      We'll only contact you about your request.{" "}
                      <a href="/privacy">Privacy Policy</a>
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* TESTIMONIALS */}
        {/* ---------------------------------------------------------------- */}
        <section
          id="testimonials"
          className="section testimonials-section"
          aria-labelledby="testimonials-heading"
        >
          <div className="container">
            <div className="section-heading testimonial-heading">
              <div>
                <span className="eyebrow">IN THEIR OWN WORDS</span>
                <h2 id="testimonials-heading">
                  Hear it from the people
                  <br />
                  we work with.
                </h2>
              </div>
              <p>
                What's it actually like working with us? Let our clients tell
                you.
              </p>
            </div>
            <div className="testimonial-grid">
              {testimonials
                .filter((t) => youtubeId(t.youtubeUrl))
                .map((t) => (
                  <article className="testimonial-card" key={t.youtubeUrl}>
                    <button
                      className="testimonial-video"
                      onClick={() => setActiveVideo(t)}
                      aria-label={`Watch ${t.name}'s testimonial`}
                    >
                      <img
                        src={t.thumbnail}
                        alt={t.name}
                        width="640"
                        height="360"
                        loading="lazy"
                      />
                      <span className="video-shade" />
                      <span className="video-play">
                        <Play size={27} fill="currentColor" />
                      </span>
                      <span className="video-watch">Watch their story</span>
                    </button>
                    <div className="testimonial-caption">
                      <div>
                        <h3>{t.name}</h3>
                        <p>Owner, {t.company}</p>
                      </div>
                      <span className="testimonial-label">CLIENT STORY</span>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </section>

        <ClientLogos />

        <section className="reassurance" aria-label="What you can expect">
          <div className="container reassurance-grid">
            <div>
              <span className="outline-icon">
                <PhoneCall />
              </span>
              <p>
                <strong>No shared leads</strong>
                <span>People contact your business.</span>
              </p>
            </div>
            <div>
              <span className="outline-icon">
                <KeyRound />
              </span>
              <p>
                <strong>You own what we build</strong>
                <span>Your accounts. Your information.</span>
              </p>
            </div>
            <div>
              <span className="outline-icon">
                <MapPin />
              </span>
              <p>
                <strong>Your jobs. Your area.</strong>
                <span>Built around the work you want.</span>
              </p>
            </div>
            <div>
              <span className="outline-icon">
                <BarChart3 />
              </span>
              <p>
                <strong>Numbers you understand</strong>
                <span>What you spent. What came back.</span>
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* RIDGEWELL RESULTS SECTION (Screenshot 2) */}
        {/* ---------------------------------------------------------------- */}
        <section id="results" className="section results-section">
          <div className="container results-grid">
            <div className="project-image-wrap">
              <img
                className="project-image"
                src="/ridgewell-project.webp"
                alt="Outdoor living and hardscaping image featured in the Ridgewell Landscape & Design case study"
                width="703"
                height="396"
                loading="lazy"
              />
              <div className="project-caption">
                <span>{content.resultsProjectName}</span>
                <span>
                  <MapPin size={14} /> {content.resultsProjectLocation}
                </span>
              </div>
              <div className="project-badge">
                <span>{content.resultsBadgeEyebrow}</span>
                <strong>
                  {content.resultsBadgeTitle}
                </strong>
              </div>
            </div>
            <div className="results-copy">
              <span className="eyebrow">{content.resultsEyebrow}</span>

              {/* Red-box heading in Screenshot 2 (Sanity managed) */}
              <h2>
                {content.resultsHeading}
              </h2>

              <p>
                {content.resultsDescription}
              </p>

              {/* Red-box stats in Screenshot 2 (Sanity managed) */}
              <div className="result-stats">
                <div>
                  <strong>{content.stat1Value}</strong>
                  <span>
                    {content.stat1Label}
                  </span>
                </div>
                <div>
                  <strong>{content.stat2Value}</strong>
                  <span>
                    {content.stat2Label}
                  </span>
                </div>
              </div>

              <p className="results-note">
                {content.resultsDisclaimer}
              </p>
              <a href="#contact" className="text-link">
                {content.resultsCtaText}
              </a>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* OUTCOMES SECTION */}
        {/* ---------------------------------------------------------------- */}
        <section id="what-we-do" className="section outcomes-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">{content.outcomesEyebrow}</span>
                <h2>
                  {content.outcomesHeading}
                </h2>
              </div>
              <p>
                {content.outcomesSubtitle}
              </p>
            </div>
            <div className="outcomes-grid">
              <article className="outcome-card">
                <span className="card-number">01</span>
                <PhoneCall className="outcome-icon" size={32} />
                <h3>
                  Get calls for work <br />
                  you actually want.
                </h3>
                <p>
                  More patios? Full roof replacements? Bigger remodels? We focus
                  on your best jobs and the places you want to work.
                </p>
                <div className="card-bottom">
                  <Check size={17} /> Your services. Your service area.
                </div>
              </article>
              <article className="outcome-card">
                <span className="card-number">02</span>
                <MousePointer2 className="outcome-icon" size={32} />
                <h3>
                  Give people a reason <br />
                  to choose you.
                </h3>
                <p>
                  We show your work, explain what makes you a good choice, and
                  make it easy for someone to pick up the phone.
                </p>
                <div className="card-bottom">
                  <Check size={17} /> A clear path from looking to calling.
                </div>
              </article>
              <article className="outcome-card">
                <span className="card-number">03</span>
                <BarChart3 className="outcome-icon" size={32} />
                <h3>
                  See if the money <br />
                  is making you money.
                </h3>
                <p>
                  We keep track of the calls and estimate requests. Together, we
                  look at which ones become jobs and what needs to change.
                </p>
                <div className="card-bottom">
                  <Check size={17} /> Simple answers about your results.
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* OWNERSHIP SECTION (Screenshot 3) */}
        {/* ---------------------------------------------------------------- */}
        <section className="ownership-section">
          <div className="container ownership-grid">
            <div>
              <span className="eyebrow">{content.ownershipEyebrow}</span>
              {/* Red-box heading in Screenshot 3 (Sanity managed) */}
              <h2>
                {content.ownershipHeading}
              </h2>
            </div>
            <div>
              <p>
                {content.ownershipParagraph1}
              </p>
              <p>
                {content.ownershipParagraph2}
              </p>
              <a href="#contact" className="button button-dark">
                {content.ownershipButtonText}
              </a>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* PROCESS SECTION */}
        {/* ---------------------------------------------------------------- */}
        <section id="how-it-works" className="section process-section">
          <div className="container">
            <div className="section-heading centered">
              <span className="eyebrow">PRETTY STRAIGHTFORWARD</span>
              <h2>Here's how we'd get started.</h2>
              <p>No homework. No long marketing presentation.</p>
            </div>
            <div className="process-grid">
              <article>
                <div className="step-marker">1</div>
                <h3>Tell us what you want more of.</h3>
                <p>
                  The jobs you like, the areas you cover, and how much work your
                  crew can take on.
                </p>
              </article>
              <article>
                <div className="step-marker">2</div>
                <h3>We'll work through the numbers.</h3>
                <p>
                  We check local demand and likely costs. If the budget doesn't
                  make sense, we'll tell you.
                </p>
              </article>
              <article>
                <div className="step-marker">3</div>
                <h3>We set it up. You take the calls.</h3>
                <p>
                  Once we agree on a plan, we handle the setup and keep
                  improving it as we learn what brings good work.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* TRADES PILLS */}
        {/* ---------------------------------------------------------------- */}
        <section className="trades-section">
          <div className="container trades-grid">
            <div>
              <span className="eyebrow">BUILT AROUND YOUR BUSINESS</span>
              <h2>
                What kind of work <br />
                do you want more of?
              </h2>
              <p>
                A roof replacement and a moving job have different numbers. Your
                plan should too.
              </p>
            </div>
            <div className="trade-pills">
              {trades.map((t) => (
                <button key={t} onClick={() => chooseTrade(t)}>
                  {t}
                  <Plus size={18} />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* FAQ SECTION */}
        {/* ---------------------------------------------------------------- */}
        <section id="questions" className="section faq-section">
          <div className="container faq-grid">
            <div>
              <span className="eyebrow">FAIR QUESTIONS</span>
              <h2>
                Let's clear <br />a few things up.
              </h2>
              <p>
                Wondering about your own situation? <br />
                Just ask. We'll give you a straight answer.
              </p>
              <a href="tel:+19547873401" className="phone-link">
                <Phone size={18} />
                (954) 787-3401
              </a>
            </div>
            <Accordion
              type="single"
              collapsible
              className="faq-list"
              defaultValue="faq-0"
            >
              {faqs.map(([q, a], i) => (
                <AccordionItem key={q} value={`faq-${i}`}>
                  <AccordionTrigger className="faq-trigger">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="faq-answer">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* FINAL CTA SECTION (Screenshot 4) */}
        {/* ---------------------------------------------------------------- */}
        <section className="final-section">
          <div className="container final-grid">
            <div>
              <span className="eyebrow">{content.finalEyebrow}</span>
              {/* Red-box heading in Screenshot 4 (Sanity managed) */}
              <h2>
                {content.finalHeading}
              </h2>
              <p>
                {content.finalDescription}
              </p>
            </div>
            <div className="final-actions">
              <a href="#contact" className="button button-dark">
                {content.finalButtonText}
              </a>
              <span>{content.finalMicroCopy}</span>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <Dialog
        open={!!activeVideo}
        onOpenChange={(open) => {
          if (!open) setActiveVideo(null);
        }}
      >
        <DialogContent className="testimonial-dialog">
          <DialogHeader>
            <DialogTitle>{activeVideo?.name}</DialogTitle>
            <DialogDescription>
              {activeVideo?.company} · Client testimonial
            </DialogDescription>
          </DialogHeader>
          {activeVideo && (
            <ConsentVideo
              key={activeVideo.youtubeUrl}
              url={activeVideo.youtubeUrl}
              name={activeVideo.name}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
