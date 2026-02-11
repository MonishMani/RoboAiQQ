# Mobile Breakpoints Quick Reference

## Standard Breakpoints Used

```css
/* Extra Small Mobile */
@media (max-width: 375px) { }
- iPhone SE (2020, 2022)
- Small Android devices
- 320px - 375px width

/* Small Mobile */
@media (max-width: 480px) { }
- iPhone 12 Mini, 13 Mini
- Standard small smartphones
- 376px - 480px width

/* Mobile */
@media (min-width: 481px) and (max-width: 640px) { }
- iPhone 12, 13, 14, 15
- Standard smartphones
- 481px - 640px width

/* Tablet Portrait */
@media (min-width: 641px) and (max-width: 767px) { }
- Large phones, small tablets
- 641px - 767px width

/* Tablet */
@media (min-width: 768px) { }
- iPad, Android tablets
- 768px+ width

/* Desktop */
@media (min-width: 1024px) { }
- Laptops and desktops
- 1024px+ width
```

## Device Reference

### iPhone Sizes
| Device | Width | Breakpoint |
|--------|-------|------------|
| iPhone SE (2020, 2022) | 375px | Extra Small |
| iPhone 12 Mini, 13 Mini | 375px | Extra Small |
| iPhone 12, 12 Pro, 13, 13 Pro | 390px | Small |
| iPhone 14, 14 Pro | 393px | Small |
| iPhone 14 Plus | 428px | Small |
| iPhone 14 Pro Max, 15 Plus | 430px | Small |

### Android Sizes
| Device | Width | Breakpoint |
|--------|-------|------------|
| Samsung Galaxy S20, S21 | 360px | Extra Small |
| Google Pixel 5 | 393px | Small |
| Samsung Galaxy S21+ | 384px | Small |
| OnePlus 9 | 412px | Small |

### Tablets
| Device | Width | Breakpoint |
|--------|-------|------------|
| iPad Mini | 768px | Tablet |
| iPad | 810px | Tablet |
| iPad Air | 820px | Tablet |
| iPad Pro 11" | 834px | Tablet |
| iPad Pro 12.9" | 1024px | Desktop |

## Component-Specific Adjustments

### Hero Section
```css
/* ≤480px */
- H1: 1.5rem
- Subtitle: 0.9375rem
- Badge: 0.5rem
- Button: 240px max-width
- Layout: Stacked (vertical)

/* 481px - 640px */
- H1: 1.625rem
- Subtitle: 1rem
- Badge: 0.55rem
- Button: 250px max-width
- Layout: Stacked (vertical)

/* ≥768px */
- H1: 2rem
- Subtitle: 1.1rem
- Badge: 0.75rem
- Button: Auto width
- Layout: Side-by-side (horizontal)
```

### Navbar
```css
/* ≤768px */
- Fixed top position (full width)
- Hamburger menu visible
- Sidebar navigation
- Height: 56px (≤640px), 66px (>640px)

/* ≥769px */
- Floating navbar with border-radius
- Horizontal navigation
- No hamburger menu
- Height: 66px
```

### StatsBanner
```css
/* ≤640px */
- Grid: 1 column (stacked)
- Font size: 1.75rem (number)

/* 641px - 767px */
- Grid: 2 columns
- Font size: 2rem (number)

/* ≥768px */
- Grid: 4 columns
- Font size: 2.5rem (number)
```

### Forms (Contact, Booking Modal)
```css
/* ≤480px */
- Input height: 46px-48px
- Button height: 46px-48px
- Padding: 0.75rem - 1rem
- Font size: 16px (prevents zoom on iOS)

/* 481px - 640px */
- Input height: 48px-50px
- Button height: 48px-50px
- Padding: 0.875rem - 1rem

/* ≥641px */
- Input height: 50px-56px
- Button height: 50px-56px
- Padding: 1rem - 1.25rem
```

## Touch Target Sizes

### Minimum Sizes (WCAG 2.1 Level AAA)
- **Primary actions**: 44x44px minimum
- **Secondary actions**: 40x40px minimum
- **Tertiary actions**: 36x36px minimum

### Implemented Sizes
```css
/* All Mobile (≤767px) */
button, a, [role="button"]: min 44x44px
input, select, textarea: min 44px height
.icon-button: 44x44px
.nav-item: 44px height

/* Extra Small (≤375px) */
Reduced to 42px minimum where space is critical
```

## Typography Scale

### Mobile-First Approach
```css
/* Base (≤480px) */
h1: 1.5rem (24px)
h2: 1.375rem (22px)
h3: 1.125rem (18px)
p: 0.9375rem (15px)

/* Small Mobile (481px - 640px) */
h1: 1.625rem (26px)
h2: 1.5rem (24px)
h3: 1.25rem (20px)
p: 1rem (16px)

/* Tablet (≥768px) */
h1: 2rem (32px)
h2: 1.75rem (28px)
h3: 1.5rem (24px)
p: 1.125rem (18px)

/* Desktop (≥1024px) */
h1: 2.5rem (40px)
h2: 2rem (32px)
h3: 1.75rem (28px)
p: 1.125rem (18px)
```

## Spacing Scale

### Padding/Margin
```css
/* Mobile (≤480px) */
Section padding: 2.5rem - 3rem (1rem sides)
Card padding: 1rem - 1.25rem
Gap: 1rem - 1.5rem

/* Tablet (≥768px) */
Section padding: 4rem - 6rem (2rem sides)
Card padding: 1.5rem - 2rem
Gap: 2rem - 2.5rem

/* Desktop (≥1024px) */
Section padding: 6rem - 8rem (2rem sides)
Card padding: 2rem - 2.5rem
Gap: 2.5rem - 3rem
```

## Testing Commands

### Chrome DevTools
```
Ctrl+Shift+M (Windows) / Cmd+Shift+M (Mac)
Toggle device toolbar
```

### Responsive Presets in DevTools
- iPhone SE: 375 x 667
- iPhone 12 Pro: 390 x 844
- Pixel 5: 393 x 851
- Samsung Galaxy S20: 360 x 800
- iPad Mini: 768 x 1024
- iPad Air: 820 x 1180

---

**Quick Tip:** Start testing from smallest screen (375px) and work your way up to ensure mobile-first approach is working correctly.
