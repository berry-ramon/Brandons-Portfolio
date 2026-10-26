import { Check, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { useParams } from "react-router-dom";
import { kodeesData } from "../data/kodees";
import { operatingPrinciples, principles } from "../data/principles";
import { projects } from "../data/projects";
import { ROLE_FULL } from "../data/site";
import { InlinePreview, Reveal, SEO } from "../../App";
import { TransitionLink as Link } from "../components/PageTransition";

const tags = (items: readonly string[]) => (
  <div className="mt-5 flex flex-wrap gap-2">
    {items.map((item) => (
      <span
        key={item}
        className="rounded-xl border border-border-subtle px-3 py-2 text-xs shadow-pressed"
      >
        {item}
      </span>
    ))}
  </div>
);

const PullQuote = ({ children }: { children: string }) => (
  <blockquote className="mt-6 border-l-2 border-accent py-2 pl-5 text-xl font-medium">
    {children}
  </blockquote>
);

const Block = ({
  label,
  title,
  children,
  id,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
  id?: string;
}) => (
  <section
    id={id}
    className="scroll-mt-24 border-t border-border-subtle px-4 py-9 md:px-8 md:py-24"
  >
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-6xl"
    >
      <p className="font-mono text-[10px] tracking-widest text-foreground/65">
        {label}
      </p>
      <h2 className="mt-3 text-xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h2>
      {children}
    </motion.div>
  </section>
);

export function AboutPage() {
  const work = [
    [
      "Payments",
      "Several currencies, with compliance checks and reconciliation built into the core.",
    ],
    [
      "Admin and operations",
      "One dashboard for many teams, with fine control over access and a full audit trail.",
    ],
    [
      "Analytics",
      "Real-time event processing, funnel analysis and behavior modeling.",
    ],
    [
      "APIs and platforms",
      "A central gateway that handles logins, rate limits and routing between services.",
    ],
  ];

  return (
    <Reveal>
      <SEO
        title="About Brandon Kimathi | Software Architect"
        description="I am Brandon Kimathi, a Software Architect at KODÈS in Kenya. I design software to keep working for years."
      />
      <main id="main">
        <section
          id="intro"
          className="mx-auto grid max-w-6xl gap-6 px-4 py-9 md:grid-cols-2 md:px-8 md:py-24"
        >
          <div>
            <p className="font-mono text-[10px]">01 / ABOUT</p>
            <h1
              tabIndex={-1}
              className="mt-3 text-[26px] font-semibold leading-tight tracking-tight outline-none md:text-7xl"
            >
              I design software to keep working for years.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground/70 md:text-lg">
              I guide software design at KODÈS. What you build first decides
              what is possible later, so I try to make sure it helps instead of
              getting in the way.
            </p>
          </div>
          <div className="aspect-[4/5] max-h-[46dvh] overflow-hidden rounded-[22px] border border-border-subtle bg-background-elevated p-3 shadow-neu md:max-h-none">
            <img
              src="/assets/images/brandon-kimathi.jpg"
              width="800"
              height="1000"
              alt="Brandon Kimathi at work"
              className="h-full w-full rounded-2xl object-cover"
              onError={(event) => {
                event.currentTarget.hidden = true;
              }}
            />
          </div>
        </section>

        <Block label="02 / PHILOSOPHY" title="I treat a product like a system.">
          <p className="mt-5 font-medium">
            The screens come from the structure, not the other way round.
          </p>
          <div className="mt-4 max-w-prose space-y-4 text-sm leading-relaxed text-foreground/70 md:text-base">
            <p>
              The products that last are the ones planned for change. I map how
              the data relates, set clear boundaries between the parts, and
              agree on patterns before I think about how things look.
            </p>
            <p>
              That way new requirements slot in without breaking what already
              works. When structure comes first, complexity stays manageable.
            </p>
          </div>
          <PullQuote>
            Good structure makes the right way the easy way.
          </PullQuote>
        </Block>

        <Block label="03 / ROLE" title={ROLE_FULL}>
          <p className="mt-5 max-w-prose text-foreground/70">
            {kodeesData.role.context}
          </p>
          {tags(kodeesData.role.areas)}
          <PullQuote>{kodeesData.role.focus}</PullQuote>
        </Block>

        <Block label="04 / WORK" title="What I work on">
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {work.map(([name, copy]) => (
              <article
                key={name}
                className="rounded-[22px] border border-border-subtle bg-background-elevated p-4 shadow-neu md:p-6"
              >
                <h3 className="font-semibold">{name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </Block>

        <Block label="05 / CONTRIBUTION" title="What I bring">
          {tags(kodeesData.contribution.areas)}
          <PullQuote>{kodeesData.contribution.core}</PullQuote>
        </Block>

        <Block
          id="approach"
          label="06 / APPROACH"
          title={kodeesData.approach.principle}
        >
          <ul className="mt-6 space-y-3">
            {kodeesData.approach.practices.map((item) => (
              <li key={item} className="flex gap-3">
                <Check className="mt-0.5 shrink-0 text-accent" size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <PullQuote>{kodeesData.approach.conviction}</PullQuote>
        </Block>

        <Block label="07 / NOTES" title={kodeesData.social.handle}>
          <p className="mt-4 text-foreground/70">{kodeesData.social.note}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://www.instagram.com/Tech_Nomad5"
              rel="noopener noreferrer"
              target="_blank"
              className="rounded-xl p-3 shadow-neu"
            >
              Read my notes
            </a>
            <Link to="/how-i-think" className="rounded-xl p-3 shadow-neu">
              How I think
            </Link>
            <Link to="/contact" className="rounded-xl p-3 shadow-neu">
              Contact
            </Link>
          </div>
        </Block>
      </main>
    </Reveal>
  );
}

export function ThinkingPage() {
  return (
    <Reveal>
      <SEO
        title="How I think about building | Brandon Kimathi"
        description="Four rules I use to plan software and keep it working as it grows."
      />
      <main id="main">
        <header className="mx-auto max-w-6xl px-4 py-9 md:px-8 md:py-24">
          <p className="font-mono text-[10px]">01 / PRINCIPLES</p>
          <h1
            tabIndex={-1}
            className="mt-3 text-[26px] font-semibold tracking-tight outline-none md:text-7xl"
          >
            How I think about building
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-foreground/70 md:text-lg">
            These are the rules I come back to when I plan a product: what to
            build first, what to leave out, and how to keep it working as it
            grows.
          </p>
        </header>

        <div className="hidden-scrollbar flex snap-x snap-mandatory gap-3 overscroll-x-contain overflow-x-auto px-4 pb-8 md:block md:px-0">
          {principles.map((item, index) => (
            <section
              id={item.id}
              key={item.id}
              className="min-w-[88vw] snap-center rounded-[22px] border border-border-subtle bg-background-elevated p-4 shadow-neu md:mx-auto md:mb-5 md:min-w-0 md:max-w-6xl md:p-8"
            >
              <p className="font-mono text-[10px]">
                {String(index + 1).padStart(2, "0")} /{" "}
                {item.eyebrow.toUpperCase()}
              </p>
              <h2 className="mt-3 text-xl font-semibold md:text-4xl">
                {item.title}
              </h2>
              <p className="mt-4 font-medium">{item.summary}</p>
              <p className="mt-4 max-w-prose text-sm leading-relaxed text-foreground/70 md:text-base">
                {item.content}
              </p>
              <PullQuote>{item.emphasis}</PullQuote>
            </section>
          ))}
        </div>

        <Block label="05 / PRACTICE" title="The choices behind the work">
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {operatingPrinciples.map((group) => (
              <article
                key={group.heading}
                className="rounded-[22px] border border-border-subtle p-5 shadow-neu"
              >
                <h3 className="font-semibold">{group.heading}</h3>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check size={17} className="mt-1 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <PullQuote>
            These stay the same even when the requirements change.
          </PullQuote>
          <Link
            to="/contact"
            className="mt-7 inline-flex rounded-xl bg-accent p-3 font-semibold text-[#1C1917]"
          >
            Talk about a project
          </Link>
        </Block>
      </main>
    </Reveal>
  );
}

export function KodeesPage() {
  return (
    <Reveal>
      <SEO
        title="KODÈS | Education tools across Africa"
        description="KODÈS builds digital tools for education. I guide how its software is planned and built."
      />
      <main id="main">
        <header className="mx-auto max-w-6xl px-4 py-9 md:px-8 md:py-24">
          <p className="font-mono text-[10px]">01 / KODÈS</p>
          <h1
            tabIndex={-1}
            className="mt-3 text-[26px] font-semibold outline-none md:text-7xl"
          >
            {kodeesData.organization.name}
          </h1>
          <p className="mt-5 max-w-2xl text-foreground/70">
            {kodeesData.organization.description}
          </p>
          <PullQuote>{kodeesData.organization.mission}</PullQuote>
        </header>

        <Block label="02 / INITIATIVES" title="What KODÈS works on">
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {kodeesData.organization.initiatives.map((item) => (
              <div
                key={item}
                className="rounded-[18px] border border-border-subtle p-4 shadow-neu"
              >
                {item}
              </div>
            ))}
          </div>
        </Block>

        <Block id="role" label="03 / MY ROLE" title={kodeesData.role.title}>
          <p className="mt-4 text-foreground/70">{kodeesData.role.context}</p>
          {tags(kodeesData.role.areas)}
          <PullQuote>{kodeesData.role.focus}</PullQuote>
        </Block>

        <Block label="04 / SYSTEMS" title="Four systems">
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {kodeesData.systems.map((system) => (
              <details
                key={system.id}
                className="rounded-[22px] border border-border-subtle bg-background-elevated p-5 shadow-neu"
              >
                <summary className="min-h-11 cursor-pointer font-semibold">
                  {system.name}
                </summary>
                <p className="mt-3 text-sm text-foreground/70">
                  {system.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {system.purpose.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check size={16} className="mt-1 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </Block>

        <Block label="05 / CONTRIBUTION" title="My contribution">
          {tags(kodeesData.contribution.areas)}
          <PullQuote>{kodeesData.contribution.core}</PullQuote>
        </Block>

        <Block
          id="approach"
          label="06 / APPROACH"
          title={kodeesData.approach.principle}
        >
          <ul className="mt-5 space-y-3">
            {kodeesData.approach.practices.map((item) => (
              <li key={item} className="flex gap-3">
                <Check size={17} className="mt-1 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>
          <PullQuote>{kodeesData.approach.conviction}</PullQuote>
        </Block>

        <Block label="07 / WEBSITE" title="See KODÈS online">
          <p className="mt-4 max-w-2xl text-foreground/70">
            Scroll, click, and explore the live site right here - no new tab
            needed.
          </p>

          <div className="mt-6 max-w-4xl">
            <InlinePreview url="https://www.kodees.co.ke" name="KODÈS" />
          </div>

          <a
            href="https://kodees.co.ke"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center gap-2 underline"
          >
            Open in a new tab <ExternalLink size={16} />
          </a>

          <p className="mt-6 text-foreground/70">{kodeesData.social.note}</p>

          <Link
            to="/contact"
            className="mt-6 inline-flex rounded-xl bg-accent p-3 font-semibold text-[#1C1917]"
          >
            Contact me
          </Link>
        </Block>
      </main>
    </Reveal>
  );
}

export function ProjectPage() {
  const { projectId } = useParams();
  const project = projects.find(
    (item) =>
      item.id ===
      (projectId === "user-analytics" ? "analytics-engine" : projectId),
  );

  if (!project) {
    return (
      <Reveal>
        <SEO
          title="Project not found | Brandon Kimathi"
          description="This project could not be found."
          noindex
        />
        <main
          id="main"
          className="mx-auto grid min-h-[60dvh] max-w-4xl place-items-center px-4 py-20 text-center"
        >
          <div>
            <p className="font-mono text-xs tracking-widest text-foreground/50">
              404
            </p>
            <h1 className="mt-3 text-3xl font-semibold md:text-5xl">
              Project not found
            </h1>
            <Link
              to="/work"
              className="mt-8 inline-flex rounded-xl bg-accent px-5 py-3 font-semibold text-[#1C1917]"
            >
              Back to Work
            </Link>
          </div>
        </main>
      </Reveal>
    );
  }

  const related = projects.filter((item) => item.id !== project.id).slice(0, 2);

  return (
    <Reveal>
      <SEO
        title={`${project.name} | Brandon Kimathi`}
        description={project.description}
      />
      <main id="main" className="mx-auto max-w-5xl px-4 py-9 md:px-8 md:py-24">
        <Link
          to="/work"
          className="inline-flex min-h-11 items-center underline"
        >
          Back to Work
        </Link>
        <p className="mt-5 font-mono text-[10px]">CASE STUDY</p>
        <h1
          tabIndex={-1}
          className="mt-3 text-[26px] font-semibold outline-none md:text-7xl"
        >
          {project.name}
        </h1>
        <p className="mt-4 text-xl">{project.tagline}</p>
        <p className="mt-4 max-w-prose text-foreground/70">
          {project.overview}
        </p>

        {[project.challenge, project.solution, project.architecture].map(
          (part) => (
            <section
              key={part.title}
              className="mt-10 rounded-[22px] border border-border-subtle p-5 shadow-neu"
            >
              <h2 className="text-xl font-semibold">{part.title}</h2>
              <p className="mt-3 text-foreground/70">{part.description}</p>
              {"points" in part && (
                <ul className="mt-4 list-disc space-y-2 pl-5">
                  {part.points.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {"approach" in part && (
                <ul className="mt-4 list-disc space-y-2 pl-5">
                  {part.approach.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {"components" in part && (
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {part.components.map((item) => (
                    <article
                      key={item.name}
                      className="rounded-xl p-4 shadow-pressed"
                    >
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="mt-2 text-sm text-foreground/70">
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </section>
          ),
        )}

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Outcomes</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {project.outcomes.map((item) => (
              <article
                key={item.label}
                className="rounded-xl border border-border-subtle p-4 shadow-neu"
              >
                <h3 className="font-semibold">{item.label}</h3>
                <p className="mt-2 text-sm text-foreground/70">
                  {item.description}
                </p>
                {item.confirmed && item.value && (
                  <strong className="mt-3 block text-2xl">{item.value}</strong>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Tools used</h2>
          {tags(project.technologies)}
        </section>

        {/* More case studies - internal linking for SEO + sitelinks */}
        {related.length > 0 && (
          <section className="mt-12 border-t border-border-subtle pt-8">
            <h2 className="mb-4 font-mono text-[10px] tracking-widest text-foreground/65">
              MORE CASE STUDIES
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to={`/work/${item.id}`}
                  className="rounded-xl border border-border-subtle p-4 shadow-neu transition-transform hover:-translate-y-1"
                >
                  <p className="font-mono text-[10px] text-foreground/60">
                    CASE STUDY
                  </p>
                  <h3 className="mt-1 font-semibold">{item.name}</h3>
                  <p className="mt-1 text-sm text-foreground/70">
                    {item.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </Reveal>
  );
}
