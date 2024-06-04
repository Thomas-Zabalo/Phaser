# Phaser game : "Cyber Psychose"

# Comment Ajouter des Images dans le Dossier d'Assets

## Structure des Dossiers

Pour chaque nouvelle image ou catégorie d'images, il est recommandé de créer un nouveau dossier dans le répertoire d'assets du projet Phaser. Cela permet d'avoir une meilleur organisation et de s'y retrouver plus facilement.

### Spécificités
- Si plusieurs images se complètent ou appartiennent à la même catégorie, il est préférable de les regrouper dans le même dossier pour une meilleure organisation.

## Utilisation des Images dans le Jeu

1. **Chargement des Images :** Utilisez la méthode `load.image()` pour charger une image dans votre scène Phaser. Assurez-vous de spécifier le chemin relatif à partir du dossier d'assets.

    ```javascript
    // Exemple de chargement d'une image dans une scène Phaser
    this.load.image('nom_de_l_image', 'chemin_vers_image_dans_le_dossier_assets/nom_de_l_image.png');
    ```

    Assurez-vous de remplacer `'nom_de_l_image'` par le nom que vous souhaitez utiliser pour référencer cette image dans votre jeu, et `'chemin_vers_image_dans_le_dossier_assets/nom_de_l_image.png'` par le chemin relatif vers l'image à l'intérieur du dossier d'assets.

2. **Chargement Préalable :** Ajoutez le chargement préalable de vos images dans la méthode `preload()` de votre scène Phaser. Cela garantira que les images sont chargées avant le début du jeu.

    ```javascript
    // Exemple de chargement préalable des images dans la méthode preload() d'une scène Phaser
    preload() {
        this.load.image('nom_de_l_image', 'chemin_vers_image_dans_le_dossier_assets/nom_de_l_image.png');
    }
    ```

## Exemple

Voici comment organiser nos images et les charger dans notre jeu Phaser :

```plaintext
assets/
├── characters/
│   ├── player/
│   │   ├── player_idle.png
│   │   └── player_walk.png
├── tiles/
│   ├── grass_tile.png
│   └── water_tile.png
```

Dans ce cas, nous avons créé des dossiers `characters` et `tiles` pour organiser nos images de personnages et de tuiles. Les images de chaque catégorie sont regroupées dans leurs propres dossiers pour une meilleure organisation.

N'hésitez pas à ajouter de nouveaux dossiers et images selon les besoins de votre projet !
