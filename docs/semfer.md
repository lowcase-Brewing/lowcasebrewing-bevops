# Semantic Fermentioning (SemFer)

## Overview

Good brewers keep detailed brew logs for their batches. These records help brewers understand what happened, identify opportunities for improvement, and reproduce successful results.

BevOps extends this concept by applying semantic versioning principles to beer recipes and brewing processes.

This practice is known as Semantic Fermentioning, or SemFer.

SemFer provides a standardized way to communicate the significance of changes between versions of a beer. Instead of simply referring to “the latest batch,” brewers can clearly identify what changed, why it changed, and how significant the change was.

The objective of SemFer is to make recipe evolution intentional, documented, and repeatable.

⸻

## Why SemFer Exists

Beer changes.

That is a natural part of brewing.

Ingredients vary between harvests. Equipment changes. Processes improve. Brewers learn new techniques. Sometimes a recipe evolves intentionally, and sometimes it evolves accidentally.

Without documentation, it can become difficult to answer questions such as:

* Which version of the recipe produced the best results?
* When was a specific ingredient introduced?
* What process change improved fermentation performance?
* How can a previous batch be reproduced?

SemFer helps preserve this information.

A brewer should be able to look at a recipe version and immediately understand the significance of the changes that occurred between releases.

⸻

## SemFer Principles

Semantic Fermentioning follows a simple philosophy:

Not all changes are equal.

Some changes fundamentally alter a beer’s identity.

Some changes refine an existing recipe.

Some changes simply improve operational consistency.

SemFer provides a structure for distinguishing between those changes.

⸻

## Version Structure

SemFer follows the format:

MAJOR.MINOR.PATCH

Example:

2.1.3

Where:

* MAJOR = Significant recipe identity changes
* MINOR = Flavor-impacting recipe refinements
* PATCH = Operational or process improvements

⸻

## Experimental Releases

Recipes that are still under active development should use the following format:

v0.x.x

Examples:

v0.1.0
v0.3.2
v0.9.0

Experimental releases are expected to change frequently and may not yet represent a finalized recipe.

Typical examples include:

* Pilot batches
* Prototype recipes
* Experimental ingredient combinations
* New beer concepts

⸻

## Major Releases

Major releases represent significant changes to the identity of a beer.

Format:

v2.0.0

Major releases should be used when a change fundamentally alters the expected flavor profile, character, or style of the beer.

Examples:

* Switching hop varieties
* Changing yeast strains
* Moving from one beer style to another
* Significant grain bill redesigns

Example:

Trailhead Wit
v1.0.0
↓
v2.0.0
Changed yeast strain from Wyeast 3944 to a Saison yeast.

The resulting beer may still share the same name, but it should be considered a substantially different product.

⸻

## Minor Releases

Minor releases represent recipe refinements that intentionally affect flavor, aroma, body, or mouthfeel while preserving the overall identity of the beer.

Format:

v1.1.0

Examples:

* Adjusting hop quantities
* Modifying hop timing
* Increasing spice additions
* Adjusting mash temperature
* Refining water chemistry

Example:

Trailhead Wit
v1.0.0
↓
v1.1.0
Increased coriander addition from 0.50 oz to 0.75 oz.

The beer remains recognizably the same beer, but the drinking experience has been intentionally refined.

⸻

## Patch Releases

Patch releases represent operational improvements that do not intentionally alter the flavor profile of the beer.

Format:

v1.0.1

Examples:

* Improved chilling procedures
* Updated cleaning processes
* Better fermentation monitoring
* Packaging improvements
* Equipment upgrades

Example:

Trailhead Wit
v1.0.0
↓
v1.0.1
Changed wort chilling process from passive cooling to active agitation.

The objective of a patch release is improved consistency, efficiency, or reliability.

⸻

## Status Designations

In addition to version numbers, BevOps defines status designations that communicate the maturity of a recipe.

Experimental

Actively changing and under development.

Alpha

Drinkable but still undergoing significant refinement.

Beta

Recipe is largely complete but may receive additional adjustments.

Stable

Approved production recipe suitable for repeat brewing.

LTS (Long-Term Stable)

Mature recipe with minimal expected changes.

Deprecated

Recipe remains documented but is no longer recommended for future development.

Archived

Recipe has been retired and is maintained for historical reference.

⸻

## Example

Beer: Agave Drift
Version: v0.3.0
Status: Experimental
Beer: Trailhead Wit
Version: v1.0.0
Status: Stable
Beer: El Pescador
Version: v1.2.1
Status: LTS

⸻

## SemFer and Release Notes

Every SemFer version should be accompanied by release notes describing what changed and why.

Version numbers communicate the magnitude of change.

Release notes communicate the details.

Together they provide a complete history of the beer’s evolution.

⸻

## The Goal of SemFer

The purpose of Semantic Fermentioning is not to create additional documentation for its own sake.

The purpose is to preserve knowledge.

A successful batch should be repeatable.

A failed batch should be educational.

Every version should tell a story.

SemFer ensures that story is not lost.

Brew → Iterate → Improve → Enjoy