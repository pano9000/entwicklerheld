<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Category;
use App\Entity\Training;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class LeaderBoardController extends AbstractController
{
    /**
     * @Route("/get_total_distance/")
     * @param Request $request
     */
    public function getTotalDistance(Request $request)
    {
        // Start here for scenario 1
    }

    /**
     * @Route("/get_leaderboard/")
     * @param Request $request
     */
    public function getLeaderBoard(Request $request)
    {
        // Start here for scenario 3
    }
}
