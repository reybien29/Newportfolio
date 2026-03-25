<?php

namespace App\Support;

class PortfolioContent
{
    /**
     * @return array{
     *     hero: array{
     *         eyebrow: string,
     *         name: string,
     *         title: string,
     *         intro: string,
     *         portrait: array{src: string, alt: string, fallback: string},
     *         availability: string,
     *         nowPlaying: array{title: string, artist: string, album: string, coverImage: string, audioSrc: string},
     *         primaryAction: array{label: string, href: string},
     *         secondaryAction: array{label: string, href: string}
     *     },
     *     stack: array{
     *         title: string,
     *         heading: string,
     *         description: string,
     *         items: array<int, array{
     *             name: string,
     *             category: string,
     *             monogram: string,
     *             accent: string,
     *             logo: string
     *         }>
     *     },
     *     skills: array{title: string, groups: array<int, array{name: string, items: array<int, string>}>},
     *     projects: array<int, array{
     *         name: string,
     *         summary: string,
     *         role: string,
     *         stack: array<int, string>,
     *         href: string,
     *         liveUrl: string|null,
     *         repoHref: string
     *     }>,
     *     experience: array{title: string, items: array<int, array{
     *         period: string,
     *         company: string,
     *         role: string,
     *         summary: string
     *     }>},
     *     contact: array{
     *         title: string,
     *         email: string,
     *         phone: string,
     *         location: string,
     *         links: array<int, array{
     *             label: string,
     *             href: string,
     *             icon: 'instagram'|'linkedin'|'facebook'|'gmail'|'phone'|'github'
     *         }>
     *     }
     * }
     */
    public function get(): array
    {
        $githubUsername = trim((string) config('services.github.username'));
        $githubProfileUrl = $githubUsername !== ''
            ? 'https://github.com/'.rawurlencode($githubUsername)
            : 'https://github.com/';
        $contactEmail = 'caneja.alum@gmail.com';
        $contactPhone = '09954036332';

        return [
            'hero' => [
                'eyebrow' => 'About Me',
                'name' => 'Hi, I’m Rey Bien!',
                'title' => 'A Computer Science Fresh Graduate based in Cebu, Philippines.',
                'intro' => 'I am passionate about building reliable web applications and learning modern technologies.',
                'portrait' => [
                    'src' => '/images/Gemini_Generated_Image_1ooqy81ooqy81ooq.png',
                    'alt' => 'Portrait of Rey Bien',
                    'fallback' => 'RB',
                ],
                'availability' => 'Available for product builds, redesigns, and full-stack delivery.',
                'nowPlaying' => [
                    'title' => 'Starboy',
                    'artist' => 'The Weeknd ft. Daft Punk',
                    'album' => 'Starboy',
                    'coverImage' => '/images/Gemini_Generated_Image_7ybqte7ybqte7ybq.png',
                    'audioSrc' => '/audio/THEWEEKND_-_S_T_A_R_B_O_Y_(mp3.pm).mp3',
                ],
                'primaryAction' => [
                    'label' => 'View Projects',
                    'href' => '#projects',
                ],
                'secondaryAction' => [
                    'label' => 'Contact Me',
                    'href' => '#contact',
                ],
            ],
            'stack' => [
                'title' => 'Stack',
                'heading' => 'Stacks I use',
                'description' => 'A compact view of the tools and technologies I use daily for building, collaborating, and shipping products.',
                'items' => [
                    [
                        'name' => 'Laravel',
                        'category' => 'Framework',
                        'monogram' => 'Lv',
                        'accent' => '#f05340',
                        'logo' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
                    ],
                    [
                        'name' => 'Cursor',
                        'category' => 'IDE',
                        'monogram' => 'Cu',
                        'accent' => '#00b4d8',
                        'logo' => 'https://www.cursor.com/favicon.ico',
                    ],
                    [
                        'name' => 'VS Code',
                        'category' => 'IDE',
                        'monogram' => 'Vs',
                        'accent' => '#007acc',
                        'logo' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
                    ],
                    [
                        'name' => 'Slack',
                        'category' => 'Communication',
                        'monogram' => 'Sl',
                        'accent' => '#4a154b',
                        'logo' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg',
                    ],
                    [
                        'name' => 'Notion',
                        'category' => 'Productivity',
                        'monogram' => 'No',
                        'accent' => '#ffffff',
                        'logo' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg',
                    ],
                    [
                        'name' => 'ClickUp',
                        'category' => 'Project Mgmt',
                        'monogram' => 'Cu',
                        'accent' => '#7b68ee',
                        'logo' => 'https://clickup.com/landing/images/clickup-symbol_color.svg',
                    ],
                    [
                        'name' => 'WordPress',
                        'category' => 'CMS',
                        'monogram' => 'Wp',
                        'accent' => '#21759b',
                        'logo' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg',
                    ],
                    [
                        'name' => 'React',
                        'category' => 'Frontend',
                        'monogram' => 'Re',
                        'accent' => '#61dafb',
                        'logo' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
                    ],
                    [
                        'name' => 'Vue',
                        'category' => 'Frontend',
                        'monogram' => 'Vu',
                        'accent' => '#4fc08d',
                        'logo' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
                    ],
                    [
                        'name' => 'C#',
                        'category' => 'Language',
                        'monogram' => 'C#',
                        'accent' => '#68217a',
                        'logo' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
                    ],
                    [
                        'name' => 'Docker',
                        'category' => 'DevOps',
                        'monogram' => 'Dk',
                        'accent' => '#2496ed',
                        'logo' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
                    ],
                    [
                        'name' => 'Laragon',
                        'category' => 'Environment',
                        'monogram' => 'Lg',
                        'accent' => '#0099cc',
                        'logo' => 'https://laragon.org/logo.svg',
                    ],
                ],
            ],
            'skills' => [
                'title' => 'Capabilities',
                'groups' => [
                    [
                        'name' => 'Backend',
                        'items' => ['Laravel 12', 'PHP 8.4', 'Eloquent', 'Queues'],
                    ],
                    [
                        'name' => 'Frontend',
                        'items' => ['React 18', 'Inertia v2', 'TypeScript', 'Tailwind'],
                    ],
                    [
                        'name' => 'Delivery',
                        'items' => ['Testing', 'Caching', 'Performance', 'UX structure'],
                    ],
                ],
            ],
            'projects' => [
                [
                    'name' => 'Tournament Management System (TMS)',
                    'summary' => 'A comprehensive platform for organizing sports tournaments, featuring automated bracket generation, team registrations, and real-time standings tracking.',
                    'role' => 'Full-stack Developer',
                    'stack' => ['Laravel', 'Inertia', 'React', 'Tailwind'],
                    'href' => '#contact',
                    'liveUrl' => 'https://event-tkku.onrender.com/',
                    'repoHref' => $githubProfileUrl,
                ],
                [
                    'name' => 'Jusa’s Tropical Smoothie Café',
                    'summary' => 'A vibrant, responsive business website designed for a smoothie café, featuring modern aesthetics, menu showcases, and engaging brand storytelling.',
                    'role' => 'Designer and Developer',
                    'stack' => ['React', 'Tailwind CSS', 'Vite'],
                    'href' => '#contact',
                    'liveUrl' => 'https://jusas.onrender.com/',
                    'repoHref' => $githubProfileUrl,
                ],
                [
                    'name' => 'Laravel CRUD using PostgreSQL Database',
                    'summary' => 'A CRUD application focused on reliable record management, relational database work, and clean Laravel conventions on PostgreSQL.',
                    'role' => 'Full-stack developer',
                    'stack' => ['Laravel', 'PHP', 'PostgreSQL', 'CRUD'],
                    'href' => '#contact',
                    'liveUrl' => 'https://example-app-hey3.onrender.com/',
                    'repoHref' => $githubProfileUrl,
                ],
                [
                    'name' => 'Blog Korean Interior',
                    'summary' => 'A niche online store experience for Korean interior products with editorial presentation, product storytelling, and responsive shopping flows.',
                    'role' => 'Full-stack developer',
                    'stack' => ['Laravel', 'React', 'Tailwind CSS', 'Inertia'],
                    'href' => '#contact',
                    'liveUrl' => 'https://blog-production-e0c5.up.railway.app/',
                    'repoHref' => $githubProfileUrl,
                ],
                [
                    'name' => 'My Bento Portfolio System',
                    'summary' => 'A personal portfolio system designed for maintainability, responsive presentation, and straightforward content updates.',
                    'role' => 'Designer and developer',
                    'stack' => ['Laravel', 'Vite', 'TypeScript', 'React'],
                    'href' => '#contact',
                    'liveUrl' => 'https://newportfolio-production-e477.up.railway.app/',
                    'repoHref' => $githubProfileUrl,
                ],
            ],
            'experience' => [
                'title' => 'Experience',
                'items' => [
                    [
                        'period' => 'Now',
                        'company' => 'Independent',
                        'role' => 'Full-stack Laravel developer',
                        'summary' => 'Building focused digital products with a bias for clean architecture and high-signal UI decisions.',
                    ],
                    [
                        'period' => 'Previously',
                        'company' => 'Product teams',
                        'role' => 'Frontend and backend delivery',
                        'summary' => 'Shipped dashboards, marketing sites, and application flows that balance speed, maintainability, and clarity.',
                    ],
                    [
                        'period' => 'Ongoing',
                        'company' => 'Open source and experimentation',
                        'role' => 'Workflow refinement',
                        'summary' => 'Exploring developer tooling, responsive systems, and interface patterns that scale beyond the first version.',
                    ],
                ],
            ],
            'contact' => [
                'title' => 'Contact',
                'email' => $contactEmail,
                'phone' => $contactPhone,
                'location' => 'Lahug, San. Miguel St. Cebu City, Philippines.',
                'links' => [
                    [
                        'label' => 'Instagram',
                        'href' => 'https://www.instagram.com/rey_biening/',
                        'icon' => 'instagram',
                    ],
                    [
                        'label' => 'LinkedIn',
                        'href' => 'https://www.linkedin.com/in/rey-bien-a-caneja-b6b7692b1/',
                        'icon' => 'linkedin',
                    ],
                    [
                        'label' => 'Facebook',
                        'href' => 'https://www.facebook.com/reybien.caneja',
                        'icon' => 'facebook',
                    ],
                    [
                        'label' => 'GitHub',
                        'href' => $githubProfileUrl,
                        'icon' => 'github',
                    ],
                ],
            ],
        ];
    }
}
