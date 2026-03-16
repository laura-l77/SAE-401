<?php

namespace App\Controller;

use App\Entity\Departement;
use App\Entity\Region;
use App\Entity\StatistiqueLogement;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

final class StatistiqueController extends AbstractController
{
    //api 1 liste statistiques logement (données brutes)
    public function logement(EntityManagerInterface $entityManager): Response
    {
        $statistiques = $entityManager->getRepository(StatistiqueLogement::class)->findAll();
        return $this->json($statistiques, 200, [], ['groups' => 'logement']);
    }

    //api 2 statistiques par département
    public function departement(EntityManagerInterface $entityManager): Response
    {
        $departements = $entityManager->getRepository(Departement::class)->findAll();
        return $this->json($departements, 200, [], ['groups' => 'departement']);
    }

    //api 3 statistiques par Région 
    public function region(EntityManagerInterface $entityManager): Response
    {
        $regions = $entityManager->getRepository(Region::class)->findAll();
        return $this->json($regions, 200, [], ['groups' => 'region']);
    }
}