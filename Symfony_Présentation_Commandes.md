# Présentation Symfony

Symfony est un framework PHP pour le développement d'applications web. Il fournit une architecture, des composants et des outils pour que les développeurs puissent créer des applications web complexes plus rapidement et plus facilement. Symfony est conçu pour être flexible, permettant aux développeurs de choisir les bibliothèques et les modèles qu'ils souhaitent utiliser.

## Mise en place d'un projet Symfony

### Vérification des prérequis

Avant de commencer, assurez-vous que votre environnement de développement satisfait aux exigences de Symfony :

```bash
symfony check:requirements
```

Cette commande vérifie que votre système a tous les outils nécessaires pour exécuter une application Symfony.

### Création d'un projet

Pour créer un nouveau projet à la version 6.4 nommé `MonProjet` :

```bash
symfony new MonProjet --version="6.4.*" --webapp
```

Cette commande crée un nouveau projet Symfony avec toutes les fonctionnalités web essentielles.

### Démarrage du serveur de développement

Pour démarrer le serveur de développement :

```bash
symfony serve
```

Pour le démarrer en mode daemon (en arrière-plan) :

```bash
symfony serve -d
```

Le serveur est accessible à l'adresse http://127.0.0.1:8000.


Le serveur web local de Symfony supporte HTTPS nativement. Cependant, pour établir une connexion sécurisée HTTPS, un certificat TLS (Transport Layer Security) est requis. Symfony simplifie la création et l'installation de ce certificat via une commande dédiée. Ce certificat est auto-signé et destiné uniquement à un usage de développement local.

```bash
symfony server:ca:install
```

Cette commande crée une Autorité de Certification (CA) locale, puis génère et installe un certificat TLS qui sera utilisé par le serveur web local de Symfony.

### Gestion du serveur

Pour arrêter les serveurs Symfony :

```bash
symfony server:stop
```

Pour vérifier le statut du serveur :

```bash
symfony server:status
```

### Installation de composants supplémentaires

- Pour ajouter Twig, le moteur de template :

    ```bash
    composer require symfony/twig-bundle
    ```

- Pour installer le MakerBundle, qui aide à générer divers éléments comme des contrôleurs ou des entités :

    ```bash
    composer require symfony/maker-bundle --dev
    ```

### Création d'un contrôleur

Pour créer un contrôleur nommé `MonControlleur` :

```bash
symfony console make:controller MonControlleur
```

Pour lister toute les routes de l'application :

```bash
php bin/console debug:router
```

### Configuration de la base de données avec Doctrine

1. **Installation de Doctrine :**

    ```bash
    composer require symfony/orm-pack:*
    ```

2. **Configuration de la base de données :**

    Modifiez le fichier `.env.local` pour configurer la connexion à la base de données :

    ```plaintext
    DATABASE_URL="mysql://Utilisateur:MotDePasse@127.0.0.1:3306/village_green?serverVersion=mariadb-10.6.7&charset=utf8mb4"
    ```

3. **Gestion de la base de données :**

    - Pour supprimer la base de données :

        ```bash
        php bin/console doctrine:database:drop --force
        ```

    - Pour créer la base de données :

        ```bash
        php bin/console doctrine:database:create
        ```

4. **Travail avec les entités :**

    - Pour créer une entité `MonEntity` :

        ```bash
        php bin/console make:entity MonEntity
        ```

    - Pour mettre à jour une entité :

        ```bash
        php bin/console make:entity MonEntity --regenerate
        ```

    - Pour générer les tables nécessaires dans la base de données :

        ```bash
        php bin/console doctrine:schema:update --force
        ```

5. **Migrations :**

    Pour initialiser une migration :

    ```bash
    php bin/console make:migration
    ```

    Pour appliquer les migrations :

    ```bash
    php bin/console doctrine:migrations:migrate
    ```

6. **Utilisation de fixtures et Faker pour les données de test :**

    ```bash
    composer require --dev orm-fixtures
    composer require fakerphp/faker
    ```

    Pour charger les fixtures :

    ```bash
    php bin/console doctrine:fixtures:load
    ```

### Génération automatique de code

Symfony fournit des commandes pour accélérer le développement :

- Création de formulaires :

    ```bash
    symfony console make:form
    ```

- Création d'un contrôleur par défaut :

    ```bash
    symfony console make:controller DefaultController
    ```

- Génération d'un CRUD (Create, Read, Update, Delete) :

    ```bash
    symfony console make:crud
    ```

- Gestion des utilisateurs :

    ```bash
    symfony console make:user
    ```

    ```bash
    symfony console make:auth
    ```

- Installation du bundle de vérification d'email

 - de SymfonyCasts :

    ```bash
    composer require symfonycasts/verify-email-bundle
    ```

- Création d'un formulaire d'inscription :

    ```bash
    symfony console make:registration-form
    ```

### Nettoyage du cache

Pour vider le cache de l'application :

```bash
symfony console cache:clear
```

```bash
php bin/console cache:clear
```

Ces deux commandes sont strictement identiques. Il restera à vider le cache de votre navigateur utilisé pour votre projet symfony.

Ceci termine la présentation de base de Symfony et de la mise en place d'un projet web. Symfony est un outil puissant qui, grâce à sa flexibilité et à son vaste écosystème, permet de construire des applications web robustes et évolutives.
