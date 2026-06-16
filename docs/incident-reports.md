Incident Reports

Overview

Brewing is a process.

Processes occasionally fail.

Equipment breaks. Fermentations stall. Temperatures drift. Ingredients are forgotten. Hydrometers shatter on brewery floors.

These events are a natural part of brewing.

BevOps treats incidents as opportunities to learn rather than failures to hide.

An Incident Report documents an unexpected event that had the potential to impact a batch, brewing process, equipment, or operational workflow.

The objective is not assigning blame.

The objective is understanding what happened and preventing similar incidents in the future.

⸻

Why Incident Reports Matter

Every brewer experiences problems.

What separates experienced brewers from inexperienced brewers is often not the number of mistakes made, but the ability to learn from them.

Incident Reports help answer questions such as:

* What happened?
* Why did it happen?
* What impact did it have?
* How was it resolved?
* How can it be prevented in the future?

Without documentation, lessons learned are often forgotten.

With documentation, every incident becomes part of the brewery’s operational knowledge.

⸻

What Qualifies as an Incident?

Not every unexpected event requires a formal Incident Report.

Generally speaking, incidents should be documented when they:

* Affect batch quality
* Affect recipe consistency
* Affect equipment reliability
* Cause data loss
* Introduce operational risk
* Create significant process deviations

Examples include:

Brewing Incidents

* Missed hop additions
* Incorrect mash temperature
* Incorrect water volume
* Extended boil duration

Fermentation Incidents

* Stalled fermentation
* Temperature excursions
* Airlock failures
* Yeast pitch errors

Packaging Incidents

* Bottle bombs
* Under-carbonation
* Over-carbonation
* Packaging contamination

Infrastructure Incidents

* Tilt telemetry failures
* Tilt Pico outages
* InfluxDB failures
* Grafana dashboard issues
* Data collection interruptions

Equipment Incidents

* Broken fermenters
* Failed temperature controllers
* Pump failures
* Chiller malfunctions

⸻

Incident Severity

Not all incidents are equal.

BevOps defines four severity levels.

SEV-1 Critical

Batch loss or major operational impact.

Examples:

* Contaminated batch
* Fermenter failure
* Complete batch loss

SEV-2 Major

Significant quality impact but beer remains recoverable.

Examples:

* Missed fermentation temperatures
* Incorrect hop additions
* Severe over-carbonation

SEV-3 Minor

Limited impact on final product.

Examples:

* Delayed gravity reading
* Temporary telemetry outage
* Minor process deviation

SEV-4 Informational

No significant impact but worth documenting.

Examples:

* Unexpected observations
* Near misses
* Lessons learned

⸻

Incident Report Template

Every Incident Report should contain the following information.

Incident ID

Unique identifier for the incident.

Example:

BEV-2026-001

⸻

Summary

Brief description of the incident.

Example:

Tilt telemetry pipeline stopped reporting data.

⸻

Impact

Description of the consequences.

Example:

Lost 12 hours of fermentation telemetry.
No impact to beer quality.

⸻

Root Cause

Explanation of why the incident occurred.

Example:

Tilt Pico was accidentally unplugged during cleaning.

⸻

Resolution

Actions taken to resolve the issue.

Example:

Reconnected Tilt Pico and verified telemetry flow.

⸻

Preventive Actions

Changes introduced to prevent recurrence.

Example:

Added telemetry verification to brew day checklist.

⸻

Example Incident Report

BEV-2026-001

Severity: SEV-3
Summary:
Tilt telemetry pipeline failed.
Impact:
Lost approximately 12 hours of fermentation data.
Root Cause:
Tilt Pico was accidentally unplugged while cleaning equipment.
Resolution:
Reconnected Tilt Pico and verified data flow to InfluxDB.
Preventive Actions:
Add telemetry verification to post-cleaning checklist.
Status:
Resolved

⸻

Blameless Postmortems

One of the core principles of DevOps is the concept of the blameless postmortem.

BevOps adopts the same philosophy.

Incident Reports should focus on:

* What happened
* Why it happened
* How to improve

They should not focus on assigning blame.

Humans make mistakes.

Processes should be designed to make those mistakes easier to detect and recover from.

A useful Incident Report improves the system.

An unhelpful Incident Report simply identifies a person.

⸻

Incident Trends

Individual incidents are useful.

Collections of incidents are even more valuable.

Over time, brewers should review Incident Reports to identify recurring themes.

Examples:

* Frequent fermentation temperature excursions
* Repeated packaging issues
* Recurring telemetry outages
* Equipment reliability concerns

These patterns often reveal opportunities for operational improvement.

⸻

The Goal of Incident Reports

The purpose of Incident Reports is not to document failure.

The purpose of Incident Reports is to preserve lessons learned.

Every incident represents an opportunity to improve brewing processes, equipment, documentation, or operational practices.

A brewery that learns from incidents becomes more reliable over time.

A brewery that ignores incidents is destined to repeat them.

In BevOps, every incident is data.

Every incident is knowledge.

And every incident is an opportunity to improve.

Brew → Learn → Improve → Repeat