# RICGCW public website redesign plan

Status: proposed implementation plan; no UI implementation has started.

## 1. Objective and references

Redesign Rhema Inner Court Gospel Church Worldwide's public website using a mix of:

- **Passion City Church:** https://passioncitychurch.com/ — mission-led storytelling, prominent photography, clear leadership presentation.
- **VOUS Church:** https://www.vouschurch.com/ — bold typography, confident composition, and practical navigation between visiting, sermons, locations, and giving.

Build an original RICGCW design using those principles. Retain RICGCW's name, seal, Ghanaian identity, church information, and actual people. Do not copy either reference's text, photographs, branding, or source code.

Desired impression: confident, welcoming, contemporary, and grounded in a real congregation. The site should communicate who the church is and how to participate before asking visitors to explore detailed institutional information.

Research completed: web search and live-page content review of both references; inspection of the current homepage, shared components, data sources, and supplied image assets. Desktop/mobile visual captures of the references and current site remain an implementation prerequisite. This plan does not claim a completed visual audit.

## 2. Scope and existing constraints

Primary implementation scope:

- Homepage sections, navigation, footer, and mobile action bar.
- Sponsorship page, which shares the navigation, footer, section header, and giving dialogs.
- Presentation of branch, giving, and prayer dialogs, plus cookie consent, where needed to match the public design.
- Shared typography, color, spacing, and button styles, scoped to the public website.

Keep the existing React, TypeScript, Tailwind, React Router, Firebase, Lucide, and responsive-image setup. No new dependency is required. Reuse existing components and handlers.

Do not redesign the admin dashboard, authentication flows, or consecration program. Inspect privacy, terms, and not-found routes for regressions caused by shared changes. Do not alter Firebase rules, collections, payment settings, church records, or public route URLs as part of this design task.

The working tree already contains uncommitted changes in most public UI files. Before editing, capture the current diff and screenshots. Treat that working state as the baseline; do not reset it, overwrite unrelated edits, or use the Git HEAD version as a replacement for the current files.

## 3. Visual system

### Palette

Use a limited public-site palette, initially:

| Role | Proposed value | Use |
| --- | --- | --- |
| Main surface | `#F4F2ED` | Warm off-white page backgrounds |
| Light surface | `#FFFFFF` | Forms and selected content surfaces |
| Primary ink/dark surface | `#171715` | Headings, navigation, media/footer backgrounds |
| Secondary ink | `#55554F` | Body copy and supporting information |
| Light divider | `#D9D7D0` | Section rules and input borders |
| Restrained accent | `#964221` | Selected links and small emphasis on light surfaces |
| Light accent | `#E5B69C` | Accent text on dark backgrounds and dark-text buttons |

Check actual foreground/background combinations before finalizing. Use one accent family, with light/dark variants for contrast. Keep the original seal unchanged. Preserve actual church color data when displaying its meaning; those colors are church content, not the site's interface palette.

### Typography

- Use the already installed/imported Plus Jakarta Sans family as the primary public-site typeface; load only the needed weights, including a bold display weight if absent.
- Use bold, readable sans-serif headings rather than the current dominant serif/italic treatment.
- Target a fluid hero size of roughly 48–96px, section titles around 32–64px, and body text around 16–18px. Verify wrapping with the actual copy at each viewport.
- Keep uppercase styling to short labels or selected short display headings. Preserve natural case for paragraphs, forms, and long titles.
- Use balanced headings, comfortable line height, and bounded body-copy widths.
- Scope changes so the consecration page retains its own typographic treatment.

### Layout and components

- Retain a content width around 1280px with consistent mobile gutters and more generous desktop spacing.
- Alternate warm light sections with deliberate dark sections for media and the footer.
- Use a single primary button style, a secondary outline style, and simple text links, implemented through the existing styling conventions.
- Use clear 44px minimum interactive targets, visible keyboard focus, and explicit active states.
- Replace decorative textures, metallic sweeps, blueprint grids, corner ticks, unnecessary chapter numbers, and oversized ornamental labels in the redesigned surfaces.
- Do not introduce new parallax, magnetic effects, marquees, autoplay video, or animation dependencies. Remove decorative motion in sections being rebuilt; retain necessary interaction feedback and honor reduced motion.

## 4. Page structure and section work

Proposed homepage order: navigation → hero → branches/service times → mission and leadership → ministries → sermons/media and prayer → events → connect → footer.

Preserve the existing section IDs `about`, `identity`, `sanctuaries`, `ministries`, `media`, `events`, and `connect`, even if their order or presentation changes.

### A. Navigation

Files: `src/components/Navbar.tsx`, `src/hooks/useActiveSection.ts` only if required by navigation changes.

- Keep the church seal and readable wordmark.
- Present clear labels such as About, Visit, Ministries, Watch, Events, and Connect; retain access to `/sponsorship` and Give. Resolve the final link count against tablet widths rather than compressing labels until they become hard to read.
- Use a solid, legible masthead with a restrained divider. Remove decorative link numbering and the ornamental scroll-progress line.
- Keep mobile navigation accessible: opening/closing, Escape, focus containment, focus return, scroll locking, and link activation.
- Keep route-aware links working from the sponsorship page back to homepage sections.

### B. Hero

File: `src/sections/Hero.tsx`.

- Build a bold two-column desktop composition: a large mission/welcome heading with brief supporting copy on one side, an authentic church image on the other.
- Use a warm off-white surface and black type. Give the photograph enough uninterrupted space to feel intentional.
- On mobile, stack copy, actions, and the image without squeezing the image beside the heading.
- Primary action: Plan your visit, using the existing branch dialog handler. Secondary action: Watch messages, linking to the existing media section or verified church channel.
- Show the church name clearly and include the current year/theme as a small supporting line.
- Preserve administrator-provided `heroHeadline` and `heroSubtitle`. Support long custom text without truncation or forced line-break parsing. Do not replace editable content with permanently hard-coded marketing copy.
- If retaining the existing countdown, keep the existing schedule utility and present the value quietly; do not create a second service-time calculation.

### C. Branches and service times

File: `src/sections/BranchesSchedules.tsx`.

- Move this section directly below the hero so visitors can quickly find where and when to attend.
- Introduce it with a short title such as Join us this Sunday.
- Show all current branches and their main-service times in a clear responsive list/grid sourced from context. Highlight headquarters with a small label.
- Retain access to the complete weekly schedule, address, directions, phone number, and existing branch dialog for each branch.
- Prefer ordinary buttons opening the existing detail dialog if that removes the need for custom tabs. If tabs remain, implement complete tab semantics and keyboard behavior.
- Do not assume there are always exactly three branches or that every branch has a service entry. Show an appropriate empty state if data is missing, with contact as the next action.
- Display schedule times as Ghana local time where a time-zone label is needed; do not silently convert recurring service times based on a visitor's device zone.
- Preserve clipboard feedback; show a useful failure state if a rewritten copy interaction cannot access the clipboard.

### D. Mission, welcome, and leadership

File: `src/sections/WelcomeOverseer.tsx`.

- Give the church's mission a concise, prominent statement, followed by short supporting paragraphs using verified existing information.
- Present Rev. Nicholas Dobeng with an authentic portrait, clear title, and restrained caption. Keep faces unobscured and use appropriate crops on mobile.
- Preserve the existing prayer and WhatsApp actions.
- Retain the mission themes and existing identity/color/definition information, but place the longer material in a compact, accessible disclosure area within `#identity` instead of giving it another large competing visual chapter.
- Do not invent quotes, attendance numbers, testimonials, founding dates, or claims about the church.

### E. Ministries

File: `src/sections/Ministries.tsx`.

- Use a simple introduction such as Find your community.
- Present ministry names with readable descriptions, schedules, and a clear Connect action.
- Retain the existing context data and the `onConnectMinistry` prayer-prefill flow.
- Make disclosure interaction intentional through click/keyboard activation; avoid hover unexpectedly replacing the content someone is reading.
- Keep all existing ministries discoverable on mobile.

### F. Sermons, media, and prayer

File: `src/sections/MediaHub.tsx`.

- Use one deliberate dark section with a large media image and a simple Watch messages action.
- Simplify the sermon list hierarchy and remove decorative theater effects.
- Retain prayer access in a clearly related but visually distinct area.
- The current featured video ID is undefined. Keep a truthful YouTube-channel fallback; do not imply that a playable embedded sermon or live broadcast exists.
- Avoid presenting editorial sample sermon records as verified current broadcasts. Use verified existing content or link visitors to the actual channel.
- Preserve external-link security attributes and media controls/accessible labels.

### G. Events

File: `src/sections/Events.tsx`.

- Replace the calendar-ledger presentation with a straightforward event list showing date, title, place, and action.
- Keep existing real event data and calendar-download behavior.
- Preserve the useful empty state and route visitors to regular services when there are no announced events.
- Do not fabricate events, dates, registration endpoints, or RSVP success states.

### H. Connect

File: `src/sections/Connect.tsx`.

- Give first-time visitor guidance, contact methods, FAQ, and the inquiry form a clear hierarchy.
- Simplify field decoration while retaining real labels, required-field validation, loading/error states, and visible focus.
- Preserve WhatsApp, telephone, email, inquiry fields, FAQ content, and branch access.
- Keep the submission/storage contract unchanged in this UI task. If baseline review finds misleading success reporting or persistence problems, record them separately and resolve them deliberately before making new submission-success claims.

### I. Footer, mobile controls, and dialogs

Files: `src/components/Footer.tsx`, `MobileQuickBar.tsx`, `CookieConsent.tsx`, `BranchModal.tsx`, `GivingModal.tsx`, `PrayerModal.tsx`, and `common/Modal.tsx` only as needed.

- Use a short invitation and a compact directory/contact footer. Retain legal links, social links, creator credit, and existing copyright information.
- Give mobile controls the same typography and button styling; respect safe-area insets.
- Ensure cookie consent, mobile controls, and dialogs do not overlap essential actions.
- Reuse the existing shared Modal primitive and its accessibility behavior. Change layout/style only where needed; do not duplicate dialog logic.
- Keep giving methods, currencies, categories, amounts, account details, category defaults, and payment callbacks intact.
- Keep prayer validation, category/message prefill, and existing delivery behavior intact. Do not add stronger confidentiality or delivery claims than the implementation supports.

### J. Sponsorship and supporting public pages

File: `src/pages/Sponsorship.tsx`; inspect legal and not-found pages where shared styling reaches them.

- Apply the same public typography, spacing, and button language to sponsorship.
- Retain project data, progress values, category selection, giving defaults, and all existing calls to action.
- Keep shared navigation/footer consistent. Do not let homepage-only selectors accidentally restyle admin or consecration pages.

## 5. Images and content constraints

Existing assets include the church seal, two overseer portraits, two couple photographs, a pastoral group image, and a theme graphic. There is no supplied wide congregation/worship photograph or verified hero video.

- Start with the pastoral group image in a generous landscape composition; evaluate it visually before committing to the crop.
- Use the portraits for leadership rather than repeating them as generic branch/congregation imagery.
- Keep existing `ResponsiveImage`, `PICTURES`, and `IMAGE_DIMENSIONS` support for responsive AVIF/WebP/JPEG and reserved image dimensions.
- Load only the above-the-fold image eagerly; lazy-load supporting images.
- Preserve descriptive alt text; decorative graphics should not create screen-reader noise.
- Do not use stock or generated worship photos as if they document this church.
- The supplied theme artwork appears to say Greater Glory while default structured content says Divine Manifestation. Preserve source content and flag this discrepancy for the owner; do not silently edit the theme, doctrine, or underlying records to make them agree. Avoid placing conflicting artwork alongside the structured theme in the new hero.

## 6. Behavior invariants

The redesign is complete only when these still hold:

1. `ChurchContext` remains the source for church details, theme settings, branches, ministries, events, and sponsorship data.
2. Public routes and existing section/hash links still resolve, including navigation from secondary pages.
3. Branch-specific actions open the correct branch; ministry actions retain the correct prayer prefill.
4. Giving defaults and payment behavior are preserved. No live donation is needed for visual verification.
5. Prayer/contact actions keep validation and existing delivery contracts; no fabricated backend success behavior is introduced.
6. Modal and navigation focus handling, Escape, keyboard access, reduced motion, and mobile safe-area handling survive the redesign.
7. Legal links, creator credit, metadata, logo, and verified contact/payment information remain available.
8. No production deployment, content mutation, dependency addition, or backend migration is required by this plan.

## 7. Implementation sequence

### Phase 1 — Baseline and visual agreement

- Record the dirty working tree and take desktop/mobile screenshots of the current public pages.
- Capture the two reference homepages at desktop/mobile sizes to check actual composition and avoid relying only on text extraction.
- Trace existing actions and test the current branch, giving, prayer, mobile-menu, and sponsorship flows.
- Identify pre-existing failures separately from new regressions.

### Phase 2 — Foundation and first screen

- Add narrowly scoped public design tokens/styles in `src/index.css`; update font loading in `index.html` only if necessary.
- Simplify `SectionHeader` at its owning component; check every caller before changing its props. Preserve its current public API unless a change is necessary and all callers are updated.
- Implement navigation and hero, then review at mobile/tablet/desktop sizes before rolling the design through the remaining sections.

### Phase 3 — Homepage sections

- Update branch presentation and homepage order in `src/pages/Home.tsx`.
- Rebuild the welcome/identity presentation and simplify ministry/media/event/contact layouts.
- Keep existing context and handlers connected throughout; remove obsolete decoration rather than layering increasingly specific CSS overrides over it.

### Phase 4 — Shared surfaces and sponsorship

- Align footer, mobile controls, cookie consent, necessary dialog styling, and sponsorship.
- Check secondary public routes and confirm admin/consecration styling remains isolated.

### Phase 5 — Verification and handoff

- Run focused behavior tests for changed interactions, the nearest existing component tests, TypeScript/build, and lint.
- Capture final desktop/mobile screenshots; inspect all sections and interactive states.
- Deliver changed-file summary, screenshots, check results, and any baseline issues or content discrepancies. Do not deploy unless separately requested.

## 8. Optional multi-agent ownership

This is a handoff structure for a coordinator who chooses to use other agents; no agents have been started for this plan.

| Work package | Owned files | Dependencies |
| --- | --- | --- |
| Foundation/coordinator | `index.html`, `src/index.css`, `SectionHeader.tsx`, `Home.tsx` | Owns tokens, composition, shared contracts, integration |
| Navigation and hero | `Navbar.tsx`, `Hero.tsx` | Uses agreed tokens and existing modal/route contracts |
| Mission and gatherings | `WelcomeOverseer.tsx`, `BranchesSchedules.tsx`, `Ministries.tsx` | Preserves context and callback interfaces |
| Media and connection | `MediaHub.tsx`, `Events.tsx`, `Connect.tsx` | Preserves content truthfulness and submission behavior |
| Shared surfaces and sponsorship | Footer, mobile bar, consent, modal presentation, sponsorship | Starts after tokens and component contracts stabilize |
| Verification | Relevant tests and browser checks | Runs after integration; reports issues without broad cleanup |

Run packages in waves to fit available agents. Give each file one active owner. Only the coordinator edits shared styles, data/context, or integration files. Specialists should request shared changes rather than making competing token/component edits. Preserve unrelated user edits and avoid formatting unrelated files.

## 9. Acceptance checks

### Visual and responsive

- Inspect at 360/390px mobile, 768px tablet, and 1280/1440px desktop widths.
- No horizontal document overflow, clipped heading text, overlapping fixed controls, or hidden primary actions.
- The first screen identifies the church, shows its welcome/mission, and offers a visit action.
- Branch names and service times appear near the top without a long institutional introduction.
- Photos preserve faces and look intentional at each breakpoint; captions remain readable.
- Typography, buttons, spacing, and section surfaces are consistent through the homepage, sponsorship, and dialogs.
- Long administrator headlines, empty branches/events, and a branch without services render without crashes or invented data.

### Functional and accessible

- Test every changed navigation link, mobile menu, branch action, ministry action, media fallback, calendar download, FAQ, and dialog open/close behavior.
- Keyboard-only traversal works, including visible focus, Escape, modal focus return, and skip-to-content.
- Check actual color contrast against WCAG AA: 4.5:1 for normal text, 3:1 for large text and relevant interface boundaries.
- Confirm reduced-motion behavior and usability at 200% browser zoom.
- Verify the contact/prayer validation paths without sending test messages to church staff; mock external submission/payment services when testing.

### Automated proof

- Add small behavior-focused tests only where rewritten behavior needs regression coverage, such as custom hero content, branch-specific dialog callbacks, ministry prefill, and missing-data rendering.
- Run existing affected suites, including footer, consent, modal, giving, and sponsorship tests when those files/styles change.
- Run `npm run build` and `npm run lint`. Run the full existing `npm test` suite once after integration if practical for its runtime; record unrelated baseline failures explicitly.
- Do not write tests that merely assert Tailwind class names or take real payments.

## 10. Definition of done and limits

Done means the public site visibly follows the agreed Passion City/VOUS direction, works across the target viewports, retains the behavior invariants, passes the relevant checks, and has reviewable screenshots and source changes.

Known visual limitation: existing photography is mostly leadership imagery. A future authentic wide worship/congregation photograph could improve the result, but it is not required to complete this redesign. Do not block implementation or invent church photography while waiting for one.

Not included: admin redesign, new CMS features, new payment or form integrations, new content claims, a mobile app, animation infrastructure, or deployment.
