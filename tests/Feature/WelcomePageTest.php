<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class WelcomePageTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
        Cache::flush();
    }

    public function test_welcome_page_returns_portfolio_props_with_ready_github_activity(): void
    {
        config()->set('services.github.username', 'octocat');

        Http::fake([
            'https://ghchart.rshah.org/*' => Http::response(
                '<svg xmlns="http://www.w3.org/2000/svg"></svg>',
                200,
                ['Content-Type' => 'image/svg+xml'],
            ),
        ]);

        $response = $this->get('/');

        $response
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->component('Welcome')
                ->where('portfolio.hero.eyebrow', 'About Me')
                ->where('portfolio.hero.name', 'Hi, I’m Rey Bien!')
                ->where('portfolio.hero.title', 'A Computer Science Freshgraduate based in Cebu, Philippines.')
                ->where('portfolio.hero.intro', 'I am passionate about building reliable web applications and learning modern technologies.')
                ->where('portfolio.hero.portrait.src', '/images/rey-bien-profile.jpg')
                ->where('portfolio.hero.portrait.alt', 'Portrait of Rey Bien')
                ->where('portfolio.hero.portrait.fallback', 'RB')
                ->where('portfolio.hero.availability', 'Available for product builds, redesigns, and full-stack delivery.')
                ->where('portfolio.stack.title', 'Stack')
                ->where('portfolio.stack.heading', 'Stack I use')
                ->where('portfolio.stack.description', 'A compact view of the tools and technologies I use daily for building, collaborating, and shipping products.')
                ->has('portfolio.stack.items', 12)
                ->where('portfolio.stack.items.0.name', 'Laravel')
                ->where('portfolio.stack.items.0.category', 'Framework')
                ->where('portfolio.stack.items.4.name', 'Notion')
                ->where('portfolio.stack.items.8.name', 'Vue')
                ->where('githubActivity.username', 'octocat')
                ->where('githubActivity.status', 'ready')
                ->where('githubActivity.profileUrl', 'https://github.com/octocat')
                ->where('portfolio.contact.email', 'caneja.alum@gmail.com')
                ->where('portfolio.contact.phone', '09954036332')
                ->where('portfolio.contact.location', 'Lahug, San. Miguel St. Cebu City, Philippines.')
                ->missing('portfolio.contact.message')
                ->where('portfolio.contact.links.0.label', 'Instagram')
                ->where('portfolio.contact.links.0.icon', 'instagram')
                ->where('portfolio.contact.links.1.label', 'LinkedIn')
                ->where('portfolio.contact.links.1.icon', 'linkedin')
                ->where('portfolio.contact.links.2.label', 'Facebook')
                ->where('portfolio.contact.links.2.icon', 'facebook')
                ->has('portfolio.projects', 4)
                ->where('portfolio.projects.0.name', 'Laravel CRUD using PostgreSQL Database')
                ->where('portfolio.projects.0.liveUrl', null)
                ->where('portfolio.projects.1.name', 'Konek Contact Management System')
                ->where('portfolio.projects.1.liveUrl', null)
                ->where('portfolio.projects.2.name', 'Blog Korean Interior')
                ->where('portfolio.projects.2.liveUrl', null)
                ->where('portfolio.projects.3.name', 'My Portfolio System')
                ->where('portfolio.projects.3.liveUrl', null)
                ->has('portfolio.skills.groups', 3)
                ->has('portfolio.contact.links', 3)
                ->missing('portfolio.contact.links.3')
                ->etc());
    }

    public function test_welcome_page_returns_fallback_github_activity_when_graph_fetch_fails(): void
    {
        config()->set('services.github.username', 'octocat');
        Cache::flush();

        Http::fake([
            'https://ghchart.rshah.org/*' => Http::response('Down', 500),
        ]);

        $response = $this->get('/');

        $response
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->component('Welcome')
                ->where('githubActivity.username', 'octocat')
                ->where('githubActivity.status', 'unavailable')
                ->where('githubActivity.graphUrl', null)
                ->where('githubActivity.profileUrl', 'https://github.com/octocat')
                ->etc());
    }
}
