<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260313132815 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE statistique_logement ADD taux_pauvrete DOUBLE PRECISION DEFAULT NULL, ADD taux_logements_sociaux DOUBLE PRECISION DEFAULT NULL, ADD loyer_moyen DOUBLE PRECISION DEFAULT NULL, ADD population_moinsvingt DOUBLE PRECISION DEFAULT NULL, ADD taux_chomage DOUBLE PRECISION DEFAULT NULL, ADD age_moyen_parc DOUBLE PRECISION DEFAULT NULL, ADD logements_energivores DOUBLE PRECISION DEFAULT NULL, ADD taux_logements_vacants DOUBLE PRECISION DEFAULT NULL, ADD variation_population DOUBLE PRECISION DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE statistique_logement DROP taux_pauvrete, DROP taux_logements_sociaux, DROP loyer_moyen, DROP population_moinsvingt, DROP taux_chomage, DROP age_moyen_parc, DROP logements_energivores, DROP taux_logements_vacants, DROP variation_population');
    }
}
