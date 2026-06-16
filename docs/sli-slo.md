# Service Level Indicators and Objectives (SLI/SLO)

## Overview

Modern operational frameworks rely on measurable indicators to determine whether systems are performing as expected.

In software, Service Level Indicators (SLIs) and Service Level Objectives (SLOs) provide visibility into application health, reliability, and performance.

BevOps applies the same concept to brewing.

Brewing is a process. Processes produce outcomes. Outcomes can be measured.

SLIs provide objective ways to evaluate the health of a batch, while SLOs establish acceptable targets for those measurements.

Together they help brewers answer an important question:

Is this batch performing as expected?

The purpose of SLI/SLO tracking is not to eliminate creativity.

The purpose is to create visibility into process performance and improve consistency over time.

⸻

## What is an SLI?

A Service Level Indicator (SLI) is a measurable characteristic of a brewing process or finished beer.

Examples include:

* Original Gravity
* Final Gravity
* Mash Efficiency
* Attenuation
* Fermentation Duration
* Yield

An SLI answers:

What should we measure?

⸻

## What is an SLO?

A Service Level Objective (SLO) defines the acceptable range or target for an SLI.

Examples:

Original Gravity
Target: 1.052 ± 0.003
Attenuation
Target: 75–80%
Temperature Stability
Target: 66°F ±1°F

An SLO answers:

What does success look like?

⸻

## Why SLI/SLOs Matter

Without measurable targets, it becomes difficult to determine whether a process is improving.

SLIs provide visibility.

SLOs provide context.

A brewer who records gravity measurements without targets is collecting data.

A brewer who compares those measurements against defined objectives is generating operational insight.

This distinction is at the heart of BevOps.

⸻

## Brewing Process SLIs

These metrics help evaluate process performance throughout the Beer Development Life Cycle.

⸻

### Pre-Boil Gravity

Purpose

Did the mash perform as expected before the boil?

Pre-Boil Gravity serves as an early validation point for mash performance and sugar extraction.

Example

Batch Size: 5 gallons
Target OG: 1.052
Pre-Boil Volume: 6.5 gallons
Target Pre-Boil Gravity: 1.040

Example SLO

1.040 ± 0.002

⸻

### Original Gravity (OG)

Purpose

Did the mash and boil process produce the intended wort?

Example SLO

1.065 ± 0.003

⸻

### Final Gravity (FG)

Purpose

Did fermentation complete successfully?

Example SLO

1.010–1.012

⸻

### Mash Efficiency

Purpose

How effectively sugars were extracted from the grain bill.

Example SLO

72–78%

⸻

### Attenuation

Purpose

How effectively yeast converted sugars into alcohol and carbon dioxide.

Attenuation provides insight into fermentation performance and finished beer character.

Example SLO

75–80%

⸻

### Fermentation Duration

Purpose

Time required for fermentation to reach production readiness.

Example SLO

7–10 Days

⸻

### Temperature Stability

Purpose

Measure process consistency during fermentation.

Example SLO

66°F ±1°F

⸻

## Packaging SLIs

These metrics evaluate post-fermentation performance.

⸻

### Carbonation Accuracy

Purpose

Did packaging and conditioning perform correctly?

Example SLO

2.5 Volumes CO₂

⸻

### Yield

Purpose

How much finished beer reached packaging.

Example

Brewed: 5.0 gallons
Packaged: 4.75 gallons

Example SLO

≥ 95% packaged yield

⸻

### Packaging Loss

Purpose

Beer lost to trub, transfers, spills, samples, or packaging operations.

Example SLO

< 10%

⸻

## Quality SLIs

These metrics evaluate the final product.

⸻

### Clarity Score

Purpose

Evaluate visual consistency between batches.

Example Scale

1 = Muddy
3 = Typical Style Appearance
5 = Brilliant

Notes

Certain styles intentionally target haze and should be evaluated accordingly.

⸻

### Head Retention

Purpose

Measure foam stability and presentation quality.

Example SLO

≥ 2 Minutes

⸻

### Aroma Retention

Purpose

Measure how effectively aroma compounds survive storage and aging.

Example Evaluation Periods

* 2 Weeks
* 4 Weeks
* 8 Weeks

⸻

## Business SLIs

These metrics evaluate success from the brewer’s perspective.

⸻

### Beer Satisfaction Score (BSS)

Purpose

Would I brew this again?

While subjective, Beer Satisfaction Score may be one of the most important indicators in BevOps.

Perfect metrics do not guarantee a great beer.

Example Scale

1 = Never Again
3 = Worth Revisiting
5 = Immediate Rebrew

⸻

### Enjoyment Rate

Purpose

Percentage of batches shared with friends, family, or the community.

Beer exists to be enjoyed.

No amount of telemetry, documentation, or dashboards should distract from that reality.

Example

Batches Brewed: 10
Shared Batches: 8
Enjoyment Rate: 80%

⸻

## Defining Your Own SLOs

Not all breweries have the same goals.

A commercial brewery may prioritize consistency and yield.

A homebrewer may prioritize experimentation and enjoyment.

BevOps encourages brewers to define SLOs that align with their objectives.

The important thing is not the target itself.

The important thing is measuring progress toward that target.

⸻

## The Goal of SLI/SLOs

The purpose of SLI/SLO tracking is not to create spreadsheets.

The purpose is to create visibility.

A brewer cannot improve what they do not measure.

SLIs provide measurements.

SLOs define success.

Together they help transform brewing from a series of isolated batches into a process of continuous improvement.

Brew → Measure → Learn → Improve