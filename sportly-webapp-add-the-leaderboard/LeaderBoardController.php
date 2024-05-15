<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Category;
use App\Entity\Training;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\Routing\Annotation\Route;

// uses Symfony v4

class LeaderBoardController extends AbstractController
{
    const MAX_BOARD_RESULTS = 10;
    const MAX_BOARD_TOP_RESULTS = 3;
    const MAX_BOARD_AFTERUSER_RESULTS = 2;
    /**
     * @Route("/get_total_distance/")
     * @param Request $request
     */
    public function getTotalDistance(Request $request)
    {
        
        //in production there would be a user input validation here, to make sure category is in a "whitelist" of allowed inputs
        $categoryQueryParam = ucfirst($request->query->get('category'));

        $dql = 
            "SELECT SUM(t.value) AS totalDistance FROM App\Entity\Training t " .
            "JOIN t.category c " .
            "WHERE t.user = :userId" .
            (($categoryQueryParam) ? " AND c.name = :category" : "");

        $totalDistanceQb =  $this
            ->getDoctrine()
            ->getManager()
            ->createQuery($dql)
            ->setMaxResults(1)
            ->setParameter("userId", $this->getUser()->getId());

        if ($categoryQueryParam) {
            $totalDistanceQb->setParameter("category", $categoryQueryParam);
        }

        $totalDistanceResult = $totalDistanceQb->getSingleScalarResult();
        
        return $this->json(array("totalDistance" => (int)$totalDistanceResult));

    }

    /**
     * @Route("/get_leaderboard/")
     * @param Request $request
     */
    public function getLeaderBoard(Request $request) {

        // the test data all only have "Running" as category, but it would make sense to be able to filter for other categories,
        // so let's assume there is a "category" query parameter used here as well, even though it is not part of the tests
        // in production there would be a user input validation here, to make sure category is in a "whitelist" of allowed inputs
        $categoryQueryParam = ucfirst($request->query->get('category'));

        $em = $this
            ->getDoctrine()
            ->getManager();
        
        $usersScoreResults = ($categoryQueryParam) 
            ? $em
                ->createQuery($this->getLeaderboardDql(true))
                ->setParameter("category", $categoryQueryParam)
                ->getResult()
            : $em
                ->createQuery($this->getLeaderboardDql())
                ->getResult();

        $this->addPositionCount($usersScoreResults);

        $userIndex = $this->findUserIndexInLeaderBoardResult($this->getUser()->getUsername(), $usersScoreResults);

        if ($userIndex == -1) {
            print_r("User not found in result, this should not happen.");
            throw new \Exception('Something went wrong!');
        }

        $result;
        if ($userIndex < self::MAX_BOARD_RESULTS - self::MAX_BOARD_AFTERUSER_RESULTS) {
            $result = array_slice($usersScoreResults, 0, self::MAX_BOARD_RESULTS);
        } else {
            $resultTop = array_slice($usersScoreResults, 0, self::MAX_BOARD_TOP_RESULTS);
            $resultAfterUser = array_slice($usersScoreResults, $userIndex, self::MAX_BOARD_AFTERUSER_RESULTS + 1);
            $remainingPlaces = self::MAX_BOARD_RESULTS - self::MAX_BOARD_TOP_RESULTS - count($resultAfterUser);
            $resultFillup = array_slice($usersScoreResults, $userIndex - $remainingPlaces, $remainingPlaces);

            $result = array_merge(array_merge($resultTop, $resultFillup), $resultAfterUser);
        }

        return $this->json($result);

    }

    // in production I would rather implement a Doctrine function to be bale to use the row_over wwindow function
    private function addPositionCount(array &$results) {

        $posCount = 0;
        foreach ($results as &$entry) {
            $posCount++;
            $entry["position"] = $posCount;
        }

    }

    private function getLeaderboardDql(bool $category = false, string $orderBy = "DESC"): string {
        
        // there's no ROW_NUMBER() function available here unfortunately
        return "
            SELECT
                0 AS position,
                SUM(t.value) AS score,
                u.username as name
            FROM 
                App\Entity\Training t
            JOIN
                t.user u
            JOIN
                t.category c
            WHERE 1=1" . (($category) ? " AND c.name = :category" : "") . "
            GROUP BY
                u.id
            ORDER BY
                score $orderBy,
                name ASC
        ";
    }

    private function findUserIndexInLeaderBoardResult(string $username, array $results): int {
        
        for ($i = 0; $i < count($results); $i++) {
            if ($results[$i]["name"] == $username) {
                return $i;
            }
        }

        return -1;
    }

}
