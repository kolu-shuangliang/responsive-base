# responsive-base
Responsive css elements. Also stick to top navbar with compact view.

Include css reset.

## Navbar ##
* Sticks to top.
* No JQuery required.
* Default and mobile view. Media query as 768px width.
* Logo/brand, single nested links, floats left/right.

Problems for now.
* Too many links push to second row. Have to manage them manually.
* If last link in float: right is nested, its dropdown will clip to outside of the viewport.

## Responsive grids ##
Tried to make this like bootstrap. Only did 1 - 4 grids.

Grids are grouped in `cl-group` class. Kind of like container.

Grid widths are following.

1. 1 `.cl-1`
2. 1/2 `.cl-2`
3. 1/3 `.cl-3`, 2/3 `.cl-33`
4. 1/4 `.cl-4`, 2/4 `.cl-44`, 3/4 `.cl-444`

## Misc stuffs ##
Small stuffs. Easier to keep reusing small classes in html instead of writing css to single block.

### Background colors ###
`.primary` primary color: `rgb( 220, 235, 255 )`

`.secondary` secondary color: `rgb( 245, 245, 245 )`

### Floats ###
`.left` and `.right` both have `!important` for overwriting previous floats.

### Text ###
`.text-pre` keeps spaces with `white-space: pre-wrap` rule.
