# Down but not Out

An upcoming dating community for adults with and without disabilities. An MLive Digital Solutions LLC project.

Live introduction: https://egoshiftlabs.github.io/down-but-not-out/

## Current experience

- Responsive premium campaign-led landing page, including the original AI-generated promotional image.
- Accessible native dialogs for the full campaign and interactive profile studio.
- Nickname, up to three interests, communication preference, and conversation-starter preview. Inputs stay in memory; no persistence or server submission.
- Three date-inspiration categories, seven conversation starters, larger-text control, and expandable FAQs.
- Explicit prelaunch status. No real member profiles, registration, matching, messaging, or claims of existing moderation.

## Files

`index.html`, `styles.css`, and `app.js` run directly with no build dependencies. `assets/campaign.jpeg` is the supplied campaign art, and `assets/heart.svg` is the favicon. No external fonts, analytics, or third-party scripts.

## Local preview

Run `python -m http.server 8000` from the repository root and open http://localhost:8000.

## Deployment

GitHub Pages publishes `main` from the repository root. See `PUBLISHING.md`.

## Next development stage

Implement a real opt-in waiting list with privacy and deletion controls, followed by an invitation-only adult pilot. Member services require authentication, secure storage, consent-centered onboarding, privacy controls, blocking/reporting, and staffed moderation. Keep private member data and secrets out of this public repository.
