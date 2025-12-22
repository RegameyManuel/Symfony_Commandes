# Architecture MVC en PHP

## Du procédural au MVC orienté objet - approche théorique approfondie

---

## Introduction générale

Lorsque l’on débute en développement web avec PHP, l’approche procédurale s’impose presque naturellement. Elle est simple à comprendre, directe, et permet d’obtenir rapidement un résultat fonctionnel. Une page PHP reçoit une requête, interroge éventuellement une base de données, puis génère du HTML. Pour de petits projets ou des exercices d’apprentissage, cette approche est parfaitement adaptée.

Cependant, dès que l’application grandit, même légèrement, cette simplicité apparente se retourne contre le développeur. Le code devient difficile à lire, compliqué à modifier, et source d’erreurs imprévues. Le problème n’est pas PHP, ni le procédural en tant que tel, mais l’absence de structure et de séparation claire des responsabilités.

Le modèle MVC (Model – View – Controller) apporte une réponse pragmatique à ce problème. Il ne s’agit pas d’un dogme, ni d’une règle absolue, mais d’un cadre de pensée permettant d’organiser une application web de manière cohérente et durable.

---

## Pourquoi le procédural pose problème en web

Dans un projet PHP procédural classique, on retrouve très souvent un mélange de préoccupations dans un même fichier. Une page peut à la fois décider de l’action à effectuer, valider des données issues d’un formulaire, exécuter des requêtes SQL, gérer des redirections HTTP et générer du HTML. Tant que le projet reste très simple, ce mélange ne pose pas de problème majeur.

Le véritable souci apparaît lorsque l’on souhaite faire évoluer l’application. Modifier l’affichage peut casser une requête SQL. Ajouter une règle de validation peut avoir des conséquences sur une autre action. Le développeur est obligé de relire l’intégralité du fichier pour comprendre l’impact d’un changement pourtant mineur.

Ce phénomène s’explique par l’absence de séparation des responsabilités. Lorsque tout est mélangé, un fichier a plusieurs raisons de changer, ce qui rend le code fragile. Un code fragile est un code qui coûte cher à maintenir, à corriger et à transmettre à un autre développeur.

---

## Le principe fondamental de séparation des responsabilités

Une responsabilité peut être définie comme une raison de changer. Si un fichier doit être modifié parce que l’interface change, parce qu’une règle métier évolue ou parce que la base de données est modifiée, alors ce fichier assume trop de responsabilités.

La séparation des responsabilités consiste à isoler chaque type de préoccupation dans une partie bien définie du code. Ce principe est au cœur du MVC. Il ne s’agit pas d’un concept théorique abstrait, mais d’un outil très concret pour rendre le code plus lisible et plus robuste.

MVC est donc une application pratique du principe de responsabilité unique. Chaque couche a un rôle précis, clairement identifiable, et limité.

---

## Définition claire et pragmatique du MVC

Le modèle MVC découpe une application en trois grandes parties.

Le **Model** représente les données et leur accès. Il s’agit de tout ce qui concerne la persistance des informations, comme les requêtes SQL, l’utilisation de PDO, ou les classes chargées de lire et d’écrire dans la base de données.

La **View** est responsable de l’affichage. Elle génère le HTML envoyé au navigateur. Elle ne contient ni requêtes SQL, ni règles métier. Son rôle est de présenter des données qui lui sont fournies, sans se soucier de leur origine.

Le **Controller** est l’élément central. Il reçoit la requête HTTP, décide de l’action à effectuer, appelle les composants nécessaires du modèle, puis choisit la vue à afficher. Le contrôleur ne travaille pas directement sur les données, il orchestre. On peut le comparer à un chef d’orchestre qui ne joue pas lui-même de musique, mais coordonne les musiciens.

MVC permet ainsi de raisonner sur une application non plus comme un ensemble de pages, mais comme un ensemble de responsabilités bien séparées.

---

## Étape A : la version procédurale monopage

La première étape pédagogique consiste à partir volontairement d’une version imparfaite. Une seule page PHP gère l’ensemble des actions : affichage de la liste, création d’un article, suppression, validation, accès à la base et génération du HTML.

Cette approche permet de mettre en évidence les problèmes sans les théoriser immédiatement. Le code fonctionne, mais il est dense, difficile à lire, et toute modification nécessite une compréhension globale du fichier. Cette étape n’est pas une erreur, elle est un point de départ nécessaire pour comprendre l’intérêt de la suite.

---

## Étape B : le procédural multi-fichiers

La première amélioration naturelle consiste à découper le code en plusieurs fichiers. Chaque action dispose de sa propre page, et la connexion à la base de données est centralisée dans un fichier dédié.

Cette approche améliore légèrement la lisibilité, mais ne résout pas le problème de fond. Le lien entre URL et fichiers reste très fort. Une action correspond toujours à une page, ce qui limite fortement l’évolution de l’application. La duplication de code commence également à apparaître, notamment pour la validation, les redirections et la gestion des erreurs.

---

## Étape C : le Front Controller

Le Front Controller introduit une rupture importante. L’application ne possède plus plusieurs points d’entrée, mais un seul. Toutes les requêtes HTTP passent par un fichier unique, généralement `index.php`, placé dans un dossier `public`.

Cette approche permet de centraliser le routage, la gestion des erreurs et les mécanismes transverses comme l’authentification ou la protection CSRF. Elle correspond au fonctionnement interne des frameworks modernes.

Cette étape est également l’occasion d’introduire une notion essentielle du web : HTTP est un protocole sans état. Chaque requête est indépendante et doit être traitée comme telle. Le contrôleur joue ici un rôle clé en reconstruisant le contexte nécessaire à chaque appel.

---

## Étape D : les vues et le rendu

Les vues permettent de séparer clairement l’affichage du reste de l’application. Une vue est un fichier dont le seul objectif est de produire du HTML à partir de données fournies par le contrôleur.

Cette séparation améliore considérablement la lisibilité du code. Le contrôleur ne génère plus de HTML complexe, et la vue n’a pas connaissance des règles métier ou de la base de données. L’introduction d’un layout global permet également de factoriser la structure commune des pages.

---

## Étape E : le Model et les repositories

Le modèle ne se limite pas à la base de données. Il représente la manière dont l’application accède à ses données. Le pattern Repository permet de centraliser toutes les requêtes SQL dans des classes dédiées.

Un repository sait comment lire, écrire, modifier ou supprimer des données. Il ne sait pas pourquoi ces opérations sont effectuées. Cette distinction est essentielle. Le repository parle SQL et technique, pas métier.

Cette approche permet de modifier la structure de la base ou la manière d’y accéder sans impacter le reste de l’application.

---

## Étape F : les contrôleurs orientés objet

À ce stade, le contrôleur devient une classe. Il reçoit ses dépendances, comme les repositories ou les services, et expose des méthodes correspondant aux actions possibles.

Le contrôleur joue pleinement son rôle d’adaptateur entre le protocole HTTP et l’application. Il ne contient pas de logique métier complexe et ne manipule pas directement la base de données. Il coordonne les appels et décide de la réponse à envoyer.

Cette structure prépare directement à l’utilisation d’un framework comme Symfony.

---

## Étape G : la couche Service et la logique métier

La couche Service permet d’extraire la logique métier du contrôleur. Les règles métier, la validation avancée et les décisions fonctionnelles doivent être centralisées dans cette couche.

Une règle métier ne devrait jamais dépendre directement de `$_POST` ou de `$_GET`. Elle doit pouvoir être utilisée dans un autre contexte, comme une API, une commande CLI ou des tests automatisés.

Le contrôleur devient alors très léger. Il délègue le travail au service, puis se contente de gérer la réponse HTTP.

---

## Sécurité minimale et erreurs courantes

Même dans un projet pédagogique, certaines règles de base doivent être respectées. L’échappement du HTML est indispensable pour éviter les failles XSS. Les actions destructrices ne doivent pas être déclenchées via des requêtes GET en production. La validation côté serveur est obligatoire, même si une validation côté client existe.

Les erreurs les plus fréquentes consistent à remettre du SQL dans les vues, à alourdir excessivement les contrôleurs ou à dupliquer la logique métier.

---

## Limites du MVC

MVC n’est ni universel ni obligatoire. D’autres architectures existent et peuvent être plus adaptées à certains contextes. Cependant, MVC reste le meilleur compromis pédagogique pour comprendre le fonctionnement des applications web modernes et des frameworks actuels.

Il fournit un cadre clair, structurant, et largement reconnu dans le monde professionnel.

---

## Pont conceptuel vers Symfony

Ce qui a été construit correspond directement aux fondations de Symfony. Le Front Controller, le routage, les contrôleurs, les services et les repositories existent déjà, mais de manière industrialisée, sécurisée et standardisée.

Symfony ne remplace pas MVC. Il le formalise et l’outille.

---

## Conclusion métier

Le métier de développeur ne consiste pas à écrire du code qui fonctionne aujourd’hui, mais à écrire du code qui restera compréhensible demain. MVC apporte une réponse simple à un problème complexe : maîtriser la complexité d’une application web dans le temps.

Comprendre cette progression, c’est comprendre la logique profonde des frameworks modernes. Une fois ces bases acquises, apprendre Symfony devient une question d’outillage, pas de concept.

