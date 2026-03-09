import {
    GitHubActivity,
    PageProps,
    Portfolio,
    PortfolioExperienceItem,
    PortfolioHero,
    PortfolioLink,
    PortfolioProject,
    PortfolioStackItem,
    PortfolioSkillGroup,
} from '@/types';
import { Head } from '@inertiajs/react';
import { CSSProperties, KeyboardEvent, MouseEvent, ReactNode, useState } from 'react';

function PortfolioCard({
    id,
    className,
    children,
}: {
    id?: string;
    className?: string;
    children: ReactNode;
}) {
    return (
        <section
            id={id}
            className={`portfolio-card animate-fade-up rounded-[2rem] p-6 opacity-0 sm:p-8 ${className ?? ''}`}
        >
            {children}
        </section>
    );
}

function SectionKicker({ label }: { label: string }) {
    return (
        <span className="inline-flex rounded-full border border-[color:var(--border-glass)] bg-[color:var(--surface-strong)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--text-muted)] backdrop-blur-sm">
            {label}
        </span>
    );
}

function SkillGroup({ group }: { group: PortfolioSkillGroup }) {
    return (
        <div className="glass-inner rounded-[1.5rem] p-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                {group.name}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                    <span
                        key={item}
                        className="rounded-full bg-[color:var(--accent-soft)] px-3 py-1.5 text-sm font-medium text-[color:var(--accent)]"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}

function StackTile({ item }: { item: PortfolioStackItem }) {
    const [logoFailed, setLogoFailed] = useState(false);
    const iconStyle = {
        '--stack-accent': item.accent,
    } as CSSProperties;

    return (
        <article className="stack-tile snap-start">
            <div className="stack-tile__icon" style={iconStyle}>
                {item.logo && !logoFailed ? (
                    <img
                        src={item.logo}
                        alt={`${item.name} logo`}
                        className="stack-tile__logo"
                        onError={() => setLogoFailed(true)}
                    />
                ) : (
                    <span>{item.monogram}</span>
                )}
            </div>
            <div className="mt-4">
                <p className="text-sm font-semibold text-[color:var(--text-strong)]">
                    {item.name}
                </p>
                <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
                    {item.category}
                </p>
            </div>
        </article>
    );
}

function ProjectCard({ project }: { project: PortfolioProject }) {
    const liveUrl = project.liveUrl;
    const hasLiveUrl = liveUrl !== null && liveUrl !== '';

    const openProjectLiveUrl = (): void => {
        if (! liveUrl) {
            return;
        }

        window.open(liveUrl, '_blank', 'noopener,noreferrer');
    };

    const handleProjectCardClick = (): void => {
        openProjectLiveUrl();
    };

    const handleProjectCardKeyDown = (
        event: KeyboardEvent<HTMLElement>,
    ): void => {
        if (! hasLiveUrl || (event.key !== 'Enter' && event.key !== ' ')) {
            return;
        }

        event.preventDefault();
        openProjectLiveUrl();
    };

    const stopProjectCardClick = (
        event: MouseEvent<HTMLAnchorElement>,
    ): void => {
        event.stopPropagation();
    };

    return (
        <article
            className={`glass-inner rounded-[1.75rem] p-5 transition duration-300 ${
                hasLiveUrl
                    ? 'cursor-pointer hover:-translate-y-1 hover:ring-1 hover:ring-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'
                    : ''
            }`}
            onClick={handleProjectCardClick}
            onKeyDown={handleProjectCardKeyDown}
            role={hasLiveUrl ? 'link' : undefined}
            tabIndex={hasLiveUrl ? 0 : undefined}
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
                        {project.role}
                    </p>
                    <h3 className="mt-3 text-xl font-bold text-[color:var(--text-strong)]">
                        {project.name}
                    </h3>
                </div>
                <a
                    href={project.repoHref}
                    target="_blank"
                    rel="noreferrer"
                    onClick={stopProjectCardClick}
                    className="rounded-full border border-[color:var(--border-subtle)] px-3 py-1.5 text-sm font-medium text-[color:var(--text-muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
                >
                    Repo
                </a>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--text-muted)]">
                {project.summary}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                    <span
                        key={item}
                        className="rounded-full border border-[color:var(--border-glass)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--text-muted)]"
                    >
                        {item}
                    </span>
                ))}
            </div>
            <a
                href={project.href}
                onClick={stopProjectCardClick}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent)] transition-all duration-300 hover:gap-3"
            >
                Discuss a similar build
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
        </article>
    );
}

function ExperienceItem({ item }: { item: PortfolioExperienceItem }) {
    return (
        <div className="grid gap-3 border-t border-[color:var(--border-subtle)] py-4 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-[96px_1fr]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
                {item.period}
            </p>
            <div>
                <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="text-lg font-semibold text-[color:var(--text-strong)]">
                        {item.role}
                    </h3>
                    <span className="text-sm text-[color:var(--text-muted)]">
                        {item.company}
                    </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-muted)]">
                    {item.summary}
                </p>
            </div>
        </div>
    );
}

function ContactIcon({ icon }: { icon: PortfolioLink['icon'] }) {
    if (icon === 'instagram') {
        return (
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
            >
                <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.25" />
                <circle cx="12" cy="12" r="4.25" />
                <circle cx="17.2" cy="6.8" r="1.05" fill="currentColor" stroke="none" />
            </svg>
        );
    }

    if (icon === 'linkedin') {
        return (
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-7 w-7 fill-current"
            >
                <path d="M5.44 8.72H8.8V19.5H5.44V8.72ZM7.12 3.5A1.95 1.95 0 1 1 7.1 7.4A1.95 1.95 0 0 1 7.12 3.5ZM10.9 8.72H14.1V10.2H14.15C14.6 9.35 15.7 8.45 17.33 8.45C20.72 8.45 21.35 10.6 21.35 13.4V19.5H17.99V14.1C17.99 12.82 17.96 11.17 16.2 11.17C14.42 11.17 14.15 12.55 14.15 14V19.5H10.9V8.72Z" />
            </svg>
        );
    }

    if (icon === 'facebook') {
        return (
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-7 w-7 fill-current"
            >
                <path d="M13.37 20.5V12.98H15.88L16.26 10.06H13.37V8.2C13.37 7.35 13.61 6.76 14.84 6.76H16.36V4.15C15.62 4.05 14.88 4 14.13 4C11.9 4 10.36 5.36 10.36 7.86V10.06H8V12.98H10.36V20.5H13.37Z" />
            </svg>
        );
    }

    if (icon === 'github') {
        return (
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-7 w-7 fill-current"
            >
                <path d="M12 .5C5.649.5.5 5.649.5 12a11.5 11.5 0 0 0 7.86 10.913c.575.106.785-.25.785-.556 0-.274-.01-1-.016-1.962-3.197.695-3.872-1.54-3.872-1.54-.523-1.327-1.278-1.681-1.278-1.681-1.044-.714.079-.699.079-.699 1.154.081 1.76 1.185 1.76 1.185 1.026 1.759 2.692 1.251 3.348.956.103-.744.401-1.251.729-1.539-2.552-.29-5.236-1.276-5.236-5.682 0-1.255.448-2.281 1.183-3.085-.119-.29-.513-1.458.112-3.04 0 0 .965-.309 3.162 1.179a10.97 10.97 0 0 1 5.758 0c2.195-1.488 3.159-1.18 3.159-1.18.627 1.583.233 2.751.114 3.04.737.805 1.181 1.831 1.181 3.086 0 4.417-2.688 5.389-5.249 5.673.413.355.781 1.057.781 2.13 0 1.538-.014 2.778-.014 3.156 0 .309.207.668.79.555A11.503 11.503 0 0 0 23.5 12C23.5 5.649 18.351.5 12 .5Z" />
            </svg>
        );
    }

    if (icon === 'gmail') {
        return (
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M3.75 6.75H20.25V17.25H3.75V6.75Z" />
                <path d="M4.5 7.5L12 13.25L19.5 7.5" />
            </svg>
        );
    }

    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7.25 4.75H9.75L11 7.9L9.5 9.95C10.45 11.88 12.12 13.55 14.05 14.5L16.1 13L19.25 14.25V16.75C19.25 17.44 18.69 18 18 18C10.82 18 5 12.18 5 5C5 4.31 5.56 3.75 6.25 3.75H7.25V4.75Z" />
        </svg>
    );
}

function ContactLinkButton({ item }: { item: PortfolioLink }) {
    const isExternalLink = item.href.startsWith('http');

    return (
        <a
            href={item.href}
            target={isExternalLink ? '_blank' : undefined}
            rel={isExternalLink ? 'noreferrer' : undefined}
            aria-label={item.label}
            title={item.label}
            className="group flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-[color:var(--border-glass)] bg-[linear-gradient(180deg,_rgba(18,18,18,0.95),_rgba(10,10,10,0.98))] px-6 py-5 text-[color:var(--text-muted)] shadow-[0_18px_30px_rgba(0,0,0,0.30)] transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] hover:shadow-[0_22px_40px_rgba(0,0,0,0.35),_0_0_20px_rgba(220,38,38,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
            <span className="transition-transform duration-300 group-hover:scale-110">
                <ContactIcon icon={item.icon} />
            </span>
            <span className="text-xs font-medium tracking-wide">
                {item.label}
            </span>
        </a>
    );
}

function ProfilePortrait({ hero }: { hero: PortfolioHero }) {
    const [imageFailed, setImageFailed] = useState(false);

    return (
        <div className="group relative mx-auto w-full max-w-[260px]">
            <div className="portrait-glow absolute inset-4 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(220,38,38,0.28),_transparent_60%)] blur-2xl transition-opacity duration-700 group-hover:opacity-80" />
            <div className="glass-inner relative overflow-hidden rounded-[2.2rem] border border-[color:var(--border-glass)] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.35)] transition-all duration-500 group-hover:border-[color:rgba(220,38,38,0.20)] group-hover:shadow-[0_28px_70px_rgba(0,0,0,0.40),_0_0_40px_rgba(220,38,38,0.06)]">
                {imageFailed ? (
                    <div className="flex aspect-[4/5] items-center justify-center rounded-[1.8rem] bg-[linear-gradient(160deg,_rgba(220,38,38,0.20),_rgba(10,10,10,0.92)_58%)]">
                        <span className="font-display text-6xl tracking-[-0.08em] text-[color:var(--text-strong)]">
                            {hero.portrait.fallback}
                        </span>
                    </div>
                ) : (
                    <img
                        src={hero.portrait.src}
                        alt={hero.portrait.alt}
                        className="aspect-[4/5] w-full rounded-[1.8rem] object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                        onError={() => setImageFailed(true)}
                    />
                )}
            </div>
        </div>
    );
}

export default function Welcome({
    portfolio,
    githubActivity,
}: PageProps<{
    portfolio: Portfolio;
    githubActivity: GitHubActivity;
}>) {
    return (
        <>
            <Head title="Portfolio" />

            <div className="portfolio-shell min-h-screen pb-10">
                {/* Fixed background overlay for enhanced depth */}
                <div
                    className="pointer-events-none fixed inset-0 z-0"
                    aria-hidden="true"
                    style={{
                        background:
                            'radial-gradient(ellipse at 20% 0%, rgba(220,38,38,0.07), transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(220,38,38,0.05), transparent 50%)',
                    }}
                />

                <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4">
                        <div className="glass-inner flex h-12 w-12 items-center justify-center rounded-[1.3rem] text-lg font-bold text-[color:var(--text-strong)] transition-all duration-300 hover:border-[color:rgba(220,38,38,0.20)] hover:shadow-[0_0_20px_rgba(220,38,38,0.08)]">
                            {portfolio.hero.portrait.fallback}
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
                                {portfolio.hero.eyebrow}
                            </p>
                            <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                                Responsive Bento Portfolio
                            </p>
                        </div>
                    </div>

                    <nav className="hidden items-center gap-8 text-sm font-medium text-[color:var(--text-muted)] md:flex">
                        <a
                            href="#stack"
                            className="nav-link-hover transition-colors duration-300 hover:text-[color:var(--text-strong)]"
                        >
                            Stack
                        </a>
                        <a
                            href="#projects"
                            className="nav-link-hover transition-colors duration-300 hover:text-[color:var(--text-strong)]"
                        >
                            Projects
                        </a>
                        <a
                            href="#experience"
                            className="nav-link-hover transition-colors duration-300 hover:text-[color:var(--text-strong)]"
                        >
                            Experience
                        </a>
                        <a
                            href="#contact"
                            className="nav-link-hover transition-colors duration-300 hover:text-[color:var(--text-strong)]"
                        >
                            Contact
                        </a>
                    </nav>
                </header>

                <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-5 md:grid-cols-6 md:gap-5 xl:grid-cols-12 xl:gap-6">
                        <PortfolioCard className="md:col-span-6 xl:col-span-7 xl:row-span-2">
                            <div className="flex h-full flex-col justify-between gap-10">
                                <div className="grid gap-8 xl:grid-cols-[minmax(0,1.35fr)_260px] xl:items-start">
                                    <div className="space-y-5">
                                        <SectionKicker label={portfolio.hero.eyebrow} />
                                        <div className="max-w-3xl">
                                            <h1 className="font-display text-5xl leading-[0.95] tracking-[-0.04em] text-[color:var(--text-strong)] sm:text-6xl lg:text-7xl">
                                                {portfolio.hero.name}
                                            </h1>
                                            <p className="mt-5 max-w-2xl text-xl leading-8 text-[color:var(--text-muted)]">
                                                {portfolio.hero.title}
                                            </p>
                                            <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--text-muted)]">
                                                {portfolio.hero.intro}
                                            </p>
                                        </div>
                                    </div>

                                    <ProfilePortrait hero={portfolio.hero} />
                                </div>

                                <div className="grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
                                    <div>
                                        <div className="flex flex-wrap gap-3">
                                            <a
                                                href={portfolio.hero.primaryAction.href}
                                                className="btn-shine rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-[#060606] transition-all duration-300 hover:bg-[#ef4444] hover:text-[#060606] hover:shadow-lg hover:shadow-[color:var(--accent-soft)] hover:scale-[1.03] active:scale-[0.98]"
                                            >
                                                {portfolio.hero.primaryAction.label}
                                            </a>
                                            <a
                                                href={portfolio.hero.secondaryAction.href}
                                                className="btn-shine rounded-full border border-[color:var(--border-glass)] bg-[color:var(--surface-strong)] px-6 py-3 text-sm font-semibold text-[color:var(--text-strong)] backdrop-blur-sm transition-all duration-300 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] hover:shadow-lg hover:shadow-[color:var(--accent-soft)] hover:scale-[1.03] active:scale-[0.98]"
                                            >
                                                {portfolio.hero.secondaryAction.label}
                                            </a>
                                        </div>
                                        <p className="mt-4 text-sm text-[color:var(--text-muted)]">
                                            {portfolio.hero.availability}
                                        </p>
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                                        {portfolio.hero.metrics.map((metric) => (
                                            <div
                                                key={metric.label}
                                                className="glass-inner rounded-[1.5rem] p-4"
                                            >
                                                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
                                                    {metric.label}
                                                </p>
                                                <p className="mt-3 text-base font-bold text-[color:var(--text-strong)]">
                                                    {metric.value}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </PortfolioCard>

                        <PortfolioCard
                            id="stack"
                            className="delay-1 md:col-span-3 xl:col-span-5"
                        >
                            <div className="flex h-full flex-col justify-between gap-8">
                                <div>
                                    <SectionKicker label={portfolio.stack.title} />
                                    <h2 className="mt-5 font-display text-3xl tracking-[-0.03em] text-[color:var(--text-strong)]">
                                        {portfolio.stack.heading}
                                    </h2>
                                    <p className="mt-3 max-w-md text-sm leading-7 text-[color:var(--text-muted)]">
                                        {portfolio.stack.description}
                                    </p>
                                </div>

                                <div className="stack-scroll-shell">
                                    <div className="stack-scroller">
                                        {portfolio.stack.items.map((item) => (
                                            <StackTile
                                                key={`${item.category}-${item.name}`}
                                                item={item}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </PortfolioCard>

                        <PortfolioCard className="delay-2 md:col-span-3 xl:col-span-5">
                            <SectionKicker label={portfolio.skills.title} />
                            <div className="mt-5 space-y-4">
                                {portfolio.skills.groups.map((group) => (
                                    <SkillGroup key={group.name} group={group} />
                                ))}
                            </div>
                        </PortfolioCard>

                        <PortfolioCard
                            id="social-links"
                            className="delay-2 md:col-span-6 xl:col-span-5"
                        >
                            <div className="flex h-full flex-col justify-between gap-8">
                                <div>
                                    <SectionKicker label="Socials" />
                                    <h2 className="mt-5 font-display text-3xl tracking-[-0.03em] text-[color:var(--text-strong)]">
                                        Find me on
                                    </h2>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* LinkedIn Card */}
                                    <a
                                        href={
                                            portfolio.contact.links.find(
                                                (l) => l.icon === 'linkedin',
                                            )?.href ?? '#'
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-[color:var(--border-glass)] bg-[linear-gradient(180deg,_rgba(22,22,22,0.96),_rgba(14,14,14,0.98))] px-8 py-8 text-[color:var(--text-muted)] transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] hover:shadow-[0_22px_40px_rgba(0,0,0,0.35),_0_0_20px_rgba(220,38,38,0.08)]"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            viewBox="0 0 24 24"
                                            className="h-8 w-8 fill-current transition-transform duration-300 group-hover:scale-110"
                                        >
                                            <path d="M5.44 8.72H8.8V19.5H5.44V8.72ZM7.12 3.5A1.95 1.95 0 1 1 7.1 7.4A1.95 1.95 0 0 1 7.12 3.5ZM10.9 8.72H14.1V10.2H14.15C14.6 9.35 15.7 8.45 17.33 8.45C20.72 8.45 21.35 10.6 21.35 13.4V19.5H17.99V14.1C17.99 12.82 17.96 11.17 16.2 11.17C14.42 11.17 14.15 12.55 14.15 14V19.5H10.9V8.72Z" />
                                        </svg>
                                        <span className="text-sm font-medium">
                                            LinkedIn
                                        </span>
                                    </a>

                                    {/* GitHub Card */}
                                    <a
                                        href={
                                            githubActivity.profileUrl ??
                                            'https://github.com/'
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-[color:var(--border-glass)] bg-[linear-gradient(180deg,_rgba(22,22,22,0.96),_rgba(14,14,14,0.98))] px-8 py-8 text-[color:var(--text-muted)] transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] hover:shadow-[0_22px_40px_rgba(0,0,0,0.35),_0_0_20px_rgba(220,38,38,0.08)]"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            viewBox="0 0 24 24"
                                            className="h-8 w-8 fill-current transition-transform duration-300 group-hover:scale-110"
                                        >
                                            <path d="M12 .5C5.649.5.5 5.649.5 12a11.5 11.5 0 0 0 7.86 10.913c.575.106.785-.25.785-.556 0-.274-.01-1-.016-1.962-3.197.695-3.872-1.54-3.872-1.54-.523-1.327-1.278-1.681-1.278-1.681-1.044-.714.079-.699.079-.699 1.154.081 1.76 1.185 1.76 1.185 1.026 1.759 2.692 1.251 3.348.956.103-.744.401-1.251.729-1.539-2.552-.29-5.236-1.276-5.236-5.682 0-1.255.448-2.281 1.183-3.085-.119-.29-.513-1.458.112-3.04 0 0 .965-.309 3.162 1.179a10.97 10.97 0 0 1 5.758 0c2.195-1.488 3.159-1.18 3.159-1.18.627 1.583.233 2.751.114 3.04.737.805 1.181 1.831 1.181 3.086 0 4.417-2.688 5.389-5.249 5.673.413.355.781 1.057.781 2.13 0 1.538-.014 2.778-.014 3.156 0 .309.207.668.79.555A11.503 11.503 0 0 0 23.5 12C23.5 5.649 18.351.5 12 .5Z" />
                                        </svg>
                                        <span className="text-sm font-medium">
                                            GitHub
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </PortfolioCard>

                        <PortfolioCard
                            id="projects"
                            className="delay-3 md:col-span-6 xl:col-span-7"
                        >
                            <div className="flex flex-wrap items-end justify-between gap-4">
                                <div>
                                    <SectionKicker label="Selected projects" />
                                    <h2 className="mt-5 font-display text-3xl tracking-[-0.03em] text-[color:var(--text-strong)]">
                                        Focused work with clear tradeoffs.
                                    </h2>
                                </div>
                                <p className="max-w-xl text-sm leading-7 text-[color:var(--text-muted)]">
                                    A few representative builds that show product thinking, backend discipline, and responsive frontend execution.
                                </p>
                            </div>

                            <div className="mt-8 grid gap-4 xl:grid-cols-3">
                                {portfolio.projects.map((project) => (
                                    <ProjectCard
                                        key={project.name}
                                        project={project}
                                    />
                                ))}
                            </div>
                        </PortfolioCard>

                        <PortfolioCard
                            id="experience"
                            className="delay-4 md:col-span-6 xl:col-span-7"
                        >
                            <SectionKicker label={portfolio.experience.title} />
                            <h2 className="mt-5 font-display text-3xl tracking-[-0.03em] text-[color:var(--text-strong)]">
                                Delivery shaped by maintainability.
                            </h2>
                            <div className="mt-8 space-y-4">
                                {portfolio.experience.items.map((item) => (
                                    <ExperienceItem
                                        key={`${item.period}-${item.role}`}
                                        item={item}
                                    />
                                ))}
                            </div>
                        </PortfolioCard>

                        <PortfolioCard
                            id="contact"
                            className="delay-5 md:col-span-6 xl:col-span-5"
                        >
                            <SectionKicker label={portfolio.contact.title} />
                            <div className="glass-inner mt-5 rounded-[1.75rem] p-5">
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                    {portfolio.contact.links.map((item) => (
                                        <ContactLinkButton
                                            key={item.label}
                                            item={item}
                                        />
                                    ))}
                                </div>

                                <div className="mt-10 grid gap-4 lg:grid-cols-3">
                                    <div className="min-w-0 rounded-[1.5rem] border border-[color:var(--border-glass)] bg-[color:var(--surface-strong)]/70 p-4 backdrop-blur-sm">
                                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
                                            Email
                                        </p>
                                        <a
                                            href={`mailto:${portfolio.contact.email}`}
                                            className="mt-3 block text-sm leading-7 text-[color:var(--text-muted)] [overflow-wrap:anywhere] transition hover:text-[color:var(--text-strong)]"
                                        >
                                            {portfolio.contact.email}
                                        </a>
                                    </div>

                                    <div className="min-w-0 rounded-[1.5rem] border border-[color:var(--border-glass)] bg-[color:var(--surface-strong)]/70 p-4 backdrop-blur-sm">
                                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
                                            Contact number
                                        </p>
                                        <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                                            {portfolio.contact.phone}
                                        </p>
                                    </div>

                                    <div className="min-w-0 rounded-[1.5rem] border border-[color:var(--border-glass)] bg-[color:var(--surface-strong)]/70 p-4 backdrop-blur-sm">
                                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
                                            Location
                                        </p>
                                        <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                                            {portfolio.contact.location}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </PortfolioCard>
                    </div>
                </main>

                {/* Footer */}
                <footer className="relative z-10 mx-auto mt-16 max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
                    <div className="section-divider" />
                    <div className="flex flex-col items-center justify-between gap-4 pt-6 sm:flex-row">
                        <p className="text-xs font-medium tracking-[0.15em] text-[color:var(--text-muted)]">
                            © {new Date().getFullYear()} {portfolio.hero.name.replace(/^Hi, I'm |!$/g, '')}. All rights reserved.
                        </p>
                        <p className="text-xs text-[color:var(--text-muted)] opacity-60">
                            Built with Laravel, React & Tailwind CSS
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
