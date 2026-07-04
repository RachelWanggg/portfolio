import React from "react";
import ReactDOM from "react-dom/client";
import {
  ArrowUpRight,
  Gamepad2,
  Mail,
  MapPin,
  Sparkles,
  X,
} from "lucide-react";
import { PixelWorld } from "./pixel-world";
import "./styles.css";

type PanelId = "projects" | "resume" | "about" | "contact";

const panels: Record<
  PanelId,
  {
    year: string;
    title: string;
    kicker: string;
    copy: string;
    tags: string[];
    bullets?: string[];
    links?: Array<{ label: string; href: string }>;
  }
> = {
  projects: {
    year: "01",
    title: "Projects",
    kicker: "Published AI products",
    copy:
      "Two shipped products are live: a pet health record system and a Chrome extension for navigating long AI conversations.",
    bullets: [
      "Pet Health App extracts unstructured medical records into organized pet health timelines and insights.",
      "AI Chat Timeline adds timeline navigation, smart pinning, prompt library, and revision tools to ChatGPT and Claude.",
    ],
    tags: ["Multi-agent", "Chrome Extension", "Published"],
    links: [
      { label: "Pet Health App", href: "https://pet-agent.vercel.app/" },
      {
        label: "AI Chat Timeline",
        href: "https://chromewebstore.google.com/detail/ai-chat-timeline/ekjdciljnpfpolompiflnlglkooabpbg",
      },
    ],
  },
  resume: {
    year: "02",
    title: "Resume",
    kicker: "AI Engineer | Full-stack builder",
    copy:
      "MS in Computer Science at Santa Clara University, with AI engineering experience across agent systems, automation, recommendation, NLP, and full-stack SaaS.",
    bullets: [
      "Marketeq AI Engineer Intern: multi-agent content automation with n8n and LLM agents, driving 30% follower growth and 20+ hrs/week saved.",
      "SCU MVP Lab AI Engineer: LangGraph + Claude Vision compression QA loop, raising acceptance rate to 96%.",
      "eKutir Full-stack Engineer Intern: React + Spring Boot agri-contract platform for 10K+ users, with Redis and AWS event-driven notifications.",
      "Education: MS Computer Science, Santa Clara University; BS Mathematics, University of British Columbia.",
    ],
    tags: ["Python", "React", "LangGraph", "AWS"],
  },
  about: {
    year: "03",
    title: "About Rachel",
    kicker: "AI engineer building agentic products",
    copy:
      "MSCS candidate at Santa Clara University with hands-on work across multi-agent systems, full-stack SaaS, recommendation systems, NLP, and AI workflow automation.",
    tags: ["LangGraph", "LLM agents", "React", "AWS"],
  },
  contact: {
    year: "04",
    title: "Contact",
    kicker: "Open for AI engineering roles",
    copy:
      "I am especially interested in AI product engineering, agent architecture, full-stack AI tools, and products where technical depth meets playful UX.",
    tags: ["AI Engineer", "Full-stack", "Santa Clara"],
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/ruiqi-wang-rach01" },
      { label: "GitHub", href: "https://github.com/RachelWanggg" },
    ],
  },
};

const projects = [
  {
    title: "Pet Health App",
    href: "https://pet-agent.vercel.app/",
    meta: "Multi-agent health timeline",
    copy:
      "Extracts unstructured pet medical records into organized timelines and health insights, reducing manual data entry by 90%+.",
    tags: ["Agents", "Medical records", "Vercel"],
  },
  {
    title: "AI Chat Timeline",
    href: "https://chromewebstore.google.com/detail/ai-chat-timeline/ekjdciljnpfpolompiflnlglkooabpbg",
    meta: "Published Chrome extension",
    copy:
      "Adds timeline navigation, smart pinning, prompt library, and optional prompt revision for long ChatGPT and Claude conversations.",
    tags: ["Chrome Web Store", "5.0 rating", "19 users"],
  },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ruiqi-wang-rach01", icon: "in" },
  { label: "GitHub", href: "https://github.com/RachelWanggg", icon: "github" },
  { label: "Email", href: "mailto:rachelwangrq2@gmail.com", icon: "mail" },
];

const coreSkills = [
  "product strategy",
  "multi-agent systems",
  "full-stack AI",
  "published products",
  "playful UX",
];

function App() {
  const [activePanel, setActivePanel] = React.useState<PanelId | null>(null);
  const panel = activePanel ? panels[activePanel] : null;

  return (
    <main className="app-shell">
      <header className="top-bar" aria-label="Portfolio navigation">
        <a className="brand-pill" href="#home" aria-label="Ruiqi Wang home">
          RW
        </a>
        <nav className="nav-links">
          {Object.entries(panels).map(([id, item]) => (
            <button
              className={activePanel === id ? "is-active" : ""}
              key={id}
              onClick={() => setActivePanel(id as PanelId)}
              type="button"
            >
              {item.title.replace("Rachel", "").trim()}
            </button>
          ))}
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="intro-top">
            <p className="eyebrow">
              <Gamepad2 size={17} /> AI engineer portfolio
            </p>
            <div className="hero-sticker">
              <img
                alt="Retro pixel sticker portrait of Rachel Wang"
                src="/ruiqi-pixel-sticker.png"
              />
            </div>
          </div>
          <h1>Rachel Wang</h1>
          <p className="hero-summary">
            I build agentic AI products, full-stack tools, and playful interfaces
            that turn complex workflows into usable systems.
          </p>
          <div className="skill-block" aria-label="Core skills">
            <span className="skill-label">Core stack</span>
            <ul>
              {coreSkills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="social-row" aria-label="Profile links">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                aria-label={label}
                href={href}
                key={href}
                rel="noreferrer"
                target="_blank"
                title={label}
              >
                <SocialIcon icon={Icon} />
              </a>
            ))}
          </div>
        </div>

        <div className="game-frame" aria-label="Playable pixel portfolio map">
          <PixelWorld onOpenPanel={(id) => setActivePanel(id)} />
        </div>
      </section>

      <section className="project-grid" aria-label="Portfolio shelves">
        {projects.map((project, index) => (
          <article className="shelf-card project-card" key={project.href}>
            <div className="card-year">0{index + 1}</div>
            <h2>{project.title}</h2>
            <p className="project-meta">{project.meta}</p>
            <p>{project.copy}</p>
            <a href={project.href} rel="noreferrer" target="_blank">
              <ArrowUpRight size={16} /> Visit
            </a>
          </article>
        ))}
        <article className="shelf-card">
          <div className="card-year">03</div>
          <h2>Resume</h2>
          <p>Experience across agent workflows, full-stack SaaS, NLP, and recommendations.</p>
          <button onClick={() => setActivePanel("resume")} type="button">
            <ArrowUpRight size={16} /> Open
          </button>
        </article>
        <article className="shelf-card">
          <div className="card-year">04</div>
          <h2>Contact</h2>
          <p>LinkedIn, GitHub, and email for AI engineering opportunities.</p>
          <button onClick={() => setActivePanel("contact")} type="button">
            <ArrowUpRight size={16} /> Open
          </button>
        </article>
      </section>

      {panel ? (
        <aside className="modal-backdrop" aria-label={`${panel.title} details`}>
          <div className="modal-card">
            <button
              aria-label="Close panel"
              className="icon-button"
              onClick={() => setActivePanel(null)}
              type="button"
            >
              <X size={20} />
            </button>
            <div className="modal-sticker">
              <Sparkles size={22} />
              <span>{panel.year}</span>
            </div>
            <h2>{panel.title}</h2>
            <p className="modal-kicker">
              <MapPin size={17} /> {panel.kicker}
            </p>
            <p>{panel.copy}</p>
            {panel.bullets ? (
              <ul className="resume-list">
                {panel.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
            <ul className="tag-list">
              {panel.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            {panel.links ? (
              <div className="modal-links">
                {panel.links.map((link) => (
                  <a href={link.href} key={link.href} rel="noreferrer" target="_blank">
                    <ArrowUpRight size={16} /> {link.label}
                  </a>
                ))}
              </div>
            ) : null}
            {activePanel === "contact" ? (
              <a className="mail-link" href="mailto:rachelwangrq2@gmail.com">
                <Mail size={17} /> rachelwangrq2@gmail.com
              </a>
            ) : null}
          </div>
        </aside>
      ) : null}
    </main>
  );
}

function SocialIcon({ icon }: { icon: string }) {
  if (icon === "in") {
    return <span className="linkedin-mark">in</span>;
  }

  if (icon === "github") {
    return (
      <svg aria-hidden="true" className="github-mark" viewBox="0 0 24 24">
        <path
          d="M12 2.4c-5.4 0-9.8 4.4-9.8 9.8 0 4.3 2.8 8 6.7 9.3.5.1.7-.2.7-.5v-1.8c-2.7.6-3.3-1.2-3.3-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 0 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.8.8.1-.6.3-1.1.6-1.3-2.2-.2-4.5-1.1-4.5-4.8 0-1.1.4-1.9 1-2.6-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.5 1 2.6 0 3.7-2.3 4.6-4.5 4.8.4.3.7.9.7 1.9V21c0 .3.2.6.7.5 3.9-1.3 6.7-5 6.7-9.3 0-5.4-4.4-9.8-9.8-9.8Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return <Mail size={17} />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
