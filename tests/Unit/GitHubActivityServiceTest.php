<?php

namespace Tests\Unit;

use App\Services\GitHubActivityService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class GitHubActivityServiceTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        Cache::flush();
    }

    public function test_it_builds_the_graph_url_and_caches_successful_activity_results(): void
    {
        config()->set('services.github.username', 'octocat');
        config()->set('services.github.activity_graph_url', 'https://ghchart.rshah.org/%s');

        Http::fake([
            'https://ghchart.rshah.org/*' => Http::response(
                '<svg xmlns="http://www.w3.org/2000/svg"></svg>',
                200,
                ['Content-Type' => 'image/svg+xml'],
            ),
        ]);

        $service = $this->app->make(GitHubActivityService::class);

        $first = $service->getActivity();
        $second = $service->getActivity();

        $this->assertSame(
            'https://ghchart.rshah.org/octocat',
            $service->graphUrl('octocat'),
        );
        $this->assertSame('ready', $first['status']);
        $this->assertSame('https://ghchart.rshah.org/octocat', $first['graphUrl']);
        $this->assertSame($first, $second);

        Http::assertSentCount(1);
    }

    public function test_it_returns_a_fallback_payload_when_the_graph_request_fails(): void
    {
        config()->set('services.github.username', 'octocat');

        Http::fake([
            'https://ghchart.rshah.org/*' => Http::response('Down', 500),
        ]);

        $result = $this->app->make(GitHubActivityService::class)->getActivity();

        $this->assertSame('unavailable', $result['status']);
        $this->assertNull($result['graphUrl']);
        $this->assertSame('octocat', $result['username']);
        $this->assertSame('https://github.com/octocat', $result['profileUrl']);
    }
}
