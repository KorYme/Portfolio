# Image Display Modes — Documentation

Référence complète des modes d'affichage disponibles pour les images, GIFs et vidéos MP4 dans les pages projets.

---

## Format JSON

```json
"images": [
  {
    "src": "assets/project/file.png",
    "display": {
      "mode": "...",
      "param1": "...",
      "param2": "..."
    }
  }
]
```

> Si `display` est absent ou `null`, le mode `cover` est appliqué par défaut.  
> Les formats supportés sont : `.png` `.jpg` `.gif` `.mp4`  
> La compatibilité string simple est conservée : `"assets/project/file.png"` fonctionne sans objet.

---

## Modes disponibles

### `cover` *(défaut)*

Remplit entièrement le cadre imposé. L'image est croppée si son ratio diffère du cadre.

| Paramètre | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `ratio` | string | `"16/9"` | Ratio du cadre — ex: `"4/3"`, `"1/1"`, `"21/9"` |
| `position` | string | `"center"` | Point focal — `"top"`, `"bottom"`, `"left"`, `"right"`, `"center"`, ou `"50% 20%"` |

```json
{
  "src": "assets/project/screenshot.png",
  "display": {
    "mode": "cover",
    "ratio": "16/9",
    "position": "top"
  }
}
```

---

### `contain`

L'image entière est visible sans crop. Des bandes (letterbox) apparaissent si le ratio diffère.

| Paramètre | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `ratio` | string | `"16/9"` | Ratio du cadre |
| `background` | string | `"var(--surface)"` | Couleur des bandes letterbox |

```json
{
  "src": "assets/project/diagram.png",
  "display": {
    "mode": "contain",
    "ratio": "16/9",
    "background": "#000000"
  }
}
```

---

### `stretch`

Étire l'image pour remplir exactement le cadre. Peut déformer l'image si le ratio diffère.

| Paramètre | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `ratio` | string | `"16/9"` | Ratio du cadre |

```json
{
  "src": "assets/project/ui.png",
  "display": {
    "mode": "stretch",
    "ratio": "4/3"
  }
}
```

---

### `native`

Conserve le ratio naturel de l'image. Aucun cadre n'est imposé.

| Paramètre | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `maxWidth` | string | `"100%"` | Largeur maximale — ex: `"600px"`, `"80%"` |

```json
{
  "src": "assets/project/tool-screenshot.png",
  "display": {
    "mode": "native",
    "maxWidth": "800px"
  }
}
```

---

### `fixed-height`

Hauteur fixe imposée, la largeur s'adapte. Utile pour les screenshots en format portrait ou très tall.

| Paramètre | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `height` | string | `"400px"` | Hauteur fixe — ex: `"500px"`, `"60vh"` |
| `overflow` | string | `"hidden"` | `"hidden"` ou `"visible"` |

```json
{
  "src": "assets/project/tall-screenshot.png",
  "display": {
    "mode": "fixed-height",
    "height": "500px",
    "overflow": "hidden"
  }
}
```

---

### `fixed-width`

Largeur fixe imposée, la hauteur s'adapte au ratio naturel. Utile pour centrer une image plus petite.

| Paramètre | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `width` | string | `"100%"` | Largeur fixe — ex: `"400px"`, `"60%"` |
| `overflow` | string | `"visible"` | `"hidden"` ou `"visible"` |

```json
{
  "src": "assets/project/small-diagram.png",
  "display": {
    "mode": "fixed-width",
    "width": "400px"
  }
}
```

---

## Exemples mixtes dans une section

Mélanger plusieurs modes dans une même section est possible :

```json
"images": [
  {
    "src": "assets/kintsugi/overview.png",
    "display": { "mode": "cover", "ratio": "16/9", "position": "center" }
  },
  {
    "src": "assets/kintsugi/tool-editor.png",
    "display": { "mode": "contain", "ratio": "16/9", "background": "#111111" }
  }
]
```

---

## Compatibilité string simple

Les images renseignées en string simple restent compatibles et utilisent `cover` par défaut :

```json
"images": [
  "assets/kintsugi/screenshot.png",
  "assets/kintsugi/demo.mp4"
]
```
