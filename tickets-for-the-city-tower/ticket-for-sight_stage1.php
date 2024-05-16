<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\Ticket;
use App\Entity\Orders;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use phpDocumentor\Reflection\Types\Integer;
use SebastianBergmann\CodeCoverage\RuntimeException;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    /**
     * @return User
     */
    public function getUserByName(String $name): ?User
    {
        $entityManager = $this->getEntityManager();

        return $entityManager
            ->createQuery("
                SELECT 
                    u
                FROM
                    App\Entity\User u
                WHERE
                    u.name = :name")
            ->setParameter("name", $name)
            ->getSingleResult();
    }

    /**
     * @return User
     */
    public function getUserByTicket(int $id): ?User
    {

        $entityManager = $this->getEntityManager();

        return $entityManager
            ->createQuery("
                SELECT
                    o
                FROM
                    App\Entity\Orders o
                JOIN
                    o.tickets t
                WITH
                    t.id = :ticketId
               ")
            ->setParameter("ticketId", $id)
            ->getSingleResult()
            ->getUser();

        return $res;
    }
}
