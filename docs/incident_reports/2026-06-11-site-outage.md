BEV-2026-002

Summary:
BevOps handbook unavailable over HTTPS.

Impact:
Site accessible via HTTP only.
Unable to enforce HTTPS.

Root Cause:
Custom domain configured in GitHub Pages but CNAME file was not present in repository.

Resolution:
Added CNAME file containing:
bevops.lowcasebrewing.com

Preventive Action:
Include CNAME verification in future GitHub Pages deployment checklist.

Status:
Closed