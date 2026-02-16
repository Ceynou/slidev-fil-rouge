## Diagramme de cas d'utilisation

```plantuml
@startuml usecase1
' Preset Styles by Jeriel Jan

' Preset: Monochrome
!$STYLE_DEFAULT_ACCENT = "#000"
!$STYLE_DEFAULT_BGC = "#FFF"
!$STYLE_DEFAULT_FGC = "#000"

' Preset: Material Light Blue (200)
!$STYLE_LIGHT_ACCENT = "#81D4FA"
!$STYLE_LIGHT_BGC = "#FFF"
!$STYLE_LIGHT_FGC = "#000"

' Preset: Material Light Blue (800)
!$STYLE_DARK_ACCENT = "#0277BD"
!$STYLE_DARK_BGC = "#FFF"
!$STYLE_DARK_FGC = "#000"

' Preset: Material Light Blue (800)
!$STYLE_MIDNIGHT_ACCENT = "#0277BD"
!$STYLE_MIDNIGHT_BGC = "#000"
!$STYLE_MIDNIGHT_FGC = "#FFF"
' Color Definition
' Choose the style you want by applying them here.

!$STYLE_ACCENT = $STYLE_DEFAULT_FGC
!$STYLE_BGC = $STYLE_DEFAULT_BGC
!$STYLE_FGC = $STYLE_DEFAULT_FGC

' RECOMMENDED STYLE
' -=- DO NOT EDIT THIS SECTION. -=-
' See Custom Style section below to override items here.

left to right direction
' top to bottom direction

skinparam {

    ' Global Options
    DPI 200
    Shadowing false
    DefaultFontName Roboto Condensed
    DefaultMonospacedFontName Inconsolata
    DefaultFontColor $STYLE_FGC

    ' Styles - Borders

    ArrowColor $STYLE_ACCENT
    ActivityBorderColor $STYLE_ACCENT
    ActivityDiamondBorderColor $STYLE_ACCENT
    ActorBorderColor $STYLE_ACCENT
    AgentBorderColor $STYLE_ACCENT
    ArtifactBorderColor $STYLE_ACCENT
    BoundaryBorderColor $STYLE_ACCENT
    ClassBorderColor $STYLE_ACCENT
    CloudBorderColor $STYLE_ACCENT
    CollectionsBorderColor $STYLE_ACCENT
    ComponentBorderColor $STYLE_ACCENT
    ControlBorderColor $STYLE_ACCENT
    DatabaseBorderColor $STYLE_ACCENT
    EntityBorderColor $STYLE_ACCENT
    FileBorderColor $STYLE_ACCENT
    FolderBorderColor $STYLE_ACCENT
    FrameBorderColor $STYLE_ACCENT
    InterfaceBorderColor $STYLE_ACCENT
    LegendBorderColor $STYLE_ACCENT
    NodeBorderColor $STYLE_ACCENT
    NoteBorderColor $STYLE_ACCENT
    ObjectBorderColor $STYLE_ACCENT
    PackageBorderColor $STYLE_ACCENT
    ParticipantBorderColor $STYLE_ACCENT
    PartitionBorderColor $STYLE_ACCENT
    QueueBorderColor $STYLE_ACCENT
    RectangleBorderColor $STYLE_ACCENT
    SequenceBoxBorderColor $STYLE_ACCENT
    SequenceDividerBorderColor $STYLE_ACCENT
    SequenceGroupBorderColor $STYLE_ACCENT
    SequenceLifeLineBorderColor $STYLE_ACCENT
    SequenceReferenceBorderColor $STYLE_ACCENT
    StackBorderColor $STYLE_ACCENT
    StateBorderColor $STYLE_ACCENT
    StorageBorderColor $STYLE_ACCENT
    SwimlaneBorderColor $STYLE_ACCENT
    UsecaseBorderColor $STYLE_ACCENT

    ' Styles - Backgrounds

    ActivityBackgroundColor $STYLE_BGC
    ActivityDiamondBackgroundColor $STYLE_BGC
    ActorBackgroundColor $STYLE_BGC
    AgentBackgroundColor $STYLE_BGC
    ArtifactBackgroundColor $STYLE_BGC
    BackgroundColor $STYLE_BGC
    BoundaryBackgroundColor $STYLE_BGC
    ClassBackgroundColor $STYLE_BGC
    ClassHeaderBackgroundColor $STYLE_BGC
    CloudBackgroundColor $STYLE_BGC
    CollectionsBackgroundColor $STYLE_BGC
    ComponentBackgroundColor $STYLE_BGC
    ControlBackgroundColor $STYLE_BGC
    DatabaseBackgroundColor $STYLE_BGC
    EntityBackgroundColor $STYLE_BGC
    FileBackgroundColor $STYLE_BGC
    FolderBackgroundColor $STYLE_BGC
    FrameBackgroundColor $STYLE_BGC
    IconPackageBackgroundColor $STYLE_BGC
    IconPrivateBackgroundColor $STYLE_BGC
    IconProtectedBackgroundColor $STYLE_BGC
    IconPublicBackgroundColor $STYLE_BGC
    InterfaceBackgroundColor $STYLE_BGC
    LegendBackgroundColor $STYLE_BGC
    NodeBackgroundColor $STYLE_BGC
    NoteBackgroundColor $STYLE_BGC
    ObjectBackgroundColor $STYLE_BGC
    PackageBackgroundColor $STYLE_BGC
    ParticipantBackgroundColor $STYLE_BGC
    PartitionBackgroundColor $STYLE_BGC
    QueueBackgroundColor $STYLE_BGC
    RectangleBackgroundColor $STYLE_BGC
    SequenceBoxBackgroundColor $STYLE_BGC
    SequenceDividerBackgroundColor $STYLE_BGC
    SequenceGroupBackgroundColor $STYLE_BGC
    SequenceGroupBodyBackgroundColor $STYLE_BGC
    SequenceLifeLineBackgroundColor $STYLE_BGC
    SequenceReferenceBackgroundColor $STYLE_BGC
    SequenceReferenceHeaderBackgroundColor $STYLE_BGC
    StackBackgroundColor $STYLE_BGC
    StateBackgroundColor $STYLE_BGC
    StereotypeABackgroundColor $STYLE_BGC
    StereotypeCBackgroundColor $STYLE_BGC
    StereotypeEBackgroundColor $STYLE_BGC
    StereotypeIBackgroundColor $STYLE_BGC
    StereotypeNBackgroundColor $STYLE_BGC
    StorageBackgroundColor $STYLE_BGC
    TitleBackgroundColor $STYLE_BGC
    UsecaseBackgroundColor $STYLE_BGC

    ' -=- END OF RECOMMENDED STYLE -=-

    ' Other Settings
    ' These settings are included in the language specs, but
    ' it's not recommended to be applied.

        'TitleBorderColor $STYLE_ACCENT
        'DiagramBorderColor $STYLE_ACCENT

    ' CUSTOM STYLE
    ' All items below can be safely commented out.
    ' This will override the options listed above.
    roundcorner 8
    Monochrome true
    linetype ortho

    NoteFontName Roboto Condensed
    NoteFontStyle Italic
    NoteBackgroundColor $STYLE_BGC

}

    'Actor Definitions
  ' title Diagramme des Cas d'Utilisation - Jalon 2 (API + WinForm)

  top to bottom direction

  ' Définition des acteurs
  actor Visiteur
  actor Utilisateur
  actor Administrateur

  ' Relation d'héritage (Généralisation)
  Administrateur -|> Utilisateur

  ' Définition du système
  rectangle "Système Cookbook (Jalon 2)" {

    ' Cas communs
    (S'authentifier) as UC1
    (Afficher les recettes) as UC2
    (Afficher les ingrédients) as UC3

    rectangle "test" {

    (Afficher les catégories) as UC4
    ' Décomposition de la gestion des catégories
    (Ajouter une catégorie) as UC4_1
    (Modifier une catégorie) as UC4_2
    (Supprimer une catégorie) as UC4_3
    ' Décomposition de la gestion des liens
    (Lier recette et catégorie) as UC5_1
    (Délier recette et catégorie) as UC5_2

    }
    ' Relations Acteurs -> Cas
    Visiteur -u- (UC1)
    Utilisateur -- (UC2)



    UC2 <.. UC3 : <<extend>>

    Administrateur -- "test"
    "test" -- UC1 : <<include>>
    UC2 -- UC1 : <<include>>


  }
@enduml
```
