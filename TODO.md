# Follow-ups

Visible copy follows the mockup. These items are hidden or left unmatched on purpose. Nothing here should be printed in the UI.

## Assets still needed

- `public/images/hero.png` — framed hero illustration. Until it exists, the frame shows a pixel invader.
- `public/images/projects/<repo-name>.png` — card thumbnails. Cards use a generated color banner until a file exists.
- Optional pixel PNGs in `public/images/pixel/` if the SVG sprites should be replaced.

`public/images/sharda.png` is already in the repo.

## Mockup vs resume

The resume headline is Software Developer. The page says CSE Student | Aspiring Software Engineer.

Education on the resume is Aug 2023–Present. The page says 2023–2027 and (AR/VR Specialization). The resume does not state an end year or that specialization.

Alphaid Healthcare is spelled Alphaaid Healthcare Pvt Ltd on the resume, and that internship ended Oct 2025. The page says Alphaid Healthcare, May 2025–Present, plus “improved load time by 25%” and “Used by 100+ patients.” Those metrics are not on the resume.

RiyalVerse Technology Pvt Ltd is spelled Riyalverse Technology Pvt Ltd on the resume, and that internship ended Mar 2026. The page says Oct 2025–Present and (6 months • Hybrid).

The Academic Project card (AR/VR Developer, 2024–Present) is not a separate resume role.

Freelance dates are not on the resume. The page says 10 weeks. The resume role is Freelance Flutter Developer at Ferrero Rocher.

Capital Bull Wave (Backend Developer) is on the resume and not in the mockup. It is shown as an extra card with resume bullets and no dates, because the resume does not list dates.

Google Cloud GenAI Leader is on the mockup and not on the resume. No certificate URL is shown.

The resume also lists Dart Mastery (Udemy). That course is not on the mockup, so it is not on the page.

“200+ DSA problems solved in Java” is not on the resume. The row links to the public repo `leetcode-daily`. The LeetCode profile URL on the resume was not used as proof of that count.

## Mockup vs GitHub

Smart Expense Tracker links to `Expense-tracker`. That repo has no homepage.

Realty Review links to `review-property-app`. The README there is still the Flutter starter, while the card uses the mockup sentence.

Morphix (Planned) has no link, even though `Morphix-App` exists and its README describes an image editor.

The three showcase cards are not the featured GitHub repos (CertiChain, PayFlow, AlgoVerse, and the rest). Those repos are listed on `/projects`.

## Other

- `RESEND_API_KEY` is unset, so the old contact form is not on this page. Email is a `mailto:` link.
- `NEXT_PUBLIC_SITE_URL` is unset, so canonical and Open Graph URLs fall back to the local default in `getSiteUrl()`.
- Lighthouse was not measured in this environment.
