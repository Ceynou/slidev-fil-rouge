---
title: Projet Fil Rouge - Jalon 2
info: Présentation du jalon 2 du projet fil rouge
author: Ceyhane YILMAZ
date: 2025-11-19
theme: default
transition: slide-left
mdc: true
layout: cover
hideInToc: true
background: /media/project_bg_classy_reverse.png
lineNumbers: true
---

# Projet Fil Rouge:
## Jalon 2

**2iSA Millau - <Date/>**

**Par Ceyhane Yilmaz**

<div class="absolute left-150 top-50 h-100 w-100">
<img src="/media/burger_logo_v3.svg" />
</div>

---
hideInToc: true
---

# Sommaire

<Toc columns="2" listClass="{font-weight: bold}" maxDepth="1"/>


---
layout: intro
---

# Présentation personnelle

<v-clicks depth="2">

- Ceyhane YILMAZ
- Concepteur Développeur d'Applications
- **Intérêt pour la tech :** 10 ans d'exploration
- **Parcours :**
  - 1ère année Licence Informatique
  - Projets personnels
  - Formation CDA chez 2iSA pour consolider mes compétences

</v-clicks>

<!--
automatisation, bugs, nouvelles technologies

"Soundsphere", scripts
-->

---
layout: section
transition: slide-up
---

# Formation CDA

---
transition: slide-up
---

## Structure

![Timeline CDA](/media/timeline.svg)

<!--
3 activités, 2 jalons

Développer une appli

Concevoir et développer en couches

deployer
-->

---
layout: two-cols-header
transition: slide-up
---

## Le projet "Fil Rouge"

<br>

::left::

### Contexte

<v-clicks>

- **"Colonne vertébrale"** de la formation
- Simulation d'une situation professionnelle réelle
- Support principal pour les **EPCF**
- Contexte : Entreprise fictive **"Gastronome Créatif"**
- Nom du projet : **"Bytes of Bites"**

</v-clicks>

::right::

### Objectifs

<v-clicks>

- Concevoir et développer une **API REST** sécurisée
  - Technologie : **ASP.NET Core**
- Développer une application **Desktop "client lourd"**
  - Technologie : **WinForms**
- L'application desktop doit consommer l'API
- Préparer les plans de **tests** et de **déploiement**

</v-clicks>

<!--
[click] cahier des charges + deadline

[click] CDA apprend Architecture 3 couches, patterns

[click] simple pour évaluer car commun a tous

[click] en context / non isolé (exercices moodle après leçons)

[click] 2 jalons, 3 activités, progressif
-->

---

## Compétences mobilisées

<v-clicks depth="2" >

- **Concevoir et développer une application sécurisée organisée en couches**
  - Analyser les besoins et maquetter une application 
  - Définir l’architecture logicielle d’une application 
  - Concevoir et mettre en place une base de données relationnelle 
  - Développer des composants d’accès aux données SQL et NoSQL
- **Préparer le déploiement d’une application sécurisée**
  - Préparer et exécuter les plans de test d’une application 
  - Préparer et documenter le déploiement d’une application 
  - Contribuer à la mise en production dans une démarche DevOps
- **Compétences transverses**
  - Actualiser et partager ses compétences en conception et développement

</v-clicks>

<!-- 

-->

---
layout: two-cols-header
clicks: 6
---

# Gestion du projet

::left::


<div>
  <v-clicks depth="1">

  - **Compétence Évaluée :** "Contribuer à la gestion d’un projet informatique".
  - **Outil :** Tableau Kanban sur **GitHub Projects**.
  - **Méthodologie :**
    - Visualisation des tâches (Backlog, Ready, In Progress, Done).
    - Suivi de l'avancement.
  - **Apprentissage :** Importance de la planification.
  - **Communication :** Interactions avec les formateurs et les collègues.

  </v-clicks>
</div>

::right::
<div class="absolute" v-motion
  :initial="{ scale: 1.2, x: 0, y: 0 , transition: {
   duration: 200, 
  }}"
  :enter="{ scale: 1, x: 0, y: 0, transition: {
   duration: 500, 
  }}"
  :click-6="{ scale: 1.8, x: -250, y: 60 }"
  >

  ![kanban](/media/github_project_cropped.png)
  
</div>

---
layout: two-cols-header
---

# Analyse du besoin

::left::

### Acteurs

<v-clicks>

- **Utilisateur**
  - Consulter les recettes
  - Voir le détail des ingrédients
- **Administrateur**
  - Droits de l'Utilisateur
  - Gérer les catégories
  - Gérer les associations recettes/catégories

</v-clicks>

::right::

### Spécifications fonctionnelles

<v-clicks>

- **Authentification obligatoire** pour accéder à toute fonctionnalité.
- Un message d'échec clair doit être affiché.
- **Règle métier :** La suppression d'une catégorie n'est autorisée que si plus aucune recette n'y est associée.

</v-clicks>

<!-- 

- Gérer => CRUD

- (Règle ajoutée) : Une recette doit avoir au moins une catégorie.
 -->

---
layout: center
---

## Diagramme des Cas d'Utilisation

<img src="/media/usecase_diagramv2.svg" class="h-100" />

---
layout: two-cols-header
---

# Spécifications techniques

::left::

<v-clicks depth="1">

- **Langage :** C#
- **Framework** 
  - Back-end : ASP.NET Core Web API
  - Front-end : WinForms
- **Base de données :** PostgreSQL
  - **ORM :** Entity Framework Core
- **Conteneurisation :** Docker
- **Authentification :** JSON Web Tokens
- **Contrôle de version :** Git & GitHub
- **CI/CD :** GitHub Actions
- **IDE :** Visual Studio/Jetbrains Rider

</v-clicks>

::right::

<div class="h-100 w-100 relative ">

  <div v-click="[1,2]" class="absolute left-0 top-0 flex gap-2 h-full w-full">
    <img src="/media/csharp-original.svg" />
  </div>

  <div v-click="[2,3]" class="absolute left-0 top-0 flex gap-2 h-full w-full">
    <img src="/media/dot-net-original-wordmark.svg" />
  </div>

  <div v-click="[3,4]" class="absolute left-0 top-0 flex gap-2 h-full w-full">
    <img src="/media/postgresql-original-wordmark.svg" />
  </div>

  <div v-click="[4,5]" class="absolute left-0 top-0 flex gap-2 h-full w-full">
    <img src="/media/docker-original-wordmark.svg" />
  </div>

  <div v-click="[5,6]" class="absolute left-0 top-0 flex gap-2 h-full w-full">
    <img src="/media/jwt-seeklogo.svg" />
  </div>

  <div v-click="[6,7]" class="absolute left-0 top-0 grid grid-cols-1 grid-rows-2 gap-2 h-full w-full">
    <img class="w-full h-full" src="/media/git-original-wordmark.svg" />
    <img class="w-full h-full" src="/media/github-original-wordmark.svg" />
  </div>

  <div v-click="[7,8]" class="absolute left-0 top-0 flex gap-2 h-full w-full">
    <img src="/media/cicd.svg" />
  </div>

  <div v-click="8" class="absolute left-0 top-0 grid grid-cols-1 grid-rows-2 gap-2 h-full w-full">
    <img class="w-full h-full" src="/media/jetbrains-original.svg" />
    <img class="w-full h-full" src="/media/visualstudio-plain.svg" />
  </div>

</div>

---

## Architecture en **3 couches** pour l'API REST

<v-clicks>

- **1. Couche API (Présentation)**
  - Gérée par les *Controllers*
  - Reçoit les requêtes HTTP, valide les entrées, retourne le JSON.
- **2. Couche Métier (BLL)**
  - Gérée par les *Services*
  - Contient la logique applicative et les règles de gestion.
- **3. Couche d'Accès aux Données (DAL)**
  - Gérée par *Entity Framework Core*
  - Traduit les appels en requêtes SQL vers la BDD.

</v-clicks>

<!--
Utilité du multicouche, avantage etc.
-->

---
clicks: 9
---

## Diagramme de classe

<div class="absolute" v-motion
  :initial="{ scale: 1.2, x: 0, y: 0 , transition: {
   duration: 200, 
  }}"
  :enter="{ scale: 1, x: 0, y: 0, transition: {
   duration: 500, 
  }}"
  :click-1="{ scale: 2, x: 700, y: -350 }"
  :click-2="{ scale: 3, x: 0, y: -100 }"
  :click-3="{ scale: 2, x: 700, y: -490 }"
  :click-4="{ scale: 1.8,  x: -200, y: -510 }"
  :click-5="{ scale: 2.3, x: 240, y: 330 }"
  :click-6="{ scale: 2.5, x: 850, y: 400}"
  :click-7="{ x: 400, y: 300}"
  :click-8="{ scale: 4, x: -300, y: 800}"
  :click-9="{ scale: 2.5, x: -800, y: 200}"
	>

  <img src="/media/class_diagram.svg" />
</div>


---
layout: center
---

## Base de données

<img src="/media/db.avif" />

<!--

-->

---
layout: section
---

# L'application en action


---
layout: center
---

## Démonstration : Scénario de gestion

<SlidevVideo controls class="h-90">
  <source src="/media/remove_association.mp4" type="video/mp4" />
</SlidevVideo>

---
src: "/pages/sequence_diagram.md"
clicks: 20
---

<!-- 
[click] - **1. WinForm :** L'Admin clique sur "supprimer".

[click] - **2. API (Controller) :** Reçoit la requête DELETE. Valide le token (rôle "admin").

[click] - **3. BLL (Service) :** Appelle la méthode `RemoveCategory...`.

[click] - **4. DAL (Context) :** Charge la recette et ses catégories.

[click] - **5. BLL (Service) :** **Point clé !** Applique la règle de gestion : "La recette a-t-elle plus d'une catégorie ?".

[click] - **6a. (Si OUI) :** Demande à la DAL de supprimer le lien.

[click] - **6b. (Si NON) :** Lève une `InvalidOperationException` pour empêcher la suppression.

[click] - **7. API (Controller) :** Retourne une réponse (succès ou erreur).
 -->

---
layout: section
---

## Extraits de code

---

## Contrôleur des catégories 

```cs {8|1-6|13,14,24|10-12|15-20,23|21|22}{lines:true}
using Cookbook.Core;
using Cookbook.SharedData.Contracts.Requests;
using Cookbook.SharedData.Mappers;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cookbook.API.Controllers;

[Authorize(Roles = "admin")]
[Route("v1/cookbook/[controller]")]
[ApiController]
public class CategoriesController(ICookbookService cookbookService) : ControllerBase
{
  [HttpDelete("recipe/{categoryId:int}/{recipeId:int}")]
  [ProducesResponseType(StatusCodes.Status204NoContent)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  [ProducesResponseType(StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> RemoveCategoryByRecipeId(int categoryId, int recipeId)
  {
        await cookbookService.RemoveCategoryByRecipeIdAsync((short)categoryId, recipeId);
        return NoContent();
  }
}
```

---
layout: full
---

### Service Cookbook (part 1)

```cs {8|1-6|10-13,17|14-16}{lines:true}
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Cookbook.Infrastructure;
using Cookbook.SharedData.Entities;
using Cookbook.SharedData.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Cookbook.Core;

public class CookbookService(
		IHttpContextAccessor httpContextAccessor,
		CookbookContext context) : ICookbookService
{
  public async Task RemoveCategoryByRecipeIdAsync(short categoryId, int recipeId)
  {
  }
}
```

---

```cs {*|1|3|4-7|8|10-11|13-14,25|26-27|15-16|17-18,21|22-24|19-20}{lines:true}
public async Task RemoveCategoryByRecipeIdAsync(short categoryId, int recipeId)
{
  var categoryExists = await context.Categories.AnyAsync(c => c.CategoryId == categoryId);
  var recipe = await context.Recipes
      .Where(r => r.RecipeId == recipeId)
      .Include(r => r.RecipesCategories)
      .FirstOrDefaultAsync() 
      ?? throw new ResourceNotFoundException(typeof(Recipe), nameof(Recipe), recipeId);

  if (!categoryExists)
      throw new ResourceNotFoundException(typeof(Category), nameof(Category), categoryId);

  if (recipe.RecipesCategories.Count > 1)
  {
      var recipeCategoryToRemove = recipe.RecipesCategories
      .FirstOrDefault(rc => rc.CategoryId == categoryId);
      if (recipeCategoryToRemove is not null)
      {
          recipe.RecipesCategories.Remove(recipeCategoryToRemove);
          await context.SaveChangesAsync();
      }
      else
          throw new ResourceNotFoundException(typeof(RecipeCategory), 
          nameof(RecipeCategory), (recipeId, categoryId));
  }
  else
      throw new InvalidOperationException("A recipe must have at least one category.");
}
```


---
layout: two-cols-header
---

# Sécurité de l'application


<v-clicks>

- **Authentification :** JWT
  - Token signé, durée de vie limitée.
- **Autorisation :** Gestion des Rôles
  - Rôles "admin" et "user" intégrés au token.
- **Protection des Endpoints :**
  - Utilisation des attributs .NET
    - `[Authorize(Roles = "admin,user")]` pour la consultation.
    - `[Authorize(Roles = "admin")]` pour les actions sensibles (CRUD catégories, associations...).
- **Tests de sécurité** pour vérifier les accès non autorisés.

</v-clicks>

<!-- 
 -->

---
layout: two-cols-header
---

# Tests et Déploiement (CI/CD)

::left::

## Stratégie de Test (xUnit)

<v-clicks>

- **Tests Unitaires :**
  - Ciblent la logique métier pure (BLL).
    - Ex: ` AuthenticationController` (accès), `CookbookService` (règles de gestion).
- **Tests d'Intégration :**
  - Valident le workflow complet (API -> BDD).
  - Utilisation de **Testcontainers** pour lancer une BDD PostgreSQL éphémère en Docker.
    - Ex: `RecipesController` (workflow CRUD complet), Sécurité (accès non authentifié).
- **Tests d'acceptation (E2E) :** 
  - Utilisation de l'application

</v-clicks>

::right::

## Plan de Déploiement (CI/CD)

<v-clicks>

- **Conteneurisation :**
  - `Docker Compose` pour l'API + la BDD PostgreSQL.
- **Intégration Continue (CI) :**
  - Workflow `dotnet.yml` (sur *push*).
  - Compile le code et **exécute tous les tests (TU + TI)**.
- **Déploiement Continu (CD) :**
  - Workflow `docker-image.yml` (sur *release*).
  - Construit l'image Docker de l'API.
  - Publie l'image sur la registry GitHub (ghcr.io).
  - Signe l'image (cosign) pour l'intégrité.

</v-clicks>

---
layout: two-cols-header
---

# Conformité et Responsabilité

::left::

## RGPD

<v-clicks>

- **Sécurité des accès :** Authentification JWT.
- **Contrôle des rôles :** Garantir que les utilisateurs n'accèdent qu'à leurs données.
- **Protection des mots de passe :** Jamais stockés en clair (hachage validé par tests unitaires).
- **Minimisation des données :** L'API n'expose que le strict nécessaire.

</v-clicks>

::right::

## Éco-conception (Green IT)

<v-clicks>

- **Optimisation des requêtes :**
  - Ajustement de requêtes Entity Framework coûteuses (noté dans le bilan).
- **Architecture légère :**
  - API REST + JSON (format sobre).
- **Déploiement optimisé :**
  - **Docker** permet la mutualisation des ressources serveur (moins de machines).
- **CI/CD :**
  - Intercepter les bugs tôt évite des cycles de déploiement correctifs énergivores.

</v-clicks>

---
layout: two-cols-header
---

# Bilan | conclusion

::left::

## Apports et Apprentissages

<v-clicks>

- Conception d'une application **desktop**
- Conception d'une **architecture en couches**
- Sécurisation et déploiement d'une **API REST**
- Mise en place d'un **pipeline CI/CD** complet
- Conteneurisation **multi-services**

</v-clicks>

::right::

## Difficultés rencontrées

<v-clicks>

- **Gestion du temps** 
- Prise en main de **EF Core**
- **Priorité** et **choix** des tâches à faire

</v-clicks>

<!-- 
[click] - 

[click] - JWT

[click] -

[click] -

[click] - Docker / Docker Compose


[click] - encore un défi

[click] - Et application repository/UoW pattern

[click] - 
 -->

---

# Perspectives

<v-clicks>

- **Ergonomie** de l'application WinForms.
- **Internationalisation** et **localisation** à l'API et au client.
- Poursuivre la rédaction de tests pour atteindre une **couverture de code de 100%**.
- Optimiser le code pour améliorer la **scalabilité de l’API**.

</v-clicks>

<!-- 
UX/UI
l'internationalisation 

 -->

---
hideInToc: true
layout: end
---

# Questions

Merci pour votre attention

---
# hideInToc: true
layout: default
---

# Annexe

- [Bytes of Bites](https://github.com/Ceynou/Cookbook)

- <Link to="ADD-DI">Ajouter des services pour l'injection de dépendences</Link>
- <Link to="YML-DOCKER">Workflow image Docker</Link>
- <Link to="YML-BUILD">Workflow build API</Link>
- <Link to="GET-RECIPE">Recevoir une recette (services)</Link>
- <Link to="EDIT-RECIPE-C">Modifier une recette (contrôleur)</Link>
- <Link to="EDIT-RECIPE">Modifier une recette  (services)</Link>
- <Link to="PROGRAM">program.cs</Link>
- <Link to="GEM">Global Exception Middleware</Link>
- <Link to="IT">Integration test</Link>
- <Link to="UT">Unit test</Link>


---
routeAlias: ADD-DI
---

### Ajouter des services pour l'injection de dépendences

```cs
public static void AddBll(this IServiceCollection services)
{
    services.AddScoped<ICookbookService, CookbookService>();
    services.AddScoped<IAccessService, AccessService>();
    services.AddScoped<IJwtService, JwtService>();
}
```

---
routeAlias: YML-DOCKER
layout: full
---

### Workflow Docker image

```yml
name: Docker

on:
  push:
    branches: [ "release" ]
    tags: [ 'v*.*.*' ]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
      id-token: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
```

---
layout: full
---

```yml
jobs:
  build:
    steps:
      - name: Install cosign
        uses: sigstore/cosign-installer@59acb6260d9c0ba8f4a2f9d9b48431a222b68e20 #v3.5.0
        with:
          cosign-release: 'v2.2.4'

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@f95db51fddba0c2d1ec667646a06c2ce06100226 # v3.0.0
      - name: Log into registry ${{ env.REGISTRY }}
        uses: docker/login-action@343f7c4344506bcbf9b4de18042ae17996df046d # v3.0.0
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract Docker metadata
        id: meta
        uses: docker/metadata-action@96383f45573cb7f253c731d3b3ab81c87ef81934 # v5.0.0
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
```

---
layout: full
---

```yml
jobs:
  build:
    steps:
      - name: Build and push Docker image
        id: build-and-push
        uses: docker/build-push-action@0565240e2d4ab88bba5387d719585280857ece09 # v5.0.0
        with:
          context: .
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          file: ./Cookbook.API/Dockerfile

      - name: Sign the published Docker image
        env:
          TAGS: ${{ steps.meta.outputs.tags }}
          DIGEST: ${{ steps.build-and-push.outputs.digest }}
        run: echo "${TAGS}" | xargs -I {} cosign sign --yes {}@${DIGEST}
```

---
routeAlias: YML-BUILD
---

### Workflow build

```yml
name: Cookbook API build

on:
  push:
    branches: [ "master" ]
  pull_request:
    branches: [ "master" ]

jobs:
  build:
    name: Build and Test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Setup .NET
      uses: actions/setup-dotnet@v4
      with:
        dotnet-version: 10.0.x
        dotnet-quality: 'preview'
    - name: Restore dependencies
      run: dotnet restore API-continuous-integration.slnf
    - name: Build
      run: dotnet build API-continuous-integration.slnf --no-restore --configuration Release
    - name: Test
      run: dotnet test API-continuous-integration.slnf --no-build --verbosity normal --configuration Release
```

---
routeAlias: GET-RECIPE
---

### Recevoir une recette (service)

```cs
public async Task<Recipe> GetRecipeByAsync(int id)
{
    var recipe = await context.Recipes
        .Where(r => r.RecipeId == id)
        .Include(r => r.Creator)
        .Include(r => r.Steps)
        .Include(r => r.RecipesIngredients)
        .ThenInclude(ri => ri.Ingredient)
        .Include(r => r.RecipesCategories)
        .ThenInclude(r => r.Category)
        .Include(r => r.Reviews)
        .ThenInclude(rw => rw.Reviewer)
        .AsSplitQuery()
        .SingleOrDefaultAsync();

    return recipe ?? throw new ResourceNotFoundException(typeof(Recipe), nameof(recipe.RecipeId), id);
}
```

---
routeAlias: EDIT-RECIPE
---

### Modifier une recette (service)

```cs
public async Task<Recipe> ModifyRecipeAsync(int id, Recipe recipe)
{
    var existingRecipe = await GetRecipeByAsync(id);

    recipe.RecipeId = id;

    context.RecipesIngredients.RemoveRange(existingRecipe.RecipesIngredients);
    context.RecipesCategories.RemoveRange(existingRecipe.RecipesCategories);
    context.Steps.RemoveRange(existingRecipe.Steps);

    context.Entry(existingRecipe).CurrentValues.SetValues(recipe);

    existingRecipe.RecipesIngredients = recipe.RecipesIngredients;
    existingRecipe.RecipesCategories = recipe.RecipesCategories;
    existingRecipe.Steps = recipe.Steps;

    await context.SaveChangesAsync();

    return recipe;
}
```


---
routeAlias: PROGRAM
---

### Program.cs (part 1)

```cs
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Text;
using Cookbook.API;
using Cookbook.Core;
using Cookbook.Infrastructure;
using Cookbook.SharedData.Contracts.Requests;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

[assembly: InternalsVisibleTo("Cookbook.API.UnitTests")]
[assembly: InternalsVisibleTo("Cookbook.API.IntegrationTests")]


var builder = WebApplication.CreateBuilder(args);
```

---
layout: full
---

### Program.cs (part 2)

```cs
builder.Services.AddValidatorsFromAssemblyContaining<SignInUserRequest>();

builder.Services.AddDbContext<CookbookContext>(options => options
    .UseNpgsql(builder.Configuration.GetConnectionString("CookbookDB"))
    .UseAsyncSeeding(async (dbContext, _, cancellationToken) =>
    {
        var context = (CookbookContext)dbContext;
        await context.SeedAsync(context, cancellationToken);
    }));

builder.Services.AddBll();


builder.Services.AddControllers(options =>
{
    var policy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
    options.Filters.Add(new AuthorizeFilter(policy));
});
```

---
layout: full
---

### Program.cs (part 3)

```cs

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ValidIssuer = builder.Configuration.GetValue<string>("JwtIssuer"),
        ValidAudience = builder.Configuration.GetValue<string>("JwtAudience"),
        IssuerSigningKey =
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetValue<string>("JwtSecret") 
            ?? throw new InvalidOperationException())),
        RoleClaimType = ClaimTypes.Role
    };
});

builder.Services.AddHttpContextAccessor();
builder.Services.AddEndpointsApiExplorer();
```

---
layout: full
---

### Program.cs (part 4)

```cs
var app = builder.Build();
app.UseMiddleware<GlobalExceptionMiddleware>();


using (var serviceScope = app.Services.CreateScope())
{
    await using (var context = serviceScope.ServiceProvider.GetRequiredService<CookbookContext>())
    {
        if (!app.Environment.IsDevelopment())
        {
            await context.Database.MigrateAsync();
        }
        else
        {
            await context.Database.EnsureDeletedAsync();
            await context.Database.EnsureCreatedAsync();
        }
    }
}
app.UseAuthorization();
app.MapControllers();
await app.RunAsync();
```

---
routeAlias: GEM
---

### Global Exception Middleware

```cs
private Task HandleExceptionAsync(HttpContext context, Exception exception)
{
  context.Response.ContentType = "application/json";
  switch (exception)
  {
    case ValidationException fvex:
      {
          context.Response.StatusCode = StatusCodes.Status400BadRequest;
          ErrorResponse response = new()
          {
              Error = "Validation errors occurred.",
              Details = string.Join("\r", fvex.Errors.Select(e => e.ErrorMessage))
          };
          return context.Response.WriteAsJsonAsync(response);
      }
    default:
      {
          context.Response.StatusCode = StatusCodes.Status500InternalServerError;
          ErrorResponse response = new()
          {
              Error = "Internal error occurred.",
              Details = env.IsDevelopment()
                  ? $"{exception.GetType().Name} : {exception.Message}"
                  : "Please contact the system administrator."
          };
          return context.Response.WriteAsJsonAsync(response);
      }
  }
}
```

---
routeAlias: IT
---

### Test d'intégration

```cs
using System.Net;
using System.Net.Http.Json;
using Cookbook.API.IntegrationTests.Fixtures;
using Cookbook.SharedData.Contracts.Requests;
using Cookbook.SharedData.Contracts.Responses;
using Xunit;
namespace Cookbook.API.IntegrationTests;
public class RecipesControllerTests(APiWebApplicationFactory webApi) : IntegrationTest(webApi)
{
  [Fact]
  public async Task GetBy_WhenRecipeExists_ReturnsOkWithRecipe()
  {
      // Arrange
      await SignIn("admin", "admin");
      const int recipeId = 1;
      // Act
      var response = await HttpClient.GetAsync($"/v1/cookbook/Recipes/{recipeId}");
      var recipe = await response.Content.ReadFromJsonAsync<RecipeResponse>();
      // Assert
      Assert.Equal(HttpStatusCode.OK, response.StatusCode);
      Assert.NotNull(recipe);
      Assert.Equal(recipeId, recipe.RecipeId);
      Assert.False(string.IsNullOrEmpty(recipe.Title));
  }
}
```

---
routeAlias: UT
---

### Test unitaire

```cs		
using System.Security.Claims;
using Cookbook.Core;
using Cookbook.Infrastructure;
using Cookbook.SharedData.Entities;
using Cookbook.SharedData.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace Cookbook.API.UnitTests;

public class CookbookServiceTests
{
    private readonly CookbookContext _context;
    private readonly CookbookService _cookbookService;
    private readonly Mock<IHttpContextAccessor> _mockHttpContextAccessor;
}
```

---
layout: full
---

```cs
public CookbookServiceTests()
{
    var options = new DbContextOptionsBuilder<CookbookContext>()
        .UseInMemoryDatabase($"CookbookTestDb_{Guid.NewGuid()}")
        .Options;

    _context = new CookbookContext(options);
    // Remove EnsureDeleted/EnsureCreated - not needed with unique GUID
    _mockHttpContextAccessor = new Mock<IHttpContextAccessor>();
    _cookbookService = new CookbookService(_mockHttpContextAccessor.Object, _context);
}

[Fact]
public async Task DeleteCategoryAsync_WithNonExistingCategory_ThrowsResourceNotFoundException()
{
    const short categoryId = 0;
    // Act & Assert
    await Assert.ThrowsAsync<ResourceNotFoundException>(() => _cookbookService.DeleteCategoryAsync(categoryId));
}
```

---
routeAlias: EDIT-RECIPE-C
---

### Modifier une recette (contrôleur)

```cs {}
[Authorize(Roles = "admin")]
[HttpPut("{id}")]
[ProducesResponseType(StatusCodes.Status200OK)]
[ProducesResponseType(StatusCodes.Status400BadRequest)]
[ProducesResponseType(StatusCodes.Status404NotFound)]
[ProducesResponseType(StatusCodes.Status500InternalServerError)]
public async Task<IActionResult> Modify(IValidator<UpdateRecipeRequest> validator,
    [FromRoute] int id, [FromBody] UpdateRecipeRequest request)
{
    await validator.ValidateAndThrowAsync(request);

    var updatedRecipe = await cookbookService.ModifyRecipeAsync(id, request.ToRecipe());

    return Ok(updatedRecipe.ToRecipeResponse());
}
```

---
routeAlias: JwtService
---

### JWT Service

```cs
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Cookbook.Core;

public class JwtService(IConfiguration configuration) : IJwtService
{
    private readonly string _audience = configuration["JwtAudience"]!;
    private readonly int _expirationMinutes = int.Parse(configuration["JwtExpirationMinutes"]!);
    private readonly string _issuer = configuration["JwtIssuer"]!;
    private readonly string _secret = configuration["JwtSecret"]!;

    public string GenerateJwt(string id, params string[] roles)
    {
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(JwtRegisteredClaimNames.Sub, id),
            new(ClaimTypes.NameIdentifier, id)
        };
        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role.Trim())));

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secret));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            _issuer,
            _audience,
            claims,
            expires: DateTime.UtcNow.AddMinutes(_expirationMinutes),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
```
