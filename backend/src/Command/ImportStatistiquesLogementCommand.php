<?php


namespace App\Command;


use App\Entity\Departement;
use App\Entity\StatistiqueLogement;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;


#[AsCommand(
   name: 'app:import:stats-logement',
   description: 'Import des statistiques logement depuis un CSV'
)]
class ImportStatistiquesLogementCommand extends Command
{
   public function __construct(private EntityManagerInterface $em)
   {
       parent::__construct();
   }


   protected function configure(): void
   {
       $this
           ->setDescription('Import des statistiques logement depuis un CSV')
           ->addArgument('file', InputArgument::REQUIRED, 'Chemin du fichier CSV');
   }


   protected function execute(InputInterface $input, OutputInterface $output): int
   {
       $filePath = $input->getArgument('file');


       if (!is_readable($filePath)) {
           $output->writeln('<error>Fichier introuvable ou illisible</error>');
           return Command::FAILURE;
       }


       $handle = fopen($filePath, 'r');
       if (!$handle) {
           $output->writeln('<error>Impossible d’ouvrir le fichier</error>');
           return Command::FAILURE;
       }


       $separator = ';';
       $batchSize = 50;
       $i = 0;


       // HEADER
       $header = fgetcsv($handle, 0, $separator);
       if ($header === false) {
           $output->writeln('<error>CSV vide</error>');
           return Command::FAILURE;
       }


       $header = array_map([$this, 'normalizeHeader'], $header);


       while (($row = fgetcsv($handle, 0, $separator)) !== false) {


           // Ignore lignes vides
           if ($row === [null] || count(array_filter($row)) === 0) {
               continue;
           }


           if (count($row) !== count($header)) {
               $output->writeln('<comment>Ligne ignorée (mauvais nombre de colonnes)</comment>');
               continue;
           }


           $data = array_combine($header, $row);


           if ($data === false) {
               continue;
           }



           $rawCode = trim($data['code_departement'] ?? '');


           if ($rawCode === '') {
               // ligne invalide → on ignore
               continue;
           }


           $code = $this->formatCodeDepartement($rawCode);


           if ($code === null) {
               continue;
           }


           $departement = $this->em
               ->getRepository(Departement::class)
               ->find($code);


           if (!$departement) {
               $output->writeln("<comment>Département absent : $code</comment>");
               continue;
           }




// On récupère les données par leur position dans la ligne ($row)
$rawCode = trim($row[1] ?? ''); // Index 1 : code_departement
if ($rawCode === '') continue;

$code = $this->formatCodeDepartement($rawCode);
$departement = $this->em->getRepository(Departement::class)->find($code);

if (!$departement) {
    $output->writeln("<comment>Département absent : $code</comment>");
    continue;
}

$stat = new StatistiqueLogement();
$stat->setDepartement($departement);

// On mappe selon les index de ton dump
$stat->setConstruction($this->decimal($row[20])); // Index 20
$stat->setNombreLogement($this->int($row[21]));   // Index 21
$stat->setTauxPauvrete($this->decimal($row[13])); // Index 13
$stat->setTauxLogementsSociaux($this->decimal($row[16])); // Index 16
$stat->setLoyerMoyen($this->decimal($row[27]));  // Index 27
$stat->setPopulationMoinsvingt($this->decimal($row[10])); // Index 10
$stat->setTauxChomage($this->decimal($row[12])); // Index 12
$stat->setAgeMoyenParc($this->decimal($row[28])); // Index 28
$stat->setLogementsEnergivores($this->decimal($row[29])); // Index 29
$stat->setTauxLogementsVacants($this->decimal($row[17])); // Index 17
$stat->setVariationPopulation($this->decimal($row[7]));  // Index 7

$this->em->persist($stat);


           if (($i % $batchSize) === 0 && $i > 0) {
               $this->em->flush();
               $this->em->clear(StatistiqueLogement::class);
           }


           $i++;
       }


       $this->em->flush();
       fclose($handle);


       $output->writeln("<info>Import terminé : $i lignes</info>");


       return Command::SUCCESS;
   }


   private function normalizeHeader(string $value): string
   {
       $value = preg_replace('/^\xEF\xBB\xBF/', '', $value);


       $encoding = mb_detect_encoding($value, ['UTF-8','ISO-8859-1','Windows-1252'], true);
       if ($encoding !== 'UTF-8') {
           $value = mb_convert_encoding($value, 'UTF-8', $encoding);
       }


       $value = trim($value);
       $value = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $value);
       $value = strtolower($value);


       $value = str_replace(
           [' ', '-', '%', '(', ')', '/', '*', ',', '€', '²', "'"],
           '_',
           $value
       );


       $value = preg_replace('/_+/', '_', $value);


       return trim($value, '_');
   }


   private function decimal($value): ?string
   {
       if ($value === null || $value === '') {
           return null;
       }
       return number_format((float)$value, 16, '.', '');
   }


   private function int($value): ?int
   {
       if ($value === null || $value === '') {
           return null;
       }
       return (int)$value;
   }


   private function formatCodeDepartement(string $code): ?string
   {
       $code = trim($code);
       if ($code === '') {
           return null;
       }
       if (in_array($code, ['2A', '2B'])) {
           return $code;
       }
       if (strlen($code) === 3) {
           return $code;
       }


       return str_pad($code, 2, '0', STR_PAD_LEFT);
   }
}
