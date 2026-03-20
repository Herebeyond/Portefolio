# Déploiement du Portfolio — Symfony / Alwaysdata

## Prérequis

- PHP >= 8.2
- Composer
- Git
- Un compte [Alwaysdata](https://www.alwaysdata.com/fr/) (plan gratuit 100 Mo)

---

## 1. Créer un compte Alwaysdata

1. Aller sur [alwaysdata.com](https://www.alwaysdata.com/fr/)
2. Créer un compte gratuit (plan 100 Mo)
3. Un sous-domaine sera attribué automatiquement : `toncompte.alwaysdata.net`

---

## 2. Se connecter en SSH

```bash
ssh toncompte@ssh-toncompte.alwaysdata.net
```

Le mot de passe est celui du compte Alwaysdata.

---

## 3. Cloner le dépôt et installer les dépendances

```bash
cd www
rm -rf *
git clone https://github.com/Herebeyond/Portefolio.git .
echo "APP_ENV=prod" > .env.local
echo "APP_SECRET=$(openssl rand -hex 16)" >> .env.local
composer install --no-dev --optimize-autoloader
php bin/console importmap:install
php bin/console asset-map:compile
```

---

## 4. Configurer l'environnement de production

```bash
echo "APP_ENV=prod" > .env.local
echo "APP_SECRET=$(openssl rand -hex 16)" >> .env.local
php bin/console cache:clear --env=prod
```

---

## 5. Configurer le site dans le panel Alwaysdata

1. Se connecter sur [admin.alwaysdata.com](https://admin.alwaysdata.com)
2. Aller dans **Web > Sites**
3. Modifier le site existant (ou en créer un nouveau)
4. Configurer les champs suivants :
   - **Type** : `PHP`
   - **Racine du document (Document Root)** : `/www/public/`
   - **Version PHP** : `8.2` (ou supérieur)
5. Sauvegarder

---

## 6. Accéder au site

Le portfolio est accessible à l'adresse :
```
https://toncompte.alwaysdata.net
```

---

## Mise à jour du site

### Sur le PC local (après modifications)

```bash
git add -A
git commit -m "description du changement"
git push
```

### Sur Alwaysdata (en SSH)

```bash
cd www
git pull
composer install --no-dev --optimize-autoloader
php bin/console importmap:install
php bin/console asset-map:compile
php bin/console cache:clear --env=prod
```

### Mise à jour rapide (templates Twig ou CSS/JS uniquement)

Si seuls les templates ou les fichiers CSS/JS ont été modifiés (pas de nouvelles dépendances) :

```bash
cd www
git pull
php bin/console asset-map:compile
php bin/console cache:clear --env=prod
```

Les étapes `composer install` et `importmap:install` ne sont nécessaires que si des dépendances PHP ou JavaScript ont été ajoutées/modifiées.

---

## Structure du projet

```
Portefolio/
├── assets/              # CSS et JavaScript (AssetMapper)
│   ├── app.js
│   └── styles/
│       └── app.css
├── config/              # Configuration Symfony
├── public/              # Racine web (Document Root)
│   └── index.php
├── src/
│   └── Controller/      # Controllers (générés via make:controller)
│       ├── HomeController.php         → /
│       ├── AboutController.php        → /a-propos
│       ├── SkillsController.php       → /competences
│       ├── ProjectsController.php     → /projets
│       ├── EducationController.php    → /formation
│       └── ContactController.php      → /contact
├── templates/           # Templates Twig
│   ├── base.html.twig   # Layout principal (navbar + footer)
│   ├── home/
│   ├── about/
│   ├── skills/
│   ├── projects/
│   ├── education/
│   └── contact/
├── composer.json
└── DEPLOYMENT.md        # Ce fichier
```

## Routes

| Route          | Page         | Controller             |
|----------------|--------------|------------------------|
| `/`            | Accueil      | HomeController         |
| `/a-propos`    | À propos     | AboutController        |
| `/competences` | Compétences  | SkillsController       |
| `/projets`     | Projets      | ProjectsController     |
| `/formation`   | Formation    | EducationController    |
| `/contact`     | Contact      | ContactController      |

## Commandes utiles

```bash
# Vider le cache
php bin/console cache:clear

# Lister les routes
php bin/console debug:router

# Lancer le serveur local
php -S localhost:8000 -t public/
```
