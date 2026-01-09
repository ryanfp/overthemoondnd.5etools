# Parsed Core CSS/SCSS Stylesheet Cheatsheet (Light/Dark)

**This table summarizes key markdown, data, and UI elements from all provided `.scss` files, expanding all variables, including backgrounds/border colors, and notes sass references. Everything listed is carefully traced for both light/dark modes. If a value or variable is used but not defined in the provided files, it is marked with a `?` and a note.**

---

| Element/Context                                        | Selector(s) / Class                        | Font Family (L/D)       | Weight/Style | Size           | Text Color (L/D)  | BG-Color (L/D)       | Border Color (L/D)   | Notes                                                            |
|--------------------------------------------------------|--------------------------------------------|-------------------------|--------------|----------------|-------------------|----------------------|----------------------|-------------------------------------------------------------------|
| Body default                                           | body                                      | Convergence, Arial     | normal       | 1em/12.6px     | #333 / #bbb       | #fff / #222          | none                 | Root background and font.                                         |
| Heading - Stat Name (statblocks)                       | .stats__th-name                            | "Times New Roman"      | 500          | 1.8em          | #822000 / #d29a38 | none                 | none                 | Small-caps. Nested `.source` is relatively positioned.             |
| Statblock Table Main                                   | .stats                                     | Convergence, Arial     | normal       | 12.6px         | #333 / #bbb       | #fdf1dc / #222       | n/a                  | Font from .stats.                                                 |
| Statblock Table Title                                 | .stats__th-name                            | "Times New Roman"      | 500          | 1.8em          | #822000 / #d29a38 | n/a                  | none                 |                                                                   |
| Table border (Statblock)                              | .stats, .ve-tbl-border, .wrp-stats-table   | inherit                | inherit      | inherit        | inherit           | inherit              | #e69a28 / #565656     | .ve-tbl-divider is #822000/#d29a38 (dark) horizontal division.     |
| Table row highlight                                   | .stripe-even, .stripe-odd, tr.text         | inherit                | inherit      | inherit        | #333 / #bbb       | #fdf1dc/#444 (dark)  | n/a                  | `nth-child` for highlighting, border on .lst__row-border.         |
| Table Headings                                        | th (rd__th), .rd__th-skewer                | inherit                | bold         | inherit        | inherit           | n/a                  | #ccc / #555 (night)  | .rd__th-skewer border-bottom.                                     |
| Blockquote line                                       | .rd__quote-line                            | inherit                | italic?      | inherit        | inherit           | none                 | none                 | Only margin/bottom spacing.                                       |
| Code/Monospace                                        | .code, code, pre                           | monospace              | inherit      | inherit        | #333 / #20c20e    | #f8f8f8 / #111 (dark)| #555 in night (for pre border)                                |
| Inline code background                                | code (inline)                              | monospace              | inherit      | inherit        | inherit           | inherit              | inherit              | No custom bg, unless inside pre                                   |
| Pre/code block background                             | pre                                        | monospace              | inherit      | inherit        | inherit           | #f8f8f8 / #222       | #555 (night)         | light=default, night=#222 bg, #bbb fg                            |
| Bold                                                  | .bold, strong, b                           | inherit                | bold         | inherit        | inherit           | inherit              | inherit              | Same both modes.                                                  |
| Italic                                                | .italic, em, i                             | inherit                | italic       | inherit        | inherit           | inherit              | inherit              | Same both modes.                                                  |
| Underline                                             | .underline, u                              | inherit                | underline    | inherit        | inherit           | inherit              | inherit              | Same both modes.                                                  |
| Table highlights for even/odd rows                    | .stripe-even, .stripe-odd, .stripe-even-table, .stripe-odd-table | inherit | inherit      | inherit        | inherit           | rgba(192,192,192,.38) / rgba(170,170,170,.13) (night) | none                 | Table row highlight coloring.                                     |
| Table alternate backgrounds (statblocks)              | .stats, tr                                 | inherit                | inherit      | inherit        | #333 / #bbb       | #fdf1dc / #222       | inherit              |                                                           |
| Table cells                                           | td, th                                     | inherit                | inherit      | inherit        | inherit           | none                 | inherit              | Table cells, use font/layout from .stats.                         |
| List section headings                                 | .rd__list-name                             | inherit                | bold         | inherit        | inherit           | none                 | none                 | (List item pseudo-classes may affect padding/margin)              |
| List items (rd__li, rd__list)                         | .rd__li, .rd__list                         | inherit                | inherit      | inherit        | inherit           | none                 | none                 | Margin/padding set, no font/color override                        |
| Highlight                                             | .ve-highlight                              | inherit                | inherit      | inherit        | inherit/#222      | #ff0 / #cc0          | inherit              | Night mode: yellow is darker, text forced #222                    |
| Main book page backgrounds                            | #pagecontent                               | inherit                | inherit      | inherit        | inherit           | url(../stat-block-top-texture.webp), vars.$rgb-bg-orange (light)<br>vars-night.$rgb-bg--night (dark)| none | Only for bestiary page; uses imported SCSS variable.  |
| Adventure/bookshelf book backgrounds                  | .bks__wrp-bookshelf-item                   | inherit                | bold         | inherit        | #333 / #bbb       | #e9e9e9→#fff(radial), #222 (night) | #ccc/#555             | Books grid backgrounds.                                           |
| Books book title text                                 | .bks__bookshelf-item-name                  | inherit                | bold         | inherit        | #333 / #bbb       | transparent          | inherit              | Full line for legacy/active books.                                |
| Sidemenu, nav background                             | .sidemenu, .page__header                   | inherit                | bold         | inherit        | #fff / #bbb       | #006bc4 (light)/#333 (night) | #ccc/#555 (night)        | Main nav bar/header and menu backgrounds.                            |
| Source colors (PHB, DMG, Homebrew, etc)              | .source__PHB ... .source__VRGR             | inherit                | inherit      | inherit        | unique per source  | inherit              | inherit              | Each source gets a color, see CSS for hex values.                 |
| Navigation highlight                                 | .page__nav-inner>li.active>a               | inherit                | inherit      | inherit        | #fff              | #006bc4/#333 (night) | border-top:0, border-bottom:#999/#555(night)| Active nav tab; .page__nav-inner active states                     |
| Drop-down menu background                            | .ve-dropdown-menu                          | inherit                | inherit      | inherit        | #333 / #bbb       | #fff / #222          | #ccc / #555           | Menu backgrounds, border                                           |
| Form controls                                        | input, textarea, .form-control             | inherit                | inherit      | inherit        | #333 / #bbb       | #fff / #222          | #ccc / #555           | Inputs/buttons background                                          |
| Modal/dialog overlays                                | .ui-modal__inner                           | inherit                | inherit      | inherit        | #333 / #bbb       | #fff / #222          | #ccc / #555           | Popups and modal backgrounds                                       |
| Tabs active                                          | .cls-bkmv__btn-tab.active                  | inherit                | inherit      | 0.8em          | #fff              | #337ab7 (light)/vars-night.$rgb-active-blue(night) | border: #adadad/#555(night) | Button tab backgrounds, e.g. class bookview tabs |
| Table borders (regular tables)                       | table, .rd__table, td, th                  | inherit                | inherit      | inherit        | inherit           | inherit              | #ccc / #555           | Standard table borders                                             |
| Statblock header section                             | .stats__sect-header-inner                  | Convergence, Arial     | 100 (light)  | 17px           | #822000 / #d29a38 | none                 | #822000 / #d29a38     | Border-bottom matches text color                                   |
| Statblock tokens/images                              | .stats__wrp-token, .stats__token           | inherit                | inherit      | inherit        | inherit           | transparent          | inherit              | Token images in statblocks                                         |
| Adventure book section header                        | .bkmv__spacer-name                         | Times New Roman, serif | bold         | 12px           | inherit           | silver / #565656      | inherit              | book list divider row                                              |

---

## Key Variable Expansion (Used Throughout All SCSS)

**Light Mode:**
- `--rgb-font`: #333
- `--rgb-bg`: #fff
- `--rgb-bg--alt`: #f5f5f5
- `--rgb-name`: #822000
- Main statblock border: #e69a28
- Table row alt: #fdf1dc

**Dark/Night Mode (from .ve-night-mode and vars-night):**
- `--rgb-font`: #bbb
- `--rgb-bg`: #222
- `--rgb-bg--alt`: #383838
- `--rgb-name`: #d29a38
- Main statblock border: #565656
- Most hover borders, modal borders, and backgrounds switch to darker values as specified.

---

### **Additional Notes**
- Font-families and weights for lists, tables, and most text come from their parent (body/stats) unless overridden at block level.
- All hover/active styles and deep utility classes in navigation, class tabs, modals, etc. use these core variables/styles, with some custom hexes for sources (PHB, DMG, etc).
- The statblock/bestiary pages use custom background textures and colors, which are replaced in dark mode with a plain dark background.
- Section headers (in both statblocks and navigation) often use small-caps, bold, and custom color/text-shadow.
- Adventure books grid backgrounds use a pale radial-gradient in light and dark gray/black in night mode.
- “Highlight” and alert/callout backgrounds shift to more readable versions in dark mode.
- Forms (inputs, buttons) match main backgrounds and font colors by mode.
- Table borders and heads all use #ccc in light and #555 in night.

---

**For anything with a value set via `$variable`, see the corresponding `vars/vars.scss` or `vars/vars-night.scss` for expansion. Main colors/variables used above are from those, with full expansion noted where possible.**

---

**If you want expansion on a specific `.scss` variable or CSS class that is only referenced above, provide the variable file or request by name.**