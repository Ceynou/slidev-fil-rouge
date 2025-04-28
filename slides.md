---
theme: apple-basic
transition: slide-left
mdc: true
layout: cover
---

# Projet Fil Rouge: Gastronome Créatif

**Dossier Projet CDA**

**Par Ceyhane Yilmaz**

**2iSA Millau - 2025** 

---

# Sommaire
- Présentation personnelle
- Le projet et son contexte
- Architecture technique
- Fonctionnalités représentatives
- Gestion du projet
- Sécurité web
- Bilan et perspectives

---
layout: intro
---

# Présentation personnelle
<v-clicks depth="2">

- Ceyhane YILMAZ, 25 ans
- Curieux des technologies
- Concepteur Développeur d'Application (en devenir)
- Parcours : 
  - Restauration (Rivesaltes)
  - Licence Informatique (Perpignan)
  - Licence de Japonais (Toulouse)
  - Interim divers (Millau)
  - Expériences autodidactes en programmation

</v-clicks>
---
layout: two-cols
class: my-cool-content-on-the-left
---

---

# Formation CDA
## Le métier
- Conception et développement de services numériques
- Automatisation de processus
- Travail en entreprise, ESN ou indépendant

<!-- 
 respectant normes et standards
Intervention suite à demandes client/MOA/Chef de projet. 

 -->
---
layout: full
image: /images/timeline.svg
---
## Structure
3 activités principales + projet fil rouge pour la pratique. Durée : 69 semaines (incluant 12 semaines de PAE).


---

# Le projet "Fil Rouge"
- Mise en situation professionnelle
- Cohérence avec les apprentissages
- Support pour les évaluations (EPCF)
- Application des compétences acquises
- Projet organisé en jalons

---

# Objectif du projet
- Plateforme web "Gastronome Créatif"
- Mise en relation de passionnés de cuisine
- Découverte et partage de recettes
- Interface responsive et intuitive

---

# Compétences mobilisées
- Développer des interfaces utilisateurs (Front-end)
- Développer des composants métiers (UX)
- Développer des composants d'accès aux données
- Préparer le déploiement sécurisé
- Gestion de projet informatique

---

# Architecture technique
![Architecture MVC](/images/drawio.svg)

---

# Spécifications techniques
- Framework Back-end : ASP.NET Core MVC
- Langage Back-end : C#
- Front-end : HTML5, CSS3, JavaScript/TypeScript
- Base de données : PostgreSQL (Docker)
- IDE : Visual Studio & VS Code
- Gestion de version : Git/GitHub

---

# Parcours utilisateur
<div class="grid grid-cols-2 gap-4">
<div>
<img src="/images/1.png" alt="Page d'accueil" class="h-64">
<p>Page d'accueil avec carrousel</p>
</div>
<div>
<img src="/images/3.png" alt="Page de connexion" class="h-64">
<p>Inscription/connexion</p>
</div>
</div>

---

# Parcours utilisateur (suite)
<div class="grid grid-cols-2 gap-4">
<div>
<img src="/images/4.png" alt="Détail recette" class="h-64">
<p>Détail d'une recette</p>
</div>
<div>
<img src="/images/5.png" alt="Commentaires" class="h-64">
<p>Interaction avec les recettes</p>
</div>
</div>

---

# Code représentatif
```csharp
public IActionResult Index()
{
    string query = @"SELECT
        r.*,
        COUNT(DISTINCT s.*) AS steps_count,
        COUNT(DISTINCT ri.*) AS ingredients_count,
        COUNT(DISTINCT rw.*) AS reviews_count,
        ROUND(COALESCE(AVG(rw.rating), 0), 2) AS review_rating,
        u.username, u.image_path
        FROM recipes r
        LEFT JOIN users u ON r.creator_id = u.id
        LEFT JOIN reviews rw ON rw.recipe_id = r.id
        LEFT JOIN recipes_ingredients ri ON ri.recipe_id = r.id
        LEFT JOIN steps s ON s.recipe_id = r.id
        GROUP BY r.id, u.username, u.image_path
        ORDER BY review_rating DESC
        LIMIT 10;";
        
    // Suite du code...
}
```

---

# Gestion du projet


---
layout: image
---

![Tableau Kanban GitHub](/images/kanban.png)

---

# Sécurité web
## Deux types d'attaques principales :

1. Injection SQL
   - Protection : ORM et requêtes paramétrées
   - Validation des entrées utilisateur

2. CSRF (Cross-Site Request Forgery)
   - Protection : Tokens anti-CSRF
   - Validation des requêtes avec ASP.NET Core

---

# Bilan
## Apports
- Première expérience complète de développement
- Application concrète des connaissances
- Maîtrise d'outils et de frameworks

## Difficultés
- Gestion du temps et organisation
- Communication technique
- Finalisation des tâches

---

# Perspectives
- Amélioration de la gestion personnelle du projet
- Implémentation des fonctionnalités du prochain jalon
- Développement de meilleures habitudes de travail

---

# Questions ?
Merci pour votre attention
