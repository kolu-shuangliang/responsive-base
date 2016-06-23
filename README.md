# responsive-base
Responsive grid and some usefull elements that I like.
Also pretty good (I think) navbar that sticks to top of the viewport.

Outputted css file contents are modifiable in `src/responsive-base.scss` file.
Just remove imports to exclude.

Requires building using `npm install`, `npm install --global gulp` for cli and `gulp deploy` command.

Include css reset.

Check some examples at [HERE](http://kolu-shuangliang.xyz/responsive-base/dist/)

## "Namespace" ##
I am trying to keep stuffs contained.

### JavaScript ###
JavaScript functions are objects, so there should not be any global variables other than those objects.
`ResponsiveImage` and `ResponsiveNavbar`.

### CSS ###
CSS grids are prefixed with `cl-`.

Image stuffs are prefixed with `rb-`.
Some elements for images have id tags prefixed with `rb-`.

Navbar stuffs are nested inside id `navbar-container`.

There is some tag selectors and some generic class name.
`body`, `h1`, `h2`, `h3`, `h4`, `p`, `anchor` and `pre.code`.

## Navbar ##
* Sticks to top.
* No JQuery required.
* Default and mobile view. Media query triggers at < 768px width.
* Logo/brand, single nested links, floats left/right.

Problems for now.
* Too many links push to second row. Have to manage them manually.
* If last link in `float: right` is nested, its dropdown will clip to outside of the viewport. Manage manually.

## Responsive grids ##
Grid system that resizes itself at certain media query widths.
Only did 1 - 4 grids.

Grids are grouped in `cl-group` class. It acts like the container for grid "groups".

Grids widths are following.

1. 1 `.cl-1`
2. 1/2 `.cl-2`
3. 1/3 `.cl-3`, 2/3 `.cl-33`
4. 1/4 `.cl-4`, 2/4 `.cl-44`, 3/4 `.cl-444`

## Misc and smaller stuffs ##
Easier to keep reusing small classes in html instead of writing css to single block.

### Image ###
Image styles that goes into fullscreen viewer when clicked.
Uses JavaScript.

Requires container with `.rb-img-container`. User needs to set container width/height.
Image `.rb-img` scales to containers width/height and keeps its original aspect.

`<div class="rb-img-container"><img class="rb-img"></div>`

Also supports using thumbnails.
Thumbnail that will be displayed in image is `src="thumb.png"` and original that will be 
displayed in fullscreen viewer is `rb-target="original.png"`

`<div class="rb-img-container"><img class="rb-img" src="thumb.png" rb-target="original.png" ></div>`


### Background colors ###
`.primary` primary color: `rgb( 220, 235, 255 )`

`.secondary` secondary color: `rgb( 245, 245, 245 )`

### Floats ###
`.left` and `.right` both have `!important` for overwriting previous floats.

### Text ###
`.text-pre` keeps spaces with `white-space: pre-wrap` rule.
