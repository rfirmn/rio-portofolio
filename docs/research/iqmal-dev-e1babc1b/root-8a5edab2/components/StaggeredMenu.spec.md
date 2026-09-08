# StaggeredMenu Specification

## Overview
- **Target file:** `src/components/sites/iqmal-dev-e1babc1b/shared/StaggeredMenu.tsx`
- **Screenshot:** `docs/design-references/iqmal-dev-e1babc1b/root-8a5edab2/menu_open_1788630188809.png`
- **Interaction model:** Click toggle with sequential curtain sliding and link stagger animation

## Structure & Layers
1. Fixed Header: logo mark + pill copy + toggle button
2. Backdrop overlay: `fixed inset-0 bg-black/40`
3. Prelayer 1: Sage green `#aeb8b0` curtain
4. Prelayer 2: Dark slate `#3d403f` curtain
5. Main Panel: `#1e1e1e` drawer with 6 uppercase links (01-06) + social links
