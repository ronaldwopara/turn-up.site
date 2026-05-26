"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

const DEFAULT_ACCENT = "#5cd982";
const DEFAULT_ACCENT_INK = "#06160c";
const DEFAULT_DENSITY = 1;

type StoreKind = "apple" | "google";

type PhoneProps = {
  children: ReactNode;
  style?: CSSProperties;
  screenStyle?: CSSProperties;
  label?: string;
  className?: string;
};

type StoreBadgeProps = {
  kind?: StoreKind;
  small?: boolean;
};

type FooterLink = {
  label: string;
  href: string;
};

type Quote = {
  role: string;
  where: string;
  avatar: string;
  text: string;
  organiser?: boolean;
};

const PHONE_STYLES = {
  frame: {
    width: 280,
    aspectRatio: "9 / 19.5",
    background: "#000",
    borderRadius: 42,
    padding: 8,
    border: "1px solid #1a1a1a",
    boxShadow:
      "0 0 0 1.5px #2a2a2a inset, 0 60px 80px -40px rgba(0,0,0,0.7), 0 30px 60px -30px rgba(0,0,0,0.5)",
    position: "relative",
    flexShrink: 0,
  } satisfies CSSProperties,
  screen: {
    width: "100%",
    height: "100%",
    background: "#0a0a0a",
    borderRadius: 34,
    overflow: "hidden",
    position: "relative",
    color: "#f4f3ef",
    fontFamily: "var(--display)",
  } satisfies CSSProperties,
  island: {
    position: "absolute",
    top: 10,
    left: "50%",
    transform: "translateX(-50%)",
    width: 92,
    height: 26,
    background: "#000",
    borderRadius: 14,
    zIndex: 20,
  } satisfies CSSProperties,
  statusBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 26px 0 22px",
    fontSize: 11,
    fontWeight: 600,
    zIndex: 15,
    letterSpacing: "0.01em",
  } satisfies CSSProperties,
};

const HOW_IT_WORKS_STEPS = [
  {
    num: "01",
    title: "Snap the flyer",
    body: "Camera-first. Point at a poster on the hallway wall, a story on your feed, or a Luma link in a group chat. We pull the title, date, place, and RSVP before you put your phone down.",
  },
  {
    num: "02",
    title: "See what's actually on",
    body: "Every event happening this week on your campus, plus the nearby ones. Filter by tonight, free, food, or weekend. Tap the heart to save it, with no sign-up wall in the way.",
  },
  {
    num: "03",
    title: "Just turn up",
    body: "One tap to Google, Apple, or Outlook calendar. No 30-question taste quiz, just a better event feed built around what you actually save and attend.",
  },
];

const FEATURE_ITEMS = [
  {
    id: "camera",
    title: "Camera is the front door",
    body: "The app opens to the camera, not a feed. Point at a flyer and the event is extracted in seconds - title, date, place, RSVP link. Or upload a screenshot. Or paste a link. Capture how you already capture.",
    screen: <ScreenCamera />,
  },
  {
    id: "browse",
    title: "A feed that knows your campus",
    body: "Community, parties, networking, sport, faith, and food in one place. Filter by date, price, and amenities. Heart anything and it lands in your stash with one tap to calendar.",
    screen: <ScreenBrowse />,
  },
  {
    id: "profile",
    title: "A profile that learns, not asks",
    body: "No long preference form. We watch what you save and snap, then build a lightweight summary of what you are actually drawn to. Edit it if you want, or ignore it.",
    screen: <ScreenProfile />,
  },
  {
    id: "analytics",
    title: "Organisers get the receipts",
    body: "Posting a flyer? See impressions, view-to-save rate, engagement, and unique reach in a clean dashboard so you know whether your poster actually pulled people in.",
    screen: <ScreenAnalytics />,
  },
];

const QUOTES: Quote[] = [
  {
    role: "Freshman",
    where: "Public R1, North America",
    avatar: "linear-gradient(135deg, #6e4d22, #2a1a08)",
    text: "I find out about the cool stuff three days late, in someone's roommate's roommate's IG story. By then it's over.",
  },
  {
    role: "Club president",
    where: "Engineering society",
    avatar: "linear-gradient(135deg, #a35d72, #4a1f2e)",
    text: "We post a flyer Monday. By Tuesday it's covered by three others. We have no idea if anyone actually saw it before we tore it down.",
    organiser: true,
  },
  {
    role: "Junior",
    where: "Large urban campus",
    avatar: "linear-gradient(135deg, #d6b58a, #5e4022)",
    text: "I'm in six event group chats. I've muted four. The other two are unreadable. I genuinely don't know how anyone keeps up.",
  },
  {
    role: "Senior",
    where: "Small liberal arts",
    avatar: "linear-gradient(135deg, #4f6e3a, #1a2a10)",
    text: "I want a calendar, not another feed. I don't need TikTok-for-events. Just tell me what's on Thursday and let me decide.",
  },
  {
    role: "Sophomore transfer",
    where: "Commuter university",
    avatar: "linear-gradient(135deg, #3a4f6e, #101e2e)",
    text: "Eventbrite is for adults with disposable income. Luma is for tech bros. There's nothing built for people who still eat in the dining hall.",
  },
];

const FAQ_ITEMS = [
  {
    q: "What is TurnUp?",
    a: "TurnUp is a camera-first event app for students. Snap any flyer, or paste an IG, Eventbrite, or Luma link, and we extract the event for you. Then we drop it into a feed of everything happening on your campus this week.",
  },
  {
    q: "When can I download it?",
    a: "We're in private beta now with students at UAlberta. Public launch is Fall 2026. Get on the waitlist and we'll let you in early with your school email.",
  },
  {
    q: "Is it free?",
    a: "Free, forever, for students. Organisers post for free too. We do not run ads in the feed and we do not sell your data.",
  },
  {
    q: "What about my data?",
    a: "Your school email is your login. We watch what you save and snap so we can surface better events. No demographic forms, no selling lists, and no third-party trackers.",
  },
  {
    q: "I run a club or a society. Can I post?",
    a: "Yes. Organiser accounts are free during the pilot and include the analytics dashboard with impressions, save rate, unique reach, and link clicks.",
  },
  {
    q: "Which campuses are next?",
    a: "We're piloting at UAlberta and rolling out semester by semester from there. If you want TurnUp on your campus, join the waitlist with your school email.",
  },
];

export default function TurnUpLandingPage() {
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", DEFAULT_ACCENT);
    document.documentElement.style.setProperty(
      "--accent-ink",
      DEFAULT_ACCENT_INK,
    );
    document.documentElement.style.setProperty(
      "--density",
      String(DEFAULT_DENSITY),
    );
  }, []);

  return (
    <div className="turnup-page">
      <Nav />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <FeatureAccordion />
      <Organisers />
      <Quotes />
      <FeatureTeaser />
      <FAQ />
      <AtmosphericCTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(247,245,239,0.78)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(20,19,15,0.08)",
      }}
    >
      <div
        className="turnup-nav-inner"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "14px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <Wordmark />
        <div
          className="turnup-nav-links"
          style={{
            display: "flex",
            gap: 28,
            fontSize: 13,
            color: "var(--fg-2)",
            fontWeight: 500,
          }}
        >
          <a href="#students">Students</a>
          <a href="#organisers">Organisers</a>
          <a href="#how">How it works</a>
          <a href="#press">Press</a>
        </div>
        <div className="turnup-nav-badges" style={{ display: "flex", gap: 8 }}>
          <StoreBadge kind="apple" small />
          <StoreBadge kind="google" small />
        </div>
      </div>
    </nav>
  );
}

function Wordmark() {
  return (
    <a
      href="#top"
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontWeight: 700,
        fontSize: 17,
        letterSpacing: "-0.01em",
      }}
    >
      TurnUp
    </a>
  );
}

function StoreBadge({ kind = "apple", small = false }: StoreBadgeProps) {
  const h = small ? 36 : 46;

  return (
    <a
      href="#waitlist"
      aria-label={
        kind === "apple" ? "Join the iOS waitlist" : "Join the Android waitlist"
      }
      style={{
        height: h,
        padding: small ? "0 14px" : "0 18px",
        background: "#14130f",
        color: "#ffffff",
        borderRadius: 10,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--display)",
        fontWeight: 600,
        fontSize: small ? 12 : 14,
        cursor: "pointer",
      }}
    >
      {kind === "apple" ? (
        <svg
          width={small ? 14 : 18}
          height={small ? 14 : 18}
          viewBox="0 0 24 24"
          fill="#fff"
          aria-hidden="true"
        >
          <path d="M16.4 13c0-2.6 2.1-3.8 2.2-3.9-1.2-1.7-3-2-3.7-2-1.6-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.1 2.5-1.8 3.1-.4 7.6 1.3 10.1.8 1.2 1.8 2.6 3.1 2.6 1.3-.1 1.7-.8 3.2-.8 1.4 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.5.9-1.4 1.3-2.8 1.3-2.9-.1 0-2.4-.9-2.4-3.7zM14 5.4c.7-.9 1.2-2.1 1.1-3.4-1 0-2.3.7-3 1.6-.7.8-1.3 2.1-1.1 3.3 1.1.1 2.3-.6 3-1.5z" />
        </svg>
      ) : (
        <svg
          width={small ? 14 : 18}
          height={small ? 14 : 18}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M3 2.5v19a.7.7 0 0 0 1.1.6L18.5 13a1.2 1.2 0 0 0 0-2L4.1 1.9A.7.7 0 0 0 3 2.5z"
            fill="#34a853"
          />
          <path
            d="M3 2.5v19a.7.7 0 0 0 .4.6L13 12 3.4 1.9a.7.7 0 0 0-.4.6z"
            fill="#4285f4"
          />
          <path
            d="M18.5 11L13 12l5.5 1L21.6 11a1.2 1.2 0 0 0 0-2L18.5 11z"
            fill="#fbbc04"
          />
        </svg>
      )}
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          lineHeight: 1,
        }}
      >
        <span
          style={{
            fontSize: small ? 7 : 9,
            color: "#a8a59c",
            fontWeight: 400,
          }}
        >
          {kind === "apple" ? "Download on the" : "GET IT ON"}
        </span>
        <span style={{ fontSize: small ? 11 : 14, fontWeight: 700 }}>
          {kind === "apple" ? "App Store" : "Google Play"}
        </span>
      </span>
    </a>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="turnup-hero-section"
      style={{
        position: "relative",
        paddingTop: "calc(60px * var(--density))",
        overflow: "hidden",
      }}
    >
      <BgOrbs />
      <div
        className="turnup-hero-grid"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 28px",
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: 40,
          alignItems: "center",
          minHeight: "70vh",
        }}
      >
        <div className="turnup-hero-copy" style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "6px 14px",
              background: "#ffffff",
              border: "1px solid var(--line)",
              borderRadius: 99,
              fontSize: 12,
              color: "var(--fg-2)",
              marginBottom: 28,
            }}
          >
            <PulseDot />
            Private beta now · public launch this fall
          </div>
          <h1
            style={{
              fontSize: "clamp(56px, 6.2vw, 88px)",
              fontWeight: 700,
              lineHeight: 0.94,
              letterSpacing: "-0.025em",
              margin: 0,
              marginBottom: 26,
            }}
          >
            Find your tribe.
            <br />
            <span style={{ color: "var(--accent)" }}>Turn up</span> for it.
          </h1>
          <p
            style={{
              fontSize: "clamp(15px, 1.2vw, 18px)",
              color: "var(--fg-2)",
              maxWidth: 480,
              lineHeight: 1.5,
              marginTop: 0,
              marginBottom: 32,
            }}
          >
            Snap the flyer on the hallway wall. Paste the IG story. Drop the Luma
            link from your group chat. TurnUp untangles the mess and hands you one
            feed of stuff worth showing up for.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <StoreBadge kind="apple" />
            <StoreBadge kind="google" />
          </div>
          <PilotRow />
          <div
            style={{
              marginTop: 38,
              display: "flex",
              gap: 28,
              flexWrap: "wrap",
              fontFamily: "var(--mono)",
              fontSize: 10.5,
              color: "var(--muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <span>iOS + Android</span>
            <span>Free for students</span>
            <span>Launching Fall 2026</span>
          </div>
        </div>

        <div
          className="turnup-phone-stage"
          style={{
            position: "relative",
            height: 640,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FloatingCards />
          <div
            className="turnup-phone-left"
            style={{
              position: "absolute",
              left: "8%",
              top: "8%",
              transform: "rotate(-7deg)",
              zIndex: 1,
              opacity: 0.92,
            }}
          >
            <Phone className="turnup-phone" style={{ width: 248 }}>
              <ScreenOnboardGreen />
            </Phone>
          </div>
          <div
            className="turnup-phone-right"
            style={{
              position: "absolute",
              right: "0%",
              top: "16%",
              zIndex: 3,
              transform: "rotate(4deg)",
            }}
          >
            <Phone className="turnup-phone">
              <ScreenCamera />
            </Phone>
          </div>
          <svg
            style={{
              position: "absolute",
              left: "32%",
              top: "44%",
              zIndex: 2,
              pointerEvents: "none",
            }}
            width="120"
            height="80"
            viewBox="0 0 120 80"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 20 C 20 60, 60 70, 100 45"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M92 38 L 102 46 L 96 56"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="22"
              y="14"
              fill="var(--muted)"
              fontFamily="var(--mono)"
              fontSize="9"
              letterSpacing="0.05em"
            >
              snap any flyer -&gt;
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}

function PulseDot() {
  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        width: 8,
        height: 8,
      }}
    >
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 999,
          background: "var(--accent)",
          animation: "turnup-pulse-ring 1.8s ease-out infinite",
        }}
      />
      <span
        style={{
          position: "absolute",
          inset: 1,
          borderRadius: 999,
          background: "var(--accent)",
        }}
      />
    </span>
  );
}

function BgOrbs() {
  return (
    <div
      className="bg-orbs"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "-10%",
          top: "-20%",
          width: 600,
          height: 600,
          borderRadius: 999,
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--accent) 30%, transparent), transparent 60%)",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "30%",
          bottom: "-30%",
          width: 500,
          height: 500,
          borderRadius: 999,
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--coral) 18%, transparent), transparent 60%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}

function SocialProof() {
  const phrases = [
    "Piloting at UAlberta",
    "Built by students",
    "Not by Eventbrite",
    "Not by Meetup",
    "Not by your school's IT department",
    "Free, forever, for students",
    "No algorithm",
    "No ads",
    "No login wall",
    "Your feed, your rules",
    "Flyers don't have to disappear by 4pm",
  ];

  return (
    <section
      className="turnup-social-strip"
      style={{
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        padding: "28px 0",
        overflow: "hidden",
        background: "var(--bg-soft)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 48,
          fontFamily: "var(--mono)",
          fontSize: 13,
          color: "var(--fg-2)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          animation: "turnup-scroll-x 45s linear infinite",
          whiteSpace: "nowrap",
          width: "max-content",
        }}
      >
        {[...phrases, ...phrases, ...phrases].map((copy, index) => {
          const highlight = /UAlberta|students|Free/.test(copy);
          return (
            <span
              key={`${copy}-${index}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 48,
                color: highlight ? "var(--fg)" : "var(--muted)",
              }}
            >
              {copy}
              <span style={{ color: "var(--accent)" }}>•</span>
            </span>
          );
        })}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section
      id="how"
      style={{
        padding:
          "calc(120px * var(--density)) 28px calc(80px * var(--density))",
        maxWidth: 1280,
        margin: "0 auto",
      }}
    >
      <Reveal>
        <SectionTag>HOW IT WORKS</SectionTag>
        <h2
          style={{
            fontSize: "clamp(40px, 4.6vw, 64px)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1,
            margin: "12px 0 56px",
            maxWidth: 800,
          }}
        >
          From <span style={{ color: "var(--accent)" }}>hallway flyer</span> to
          your calendar in three taps.
        </h2>
      </Reveal>

      <div
        className="turnup-three-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}
      >
        {HOW_IT_WORKS_STEPS.map((step, index) => (
          <Reveal key={step.num} delay={index * 0.08}>
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 24,
                padding: "28px 24px 26px",
                position: "relative",
                height: "100%",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  color: "var(--muted)",
                  letterSpacing: "0.1em",
                  marginBottom: 80,
                }}
              >
                [{step.num}]
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  marginBottom: 10,
                }}
              >
                {step.title}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "var(--fg-2)",
                  lineHeight: 1.55,
                }}
              >
                {step.body}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SectionTag({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--mono)",
        fontSize: 11,
        color: "var(--accent)",
        letterSpacing: "0.12em",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: "var(--accent)",
        }}
      />
      {children}
    </div>
  );
}

function FeatureAccordion() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="students"
      style={{
        padding:
          "calc(80px * var(--density)) 28px calc(120px * var(--density))",
        background: "var(--bg-soft)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionTag>WHAT&apos;S INSIDE</SectionTag>
        <h2
          style={{
            fontSize: "clamp(40px, 4.6vw, 64px)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1,
            margin: "12px 0 56px",
            maxWidth: 900,
          }}
        >
          Built for how students{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
            actually
          </em>{" "}
          discover events.
        </h2>
        <div
          className="turnup-feature-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 0.9fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          <div className="turnup-feature-copy" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FEATURE_ITEMS.map((feature, index) => (
              <button
                key={feature.id}
                type="button"
                onClick={() => setActive(index)}
                style={{
                  textAlign: "left",
                  background: active === index ? "var(--surface)" : "transparent",
                  border:
                    active === index
                      ? "1px solid var(--line)"
                      : "1px solid transparent",
                  padding: "20px 22px",
                  borderRadius: 16,
                  color: active === index ? "var(--fg)" : "var(--fg-2)",
                  cursor: "pointer",
                  fontFamily: "var(--display)",
                  transition: "all 200ms ease",
                  boxShadow:
                    active === index
                      ? "0 4px 24px -12px rgba(20,19,15,0.12)"
                      : "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 14,
                  }}
                >
                  <span
                    style={{
                      fontSize: 19,
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {feature.title}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      color:
                        active === index ? "var(--accent)" : "var(--muted-2)",
                    }}
                  >
                    0{index + 1}
                  </span>
                </div>
                <div
                  style={{
                    maxHeight: active === index ? 220 : 0,
                    overflow: "hidden",
                    transition: "max-height 250ms ease, margin 200ms ease",
                    marginTop: active === index ? 10 : 0,
                    fontSize: 14,
                    color: "var(--fg-2)",
                    lineHeight: 1.55,
                  }}
                >
                  {feature.body}
                </div>
              </button>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
            <div key={active} style={{ animation: "turnup-fade-up 350ms ease" }}>
              <Phone className="turnup-phone">{FEATURE_ITEMS[active].screen}</Phone>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Organisers() {
  return (
    <section
      id="organisers"
      style={{
        padding: "calc(120px * var(--density)) 28px",
        maxWidth: 1280,
        margin: "0 auto",
      }}
    >
      <div
        className="turnup-organisers-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "0.9fr 1.1fr",
          gap: 60,
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Phone className="turnup-phone">
            <ScreenAnalytics />
          </Phone>
        </div>
        <div>
          <SectionTag>FOR ORGANISERS</SectionTag>
          <h2
            style={{
              fontSize: "clamp(38px, 4.2vw, 56px)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1,
              margin: "12px 0 24px",
            }}
          >
            Did anyone <span style={{ color: "var(--accent)" }}>actually</span>
            <br />
            show up?
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--fg-2)",
              lineHeight: 1.55,
              maxWidth: 540,
              marginBottom: 32,
            }}
          >
            If you run a club, throw a mixer, or host a study group, you&apos;ve never
            really known how many people saw your flyer. TurnUp&apos;s organiser
            dashboard tells you exactly that: impressions, saves, taps, and real
            heads in the room.
          </p>
          <div
            className="turnup-organiser-metrics"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 28,
              maxWidth: 540,
            }}
          >
            {[
              ["IMPRESSIONS", "How many feeds your flyer landed in"],
              ["VIEW TO SAVE", "% who hearted after seeing"],
              ["UNIQUE REACH", "Real heads, not refreshes"],
              ["LINK CLICKS", "Who actually went deeper"],
            ].map(([key, value]) => (
              <div
                key={key}
                style={{
                  padding: "16px 18px",
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 14,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    color: "var(--accent)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {key}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--fg-2)",
                    marginTop: 4,
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
          <a
            href="mailto:hello@turn-up.site?subject=TurnUp%20Organiser%20Application"
            style={{
              height: 50,
              padding: "0 22px",
              background: "var(--accent)",
              color: "var(--accent-ink)",
              borderRadius: 99,
              fontFamily: "var(--display)",
              fontWeight: 700,
              fontSize: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            Apply as organiser
            <span style={{ fontSize: 18 }} aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Quotes() {
  return (
    <section
      id="press"
      style={{
        padding: "calc(100px * var(--density)) 28px",
        background: "var(--bg-soft)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          className="turnup-quote-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 48,
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <SectionTag>WHAT WE KEEP HEARING</SectionTag>
            <h2
              style={{
                fontSize: "clamp(38px, 4.4vw, 60px)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1,
                margin: "12px 0 0",
                maxWidth: 760,
              }}
            >
              Six group chats. Three event apps.
              <br />
              Still missed it.
            </h2>
          </div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.08em",
              maxWidth: 320,
            }}
          >
            From student interviews across North America. Names withheld, words
            unchanged.
          </div>
        </div>

        <div
          className="turnup-quotes-grid"
          style={{
            columnCount: 3,
            columnGap: 16,
          }}
        >
          {QUOTES.map((quote, index) => (
            <div
              key={`${quote.role}-${index}`}
              style={{
                breakInside: "avoid",
                marginBottom: 16,
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 20,
                padding: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 999,
                    background: quote.avatar,
                    flexShrink: 0,
                    opacity: 0.55,
                  }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{quote.role}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>
                    {quote.where}
                  </div>
                </div>
                {quote.organiser ? (
                  <span
                    style={{
                      marginLeft: "auto",
                      fontFamily: "var(--mono)",
                      fontSize: 9,
                      padding: "3px 7px",
                      borderRadius: 99,
                      background:
                        "color-mix(in oklch, var(--accent) 18%, transparent)",
                      color: "var(--accent)",
                    }}
                  >
                    ORG
                  </span>
                ) : null}
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.5, color: "var(--fg)" }}>
                <span
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--display)",
                    fontWeight: 700,
                  }}
                >
                  &quot;
                </span>
                {quote.text}
                <span
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--display)",
                    fontWeight: 700,
                  }}
                >
                  &quot;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureTeaser() {
  return (
    <section
      style={{
        padding: "calc(120px * var(--density)) 28px",
        maxWidth: 1280,
        margin: "0 auto",
      }}
    >
      <div
        className="turnup-teaser-grid"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in oklch, var(--accent) 22%, var(--bg-soft)) 0%, var(--bg-soft) 65%)",
          border: "1px solid var(--line)",
          borderRadius: 28,
          padding: "60px 56px",
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: 40,
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -120,
            width: 400,
            height: 400,
            borderRadius: 999,
            border: "1.5px solid color-mix(in oklch, var(--accent) 30%, transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 40,
            top: 120,
            width: 180,
            height: 180,
            borderRadius: 999,
            background: "color-mix(in oklch, var(--accent) 10%, transparent)",
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }}>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--coral)",
              letterSpacing: "0.14em",
            }}
          >
            ON THE ROADMAP
          </span>
          <h2
            style={{
              fontSize: "clamp(36px, 3.8vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1,
              margin: "16px 0 18px",
            }}
          >
            Crew picks.
            <br />
            Your group, your feed.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "var(--fg-2)",
              lineHeight: 1.55,
              maxWidth: 460,
              marginBottom: 26,
            }}
          >
            Make a private feed with your roommates, your run club, or your
            project group. Drop flyers into it from anywhere in the app, vote on
            them together, and get the winner into everyone&apos;s calendar by Friday.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href="#waitlist"
              style={{
                height: 44,
                padding: "0 18px",
                background: "transparent",
                color: "var(--fg)",
                border: "1px solid var(--line-2)",
                borderRadius: 99,
                fontFamily: "var(--display)",
                fontWeight: 600,
                fontSize: 13,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              Join waitlist
            </a>
            <a
              href="#faq"
              style={{
                height: 44,
                padding: "0 18px",
                background: "transparent",
                color: "var(--accent)",
                fontFamily: "var(--display)",
                fontWeight: 600,
                fontSize: 13,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              See the roadmap →
            </a>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Phone className="turnup-phone">
            <ScreenOnboardGreen />
          </Phone>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      style={{
        background: "#0f0e0c",
        color: "#f4f3ef",
        padding: "calc(120px * var(--density)) 28px",
      }}
    >
      <div
        className="turnup-faq-grid"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "0.85fr 1.15fr",
          gap: 80,
          alignItems: "flex-start",
        }}
      >
        <Reveal>
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--accent)",
                letterSpacing: "0.12em",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: "var(--accent)",
                }}
              />
              FAQ
            </div>
            <h2
              style={{
                fontSize: "clamp(40px, 4.6vw, 64px)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 0.98,
                margin: "0 0 24px",
              }}
            >
              Common
              <br />
              questions.
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "#a8a59c",
                lineHeight: 1.55,
                maxWidth: 360,
                marginBottom: 30,
              }}
            >
              Couldn&apos;t find your answer? Send a note to{" "}
              <a
                href="mailto:hello@turn-up.site"
                style={{
                  color: "var(--accent)",
                  textDecoration: "underline",
                  textUnderlineOffset: 4,
                }}
              >
                hello@turn-up.site
              </a>
              .
            </p>
            <a
              href="#waitlist"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                height: 46,
                padding: "0 18px 0 22px",
                background: "var(--accent)",
                color: "var(--accent-ink)",
                borderRadius: 99,
                fontFamily: "var(--display)",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.01em",
              }}
            >
              Join the waitlist
              <span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 999,
                  background: "#06160c",
                  color: "var(--accent)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                }}
              >
                ↗
              </span>
            </a>
          </div>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQ_ITEMS.map((item, index) => (
            <Reveal key={item.q} delay={index * 0.05}>
              <button
                type="button"
                onClick={() => setOpen(open === index ? -1 : index)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "#ffffff",
                  color: "#14130f",
                  border: "none",
                  borderRadius: 18,
                  padding: "22px 24px",
                  cursor: "pointer",
                  fontFamily: "var(--display)",
                  display: "block",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <span
                    style={{
                      fontSize: 17,
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 999,
                      background: open === index ? "#14130f" : "#f1eee6",
                      color: open === index ? "#fff" : "#14130f",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      fontWeight: 400,
                      transition: "transform 250ms ease, background 200ms ease",
                      transform: open === index ? "rotate(45deg)" : "rotate(0)",
                      flexShrink: 0,
                    }}
                  >
                    +
                  </span>
                </div>
                <div
                  style={{
                    maxHeight: open === index ? 240 : 0,
                    overflow: "hidden",
                    transition:
                      "max-height 320ms ease, margin 200ms ease, opacity 250ms ease",
                    marginTop: open === index ? 12 : 0,
                    opacity: open === index ? 1 : 0,
                    fontSize: 14.5,
                    color: "#4a4843",
                    lineHeight: 1.55,
                    maxWidth: 620,
                  }}
                >
                  {item.a}
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AtmosphericCTA() {
  return (
    <section
      id="waitlist"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#0a0907",
        color: "#fff",
        padding: "calc(140px * var(--density)) 28px calc(80px * var(--density))",
      }}
    >
      <AuroraBg />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 980,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Reveal>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "6px 14px",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 99,
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "#d8d6d0",
              letterSpacing: "0.14em",
              marginBottom: 28,
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(6px)",
            }}
          >
            <PulseDot />
            FALL 2026 · WAITLIST OPEN
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            style={{
              fontSize: "clamp(64px, 8vw, 132px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
              margin: "0 0 24px",
            }}
          >
            <span style={{ display: "inline-block", color: "#fff" }}>Turn</span>{" "}
            <span
              style={{
                display: "inline-block",
                background:
                  "linear-gradient(180deg, oklch(0.92 0.20 145) 0%, oklch(0.72 0.20 145) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              up
            </span>
            <span style={{ color: "var(--accent)" }}>.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p
            style={{
              fontSize: 17,
              color: "#d8d6d0",
              lineHeight: 1.5,
              maxWidth: 540,
              margin: "0 auto 38px",
            }}
          >
            Stop missing the good stuff. Drop your school email and we&apos;ll let you
            in the day your campus goes live.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
            <DarkWaitlistInput />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 24,
              flexWrap: "wrap",
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "#7a7770",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <span>iOS + Android</span>
            <span style={{ color: "#3a3833" }}>·</span>
            <span>Free for students</span>
            <span style={{ color: "#3a3833" }}>·</span>
            <span>Piloting at UAlberta</span>
          </div>
        </Reveal>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 28,
          display: "flex",
          justifyContent: "center",
          color: "#3a3833",
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.16em",
        }}
      >
        EVENTS · FOR · STUDENTS · BY · STUDENTS
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-soft)",
        borderTop: "1px solid var(--line)",
        padding: "60px 28px 40px",
      }}
    >
      <div
        className="turnup-footer-grid"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
          gap: 40,
        }}
      >
        <div>
          <Wordmark />
          <div
            style={{
              fontSize: 13,
              color: "var(--muted)",
              marginTop: 14,
              maxWidth: 280,
              lineHeight: 1.5,
            }}
          >
            The student event layer for campus life. Made by students at 50+
            universities.
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 22, flexWrap: "wrap" }}>
            <StoreBadge kind="apple" small />
            <StoreBadge kind="google" small />
          </div>
        </div>
        <FooterCol
          title="Product"
          links={[
            { label: "Students", href: "#students" },
            { label: "Organisers", href: "#organisers" },
            { label: "Press", href: "#press" },
            { label: "FAQ", href: "#faq" },
            { label: "Waitlist", href: "#waitlist" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { label: "Manifesto", href: "#how" },
            {
              label: "Jobs",
              href: "mailto:hello@turn-up.site?subject=TurnUp%20Jobs",
            },
            {
              label: "Brand",
              href: "mailto:hello@turn-up.site?subject=TurnUp%20Brand",
            },
            { label: "Contact", href: "mailto:hello@turn-up.site" },
            {
              label: "Partners",
              href: "mailto:hello@turn-up.site?subject=TurnUp%20Partnership",
            },
          ]}
        />
        <FooterCol
          title="Legal"
          links={[
            {
              label: "Privacy",
              href: "mailto:hello@turn-up.site?subject=TurnUp%20Privacy",
            },
            {
              label: "Terms of use",
              href: "mailto:hello@turn-up.site?subject=TurnUp%20Terms",
            },
            {
              label: "Data & retention",
              href: "mailto:hello@turn-up.site?subject=TurnUp%20Data",
            },
            {
              label: "Manage cookies",
              href: "mailto:hello@turn-up.site?subject=TurnUp%20Cookies",
            },
            {
              label: "Sweepstakes rules",
              href: "mailto:hello@turn-up.site?subject=TurnUp%20Rules",
            },
          ]}
        />
      </div>

      <div
        className="turnup-footer-bottom"
        style={{
          maxWidth: 1280,
          margin: "60px auto 0",
          paddingTop: 24,
          borderTop: "1px solid var(--line)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 10,
          fontFamily: "var(--mono)",
          fontSize: 10,
          color: "var(--muted-2)",
          letterSpacing: "0.08em",
        }}
      >
        <span>© 2026 TURNUP / LOJJ.IO - ALL RIGHTS RESERVED</span>
        <span>BUILT IN A LIBRARY · 3 A.M. · UALBERTA</span>
        <span style={{ display: "inline-flex", gap: 12, flexWrap: "wrap" }}>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            IG
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer">
            TIKTOK
          </a>
          <a href="https://x.com" target="_blank" rel="noreferrer">
            X
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            LINKEDIN
          </a>
        </span>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div>
      <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 14 }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{ fontSize: 13, color: "var(--muted)" }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 700ms cubic-bezier(.2,.7,.2,1) ${delay}s, transform 800ms cubic-bezier(.2,.7,.2,1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

function FloatingCards() {
  const cards = [
    {
      pos: { top: "-2%", left: "-14%" },
      drift: { x: 6, y: -10, r: -1 },
      delay: 0,
      icon: (
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "var(--accent)",
            color: "var(--accent-ink)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
          }}
        >
          ✓
        </div>
      ),
      title: "Flyer captured",
      sub: "ESS Career Fair · Jan 6",
    },
    {
      pos: { top: "22%", right: "-16%" },
      drift: { x: -8, y: 8, r: 1.5 },
      delay: 1.2,
      icon: (
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "color-mix(in oklch, var(--coral) 22%, var(--surface))",
            color: "var(--coral)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
          }}
        >
          ♡
        </div>
      ),
      title: "1,204 saves",
      sub: "this week · UAlberta",
    },
    {
      pos: { bottom: "16%", left: "-18%" },
      drift: { x: 10, y: 6, r: -2 },
      delay: 2.0,
      icon: (
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "color-mix(in oklch, var(--gold) 28%, var(--surface))",
            color: "#7a5a14",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          CAL
        </div>
      ),
      title: "+3 events added",
      sub: "to your calendar this week",
    },
    {
      pos: { bottom: "-4%", right: "-10%" },
      drift: { x: -6, y: -12, r: 2 },
      delay: 0.6,
      icon: (
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "#14130f",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontFamily: "var(--mono)",
          }}
        >
          4s
        </div>
      ),
      title: "Snap -> Calendar",
      sub: "average capture time",
    },
  ];

  return (
    <>
      {cards.map((card, index) => (
        <div
          key={card.title}
          className="turnup-floating-card"
          style={{
            position: "absolute",
            ...card.pos,
            zIndex: 5,
            background: "rgba(255,255,255,0.86)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(20,19,15,0.07)",
            borderRadius: 14,
            padding: "10px 14px 10px 10px",
            boxShadow:
              "0 18px 36px -22px rgba(20,19,15,0.28), 0 2px 6px -2px rgba(20,19,15,0.08)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            minWidth: 168,
            animation: `turnup-float-card-${index} 7.5s ease-in-out ${card.delay}s infinite`,
          }}
        >
          {card.icon}
          <div style={{ lineHeight: 1.2 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--fg)",
                letterSpacing: "-0.01em",
              }}
            >
              {card.title}
            </div>
            <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>
              {card.sub}
            </div>
          </div>
        </div>
      ))}
      <style>{`
        @keyframes turnup-float-card-0 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(6px, -10px) rotate(-1deg); }
        }
        @keyframes turnup-float-card-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-8px, 8px) rotate(1.5deg); }
        }
        @keyframes turnup-float-card-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10px, 6px) rotate(-2deg); }
        }
        @keyframes turnup-float-card-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-6px, -12px) rotate(2deg); }
        }
      `}</style>
    </>
  );
}

function PilotRow() {
  const avatars = [
    "linear-gradient(135deg, #d6b58a, #5e4022)",
    "linear-gradient(135deg, #6e4d22, #2a1a08)",
    "linear-gradient(135deg, #4f6e3a, #1a2a10)",
    "linear-gradient(135deg, #a35d72, #4a1f2e)",
    "linear-gradient(135deg, #3a4f6e, #101e2e)",
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 28 }}>
      <span style={{ display: "inline-flex", flexShrink: 0 }}>
        {avatars.map((background, index) => (
          <span
            key={`${background}-${index}`}
            style={{
              width: 30,
              height: 30,
              borderRadius: 999,
              background,
              border: "2.5px solid var(--bg)",
              marginLeft: index === 0 ? 0 : -10,
              boxShadow: "0 2px 6px -2px rgba(20,19,15,0.18)",
            }}
          />
        ))}
      </span>
      <div style={{ fontSize: 13, color: "var(--fg-2)", lineHeight: 1.4 }}>
        Piloting with students at <strong style={{ color: "var(--fg)" }}>UAlberta</strong>{" "}
        - join the waitlist for the public launch.
      </div>
    </div>
  );
}

function DarkWaitlistInput() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (email) {
          setSubmitted(true);
        }
      }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: 99,
        padding: "6px 6px 6px 20px",
        width: "min(480px, 100%)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@school.edu"
        aria-label="School email"
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          background: "transparent",
          fontFamily: "var(--display)",
          fontSize: 15,
          color: "#fff",
          padding: "12px 0",
        }}
      />
      <button
        type="submit"
        style={{
          height: 44,
          padding: "0 22px",
          background: submitted ? "rgba(255,255,255,0.1)" : "var(--accent)",
          color: submitted ? "#d8d6d0" : "var(--accent-ink)",
          border: "none",
          borderRadius: 99,
          fontFamily: "var(--display)",
          fontWeight: 700,
          fontSize: 13,
          cursor: "pointer",
          whiteSpace: "nowrap",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {submitted ? "You're on the list ✓" : "Join the waitlist ↗"}
      </button>
    </form>
  );
}

function Phone({
  children,
  style,
  screenStyle,
  label,
  className,
}: PhoneProps) {
  return (
    <div
      className={className}
      style={{ ...PHONE_STYLES.frame, ...style }}
    >
      <div style={{ ...PHONE_STYLES.screen, ...screenStyle }}>
        <div style={PHONE_STYLES.island} />
        <StatusBar />
        {children}
      </div>
      {label ? (
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: -28,
            transform: "translateX(-50%)",
            fontFamily: "var(--mono)",
            fontSize: 10,
            color: "var(--muted)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
}

function StatusBar({ light = true }: { light?: boolean }) {
  const color = light ? "#fff" : "#000";

  return (
    <div style={{ ...PHONE_STYLES.statusBar, color }}>
      <span>9:41</span>
      <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
          <rect x="0" y="6" width="3" height="4" rx="0.5" fill={color} />
          <rect x="4.5" y="4" width="3" height="6" rx="0.5" fill={color} />
          <rect x="9" y="2" width="3" height="8" rx="0.5" fill={color} />
          <rect x="13.5" y="0" width="3" height="10" rx="0.5" fill={color} />
        </svg>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
          <path
            d="M7 2c2.5 0 4.7 1 6.4 2.6L12 6.2C10.6 4.8 8.9 4 7 4S3.4 4.8 2 6.2L0.6 4.6C2.3 3 4.5 2 7 2zM7 5.5c1.5 0 2.8 0.6 3.9 1.6L9.5 8.5C8.8 7.8 8 7.4 7 7.4S5.2 7.8 4.5 8.5L3.1 7.1C4.2 6.1 5.5 5.5 7 5.5z"
            fill={color}
          />
        </svg>
        <svg width="22" height="10" viewBox="0 0 22 10" fill="none" aria-hidden="true">
          <rect
            x="0.5"
            y="0.5"
            width="18"
            height="9"
            rx="2"
            stroke={color}
            fill="none"
            opacity="0.5"
          />
          <rect x="2" y="2" width="15" height="6" rx="1" fill={color} />
          <rect x="19.5" y="3.5" width="1.5" height="3" rx="0.5" fill={color} opacity="0.5" />
        </svg>
      </span>
    </div>
  );
}

function ScreenOnboardGreen() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#0a1d10", padding: "52px 22px 24px" }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 32 }}>
        <span style={{ flex: 1, height: 3, background: "#fff", borderRadius: 99 }} />
        <span style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.25)", borderRadius: 99 }} />
        <span style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.25)", borderRadius: 99 }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <span style={{ fontWeight: 700, fontSize: 18 }}>TurnUp</span>
        <span
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.6)",
            textAlign: "right",
            lineHeight: 1.3,
          }}
        >
          events for students,
          <br />
          by students
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          right: -40,
          top: 80,
          width: 160,
          height: 160,
          borderRadius: 999,
          border: "1.5px solid rgba(74, 222, 128, 0.18)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 30,
          top: 160,
          width: 60,
          height: 60,
          borderRadius: 999,
          background: "rgba(74, 222, 128, 0.12)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -30,
          bottom: 220,
          width: 90,
          height: 90,
          borderRadius: 999,
          border: "1.5px solid rgba(74, 222, 128, 0.12)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 22,
          right: 22,
          top: "42%",
          color: "oklch(0.82 0.22 145)",
          fontWeight: 700,
          fontSize: 38,
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
        }}
      >
        create,
        <br />
        share,
        <br />
        turn up.
      </div>
      <div
        style={{
          position: "absolute",
          left: 22,
          right: 22,
          bottom: 108,
          color: "rgba(255,255,255,0.78)",
          fontSize: 11,
          lineHeight: 1.45,
        }}
      >
        Host your own events or just show up.
        <br />
        Either way, the vibe starts here.
      </div>
      <button
        type="button"
        style={{
          position: "absolute",
          left: 22,
          right: 22,
          bottom: 56,
          height: 44,
          borderRadius: 999,
          background: "#fff",
          color: "#06160c",
          border: "none",
          fontFamily: "var(--display)",
          fontWeight: 700,
          fontSize: 13,
        }}
      >
        Allow camera
      </button>
      <div
        style={{
          position: "absolute",
          left: 22,
          right: 22,
          bottom: 24,
          color: "rgba(255,255,255,0.85)",
          fontSize: 12,
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        Not now
      </div>
    </div>
  );
}

function ScreenCamera() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#1a1411", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 18%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.5) 100%), radial-gradient(ellipse at 50% 55%, #1c2e6b 0%, #11214f 40%, #0a1538 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 70,
          right: 70,
          bottom: 60,
          border: "2px solid rgba(255,255,255,0.06)",
          borderRadius: 4,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 18,
            left: "50%",
            transform: "translateX(-50%)",
            width: 50,
            height: 50,
            borderRadius: 999,
            border: "2px solid rgba(255,255,255,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255,255,255,0.6)",
            fontFamily: "var(--mono)",
            fontSize: 8,
            fontWeight: 700,
          }}
        >
          U·A
        </div>
        <div
          style={{
            position: "absolute",
            top: 86,
            left: 14,
            right: 14,
            color: "#f5f5f3",
            fontWeight: 700,
            fontSize: 18,
            lineHeight: 1,
            letterSpacing: "0.01em",
          }}
        >
          ESS
          <br />
          CAREER FAIR
          <br />
          <span style={{ fontSize: 22 }}>2026</span>
        </div>
        <div style={{ position: "absolute", top: 200, left: 14, color: "rgba(255,255,255,0.8)", fontSize: 9 }}>
          JAN 6, 7, &amp; 8, 2026
        </div>
        <div style={{ position: "absolute", top: 218, left: 14, color: "rgba(255,255,255,0.8)", fontSize: 9 }}>
          10AM - 3PM
        </div>
        <div
          style={{
            position: "absolute",
            top: 240,
            left: 14,
            color: "rgba(255,255,255,0.8)",
            fontSize: 9,
            fontStyle: "italic",
          }}
        >
          ETLC Solarium
        </div>
        <div
          style={{
            position: "absolute",
            bottom: -20,
            right: -20,
            width: 140,
            height: 140,
            borderRadius: 999,
            border: "2px solid rgba(217,180,87,0.4)",
            borderRight: "2px solid transparent",
            borderTop: "2px solid transparent",
            transform: "rotate(45deg)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 52,
          left: 16,
          right: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(8px)",
            padding: "6px 10px 6px 8px",
            borderRadius: 99,
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          <span style={{ fontSize: 12 }}>‹</span> Browse Events
        </div>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 999,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="8" r="4" stroke="#fff" strokeWidth="2" />
            <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#fff" strokeWidth="2" />
          </svg>
        </div>
      </div>

      <ARBrackets />

      <div
        style={{
          position: "absolute",
          left: 26,
          right: 26,
          bottom: 92,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(8px)",
          color: "#fff",
          padding: "10px 14px",
          borderRadius: 99,
          fontSize: 11,
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        Point camera at an event flyer.
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 28,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 28px",
        }}
      >
        <button
          type="button"
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="#fff" strokeWidth="2" />
            <circle cx="12" cy="12" r="3" stroke="#fff" strokeWidth="2" />
          </svg>
        </button>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 999,
            background: "#fff",
            border: "3px solid rgba(255,255,255,0.3)",
            boxShadow: "0 0 0 2px rgba(0,0,0,0.4)",
          }}
        />
        <button
          type="button"
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M10 14L7.5 16.5a3.5 3.5 0 1 1-5-5L7 7"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M14 10l2.5-2.5a3.5 3.5 0 1 1 5 5L17 17"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path d="M9 15l6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function ARBrackets() {
  const color = "#fff";
  const size = 18;
  const stroke = 2.5;
  const wrap = { position: "absolute", width: size, height: size } satisfies CSSProperties;

  return (
    <>
      <div style={{ ...wrap, top: 100, left: 38, borderTop: `${stroke}px solid ${color}`, borderLeft: `${stroke}px solid ${color}` }} />
      <div style={{ ...wrap, top: 100, right: 38, borderTop: `${stroke}px solid ${color}`, borderRight: `${stroke}px solid ${color}` }} />
      <div style={{ ...wrap, bottom: 160, left: 38, borderBottom: `${stroke}px solid ${color}`, borderLeft: `${stroke}px solid ${color}` }} />
      <div style={{ ...wrap, bottom: 160, right: 38, borderBottom: `${stroke}px solid ${color}`, borderRight: `${stroke}px solid ${color}` }} />
    </>
  );
}

function ScreenBrowse() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#0a0a0a", padding: "52px 16px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.01em" }}>
          Find your
          <br />
          tribe in <span style={{ color: "var(--accent)" }}>UAlberta</span>{" "}
          <span style={{ fontSize: 11, opacity: 0.5 }}>▾</span>
        </div>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 999,
            background: "#1c1c1c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 12, color: "#888" }}>›</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
        {["Date", "Price", "Amenities"].map((label) => (
          <span
            key={label}
            style={{
              padding: "6px 11px",
              borderRadius: 99,
              background: "#1a1a1a",
              border: "1px solid #262626",
              fontSize: 10,
              fontWeight: 500,
            }}
          >
            {label}
          </span>
        ))}
        <span
          style={{
            marginLeft: "auto",
            width: 28,
            height: 28,
            borderRadius: 999,
            background: "#1a1a1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="#888" strokeWidth="2" />
            <path d="M16 16l4 4" stroke="#888" strokeWidth="2" />
          </svg>
        </span>
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 1 }}>community</div>
      <div style={{ fontSize: 9, color: "var(--muted)", marginBottom: 10 }}>
        posted by organisers
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        <FlyerCard h={140} color="#3a4f2e" title="KICK-START '26" sub="by UAlberta Student" />
        <FlyerCard h={110} color="#2d3a55" title="Open Mic Tues" sub="by Music Club" />
        <FlyerCard h={90} color="#4d2d3a" title="Sunset Yoga" sub="by Wellness" />
        <FlyerCard h={120} color="#3d3520" title="Hack Night" sub="by CompSci" />
      </div>
    </div>
  );
}

function FlyerCard({
  h,
  color,
  title,
  sub,
}: {
  h: number;
  color: string;
  title: string;
  sub: string;
}) {
  return (
    <div
      style={{
        background: color,
        borderRadius: 14,
        height: h,
        position: "relative",
        overflow: "hidden",
        padding: 8,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.4) 100%)",
        }}
      />
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 999,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.7A4 4 0 0 1 19 10c0 6.5-7 11-7 11z"
            stroke="#fff"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
      <div style={{ position: "absolute", left: 8, right: 8, bottom: 6 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.01em" }}>
          {title}
        </div>
        <div style={{ fontSize: 7, color: "rgba(255,255,255,0.65)" }}>{sub}</div>
      </div>
    </div>
  );
}

function ScreenProfile() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#0a0a0a", padding: "52px 18px 18px" }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 999,
            background: "#1c1c1c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ‹
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Ronald</div>
          <div style={{ fontSize: 9, color: "var(--muted)" }}>
            University of Alberta · rwopara@…
          </div>
        </div>
      </div>
      <div style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.01em" }}>
        Your Discoveries
      </div>
      <div style={{ fontSize: 10, color: "var(--muted)", marginBottom: 10 }}>
        7 saved
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {["UAlberta", "Date", "Search…"].map((label, index) => (
          <span
            key={label}
            style={{
              padding: "5px 9px",
              borderRadius: 99,
              background: "#1a1a1a",
              border: "1px solid #262626",
              fontSize: 9,
              flex: index === 2 ? 1 : undefined,
              color: index === 2 ? "#666" : undefined,
            }}
          >
            {label}
          </span>
        ))}
      </div>
      <div style={{ position: "relative", height: 200, margin: "0 18px 12px" }}>
        <CardStub rot={-6} z={1} offset={-10} c1="#4d3f55" c2="#2d2235" />
        <CardStub rot={4} z={2} offset={-5} c1="#3a4f2e" c2="#1f2e15" />
        <CardStub rot={-2} z={3} offset={0} c1="#52453a" c2="#2a221a" top />
      </div>
      <div style={{ textAlign: "center", fontWeight: 700, fontSize: 12 }}>Saved flyer</div>
      <div style={{ textAlign: "center", fontSize: 9, color: "var(--muted)", marginBottom: 6 }}>
        Swipe the top card to see the next
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 999,
            background: "#1a1a1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
          }}
        >
          ‹
        </div>
        <span style={{ fontSize: 10, color: "var(--fg-2)" }}>1 / 6</span>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 999,
            background: "#1a1a1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
          }}
        >
          ›
        </div>
      </div>
    </div>
  );
}

function CardStub({
  rot,
  z,
  offset,
  c1,
  c2,
  top = false,
}: {
  rot: number;
  z: number;
  offset: number;
  c1: string;
  c2: string;
  top?: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        transform: `rotate(${rot}deg) translateX(${offset}px)`,
        zIndex: z,
        borderRadius: 12,
        background: `linear-gradient(160deg, ${c1}, ${c2})`,
        border: "1px solid rgba(255,255,255,0.08)",
        overflow: "hidden",
      }}
    >
      {top ? (
        <>
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 18,
              height: 18,
              borderRadius: 999,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 10,
            }}
          >
            ×
          </div>
          <div
            style={{
              position: "absolute",
              top: 30,
              left: 30,
              right: 30,
              bottom: 50,
              background: "#fff",
              borderRadius: 4,
              padding: 8,
            }}
          >
            <div
              style={{
                fontSize: 7,
                color: "#8a2424",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              WINNERS CAMPUS FELLOWSHIP
            </div>
            <div
              style={{
                width: 44,
                height: 44,
                margin: "6px auto",
                background:
                  "repeating-linear-gradient(0deg, #000 0 2px, #fff 2px 4px), repeating-linear-gradient(90deg, #000 0 2px, transparent 2px 4px)",
                border: "2px solid #8a2424",
              }}
            />
            <div style={{ fontSize: 6, color: "#444", textAlign: "center" }}>
              ECHA L1-420 · 4PM MST
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

function ScreenAnalytics() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#0a0a0a", padding: "52px 16px 16px" }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 18 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 999,
            background: "#1c1c1c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ‹
        </div>
        <div style={{ fontWeight: 700, fontSize: 19, letterSpacing: "-0.01em" }}>
          Analytics
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        <span
          style={{
            padding: "6px 12px",
            borderRadius: 99,
            background: "#fff",
            color: "#000",
            fontSize: 10,
            fontWeight: 600,
          }}
        >
          All Flyers
        </span>
        <span
          style={{
            padding: "6px 12px",
            borderRadius: 99,
            background: "#1a1a1a",
            border: "1px solid #262626",
            fontSize: 10,
            color: "#888",
          }}
        >
          This week
        </span>
      </div>
      <div
        style={{
          background: "#141414",
          border: "1px solid #1f1f1f",
          borderRadius: 16,
          padding: 14,
          marginBottom: 10,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 13 }}>Impressions</div>
        <div style={{ fontSize: 9, color: "var(--muted)", marginBottom: 14 }}>
          How often your flyers were on screen
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 6,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "var(--accent)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              4,218
            </div>
            <div style={{ fontSize: 9, color: "var(--accent)", marginTop: 2 }}>
              ↑ 22% vs last week
            </div>
          </div>
        </div>
        <svg viewBox="0 0 200 50" style={{ width: "100%", height: 50, marginTop: 6 }} preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.82 0.20 145)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="oklch(0.82 0.20 145)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 40 L20 35 L40 38 L60 28 L80 30 L100 18 L120 22 L140 12 L160 16 L180 8 L200 10 L200 50 L0 50 Z" fill="url(#spark-fill)" />
          <path
            d="M0 40 L20 35 L40 38 L60 28 L80 30 L100 18 L120 22 L140 12 L160 16 L180 8 L200 10"
            stroke="oklch(0.82 0.20 145)"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div
          style={{
            fontSize: 9,
            color: "var(--muted-2)",
            marginTop: 8,
            fontFamily: "var(--mono)",
          }}
        >
          MON · TUE · WED · THU · FRI · SAT · SUN
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 6 }}>
        <MetricTile label="VIEW TO SAVE" value="18.4%" />
        <MetricTile label="ENGAGEMENT" value="9.7%" />
        <MetricTile label="UNIQUE REACH" value="1,204" />
        <MetricTile label="TOTAL FLYERS" value="6" />
      </div>
      <div style={{ textAlign: "center", fontSize: 9, color: "var(--muted-2)", marginTop: 10 }}>
        Updated in real-time
      </div>
    </div>
  );
}

function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: "#141414",
        border: "1px solid #1f1f1f",
        borderRadius: 12,
        padding: 9,
      }}
    >
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 8,
          color: "var(--muted)",
          letterSpacing: "0.08em",
        }}
      >
        {label}
      </div>
      <div style={{ fontWeight: 700, fontSize: 16, marginTop: 2 }}>{value}</div>
    </div>
  );
}

function AuroraBg() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(ellipse 70% 50% at 50% 110%, color-mix(in oklch, var(--accent) 35%, transparent) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 20% 90%, color-mix(in oklch, var(--coral) 22%, transparent) 0%, transparent 55%),
            radial-gradient(ellipse 50% 35% at 85% 95%, color-mix(in oklch, var(--gold) 18%, transparent) 0%, transparent 55%)
          `,
          animation: "turnup-aurora-shift 18s ease-in-out infinite alternate",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.06,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "32%",
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 70%, transparent)",
        }}
      />
    </>
  );
}
