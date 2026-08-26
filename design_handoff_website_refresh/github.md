repo: okoyepascal55-arch/sonicv2
branch: main
path: src

## Last sync
date: 2026-08-25T00:00:00Z

### Updated in this project
- Kontakt: 1:1 recreation plus elevated before/after
- Über uns and Karriere: redesigned on the unified Sonic System v3
- Karriere v2: information flow reordered into six numbered chapters
- Lime marker highlight now the universal headline-accent device across all pages
- Leistungen hub + 7 sub-service pages (Events & Messen, Forecasting, POS Full Service, Staff as a Service, Talentpool, Video, Warehouse & Logistik) redesigned on the same unified system; SRT and Kreation &amp; Content intentionally excluded for separate treatment
- Leistungen sub-pages emphasize pictorial multi-image galleries (formats, specializations, talent profiles, warehouse items) over single hero images; homepage-identical wood-icon solution cards kept
- Leistungen sub-pages reworked per feedback: original interactive elements restored (LVP phone-studio mockup, cost calculator, showcase tabs+thumbnails, process/S.O.C.K.S. timelines, item-select panels), brand wooden icons kept on all "Lösung" sections, 390px mobile frame added to each file, mobile hero-stat wrapping bug fixed
- Kreation & Content (elevated, intentional): 3D polaroid carousel, wood-icon strip, hover-invert solution cards, tabbed bento showcase with lightbox, CGI before/after slider
- SRT (Sonic Reporting Tool): full 11-section build (hero, problem, features, video showcase, functionality modules, employee app, zusammenarbeit, data paths, industries, proof, pricing/access), headings aligned to site type scale (h1 92px, h2 40px, body 15px, eyebrow 11px)
- Confirmed: 8 Leistungen sub-pages (hub + Events & Messen, Forecasting, POS Full Service, Staff as a Service, Talentpool, Video, Warehouse & Logistik) verified on the unified system. SRT and Kreation & Content keep their elevated, visually distinct layouts (diagonal cuts/ghost type for SRT; 3D carousel/bento for Kreation) while sharing the same type scale, marker device, hairlines and lime accents — per confirmed decision, not a separate design language

## Screen map
| Screen | Repo files |
| --- | --- |
| Kontakt Before-After.dc.html | src/pages/kontakt/page.tsx, src/pages/kontakt/components/ContactForm.tsx, ImpressumSection.tsx |
| Uber uns Redesign.dc.html | src/pages/about/page.tsx, src/pages/about/components/OriginStory.tsx, ValuesVisual.tsx, LeadershipTeam.tsx, ManagementVoices.tsx |
| Karriere Redesign.dc.html | src/pages/careers/page.tsx + all src/pages/careers/components/* |
| Karriere Redesign v2.dc.html | same as above, reordered flow (recommended version) |
| (all screens) chrome | src/components/feature/Navigation.tsx, Footer.tsx, src/components/base/WoodenDivider.tsx, SectionBadge.tsx, src/index.css, tailwind.config.ts |
| Home Redesign.dc.html | src/pages/home/page.tsx, src/pages/home/components/HeroRevamp.tsx, TrustStrip.tsx, LiveMetrics.tsx, VideoShowcase.tsx, ChallengeSection.tsx, ServicesGrid.tsx, SRTTeaser.tsx, Contact.tsx, src/components/feature/ClientProof.tsx |
| Losungen Redesign.dc.html | src/pages/losungen/page.tsx (SOLUTIONS data, WoodCard, ExpandedPanel, FAQ) |
| Case Studies Redesign.dc.html | src/pages/case-studies/page.tsx (CaseStudy data, LeistungenImEinsatz, bento gallery) |
| Leistungen.dc.html | src/pages/leistungen/page.tsx + components/LeistungenHero, LeistungenStats, ServiceGrid, SchallmauerWays, IndustrySelector, LeistungenTestimonials |
| EventsMessen.dc.html | src/pages/leistungen/events-messen/page.tsx + components/EventsHero, EventsContent, EventsShowcase |
| Forecasting.dc.html | src/pages/leistungen/forecasting/page.tsx + components/ForecastingHero, ForecastingContent |
| POSFullService.dc.html | src/pages/leistungen/pos-full-service/page.tsx + components/POSHero, POSContent |
| StaffAsAService.dc.html | src/pages/leistungen/staff-as-a-service/page.tsx + components/StaffHero, StaffContent |
| Talentpool.dc.html | src/pages/leistungen/talentpool/page.tsx + components/TalentpoolHero, TalentpoolContent |
| Video.dc.html | src/pages/leistungen/video/page.tsx + components/VideoHero, VideoContent, VideoReferenzen, VideoStudioPhone |
| WarehouseLogistik.dc.html | src/pages/leistungen/warehouse-logistik/page.tsx |
| KreationContent.dc.html | src/pages/leistungen/kreation-content/page.tsx + components/Carousel3D, KreationShowcase, RotatingPhotoGrid |
| SRT.dc.html | src/pages/srt/page.tsx + components/SRTHero, TheProblem, Features, VideoShowcase, FunctionalityOverview, EmployeeApp, Zusammenarbeit, DataPaths, Industries, Proof, PricingAndAccess |

## Not touched (by request)
Sonic Reels — leave as is. Wooden dividers, wood ticker, live metrics, footer and all copy/media kept unchanged.

## Design decisions carried across pages
- One type scale (index.css defines sonic-h1/h2/h3, body and buttons twice — collapse to one)
- One eyebrow: rule + label, replacing SectionBadge / LimeBadge / inline hero chips
- One button set: ink solid primary, hairline ghost secondary
- Headline accents: lime marker highlight on light sections, lime type on dark
- Hairline 1px grids and glass layers over imagery instead of shadows; 0px radius kept
- Mobile: 52px full-width CTAs, 44px targets, sticky glass action bar

## Imported media
public/images/Über uns/ — header, Werkbank, team group photo, 3 leadership portraits
image_backup_2026-08-19/Karriere/ — 3 careers images
public/images/home/ — 4 service-gallery images (Events, Content, Schulungen, Studios)
image_backup_2026-08-19/losungen/ — ambassador, dashboard, video
src/pages/losungen/page.tsx — copied in for reference reading only
