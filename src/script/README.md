# Phaser game : "Cyber Psychose"

# Utilisation de index.js

Le fichier `index.js` est un fichier crucial dans notre projet Phaser. Il est responsable de la configuration principale du jeu, y compris le chargement des scènes et des paramètres du jeu.

## Structure du Fichier

Le fichier `index.js` suit une structure simple et claire. Voici un aperçu de son contenu :

```javascript
// Importer vos différents fichier de jeux
import Game from "./game.js";

const gameConfig = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 700,
    height: 320,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
        }
    },
    pixelArt: true,
    scene: [Game]
};

export default new Phaser.Game(gameConfig);
```

Ce fichier est divisé en trois parties principales :

1. **Importation du Jeu :** Nous importons la classe `Game` à partir du fichier `game.js`. Cette classe représente la scène principale de notre jeu.

2. **Configuration du Jeu :** Nous définissons la configuration principale de notre jeu dans l'objet `gameConfig`. Cela inclut des paramètres tels que le type de rendu, les dimensions du jeu, les paramètres de physique, etc.

3. **Création de l'Instance du Jeu :** Nous créons une instance de jeu Phaser en passant la configuration du jeu (`gameConfig`) à la classe `Phaser.Game`. Cette instance lance ensuite le jeu avec la configuration spécifiée.

## Personnalisation

Vous pouvez personnaliser le fichier `index.js` en fonction des besoins spécifiques de votre projet. Voici quelques exemples de personnalisation courante :

- **Changement des Dimensions du Jeu :** Modifiez les valeurs `width` et `height` dans `gameConfig` pour ajuster la taille du jeu selon vos besoins.

- **Modification du Type de Rendu :** Vous pouvez changer `Phaser.AUTO` en `Phaser.CANVAS` ou `Phaser.WEBGL` selon les exigences de votre jeu.

- **Ajout de Nouvelles Scènes :** Si votre jeu comporte plusieurs scènes, ajoutez-les à la liste `scene` dans `gameConfig`.

## Exemple d'Utilisation

Voici un exemple d'utilisation de `index.js` dans notre projet Phaser :

1. Importez le jeu dans votre fichier HTML :

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Mon Jeu Phaser</title>
    <script src="path/to/phaser.min.js"></script>
</head>
<body>
    <div id="game-container"></div>
    <script type="module" src="index.js"></script>
</body>
</html>
```

2. Assurez-vous que le chemin vers `phaser.min.js` est correctement défini.

3. Le jeu sera chargé et lancé automatiquement lorsque la page HTML sera ouverte dans un navigateur.
