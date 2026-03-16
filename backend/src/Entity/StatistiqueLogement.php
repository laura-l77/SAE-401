<?php

namespace App\Entity;

use App\Repository\StatistiqueLogementRepository;
use Doctrine\ORM\Mapping as ORM;
// Import pour que les groupes de sérialisation fonctionnent [cite: 85, 171]
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: StatistiqueLogementRepository::class)]
class StatistiqueLogement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    // On ajoute 'region' pour que l'ID soit visible dans les 3 API [cite: 91, 259]
    #[Groups(['logement', 'departement', 'region'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['logement', 'departement', 'region'])]
    private ?float $construction = null;

    #[ORM\Column]
    #[Groups(['logement', 'departement', 'region'])]
    private ?int $nombreLogement = null;

    #[ORM\ManyToOne(inversedBy: 'statistiqueLogements')]
    #[ORM\JoinColumn(name: 'departement_code', referencedColumnName: 'code')]
    // IMPORTANT : On garde uniquement 'logement' ici.
    // Ne pas ajouter 'departement' ou 'region' ici pour éviter la boucle infinie !
    #[Groups(['logement'])]
    private ?Departement $departement = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['logement', 'departement', 'region'])]
    private ?float $tauxPauvrete = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['logement', 'departement', 'region'])]
    private ?float $tauxLogementsSociaux = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['logement', 'departement', 'region'])]
    private ?float $loyerMoyen = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['logement', 'departement', 'region'])]
    private ?float $populationMoinsvingt = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['logement', 'departement', 'region'])]
    private ?float $tauxChomage = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['logement', 'departement', 'region'])]
    private ?float $ageMoyenParc = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['logement', 'departement', 'region'])]
    private ?float $logementsEnergivores = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['logement', 'departement', 'region'])]
    private ?float $tauxLogementsVacants = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['logement', 'departement', 'region'])]
    private ?float $variationPopulation = null;

    // --- GETTERS ET SETTERS ---

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getConstruction(): ?float
    {
        return $this->construction;
    }

    public function setConstruction(float $construction): static
    {
        $this->construction = $construction;
        return $this;
    }

    public function getNombreLogement(): ?int
    {
        return $this->nombreLogement;
    }

    public function setNombreLogement(int $nombreLogement): static
    {
        $this->nombreLogement = $nombreLogement;
        return $this;
    }

    public function getDepartement(): ?Departement
    {
        return $this->departement;
    }

    public function setDepartement(?Departement $departement): static
    {
        $this->departement = $departement;
        return $this;
    }

    public function getTauxPauvrete(): ?float
    {
        return $this->tauxPauvrete;
    }

    public function setTauxPauvrete(?float $tauxPauvrete): static
    {
        $this->tauxPauvrete = $tauxPauvrete;
        return $this;
    }

    public function getTauxLogementsSociaux(): ?float
    {
        return $this->tauxLogementsSociaux;
    }

    public function setTauxLogementsSociaux(?float $tauxLogementsSociaux): static
    {
        $this->tauxLogementsSociaux = $tauxLogementsSociaux;
        return $this;
    }

    public function getLoyerMoyen(): ?float
    {
        return $this->loyerMoyen;
    }

    public function setLoyerMoyen(?float $loyerMoyen): static
    {
        $this->loyerMoyen = $loyerMoyen;
        return $this;
    }

    public function getPopulationMoinsvingt(): ?float
    {
        return $this->populationMoinsvingt;
    }

    public function setPopulationMoinsvingt(?float $populationMoinsvingt): static
    {
        $this->populationMoinsvingt = $populationMoinsvingt;
        return $this;
    }

    public function getTauxChomage(): ?float
    {
        return $this->tauxChomage;
    }

    public function setTauxChomage(?float $tauxChomage): static
    {
        $this->tauxChomage = $tauxChomage;
        return $this;
    }

    public function getAgeMoyenParc(): ?float
    {
        return $this->ageMoyenParc;
    }

    public function setAgeMoyenParc(?float $ageMoyenParc): static
    {
        $this->ageMoyenParc = $ageMoyenParc;
        return $this;
    }

    public function getLogementsEnergivores(): ?float
    {
        return $this->logementsEnergivores;
    }

    public function setLogementsEnergivores(?float $logementsEnergivores): static
    {
        $this->logementsEnergivores = $logementsEnergivores;
        return $this;
    }

    public function getTauxLogementsVacants(): ?float
    {
        return $this->tauxLogementsVacants;
    }

    public function setTauxLogementsVacants(?float $tauxLogementsVacants): static
    {
        $this->tauxLogementsVacants = $tauxLogementsVacants;
        return $this;
    }

    public function getVariationPopulation(): ?float
    {
        return $this->variationPopulation;
    }

    public function setVariationPopulation(?float $variationPopulation): static
    {
        $this->variationPopulation = $variationPopulation;
        return $this;
    }
}