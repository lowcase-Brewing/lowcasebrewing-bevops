# Glossary

## B

### Batch Review

A structured evaluation performed after a beer has been brewed, deployed, and observed. Batch Reviews summarize performance, lessons learned, and opportunities for future iteration.

⸻

### BDD (Beer-Driven Development)

An unofficial BevOps philosophy suggesting that brewing decisions should be informed by feedback, observations, and real-world outcomes rather than assumptions alone.

⸻

### BDLC (Beer Development Life Cycle)

The framework used by BevOps to describe the lifecycle of a beer from concept through iteration.

Stages include:

* Ideation
* Recipe Architecture
* Development Brew
* Testing & Validation
* Deployment
* Monitoring & Observability
* Iteration

⸻

### Beer Satisfaction Score (BSS)

A subjective metric used to evaluate overall satisfaction with a beer and determine whether it should be brewed again.

Typical scale:

1 = Never Again
3 = Worth Revisiting
5 = Immediate Rebrew

⸻

### BevOps

The application of DevOps-inspired principles to brewing in order to improve repeatability, observability, and continuous improvement while preserving creativity and enjoyment.

⸻

### BORA (Brewing Operations Reliability Assessment)

A collection of operational metrics used to evaluate the effectiveness, consistency, and reliability of a brewing operation.

BORA measures brewery performance in the same way SLI/SLO metrics measure batch performance.

⸻

## D

### Deployment

The BDLC phase in which a validated beer is packaged, conditioned, labeled, and made available for consumption.

Examples:

* Bottling
* Kegging
* Canning

⸻

### Development Brew

The BDLC phase where a recipe is transformed into a physical batch of beer through brewing and fermentation activities.

This is where theory becomes beer.

⸻

## I

### Ideation

The earliest phase of the BDLC where beer concepts, recipe ideas, and experiments are conceived.

Every beer begins as an idea.

⸻

### Incident Report

A structured document describing an unexpected event that affected a batch, process, system, or brewing operation.

Incident Reports focus on learning and prevention rather than assigning blame.

⸻

### Iteration

The process of applying lessons learned from brewing, deployment, monitoring, and observation to improve future versions of a beer.

Iteration is the engine that drives continuous improvement.

⸻

## L

### Lead Time for Changes

A BORA metric that measures how long it takes for an idea to become a finished beer ready for evaluation.

⸻

### LTS (Long-Term Stable)

A recipe status designation indicating a mature recipe with minimal expected changes.

⸻

## M

### Mean Time To Recovery (MTTR)

A BORA metric that measures how quickly a brewery recovers from incidents such as equipment failures, stalled fermentations, or failed batches.

⸻

### Monitoring

The collection and evaluation of brewing metrics to understand what happened during a batch.

Monitoring answers:

What happened?

⸻

## O

## Observability

The ability to understand why a batch behaved the way it did by analyzing metrics, observations, release notes, and historical data.

Observability answers:

Why did it happen?

⸻

### Operational Consistency Score

A BORA metric that measures how consistently brewing targets are achieved across batches.

⸻

### P

## Patch Release

A SemFer release that introduces operational improvements without intentionally affecting flavor, aroma, body, or mouthfeel.

Example:

v1.0.1

⸻

## Production Release

A recipe release intended for repeat brewing and considered stable enough for regular production.

Typically begins at:

v1.0.0

⸻

## R

### Recipe Architecture

The BDLC phase where ingredients, processes, and expected outcomes are designed and documented.

The blueprint for a beer.

⸻

### Recipe Stability Index (RSI)

A BORA metric used to evaluate how frequently a recipe changes over time.

⸻

### Release Notes

Documentation describing what changed between recipe versions, why the change was made, and what outcome was expected.

⸻

### Rebrew Rate

A BORA metric that measures how frequently a recipe is brewed again.

⸻

## S

### SemFer (Semantic Fermentioning)

The BevOps versioning methodology used to track recipe and process changes over time.

SemFer follows the format:

MAJOR.MINOR.PATCH

⸻

### Service Level Indicator (SLI)

A measurable characteristic of a brewing process or finished beer.

Examples:

* Original Gravity
* Final Gravity
* Attenuation
* Yield

⸻

### Service Level Objective (SLO)

A target or acceptable range for an SLI.

Examples:

OG = 1.052 ± 0.003
Attenuation = 75–80%

⸻

### Stable

A recipe status designation indicating a recipe is approved for repeat brewing and considered production-ready.

⸻

## T

### Testing & Validation

The BDLC phase where a beer is evaluated against recipe expectations, quality objectives, and brewer goals.

⸻

## V

### Version

A specific release of a beer identified through Semantic Fermentioning.

Examples:

v0.3.0
v1.0.0
v1.1.0
v2.0.0

⸻

## W

### Wort

The sugar-rich liquid produced during the brewing process prior to fermentation.

Wort becomes beer after yeast is introduced and fermentation begins.

⸻

## Y

### Yield

The amount of finished beer successfully packaged after brewing and fermentation.

Yield is commonly tracked as an SLI.

Example:

Brewed: 5.0 gallons
Packaged: 4.75 gallons

⸻

## Closing Thoughts

BevOps is a living framework and its vocabulary will continue to evolve alongside it.

New concepts, metrics, and practices should be documented as they emerge so that the language of BevOps remains consistent, understandable, and useful.

Like brewing itself, the glossary is never truly finished.

It is continuously fermenting.