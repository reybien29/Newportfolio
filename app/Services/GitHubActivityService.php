<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Throwable;

class GitHubActivityService
{
    /**
     * @return array{
     *     username: string|null,
     *     profileUrl: string|null,
     *     graphUrl: string|null,
     *     status: string,
     *     summary: string,
     *     updatedAt: string|null
     * }
     */
    public function getActivity(): array
    {
        $username = trim((string) config('services.github.username'));

        if ($username === '') {
            return $this->fallback(
                username: null,
                status: 'missing',
                summary: 'Add a GitHub username to display the live contribution graph.',
            );
        }

        $cacheTtl = now()->addMinutes(
            max(1, (int) config('services.github.activity_cache_ttl', 60))
        );

        return Cache::remember(
            $this->cacheKey($username),
            $cacheTtl,
            fn (): array => $this->resolveActivity($username),
        );
    }

    public function graphUrl(string $username): string
    {
        return sprintf(
            (string) config('services.github.activity_graph_url'),
            rawurlencode($username),
        );
    }

    protected function cacheKey(string $username): string
    {
        return 'portfolio.github.activity.'.Str::lower($username);
    }

    /**
     * @return array{
     *     username: string,
     *     profileUrl: string,
     *     graphUrl: string|null,
     *     status: string,
     *     summary: string,
     *     updatedAt: string|null
     * }
     */
    protected function resolveActivity(string $username): array
    {
        $graphUrl = $this->graphUrl($username);
        $profileUrl = 'https://github.com/'.rawurlencode($username);

        try {
            $response = Http::accept('image/svg+xml')
                ->timeout(10)
                ->get($graphUrl);

            if (! $response->successful()) {
                throw new \RuntimeException('GitHub activity graph request failed.');
            }

            $contentType = (string) $response->header('Content-Type');

            if ($contentType !== '' && ! Str::contains($contentType, ['svg', 'xml'])) {
                throw new \RuntimeException('GitHub activity graph response was not SVG.');
            }

            return [
                'username' => $username,
                'profileUrl' => $profileUrl,
                'graphUrl' => $graphUrl,
                'status' => 'ready',
                'summary' => 'Live contribution activity synced from GitHub.',
                'updatedAt' => now()->toIso8601String(),
            ];
        } catch (Throwable) {
            return $this->fallback(
                username: $username,
                status: 'unavailable',
                summary: 'GitHub activity is temporarily unavailable. Visit the profile directly for the latest contributions.',
                profileUrl: $profileUrl,
            );
        }
    }

    /**
     * @return array{
     *     username: string|null,
     *     profileUrl: string|null,
     *     graphUrl: string|null,
     *     status: string,
     *     summary: string,
     *     updatedAt: string|null
     * }
     */
    protected function fallback(
        ?string $username,
        string $status,
        string $summary,
        ?string $profileUrl = null,
    ): array {
        return [
            'username' => $username,
            'profileUrl' => $profileUrl,
            'graphUrl' => null,
            'status' => $status,
            'summary' => $summary,
            'updatedAt' => null,
        ];
    }
}
