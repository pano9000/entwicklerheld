<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\Ticket;
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
        throw new RuntimeException("Not implemented");
    }

    /**
     * @return User
     */
    public function getUserByTicket(int $id): ?User
    {
        throw new RuntimeException("Not implemented");
    }
}
