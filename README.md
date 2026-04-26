# Portfolio — Benjamin Baillard

Portfolio personnel de Benjamin Baillard, étudiant en BTS SIO SLAM, réalisé avec **Symfony 7.4** et **AssetMapper** (sans Node).

## 🚀 Démarrage rapide

### Prérequis
- PHP **≥ 8.2** avec extensions `ctype` et `iconv`
- [Composer](https://getcomposer.org/)
- (Optionnel) [Symfony CLI](https://symfony.com/download)

### Installation
```bash
composer install
```

### Lancer le serveur de développement
Avec la Symfony CLI :
```bash
symfony serve -d
```
Ou avec le serveur PHP intégré :
```bash
php -S localhost:8000 -t public
```

Le site est ensuite disponible sur <http://localhost:8000>.

## 🗂️ Architecture

```
config/
  portfolio/          # Données du portfolio (YAML)
    identity.yaml     # Identité, description, intérêts
    projects.yaml     # Liste des projets
    education.yaml    # Formations + expériences
    skills.yaml       # Certifications + langages + outils
  routes.yaml         # Routes (toutes via TemplateController)
src/
  Service/
    PortfolioData.php # Charge les YAML, exposé en global Twig `portfolio`
templates/
  base.html.twig      # Layout (SEO, JSON-LD, footer, a11y)
  home/               # Présentation + À propos fusionnées
  projects/  skills/  education/  veille/
assets/
  app.js              # JS (a11y, theme, scroll animations)
  styles/app.css
  images/
```

## ✏️ Modifier le contenu

Tout le contenu éditorial vit dans `config/portfolio/*.yaml`. Pas de PHP à toucher pour ajouter un projet, une formation ou une certification. Vider le cache après modification :
```bash
bin/console cache:clear
```

## 🔧 Pages

| Route             | URL              | Template                       |
| ----------------- | ---------------- | ------------------------------ |
| `app_home`        | `/`              | `home/index.html.twig`         |
| `app_skills`      | `/competences`   | `skills/index.html.twig`       |
| `app_projects`    | `/projets`       | `projects/index.html.twig`     |
| `app_education`   | `/formation`     | `education/index.html.twig`    |
| `app_veille`      | `/veille`        | `veille/index.html.twig`       |

## 🎨 Thème

- Mode clair / sombre persistant via `localStorage` + `prefers-color-scheme`.
- Bouton de bascule en haut à droite.

## ♿ Accessibilité

- Navigation clavier (skip-link, `:focus-visible`).
- `aria-expanded`, `aria-controls`, `aria-label` sur les contrôles interactifs.
- Respect de `prefers-reduced-motion`.

## 📦 Déploiement

Voir [DEPLOYMENT.md](DEPLOYMENT.md).
