# Observability & Metrics

## Overview

Observability is the practice of understanding why a brewing process behaves the way it does.

Traditional brewing logs often focus on recording events and measurements. While these records are valuable, they typically answer only one question:

What happened?

Observability seeks to answer a deeper question:

Why did it happen?

BevOps defines Observability as the ability to understand the state and behavior of a brewing process through measurements, observations, and historical data.

The goal is not simply to collect information.

The goal is to generate actionable insights.

⸻

## Monitoring vs Observability

These terms are often used interchangeably, but they serve different purposes.

Monitoring

Monitoring answers:

What happened?

Examples:

* Original Gravity was 1.052
* Final Gravity was 1.011
* Fermentation lasted 8 days
* Temperature averaged 67°F

Monitoring focuses on known metrics and known conditions.

⸻

## Observability

Observability answers:

Why did it happen?

Examples:

* Why did attenuation increase?
* Why did the beer finish drier than expected?
* Why was clarity improved compared to previous batches?
* Why did hop aroma fade more quickly than normal?

Observability focuses on understanding relationships between measurements, processes, and outcomes.

⸻

## The Three Pillars of Brewing Observability

BevOps adapts a concept commonly used in software operations known as the Three Pillars of Observability.

### Metrics

Quantitative measurements collected throughout the brewing process.

Examples:

* Original Gravity
* Final Gravity
* Attenuation
* Temperature
* Carbonation
* Yield

Metrics provide objective visibility into brewing performance.

⸻

### Events

Significant occurrences during the brewing process.

Examples:

* Yeast pitched
* Dry hops added
* Cold crash started
* Fermentation completed
* Beer packaged

Events provide context for metrics.

Without events, measurements often lack meaning.

⸻

### Logs

Human-recorded observations and notes.

Examples:

* Strong krausen observed on Day 2
* Citrus aroma increased after dry hopping
* Fermentation activity appeared sluggish
* Packaging losses higher than expected

Logs capture information that cannot always be measured automatically.

⸻

## Observability Data Sources

Brewers may collect data from a variety of sources.

Examples include:

Manual Measurements

* Hydrometer readings
* Refractometer readings
* Volume measurements
* Packaging counts

Environmental Data

* Fermentation temperature
* Ambient temperature
* Humidity

Telemetry Systems

* Tilt Hydrometer
* Tilt Pico
* Fermentation controllers
* Temperature probes

Human Feedback

* Tasting notes
* Batch reviews
* Beer Satisfaction Scores
* Community feedback

Every source contributes to overall observability.

⸻

## Brewing Telemetry

Telemetry is the automated collection of brewing data.

Examples include:

Tilt Hydrometer
        ↓
Tilt Pico
        ↓
Data Pipeline
        ↓
Time-Series Database
        ↓
Dashboard

Telemetry allows brewers to observe trends that may otherwise go unnoticed.

Examples:

* Fermentation curves
* Temperature stability
* Attenuation progression
* Fermentation duration

The objective is not automation for its own sake.

The objective is visibility.

⸻

## Observability Workflows

Observability becomes most valuable when data is used to answer meaningful questions.

Example:

Monitoring

OG = 1.052
FG = 1.011

Useful.

But incomplete.

⸻

## Observability

Mash Temperature = 150°F
Attenuation = 79%
Compared to:
Mash Temperature = 152°F
Attenuation = 74%

Observation:

Lower mash temperatures increased attenuation.

Insight:

Mash temperature influences perceived dryness.

Action:

Adjust future mash schedules accordingly.

This is where data becomes knowledge.
---
## Dashboards
Dashboards provide visual access to brewing metrics and trends.
Potential dashboard metrics include:
- Gravity
- Temperature
- Attenuation
- Fermentation Progress
- Yield
- Batch History
Examples:
- Grafana
- Google Sheets
- Brewfather
- Custom Dashboards
A dashboard should provide clarity, not complexity.
---
## Alerting
Observability should not only help brewers understand the past.
It should help identify issues in the present.
Examples:
- Fermentation temperature outside target range
- Unexpected gravity readings
- Telemetry failures
- Data collection interruptions
The goal is early detection and faster recovery.
---
## Observability Maturity
BevOps recognizes that brewers operate at different levels of sophistication.
### Level 1 — Manual
- Brew logs
- Handwritten notes
- Hydrometer readings
### Level 2 — Digital
- Spreadsheets
- Digital logs
- Basic charts
### Level 3 — Telemetry
- Automated gravity collection
- Temperature monitoring
- Continuous data collection
### Level 4 — Observable Brewery
- Time-series databases
- Dashboards
- Alerting
- Historical analysis
### Level 5 — Data-Driven Brewing
- Continuous improvement informed by operational metrics
- Repeatable experimentation
- Integrated observability practices
Every level provides value.
The goal is progress, not perfection.
---
## The Goal of Observability
The purpose of observability is not to create more dashboards.
The purpose of observability is understanding.
Metrics become information.
Information becomes knowledge.
Knowledge becomes improvement.
A brewer who understands why a beer behaves the way it does is better equipped to improve future batches.
In BevOps, observability transforms brewing from a collection of isolated events into a continuously improving system.
**Measure → Observe → Learn → Improve**
:::
What I really like about this chapter is that it naturally gives you a place later to document your actual lowcase Brewing stack:
```text
Tilt Hydrometer
    ↓
Tilt Pico
    ↓
Google Sheets
    ↓
Python Importer
    ↓
InfluxDB
    ↓
Grafana

That’s not just brewing anymore—that’s a brewery observability platform. 😄🍺📈🚀