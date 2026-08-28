# Changelog

All notable changes to the RICGCW Official Website are documented in this file.

## [2.0.0] - 2026-08-28

### Overhaul & Architecture Restoration
- **Build System**: Restored standard Vite 8 + React 19 + TypeScript build pipeline, removing legacy Babel standalone scripts and obsolete CDN templates.
- **Sanctuary Design System**: Replaced iOS Cupertino tokens with a church brand theme: Midnight Sanctuary Navy (`#070C18`, `#0B132B`), Sacred Gold (`#D4AF37`), and Flame Orange accents with `Cinzel`, `Playfair Display`, and `Plus Jakarta Sans` typography.
- **Single Source of Truth Data Layer**: Consolidated all verified branch hours, pastoral details, giving accounts, and scriptural foundations in `src/data/churchData.ts`.

### Features & Interactive Experiences
- **Hero & 2026 Theme**: Implemented dynamic slideshow show with authentic church photography, live Next Sunday countdown timer, and direct CTAs.
- **Apostolic Welcome**: Added dedicated section for Founder & General Overseer Rev. Nicholas Dobeng, First Lady Mrs. Dobeng, and the Pastoral Council.
- **Interactive Branch Schedules**: Added 3-branch interactive schedule switcher (Mallam Sanctuary / HQ, Kokrobitey Branch, Langma Branch) with exact timings, directions, and Google Maps integration.
- **Online Giving Modal**: Created interactive giving portal supporting Mobile Money (MTN MoMo: 024 448 5740 / Telecel Cash) and Ecobank Bank wire details with one-click copy.
- **Prayer Request Modal**: Built confidential prayer request submission with instant confirmation feedback.
- **Branch Directory Modal**: Built full-screen responsive branch locator with detailed directions and pastoral contacts.
- **Media Hub**: Integrated 24/7 Global Radio stream simulator, YouTube sermons deep-links, and Daily Scripture of the Day card with one-click share.
- **Events & Gatherings**: Added upcoming conferences, vigils, community outreaches, and youth summits with RSVP tracking.
- **Partnership Portal**: Revamped dedicated Sponsorship page with active initiative cards and progress meters.

## [1.1.2] - 2026-04-10
### Changed
- Updated Church Motto to the three-part version with scriptural references (Ephesians 4:12, Joshua 1:3, Luke 1:37).

## [1.1.1] - 2026-04-09
### Added
- Definition of Rhema (ῥῆμα): explaining it as a specific, personal "spoken word" from God.
### Changed
- Rebranded back to Rhema Inner Court Gospel Church (Worldwide) (RICGCW).
- Updated all assets and configurations to reflect the RICGCW identity.

## [1.0.0] - 2026-04-08
### Added
- Initial project scaffold with React 19, Vite, Tailwind CSS, and Framer Motion.
