---
theme: default
transition: slide-left
mdc: true
layout: cover
hideInToc: true
background: /media/bandeau_bleu_logo.png
---

# Projet Fil Rouge:

# Gastronome Créatif

**Dossier Projet CDA**

**Par Ceyhane Yilmaz**

**2iSA Millau - 30 mai 2025**

---

# Sommaire

<Toc columns="2" maxDepth="3"/>

---
layout: two-cols-header
---

# Présentation personnelle

::left::

<v-clicks depth="2">

- Ceyhane YILMAZ, 25 ans
- Curieux des technologies
- Concepteur Développeur d'Application (en devenir)\*
- **Parcours (sinueux):**
  - Restauration (Rivesaltes)
  - Licence Informatique (Perpignan)
  - Licence de Japonais (Toulouse)
  - Intérim divers (Millau)
  - Expériences autodidactes en programmation --> intuition ++

</v-clicks>

::right::

<v-switch>
  <template #1><img src="/media/github.png" /></template>
  <template #2><img src="/media/soundsphere.png" /></template>
  <template #3><img src="/media/soundsphere2.png" /></template>
  <template #4><img src="/media/anki.png" /></template>
  <template #5><img src="/media/anki2.png" /></template>
  <template #6><img src="/media/yomitan.png" /></template>
  <template #7><img src="/media/yomitan2.png" /></template>
  <template #8><img src="/media/mpv.png" /></template>
  <template #9><img src="/media/mpv2.png" /></template>
</v-switch>

<!--
Temps
-->

---

# Formation CDA

## Le métier

<v-clicks>

- Conception et développement de services numériques
- Automatisation de processus
- Travail en entreprise, ESN ou indépendant

</v-clicks>

<v-clicks>

**Types d’emplois :**

- concepteur d'applications informatique
- développeur d'applications
- développeur web (Front-end/Back-end)
- développeur web mobile
- ingénieur d’études et développement

</v-clicks>

<!--
respectant normes et standards
Intervention suite à demandes client/MOA/Chef de projet.
-->

---

## Structure

![Timeline CDA](/media/timeline.svg)

<!--
3 activites, 2 jalons

Developper une appli

Concevoir et developper en couches

deployer
-->

---

## Prérequis & Aptitudes

<v-clicks every="3">

- analyse
- Logique
- synthèse
- organisation
- autonomie
- curiosité
- communication
- travail d'équipe

</v-clicks>

---

# Le projet "Fil Rouge"

<v-clicks>

- Mise en situation professionnelle
- Cohérence avec les apprentissages
- Support pour les évaluations (EPCF)
- Utilisations de nombreux outils et technologies
- Application des compétences acquises
- Projet organisé en jalons

</v-clicks>

<!--
[click] cahier des charges + deadline

[click] CDA apprend MVC, Fetch, POO

[click] simple pour évaluer car commun a tous

[click] en context / non isolé (exercices moodle après leçons)

[click] 2 jalons, 3 activités, progressif
-->

---

## Objectif du projet

<v-clicks>

- Plateforme web "Gastronome Créatif"
- Mise en relation de passionnés de cuisine (public large)
- Découverte et partage de recettes
- Interface responsive et intuitive
- fonctionnalités exclusives aux administrateurs
- Exigences RGPD

</v-clicks>

---

## Compétences mobilisées

<v-clicks>

- Développer des interfaces utilisateurs (Front-end)
- Développer des composants métiers (UX)
- Développer des composants d'accès aux données
- Préparer le déploiement sécurisé
- Gestion de projet informatique

</v-clicks>

---

## Architecture technique

![Architecture MVC](/media/drawio.svg)

<!--
séparation responsabilités, 
maintenance, 
testabilité, 
réutilisabilité, 
collaboration, 
flexibilité
-->

---

## Base de données

![db](/media/db.avif)

---

## Spécifications techniques

<v-clicks>

- **Framework Back-end :** ASP.NET Core MVC
- **Langage Back-end :** C#
- **Front-end :** HTML5, CSS3, JavaScript/TypeScript
- **Base de données :** PostgreSQL (Docker)
- **IDE :** JetBrains Rider & VSCode
- **Gestion de version :** Git/GitHub

</v-clicks>

---

# L'application en action

<v-switch>
  <template #1><img src="/media/1_welcome.avif"></template>
  <template #2><img src="/media/2_add.avif"></template>
  <template #3><img src="/media/3_profile_check.avif"></template>
  <template #4><img src="/media/4_account_settings.avif"></template>
</v-switch>

---
layout: center
---

## Code représentatif

Le client visite le detail du recette depuis le site

---

### Modèle de recette

````md magic-move{lines:true,maxHeight:'90%'}
```cs {none|3-9|3|4|5|6|7|8|9}{lines:true,maxHeight:'90%'}
public class Recipe
	{
		public int id { get; }
		public string? title { get; set; }
		public TimeSpan? preparation_time { get; set; }
		public TimeSpan? cooking_time { get; set; }
		public int? creator_id { get; set; }
		public int difficulty { get; set; }
		public string? image_path { get; set; }
	}
```

```cs {11-18|11|12|13-16|17-18}{lines:true, maxHeight:'90%'}
public class Recipe
	{
		public int id { get; }
		public string? title { get; set; }
		public TimeSpan? preparation_time { get; set; }
		public TimeSpan? cooking_time { get; set; }
		public int? creator_id { get; set; }
		public int difficulty { get; set; }
		public string? image_path { get; set; }

		public IFormFile? image { get; set; }
		public User? creator { get; set; }
		public List<Step> steps { get; set; } = new List<Step>();
		public List<Review> reviews { get; set; } = new List<Review>();
		public List<Category> categories { get; set; } = new List<Category>();
		public List<Ingredient> ingredients { get; set; } = new List<Ingredient>();
		public List<int> categories_ids { get; set; } = new List<int>();
		public List<int> ingredients_ids = new List<int>();
	}
```

```cs {20-23}{lines:true, maxHeight:'90%'}
public class Recipe
	{
		public int id { get; }
		public string? title { get; set; }
		public TimeSpan? preparation_time { get; set; }
		public TimeSpan? cooking_time { get; set; }
		public int? creator_id { get; set; }
		public int difficulty { get; set; }
		public string? image_path { get; set; }

		public IFormFile? image { get; set; }
		public User? creator { get; set; }
		public List<Step> steps { get; set; } = new List<Step>();
		public List<Review> reviews { get; set; } = new List<Review>();
		public List<Category> categories { get; set; } = new List<Category>();
		public List<Ingredient> ingredients { get; set; } = new List<Ingredient>();
		public List<int> categories_ids { get; set; } = new List<int>();
		public List<int> ingredients_ids = new List<int>();

		public int ingredients_count { get; set; }
		public int steps_count { get; set; }
		public int reviews_count { get; set; }
		public double review_rating { get; set; }
	}
```

```cs {5-7,18,20-21|5-8|18-19|20-22}{lines:true, maxHeight:'90%'}
public class Recipe
	{
		public int id { get; }

		[Required()]
		[DisplayName("Title")]
		[MaxLength(100, ErrorMessage = "{0} has to be under {1} characters.")]
		public string? title { get; set; }

		public TimeSpan? preparation_time { get; set; }
		public TimeSpan? cooking_time { get; set; }
		public int? creator_id { get; set; }
		public User? creator { get; set; }
		[Required()]
		[Range(1, 10)]
		public int difficulty { get; set; }

		[MaxLength(100, ErrorMessage = "{0} name has to be under {1} characters.")]
		public string? image_path { get; set; }
		[Required()]
		[DataType(DataType.Upload)]
		public IFormFile? image { get; set; }
		[Required()]
		public List<Step> steps { get; set; } = new List<Step>();
		public List<Review> reviews { get; set; } = new List<Review>();
		[Required()]
		public List<Category> categories { get; set; } = new List<Category>();
		[Required()]
		public List<Ingredient> ingredients { get; set; } = new List<Ingredient>();
		public List<int> categories_ids { get; set; } = new List<int>();
		public List<int> ingredients_ids = new List<int>();

		public int ingredients_count { get; set; }
		public int steps_count { get; set; }
		public int reviews_count { get; set; }
		public double review_rating { get; set; }
	}
```
````

---

### Contrôleur des recettes

```cs {none|3-17|10-14|4-9|4|5-8|9|15|16|17|18|21|23|28|25|26|29|23|19-45|32|34-35|36|38-43|45}{lines:true, maxHeight:'90%'}
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
                    LIMIT 10";
    List<Recipe> recipes;
    try
    {
        using (var connection = new NpgsqlConnection(_connectionString))
        {
            recipes = connection.Query<Recipe, User, Recipe>(query, (recipe, user) =>
                {
                    recipe.creator = user;
                    return recipe;
                },
                splitOn: "id, username")
                .ToList();
        }
    }
    catch (NpgsqlException ne)
    {
        TempData["StatusMessage"] = "The server could not connect to the database, try again later.";
        TempData["StatusMessageType"] = "error";
        return View(new List<Recipe>());
    }
    catch (Exception e)
    {
        TempData["StatusMessage"] = "Error getting recipes from the database, try again later.";
        TempData["StatusMessageType"] = "error";
        return View(new List<Recipe>());
    }

    return View(recipes);
```

---

### Vue des recettes

```cs {none|1|3|6|8-10|8|9|14-16|14|15|19-29|19|22-23|24-25|26|31-45|33-36|47-66|49-51|none}{lines:true, maxHeight:'90%'}
@model Recipe
@{
	var formattedRating = Model.review_rating.ToString("0.0");
}

<article class="recipe">
	@* --- Recipe Image Link --- *@
	<a asp-controller="Recipes" asp-action="Detail" asp-route-id="@Model.id" class="recipe-image-link">
		<img src="@Model.image_path" class="recipe-img" alt="Image of @Model.title" />
	</a>

	<div class="recipe-body">
		@* --- Recipe Title --- *@
		<a asp-controller="Recipes" asp-action="Detail" asp-route-id="@Model.id" class="recipe-title-link">
			<h3 class="recipe-title">@Model.title</h3>
		</a>

		@* --- Creator Info --- *@
		@if (Model.creator != null)
		{
			<div class="recipe-creator">
				<a asp-controller="Users" asp-action="Detail" asp-route-id="@Model.creator_id"
					title="View @Model.creator.username's profile">
					<img src="@(Model.creator.image_path is null ? "null" : Model.creator.image_path)" class="creator-img"
					     alt="Profile picture of @Model.creator.username" onerror="this.onerror=null;this.src='/img/user_placeholder.svg';"/>
					<span class="creator-name">@Model.creator.username</span>
				</a>
			</div>
		}

		@* --- Recipe Main Stats (Time) --- *@
		<div class="recipe-stats">
			<div class="stat-item" title="Preparation Time">
				<img src="~/icons/timer.svg" alt="Prep time" class="stat-icon" />
				<span class="icon-text">@Model.preparation_time</span>
			</div>
			<div class="stat-item" title="Cooking Time">
				<img src="~/icons/skillet.svg" alt="Cook time" class="stat-icon" />
				<span class="icon-text">@Model.cooking_time</span>
			</div>
			<div class="stat-item" title="Difficulty">
				<img src="~/icons/chef_hat.svg" alt="Difficulty" class="stat-icon" /> @* Assuming chef-hat.svg exists *@
				<span class="icon-text">@Model.difficulty</span> @* Assuming difficulty is a string like 'Easy', 'Medium' *@
			</div>
		</div>

		@* --- Recipe Additional Stats (Counts, Rating) --- *@
		<div class="recipe-stats-extra">
			<div class="stat-item" title="@Model.ingredients_count Ingredients">
				<img src="~/icons/ingredients.svg" alt="Ingredients" class="stat-icon" /> @* Assuming ingredients.svg exists *@
				<span class="icon-text">@Model.ingredients_count</span>
			</div>
			<div class="stat-item" title="@Model.steps_count Steps">
				<img src="~/icons/format_list.svg" alt="Steps" class="stat-icon" /> @* Assuming steps.svg exists *@
				<span class="icon-text">@Model.steps_count</span>
			</div>
			<div class="stat-item" title="@Model.reviews_count Reviews">
				<img src="~/icons/reviews.svg" alt="Reviews" class="stat-icon" /> @* Assuming reviews.svg exists *@
				<span class="icon-text">@Model.reviews_count</span>
			</div>
			<div class="stat-item" title="Rating: @formattedRating / 5">
				<img src="~/icons/star.svg" alt="Rating" class="stat-icon" /> @* Assuming star.svg exists *@
				<span class="icon-text">@formattedRating</span>
			</div>
		</div>
	</div>
</article>
```

---
layout: full
---

# Gestion du projet

<div v-click.hide="8" class="absolute">

<v-clicks depth="2">

- **Compétence Évaluée :** "Contribuer à la gestion d’un projet informatique".
- **Méthodologie :**
  - **Début :** Exploration sans planification formelle -> Retard accumulé.
  - **Mise en place (tardive) :** Tableau Kanban sur **GitHub Projects**.
- **Apprentissages :** Importance cruciale de la planification et définition des contraintes **dès le début**.
- **Communication :** Interactions avec les formateurs via Teams ou en salle.

</v-clicks>
</div>
<div v-click.hide="[0,8]">

![Tableau Kanban GitHub](/media/kanban.png)

</div>

---
layout: two-cols-header
---

# Sécurité web

## Deux types d'attaques principales :

::left::

<v-clicks depth="2">

- **Injection SQL**

  - **Protection :**
    - ORM et requêtes paramétrées
    - Validation des entrées utilisateur

- **CSRF (Cross-Site Request Forgery)**
  - **Protection :**
    - Tokens anti-CSRF `Html.AntiForgeryToken()` et `[ValidateAntiForgeryToken]`
    - Validation des requêtes avec ASP.NET Core

</v-clicks>

::right::

<v-switch>
<template #0><img src="/media/void.avif" /></template>
<template #1><img src="/media/sqlinjection.png" /></template>
<template #2><img src="/media/csrf.png" /></template>
<template #3>
<div>
<!-- |4-5|7-11|8-9|12-13 -->
```html {all}{lines:true} 
<h1>Bravo, vous avez gagné 1000€</h1>

<form 
id="csrf-form" 
	action="https://your-bank.com/transfer" 
	method="POST" 
	target="_blank">
    	<input 
				type="hidden"
    		name="to_account"
    		value="meilleur_hacker">
    	<input 
				type="hidden"
    		name="amount"
    		value="999999">
    	<input type="submit" value="Réclamez vos 1000€">

</form>

<p>Cliquez sur le bouton du dessus pour les obtenir</p>
```
</div>
</template>
</v-switch>

---

# Bilan

## Apports

<v-clicks>

- Première expérience complète de développement
- Application concrète des connaissances
- Maîtrise d'outils et de frameworks

</v-clicks>

## Difficultés

<v-clicks>

- Gestion du temps et organisation
- Communication technique
- Finalisation des tâches

</v-clicks>

---

# Perspectives

<v-clicks>

- Amélioration de la gestion personnelle du projet
- Implémentation des fonctionnalités du prochain jalon
- Développement de meilleures habitudes de travail

</v-clicks>

---
layout: end
---

# Questions

Merci pour votre attention

---

# Annexe

- [soundsphere](https://github.com/semyon422/soundsphere)
- [yomitan](https://github.com/yomidevs/yomitan)
- [anki](https://github.com/ankitects/anki/)
- [mpv](https://github.com/mpv-player/mpv)

- [Documentation microsoft concernant les attaques CSRF](https://learn.microsoft.com/en-us/aspnet/core/security/anti-request-forgery?view=aspnetcore-9.0)
