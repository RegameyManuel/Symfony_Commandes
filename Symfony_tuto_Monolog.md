# Tutoriel `Logger` dans Symfony 6


***Exploration de l'installation, configuration, et utilisation d'un service de logging personnalisé***
    



### 1. Installation et Configuration

Symfony utilise Monolog pour le logging, un gestionnaire de logs puissant qui permet une configuration et une personnalisation étendues. Dans Symfony, la configuration de Monolog se fait principalement via le fichier `config/packages/monolog.yaml`.

#### Installation

Symfony Flex configure automatiquement Monolog lors de l'installation de Symfony. Si vous devez l'installer manuellement pour une raison quelconque, utilisez Composer :

```bash
composer require symfony/monolog-bundle
```

#### Configuration de Base

Dans `config/packages/monolog.yaml`, vous pouvez définir différents canaux (channels), des niveaux de log, et des handlers. Un exemple simple :

```yaml
monolog:
    channels: ['app']
    handlers:
        main:
            type: stream
            path: "%kernel.logs_dir%/%kernel.environment%.log"
            level: debug
            channels: ["!event"]
        custom_channel:
            type: stream
            path: "%kernel.logs_dir%/custom_channel.log"
            level: info
            channels: ["app"]
```


### 2. Création d'un Service de Logging Personnalisé

Bien que vous puissiez utiliser le service `logger` par défaut, la création d'un service personnalisé peut s'avérer utile pour des besoins spécifiques.

#### Définition du Service

Dans `config/services.yaml`, définissez un service pour votre logger personnalisé :

```yaml
services:
    app.logger:
        class: Psr\Log\LoggerInterface
        arguments: ['@monolog.logger.app']
```


### 3. Utilisation des Logs

Avec le service configuré, vous pouvez injecter `LoggerInterface` dans n'importe quel service, contrôleur ou autre composant de Symfony pour commencer à logger.

#### Exemple d'Injection dans un Contrôleur

```php
namespace App\Controller;

use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class LogExampleController extends AbstractController
{
    private $logger;

    public function __construct(LoggerInterface $logger)
    {
        // Utilisez le service personnalisé si vous l'avez défini
        $this->logger = $logger;
    }

    public function index(): Response
    {
        $this->logger->info('Page d\'accueil visitée.');

        // Votre logique de contrôleur ici

        return $this->render('default/index.html.twig');
    }
}
```

### 4. Niveaux de Log

Les niveaux de log sont essentiels pour comprendre et catégoriser la sévérité des messages enregistrés par votre application. Chaque niveau indique l'importance du message et peut aider à filtrer les logs lors de la recherche d'informations spécifiques. Voici une description détaillée de chaque niveau de log, suivie d'exemples d'utilisation dans le contexte de Symfony avec Monolog.

1. **DEBUG** : Informations détaillées, typiquement d'intérêt seulement lors du diagnostic de problèmes.
2. **INFO** : Messages d'information qui mettent en évidence le progrès de l'application dans son ensemble.
3. **NOTICE** : Événements normaux mais significatifs.
4. **WARNING** : Indique des événements potentiellement problématiques, des erreurs non critiques.
5. **ERROR** : Erreurs d'exécution qui ne nécessitent pas une action immédiate mais doivent être surveillées.
6. **CRITICAL** : Conditions critiques signalant des problèmes graves qui ont causé une défaillance plus ou moins importante de l'application.
7. **ALERT** : Doit être corrigé immédiatement, comme un site Web complet en panne.
8. **EMERGENCY** : Le système est inutilisable.


### 5. Canaux

Les canaux dans le système de logging, comme ceux utilisés par Monolog dans Symfony, servent à catégoriser les logs selon différentes parties ou aspects de votre application. Chaque canal peut être considéré comme un journal distinct, où vous pouvez enregistrer des messages spécifiques à un domaine de fonctionnalité, un module, ou un service de votre application. L'utilisation de canaux permet une organisation logique des logs, facilitant leur consultation, leur filtrage et leur analyse.

#### Configuration des Canaux

Dans Symfony, vous pouvez configurer des canaux spécifiques dans `config/packages/monolog.yaml`. Par exemple :

```yaml
monolog:
    channels: ['deprecation', 'security']
    handlers:
        deprecation:
            type: stream
            path: "%kernel.logs_dir%/deprecation.log"
            level: warning
            channels: ["deprecation"]
        security:
            type: stream
            path: "%kernel.logs_dir%/security.log"
            level: info
            channels: ["security"]
```

Cette configuration crée deux canaux distincts : `deprecation` pour les logs de dépréciation et `security` pour les logs de sécurité. Chaque canal est configuré pour écrire dans son propre fichier de log.

#### Utilisation des Canaux dans le Code

Pour utiliser un canal spécifique dans votre code, injectez `LoggerInterface` en spécifiant le nom du canal. Par exemple, pour le canal `security` :

```php
use Psr\Log\LoggerInterface;

public function __construct(LoggerInterface $securityLogger)
{
    $this->securityLogger = $securityLogger;
}

public function logSecurityIssue($message)
{
    $this->securityLogger->info($message);
}
```

Dans Symfony, vous pouvez spécifier le canal en configurant le service :

```yaml
services:
    App\Service\MyService:
        arguments:
            $securityLogger: '@monolog.logger.security'
```


### 6. Environnements

La gestion des logs peut varier considérablement entre les environnements de développement (`dev`), de test (`test`), et de production (`prod`). Adapter la configuration de logging à chaque environnement permet de s'assurer que les développeurs ont accès aux informations dont ils ont besoin pour le débogage, tout en évitant de surcharger les fichiers de log en production avec des informations inutiles.

#### Configuration par Environnement

Symfony permet de configurer Monolog différemment selon l'environnement en plaçant les fichiers de configuration spécifiques à chaque environnement dans le dossier `config/packages/{env}`. Par exemple, pour l'environnement de développement, vous pouvez augmenter le niveau de détail des logs :

```yaml
# config/packages/dev/monolog.yaml
monolog:
    handlers:
        main:
            type: stream
            path: "%kernel.logs_dir%/%kernel.environment%.log"
            level: debug
```

Et pour la production, limiter les logs aux niveaux plus critiques pour éviter de surcharger le fichier de log :

```yaml
# config/packages/prod/monolog.yaml
monolog:
    handlers:
        main:
            type: stream
            path: "%kernel.logs_dir%/%kernel.environment%.log"
            level: error
```


### 7. Exemples d'Utilisation de Logs

#### Affichage des Contenus d'Objet

Lorsque vous souhaitez logger le contenu d'un objet pour le débogage, vous pouvez utiliser `print_r` ou `var_export` avec le niveau de log `DEBUG`. Cependant, Monolog et Symfony manipulent mieux les chaînes, donc il est conseillé de convertir l'objet en une chaîne en premier.

```php
// Dans un contrôleur ou un service
$this->logger->debug('Contenu de l\'objet:', ['object' => print_r($object, true)]);
```

Ou pour une sortie plus propre et potentiellement plus informative :

```php
$this->logger->debug('Contenu de l\'objet:', ['object' => var_export($object, true)]);
```

#### Logging des Actions Utilisateur

Pour enregistrer des actions utilisateur significatives, utilisez le niveau `INFO` ou `NOTICE` :

```php
$this->logger->info('L\'utilisateur a créé un nouveau compte.', ['user_id' => $userId]);
```

#### Erreurs et Exceptions

Lors de la capture d'erreurs ou d'exceptions, utilisez le niveau approprié en fonction de la sévérité. Pour une erreur critique :

```php
try {
    // Code qui peut générer une exception
} catch (\Exception $e) {
    $this->logger->critical('Erreur critique rencontrée.', ['exception' => $e->getMessage()]);
}
```

#### Surveillance des Performances

Pour surveiller les performances, comme le temps de réponse d'une API externe, utilisez le niveau `DEBUG` ou `INFO` :

```php
$start = microtime(true);
// Appel API externe
$duration = microtime(true) - $start;
$this->logger->info('Temps de réponse de l\'API externe.', ['duration' => $duration]);
```


### 8. Conseils pour Logger Efficacement

- **Contexte** : Toujours fournir un contexte suffisant avec vos logs. Cela inclut des identifiants d'utilisateur, des identifiants de transaction, ou tout autre information pertinente qui peut aider à comprendre le log sans avoir besoin de deviner ou de chercher ailleurs.
- **Sécurité** : Soyez conscient de ne pas logger des informations sensibles, telles que des mots de passe, des clés API, ou des informations personnellement identifiables (PII) sans les anonymiser ou les crypter.
- **Format** : Utiliser un format de log cohérent à travers l'application facilite la lecture et l'analyse des fichiers de log.
- **Niveaux de Log** : Utilisez différents niveaux de log (`debug`, `info`, `notice`, `warning`, `error`, `critical`, `alert`, `emergency`) pour catégoriser l'importance de l'information que vous loggez.
- **Canaux** : Utilisez des canaux pour séparer les logs de différentes parties de votre application.
- **Environnements** : Considérez la configuration des logs différemment selon l'environnement (`dev`, `test`, `prod`) pour éviter de surcharger les fichiers de log en production avec des informations de débogage.

#### Best Practices

- **Développement** : Configurez les logs pour capturer une large gamme d'informations (de `debug` à `error`), aidant à identifier et résoudre les problèmes.
- **Production** : Limitez les logs aux niveaux `error`, `critical`, `alert`, et `emergency` pour capturer uniquement les problèmes nécessitant une attention immédiate, réduisant ainsi la taille des fichiers de log et facilitant leur analyse.
- **Test** : Adaptez les logs pour capturer les informations pertinentes pour le débogage des tests, souvent à un niveau de détail similaire à celui du développement.

En ajustant la configuration des logs selon les canaux et les environnements, vous pouvez optimiser la gestion des logs pour répondre aux besoins spécifiques de chaque partie de votre application et de chaque stade du cycle de développement, améliorant ainsi l'efficacité du débogage et de la surveillance.


... pensez à souffler, vous restaurer lors d'une petite pause et pour exploiter pleinement les fonctionnalités de log sous Symfony, je vous invite à consulter la ...

[Documentation officielle sur la journalisation avec Symfony](https://symfony.com/doc/current/logging.html)



