# TP Symfony – Premiers pas rassurants

## Objectif pédagogique du TP

Ce TP a pour but de **faire entrer progressivement dans Symfony**, sans stress ni magie obscure.

À la fin de ce TP, l’étudiant devra :

* comprendre ce qu’est une route Symfony
* comprendre le rôle d’un contrôleur
* savoir afficher une page HTML avec Twig
* faire le lien entre ce qu’il connaît déjà (PHP, POO) et Symfony

Ce TP ne cherche **pas** la performance ni l’exhaustivité. Il cherche la **compréhension** et la **confiance**.

---

## Ce que Symfony fait pour nous (et ce que nous faisons encore)

Dans ce premier TP :

* Symfony gère les requêtes HTTP
* Symfony choisit le bon contrôleur
* Symfony affiche la réponse

Mais :

* le code métier reste simple
* il n’y a pas encore de base de données
* il n’y a pas encore de formulaires

On avance par couches.

---

## Prérequis

* Projet Symfony 6.4 déjà créé (`symfony new ... --webapp`)
* Serveur Symfony démarré

```bash
symfony serve
```

---

## Étape 1 – Comprendre le point d’entrée

Dans Symfony, **toutes les requêtes passent par un seul fichier** :

```
public/index.php
```

Tu n’as rien à modifier ici.

À retenir :

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

  * Symfony attend toujours une réponse HTTP

* `$this->render(...)` :

  * génère du HTML à partir d’un template Twig

👉 Rien de magique : **une méthode appelée, une réponse retournée**.

---

## Étape 4 – Tester la route

Dans ton navigateur, ouvre :

```
http://127.0.0.1:8000/
```

Tu dois voir une page Symfony de base.

Si c’est le cas :
✔ la route fonctionne
✔ le contrôleur fonctionne
✔ Twig fonctionne

---

## Étape 5 – Modifier le template Twig

Ouvre le fichier :

```
templates/home/index.html.twig
```

Remplace son contenu par :

```twig
{% extends 'base.html.twig' %}

{% block title %}Accueil{% endblock %}

{% block body %}
<h1>Bienvenue sur mon premier TP Symfony</h1>
<p>Cette page est générée avec Twig.</p>
{% endblock %}
```

Recharge la page dans le navigateur.

👉 Tu viens de générer du HTML **sans écrire de echo**, et sans PHP dans le template.

---

## Étape 6 – Passer des données du contrôleur vers la vue

Modifie le contrôleur :

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

Modifie ensuite le template :

```twig
<p>{{ message }}</p>
```

Recharge la page.

👉 Le contrôleur prépare les données, la vue les affiche.

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

Crée le fichier :

```
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

Teste l’URL :

```
http://127.0.0.1:8000/about
```

---

## Étape 8 – Lister les routes

```bash
php bin/console debug:router
```

Observe :

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

Tu ne perds rien de ce que tu sais déjà.

---

## Bilan du TP

À ce stade, tu sais :

* créer un contrôleur
* définir des routes
* afficher des pages avec Twig
* passer des données du PHP vers le HTML

Tu as posé **les fondations**.

---

## Ce que nous verrons ensuite (sans le faire maintenant)

* formulaires
* base de données
* entités Doctrine
* sécurité

Chaque chose en son temps.

---

## Message important

Si tu comprends ce TP, alors **Symfony est à ta portée**.

La suite ne fera qu’ajouter des briques.
