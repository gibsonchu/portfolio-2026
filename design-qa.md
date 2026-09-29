# Design QA

final result: passed

## Evidence and scope

Source: https://gibsonchu.com/ captured September 29, 2026.
Implementation: http://127.0.0.1:4173/

Source visual truth: `evidence/source-desktop.png`, `source-mobile.png`, `source-works.png`, `source-information.png`.
Implementation screenshots: `evidence/local-desktop.png`, `local-mobile.png`, `local-works.png`, `local-information.png`, `local-information-mobile.png`, `local-works-mobile.png`, `local-article-mobile.png`, `local-hover.png`, `local-zoom-mobile.png`.

Desktop CSS viewport and final screenshot dimensions: 1440 × 1000, device pixel ratio 1, both source and implementation. Mobile: 390 × 844, device pixel ratio 1, both source and implementation. No density normalization was needed in the final captures. Initial localhost captures had a saved browser zoom setting; they were excluded from final comparison and replaced with 127.0.0.1 captures at matching dimensions.

Full-view comparison evidence: `evidence/desktop-comparison.png`, `mobile-comparison.png`, `works-comparison.png`, `information-comparison.png`. Each composite contains source and implementation together. Focused readable typography comparison: `evidence/typography-comparison.png`.

## Findings

No remaining actionable P0/P1/P2 visual differences in the compared states.

- Fonts and typography: original Marist normal/italic and Diatype files are local. Font sizes, weights, leading, italic treatment, underlines, small caps, and line wrapping match the captured profile and panels.
- Spacing and layout rhythm: matched profile width of 44%, one-third/two-thirds columns, viewport-dependent type scaling, padding, right panel width/indent, border, mobile stacking, and information image sizing. Desktop column starts match the source at 21.59 and 222.59 CSS pixels.
- Colors: white background, 85% black text, 75% caption, 40% clock, and 15% panel border match the source values.
- Images: original photographs and project-preview assets are stored locally. Source thumbnail renditions are used for the two main photographs; the original full-size train photograph opens in the zoom view. No generated replacements, approximated graphics, or asset hotlinks.
- Copy: source profile, work links, education/contact information, and organic-waste article content preserved.

## Comparison history

1. P1 initial column sizing failed after rerenders. Replaced DOM-applied column widths with persistent CSS sizing and stable markup objects. Subsequent captures show matching widths and no horizontal overflow.
2. P2 initial comparison had incompatible browser zoom/density. Switched preview origin, verified actual CSS viewport and devicePixelRatio, and recaptured all desktop/mobile evidence.
3. P3 full-resolution photographs initially appeared sharper than the displayed source. Downloaded source thumbnail renditions and recaptured; retained full-size train image for enlargement.
4. Final combined comparisons and focused type inspection passed after those changes.

## Interactions and validation

- Selected Works and Information panels open on desktop and mobile.
- Home/Top closes panels; local paths also support direct entry and browser history.
- Project hover reveals the correct local image, positioned within viewport bounds.
- Train photo opens the enlarged view; Escape and image click close it.
- Organic-waste article opens with full text and images; Back returns to Selected Works.
- Source external destinations and mailto links preserved; email was not sent.
- Mobile profile and panels inspected; no horizontal overflow at 390 × 844.
- Original source mobile panels overlap part of the left navigation; this behavior is intentionally matched.
- Browser error log: none.
- Production build: passed.
- Existing hosting tests: 4 passed.

## Follow-up polish and limitations

- Clock values naturally differ by capture time.
- Subpixel rasterization and transient browser scrollbars may differ by browser/OS.
- External destination sites are links, not locally cloned sites. Their availability is outside this frontend's scope.
- This is a frontend recreation, without Cargo's editor or publishing backend.

## Implementation checklist

- [x] Preserve source content and local assets.
- [x] Match desktop and mobile profile layouts.
- [x] Match work and information panels.
- [x] Implement photo zoom, previews, internal navigation, and article.
- [x] Compare rendered source and implementation together.
- [x] Check console, build, and existing tests.
