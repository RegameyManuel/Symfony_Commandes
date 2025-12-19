# Présentation de Symfony

## Introduction générale

Symfony est un framework PHP destiné au développement d’applications web professionnelles. Il ne s’agit pas simplement d’un ensemble d’outils, mais d’un **cadre de travail structurant**, conçu pour aider le développeur à organiser son code, à séparer les responsabilités et à construire des applications maintenables sur le long terme.

Contrairement à un simple ensemble de fonctions, Symfony repose sur des principes forts issus de la Programmation Orientée Objet : modularité, réutilisabilité, découplage et extensibilité. Il fournit une architecture prête à l’emploi, tout en laissant une grande liberté dans les choix techniques.

Symfony est aujourd’hui largement utilisé dans le monde professionnel, aussi bien pour des applications internes que pour des plateformes web complexes.

---

## Philosophie et objectifs de Symfony

Symfony vise à répondre à plusieurs problématiques rencontrées dans les projets PHP de taille moyenne à grande :

* éviter le code spaghetti et les fichiers surchargés
* imposer une organisation claire et cohérente
* favoriser la réutilisation de composants éprouvés
* faciliter le travail en équipe
* garantir la maintenabilité et l’évolutivité du code

Symfony n’impose pas une manière unique de faire, mais fournit des conventions solides. Le développeur peut choisir d’utiliser tout le framework ou seulement certains composants selon ses besoins.

---

## Mise en place d’un projet Symfony

La mise en place d’un projet Symfony s’effectue en plusieurs étapes. Ces étapes sont importantes car elles conditionnent la stabilité et la fiabilité de l’environnement de développement.

### Vérification des prérequis

Avant de créer un projet, il est indispensable de vérifier que l’environnement de développement est compatible avec Symfony.

```bash
symfony check:requirements
```

Cette commande permet de s’assurer que :

* la version de PHP est compatible
* les extensions PHP nécessaires sont installées
* les paramètres essentiels de PHP sont correctement configurés

Cette étape permet d’éviter de nombreux problèmes ultérieurs.

---

### Création d’un nouveau projet

La création d’un projet Symfony s’effectue à l’aide de l’outil en ligne de commande Symfony CLI.

Pour créer un projet Symfony en version 6.4 nommé `MonProjet` :

```bash
symfony new MonProjet --version="6.4.*" --webapp
```

Cette commande :

* crée l’arborescence du projet
* installe les dépendances essentielles
* prépare une application web complète prête à démarrer

Le mode `--webapp` inclut les composants nécessaires au développement web (Twig, sécurité, formulaires, etc.).

---

### Démarrage du serveur de développement

Symfony intègre un serveur web local optimisé pour le développement.

Pour démarrer le serveur :

```bash
symfony serve
```

Pour le lancer en arrière-plan (mode daemon) :

```bash
symfony serve -d
```

Par défaut, l’application est accessible à l’adresse suivante :

```
http://127.0.0.1:8000
```

---

### HTTPS en environnement de développement

Le serveur Symfony supporte HTTPS nativement. Pour activer une connexion sécurisée, un certificat TLS est nécessaire. Symfony fournit une commande permettant de générer et d’installer un certificat auto-signé destiné au développement local.

```bash
symfony server:ca:install
```

Cette commande :

* crée une autorité de certification locale
* génère un certificat TLS
* configure automatiquement le navigateur pour le reconnaître

Ce certificat est strictement réservé au développement local et ne doit jamais être utilisé en production.

---

### Gestion du serveur Symfony

Pour arrêter les serveurs en cours d’exécution :

```bash
symfony server:stop
```

Pour vérifier l’état du serveur :

```bash
symfony server:status
```

Ces commandes permettent de gérer facilement l’environnement de développement sans dépendre d’un serveur externe.

---

## Ajout de composants et bundles

Symfony repose sur un système de **bundles** et de **composants** installés via Composer. Cette approche permet d’ajouter uniquement les fonctionnalités nécessaires.

### Installation de Twig

Twig est le moteur de templates utilisé par Symfony pour générer du HTML de manière sécurisée et structurée.

```bash
composer require symfony/twig-bundle
```

---

### Installation du MakerBundle

Le MakerBundle fournit des commandes facilitant la génération de code standardisé.

```bash
composer require symfony/maker-bundle --dev
```

Ce bundle est utilisé uniquement en environnement de développement.

---

## Création d’un contrôleur

Un contrôleur est une classe PHP chargée de traiter une requête HTTP et de retourner une réponse.

Pour créer un contrôleur nommé `MonController` :

```bash
symfony console make:controller MonController
```

Cette commande génère :

* une classe de contrôleur
* un template Twig associé
* une route par défaut

Pour afficher la liste complète des routes de l’application :

```bash
php bin/console debug:router
```

---

## Gestion de la base de données avec Doctrine

Symfony s’appuie généralement sur Doctrine ORM pour la gestion de la base de données. Doctrine permet de manipuler les données via des objets PHP plutôt que d’écrire directement du SQL.

### Installation de Doctrine

```bash
composer require symfony/orm-pack
```

---

### Configuration de la connexion à la base de données

La configuration s’effectue dans le fichier `.env.local`.

```plaintext
DATABASE_URL="mysql://Utilisateur:MotDePasse@127.0.0.1:3306/village_green?serverVersion=mariadb-10.6.7&charset=utf8mb4"
```

Ce fichier n’est jamais versionné et contient les informations sensibles propres à l’environnement local.

---

### Gestion de la base de données

Créer la base de données :

```bash
php bin/console doctrine:database:create
```

Supprimer la base de données :

```bash
php bin/console doctrine:database:drop --force
```

---

### Entités et schéma

Une entité représente une table de la base de données sous forme d’objet PHP.

Créer une entité :

```bash
php bin/console make:entity MonEntity
```

Mettre à jour une entité existante :

```bash
php bin/console make:entity MonEntity --regenerate
```

Mettre à jour le schéma de la base de données :

```bash
php bin/console doctrine:schema:update --force
```

---

### Migrations

Les migrations permettent de versionner les évolutions de la base de données.

Créer une migration :

```bash
php bin/console make:migration
```

Appliquer les migrations :

```bash
php bin/console doctrine:migrations:migrate
```

---

### Données de test avec Fixtures et Faker

Les fixtures permettent d’insérer des données de test dans la base.

```bash
composer require --dev orm-fixtures
composer require fakerphp/faker
```

Charger les données :

```bash
php bin/console doctrine:fixtures:load
```

---

## Génération automatique de code

Symfony propose plusieurs commandes pour accélérer le développement :

* Formulaires :

```bash
symfony console make:form
```

* CRUD complet :

```bash
symfony console make:crud
```

* Gestion des utilisateurs et de l’authentification :

```bash
symfony console make:user
symfony console make:auth
```

* Formulaire d’inscription :

```bash
symfony console make:registration-form
```

* Vérification d’email (SymfonyCasts)

```bash
composer require symfonycasts/verify-email-bundle
```

---

## Gestion du cache

Symfony utilise un système de cache très performant.

Pour vider le cache :

```bash
symfony console cache:clear
```

ou

```bash
php bin/console cache:clear
```

Ces deux commandes sont équivalentes. Il peut également être nécessaire de vider le cache du navigateur.

---

## Conclusion

Symfony fournit un cadre robuste pour développer des applications web modernes en PHP. Grâce à son architecture claire, son écosystème riche et ses outils de productivité, il permet de construire des applications fiables, sécurisées et évolutives.

La maîtrise progressive de Symfony repose avant tout sur une bonne compréhension de la POO, des responsabilités des composants et de la logique applicative. Une fois ces bases acquises, Symfony devient un allié puissant pour le développement professionnel.
