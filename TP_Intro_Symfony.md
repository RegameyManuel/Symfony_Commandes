# TP Symfony

## Objectif du TP

Ce TP a pour but de **faire démarrer un projet Symfony**, sans stress.

À la fin de ce TP, nous serons en mesure de :

* comprendre ce qu’est une route Symfony
* comprendre le rôle d’un contrôleur
* savoir afficher une page HTML avec Twig
* faire le lien entre le PHP + POO et Symfony

---

## Ce que Symfony fera ici

Dans ce premier TP :

* Symfony gère les requêtes HTTP
* Symfony choisit le bon contrôleur
* Symfony affiche la réponse

Mais :

* le code métier reste simple
* il n’y a pas encore de base de données
* il n’y a pas encore de formulaires

---

## Prérequis

* Projet Symfony 7.4 déjà créé (`symfony new ... --webapp`)
* Serveur Symfony démarré

```bash
symfony serve
```

---

## Étape 1 – Comprendre le point d’entrée

Dans Symfony, **toutes les requêtes passent par un seul fichier** :

```bash
public/index.php
```

Il n'y a rien à modifier ici.

> Symfony reçoit toutes les requêtes HTTP et décide quel contrôleur appeler.

---

## Étape 2 – Créer un premier contrôleur

Nous allons créer un contrôleur très simple.

```bash
symfony console make:controller HomeController
```

Symfony crée :

* `src/Controller/HomeController.php`
* `templates/home/index.html.twig`

Ouvre le fichier `HomeController.php`.

---

## Étape 3 – Lire un contrôleur Symfony

```php
#[Route('/', name: 'home')]
public function index(): Response
{
    return $this->render('home/index.html.twig');
}
```

Prenons le temps de comprendre.

* `#[Route('/', name: 'home')]` :

  * quand l’URL est `/`
  * Symfony appelle cette méthode

* `index()` :

  * c’est une méthode PHP classique
  * elle appartient à une classe (POO)

* `Response` :

  * Symfony renvoi toujours une réponse HTTP

* `$this->render(...)` :

  * génère du HTML à partir d’un template Twig

Rien de magique : **une méthode appelée, une réponse retournée**.

---

## Étape 4 – Tester la route

Dans notre navigateur, ouvrons :

```bash
http://127.0.0.1:8000/
```

Nous devons voir une page Symfony de base.

Si c’est le cas :
✔ la route fonctionne
✔ le contrôleur fonctionne
✔ Twig fonctionne

---

## Étape 5 – Modifier le template Twig

Ouvrons le fichier :

```bash
templates/home/index.html.twig
```

Remplaceons son contenu par :

```twig
{% extends 'base.html.twig' %}

{% block title %}Accueil{% endblock %}

{% block body %}
<h1>Bienvenue sur mon premier TP Symfony</h1>
<p>Cette page est générée avec Twig.</p>
{% endblock %}
```

Rechargeons la page dans le navigateur.

Nous venons de générer du HTML **sans écrire de echo**, et sans PHP dans le template.

---

## Étape 6 – Passer des données du contrôleur vers la vue

Modifions le contrôleur :

```php
#[Route('/', name: 'home')]
public function index(): Response
{
    $message = "Symfony n’est pas magique, il est structuré";

    return $this->render('home/index.html.twig', [
        'message' => $message
    ]);
}
```

Modifions ensuite le template :

```twig
<p>{{ message }}</p>
```

Rechargeons la page.

Le contrôleur prépare les données, la vue les affiche.

---

## Étape 7 – Ajouter une seconde route

Ajoutons une page `À propos`.

Dans le contrôleur :

```php
#[Route('/about', name: 'about')]
public function about(): Response
{
    return $this->render('home/about.html.twig');
}
```

Créons le fichier :

```bash
templates/home/about.html.twig
```

```twig
{% extends 'base.html.twig' %}

{% block title %}À propos{% endblock %}

{% block body %}
<h1>À propos</h1>
<p>Première application Symfony en cours.</p>
{% endblock %}
```

Testons l’URL :

```bash
http://127.0.0.1:8000/about
```

---

## Étape 8 – Lister les routes

```bash
php bin/console debug:router
```

Observons :

* le nom des routes
* leurs chemins
* les contrôleurs associés

Symfony ne fait que **mapper des URL vers des méthodes**.

---

## Étape 9 – Faire le lien avec la POO

Un contrôleur Symfony est :

* une classe PHP
* avec des méthodes
* qui utilisent d’autres objets (services)

Symfony applique simplement la POO à grande échelle.

---

## Bilan

À ce stade, nous avons:

* créé un contrôleur
* défini des routes
* affiché des pages avec Twig
* passé des données du PHP vers le HTML
