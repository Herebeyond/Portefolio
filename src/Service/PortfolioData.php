<?php

namespace App\Service;

use Symfony\Component\Yaml\Yaml;

/**
 * Charge les données du portfolio depuis des fichiers YAML.
 * Exposé en tant que variable globale Twig (`portfolio`).
 */
final class PortfolioData
{
    /** @var array<string, array<string, mixed>> */
    private array $cache = [];

    public function __construct(private readonly string $dataDir)
    {
    }

    /** @return array<string, mixed> */
    public function getIdentity(): array
    {
        return $this->load('identity');
    }

    /** @return list<array<string, mixed>> */
    public function getProjects(): array
    {
        return $this->load('projects')['projects'] ?? [];
    }

    /** @return list<array<string, mixed>> */
    public function getFormations(): array
    {
        return $this->load('education')['formations'] ?? [];
    }

    /** @return list<array<string, mixed>> */
    public function getExperiences(): array
    {
        return $this->load('education')['experiences'] ?? [];
    }

    /** @return list<array<string, mixed>> */
    public function getCertifications(): array
    {
        return $this->load('skills')['certifications'] ?? [];
    }

    /** @return list<array<string, mixed>> */
    public function getLanguages(): array
    {
        return $this->load('skills')['languages'] ?? [];
    }

    /** @return list<array<string, mixed>> */
    public function getTools(): array
    {
        return $this->load('skills')['tools'] ?? [];
    }

    /** @return array<string, mixed> */
    private function load(string $name): array
    {
        if (!isset($this->cache[$name])) {
            $path = $this->dataDir.'/'.$name.'.yaml';
            $this->cache[$name] = is_file($path) ? (Yaml::parseFile($path) ?? []) : [];
        }

        return $this->cache[$name];
    }
}
