# Down but not Out

An upcoming dating community for adults with and without disabilities. An MLive Digital Solutions LLC project.

Live introduction: https://egoshiftlabs.github.io/down-but-not-out/

## Current experience

- Responsive premium campaign-led landing page, including the original AI-generated promotional image.
- Accessible native dialogs for the full campaign and interactive profile studio.
- Nickname, up to three interests, communication preference, and conversation-starter preview. Inputs stay in memory; no persistence or server submission.
- Three date-inspiration categories, seven conversation starters, larger-text and high-contrast controls (only display preferences stored locally), and expandable FAQs.
- Public development roadmap, community participation/contact via `mailto:`, social sharing link copy, and fictional example-profile generator.
- Explicit manual request for launch email updates through the visitor’s email app; there is no automatic mailing list or backend form.
- A copyable fictional profile summary; profile inputs remain in memory and are never uploaded or stored by the site.
- Explicit prelaunch status. No real member profiles, registration, matching, messaging, mailing-list backend, or claims of existing moderation.

## Files

`index.html`, `styles.css`, and `app.js` run directly with no build dependencies. `assets/campaign.jpeg` is the supplied campaign art, and `assets/heart.svg` is the favicon. No external fonts, analytics, or third-party scripts.

## Local preview

Run `python -m http.server 8000` from the repository root and open http://localhost:8000.

## Deployment

GitHub Pages publishes `main` from the repository root. See `PUBLISHING.md`.

## Next development stage

Implement a real opt-in waiting list with privacy and deletion controls, followed by an invitation-only adult pilot. Member services require authentication, secure storage, consent-centered onboarding, privacy controls, blocking/reporting, and staffed moderation. Keep private member data and secrets out of this public repository.

## Project contact

Email: egoshiftlabs@gmail.com. Public `mailto:` links open the visitor’s email application. Visitors choose whether to send a message. Please do not collect medical details or other sensitive dating information by email.

## Release notes (November 2026)

- Added an honest public roadmap and ways for the community to offer feedback, ask for updates, or collaborate.
- Fixed malformed select-option markup in Profile Studio.
- Added fictional example and user-initiated copy to Profile Studio. Real profiles remain unavailable.
- Added high-contrast display option and persistent browser-only accessibility preferences, with updated privacy disclosures.
- Added social card metadata and a share-link button.

This GitHub Pages site has no user-data backend. A real automated waitlist would require an approved email/form provider, privacy practices and abuse prevention. A real dating platform needs a secure backend, moderation and consent-centered safety design.
