<?php

namespace App\Entity;

use App\Repository\DepartementRepository;
use Doctrine\Common\Collections\ArrayCollection; // Requis pour l'initialisation [cite: 263]
use Doctrine\Common\Collections\Collection;      // Requis pour le typage [cite: 264]
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups; // Requis pour l'API [cite: 266]

#[ORM\Entity(repositoryClass: DepartementRepository::class)]
class Departement
{
    #[ORM\Id]
    #[ORM\Column(length: 3)]
    // On ajoute 'region' pour que le code s'affiche dans l'API Région [cite: 272, 452]
    #[Groups(['logement', 'departement', 'region'])] 
    private ?string $code = null;

    #[ORM\Column(length: 255)]
    // On ajoute 'region' pour que le nom s'affiche dans l'API Région [cite: 275, 452]
    #[Groups(['logement', 'departement', 'region'])]
    private ?string $nom = null;

    #[ORM\ManyToOne(inversedBy: 'departements')]
    #[ORM\JoinColumn(name: "code_region", referencedColumnName: "code", nullable: false)]
    // On garde 'departement' pour voir la région quand on liste les départements [cite: 370]
    #[Groups(['departement'])]
    private ?Region $codeRegion = null;

    /**
     * Relation vers les statistiques liées à ce département [cite: 283]
     */
    #[ORM\OneToMany(targetEntity: StatistiqueLogement::class, mappedBy: 'departement')]
    // On ajoute 'region' ici pour que les stats descendent jusqu'à la région [cite: 284, 452]
    #[Groups(['departement', 'region'])] 
    private Collection $statistiqueLogements;

    public function __construct()
    {
        // Initialisation obligatoire de la collection [cite: 286, 288]
        $this->statistiqueLogements = new ArrayCollection();
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): static
    {
        $this->code = $code;
        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;
        return $this;
    }

    public function getCodeRegion(): ?Region
    {
        return $this->codeRegion;
    }

    public function setCodeRegion(?Region $codeRegion): static
    {
        $this->codeRegion = $codeRegion;
        return $this;
    }

    /**
     * @return Collection<int, StatistiqueLogement>
     */
    public function getStatistiqueLogements(): Collection
    {
        return $this->statistiqueLogements;
    }

    public function addStatistiqueLogement(StatistiqueLogement $statistiqueLogement): static
    {
        if (!$this->statistiqueLogements->contains($statistiqueLogement)) {
            $this->statistiqueLogements->add($statistiqueLogement);
            $statistiqueLogement->setDepartement($this);
        }

        return $this;
    }

    public function removeStatistiqueLogement(StatistiqueLogement $statistiqueLogement): static
    {
        if ($this->statistiqueLogements->removeElement($statistiqueLogement)) {
            if ($statistiqueLogement->getDepartement() === $this) {
                $statistiqueLogement->setDepartement(null);
            }
        }

        return $this;
    }
}