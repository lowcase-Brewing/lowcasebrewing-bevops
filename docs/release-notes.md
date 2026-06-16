# Release Notes

## Overview

One of the core principles of BevOps is documenting change.

Recipes evolve. Processes improve. Equipment changes. Brewers learn.

Without documentation, it becomes difficult to understand why a beer changed between versions or what contributed to a successful batch.

Release Notes provide a structured way to record those changes.

A release note should clearly communicate:

* What changed
* Why it changed
* What outcome was expected
* What outcome was observed

The objective is not to create documentation for its own sake.

The objective is to preserve knowledge and make future decisions easier.

⸻

## Why Release Notes Matter

Imagine brewing a hefeweizen that turns out exactly the way you wanted.

A year later you brew the same beer again and it tastes noticeably different.

Questions immediately arise:

* Was the recipe changed?
* Was a different yeast used?
* Was fermentation handled differently?
* Was a process improvement introduced?

Without documentation, these answers often rely on memory.

Release Notes transform those assumptions into documented facts.

⸻

## Relationship to SemFer

Every SemFer version should be accompanied by Release Notes.

SemFer communicates the significance of a change.

Release Notes explain the details of the change.

Example:

Trailhead Wit v1.1.0

SemFer tells us:

This is a minor release.

Release Notes tell us:

Coriander was increased from 0.50 oz to 0.75 oz to improve citrus aroma.

Together they provide a complete history of recipe evolution.

⸻

## Required Fields

All BevOps Release Notes should include the following information.

Summary

A concise description of what changed.

Example:

Increase coriander addition from 0.50 oz to 0.75 oz.

⸻

## Motivation

The reason the change was introduced.

Example:

Enhance citrus character and improve aroma expression.

⸻

## Expected Outcome

The anticipated result of the change.

Example:

More expressive nose with improved citrus perception.

⸻

## Optional Fields

The following fields are recommended but not required.

Observed Results

What actually happened after deployment and evaluation.

Example:

Orange aroma increased significantly.
Coriander became more noticeable but remained balanced.

⸻

## Rollback Plan

What action should be taken if the change does not achieve the desired outcome.

Example:

Return coriander addition to 0.50 oz.

⸻

## Related Incidents

References to any Incident Reports that influenced the release.

Example:

BEV-2026-003
Fermentation temperature exceeded target range.

⸻

## Related Metrics

Metrics used to validate the change.

Example:

Attenuation
Aroma Retention
Beer Satisfaction Score

⸻

## Release Note Template

Beer:
Version:
Summary:
Motivation:
Expected Outcome:
Observed Results:
Rollback Plan:

⸻

## Example Release

Trailhead Wit v1.1.0

Beer: Trailhead Wit
Version: v1.1.0
Summary:
Increase coriander addition from 0.50 oz to 0.75 oz.
Motivation:
Enhance citrus aroma.
Expected Outcome:
More expressive nose and improved citrus character.
Observed Results:
Pending.
Rollback Plan:
Return coriander addition to 0.50 oz if spice character becomes excessive.

⸻

## Release Notes as Brewing History

Over time, Release Notes become more than operational records.

They become the documented history of a beer.

A brewer should be able to review a sequence of Release Notes and understand how a recipe evolved over months or years.

Example:

v1.0.0
Initial production release
v1.1.0
Increase coriander addition
v1.1.1
Improve wort chilling process
v1.2.0
Adjust mash temperature to improve attenuation

Viewed together, these entries tell the story of continuous improvement.

⸻

## The Goal of Release Notes

The purpose of Release Notes is not documentation.

The purpose of Release Notes is learning.

A successful release should explain why a change was made.

A future brewer should be able to understand the reasoning behind every version of a beer.

If SemFer identifies the version, Release Notes explain the story behind it.

Brew → Iterate → Improve → Enjoy