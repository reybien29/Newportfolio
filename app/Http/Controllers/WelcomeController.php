<?php

namespace App\Http\Controllers;

use App\Services\GitHubActivityService;
use App\Support\PortfolioContent;
use Inertia\Inertia;
use Inertia\Response;

class WelcomeController extends Controller
{
    public function __construct(
        protected PortfolioContent $portfolioContent,
        protected GitHubActivityService $gitHubActivityService,
    ) {}

    public function __invoke(): Response
    {
        return Inertia::render('Welcome', [
            'portfolio' => $this->portfolioContent->get(),
            'githubActivity' => $this->gitHubActivityService->getActivity(),
        ]);
    }
}
