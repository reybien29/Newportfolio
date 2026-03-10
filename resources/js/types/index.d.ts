export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface PortfolioAction {
    label: string;
    href: string;
}

export interface NowPlaying {
    title: string;
    artist: string;
    album: string;
    coverImage: string;
    audioSrc: string;
}

export interface PortfolioHero {
    eyebrow: string;
    name: string;
    title: string;
    intro: string;
    portrait: {
        src: string;
        alt: string;
        fallback: string;
    };
    availability: string;
    nowPlaying: NowPlaying;
    primaryAction: PortfolioAction;
    secondaryAction: PortfolioAction;
}

export interface PortfolioSkillGroup {
    name: string;
    items: string[];
}

export interface PortfolioStackItem {
    name: string;
    category: string;
    monogram: string;
    accent: string;
    logo: string;
}

export interface PortfolioProject {
    name: string;
    summary: string;
    role: string;
    stack: string[];
    href: string;
    liveUrl: string | null;
    repoHref: string;
}

export interface PortfolioExperienceItem {
    period: string;
    company: string;
    role: string;
    summary: string;
}

export type PortfolioLinkIcon =
    | 'instagram'
    | 'linkedin'
    | 'facebook'
    | 'gmail'
    | 'phone'
    | 'github';

export interface PortfolioLink {
    label: string;
    href: string;
    icon: PortfolioLinkIcon;
}

export interface Portfolio {
    hero: PortfolioHero;
    stack: {
        title: string;
        heading: string;
        description: string;
        items: PortfolioStackItem[];
    };
    skills: {
        title: string;
        groups: PortfolioSkillGroup[];
    };
    projects: PortfolioProject[];
    experience: {
        title: string;
        items: PortfolioExperienceItem[];
    };
    contact: {
        title: string;
        email: string;
        phone: string;
        location: string;
        links: PortfolioLink[];
    };
}

export interface GitHubActivity {
    username: string | null;
    profileUrl: string | null;
    graphUrl: string | null;
    status: 'ready' | 'unavailable' | 'missing' | string;
    summary: string;
    updatedAt: string | null;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User | null;
    };
};
