# CSS Template

My standard template for CSS styling written in SASS.

## Table of contents

- [CSS Template](#css-template)
  - [Table of contents](#table-of-contents)
  - [Usage](#usage)
  - [TLDR](#tldr)
    - [Custom properties](#custom-properties)
    - [Mixins](#mixins)
  - [Layout](#layout)
    - [Centering the page](#centering-the-page)
    - [Minimum page width](#minimum-page-width)
  - [Color theming](#color-theming)
    - [Color swatches](#color-swatches)
    - [Adding custom color swatches](#adding-custom-color-swatches)
    - [Overriding the default theme (for the whole page)](#overriding-the-default-theme-for-the-whole-page)
    - [Overriding the default theme (for a particular element)](#overriding-the-default-theme-for-a-particular-element)
    - [Additional themes](#additional-themes)
  - [Utilities](#utilities)
  - [Text](#text)
    - [Preventing text wrapping](#preventing-text-wrapping)
  - [Anchor tags and links](#anchor-tags-and-links)
    - [Link styling](#link-styling)
  - [Buttons and button styles](#buttons-and-button-styles)
    - [Available stylings](#available-stylings)
    - [Input button styling](#input-button-styling)
  - [Generic content templates](#generic-content-templates)
  - [Input styling](#input-styling)
    - [Available stylings](#available-stylings-1)
  - [Select styling](#select-styling)
    - [Available stylings](#available-stylings-2)
    - [Applying padding](#applying-padding)
  - [Dialogs](#dialogs)
  - [Known issues/inconsistencies](#known-issuesinconsistencies)

## Usage

Clone this repo as a git submodule in the area with your sass files, e.g. `src/scss/css-template`:

```shell
$ git submodule add https://github.com/schel-d/css-template.git src/scss/css-template
```

Then, in your sass code, use the below to initialize the template:

```css
@use "css-template/import" as template;
@include template.init;
```

## TLDR

### Custom properties

The custom properties used in this template (excluding many color swatches):

| Property                   | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| `--button-rounding`        | The border radius applied to buttons.                        |
| `--button-outline`         | The outline applied to buttons with applicable stylings.     |
| `--input-rounding`         | The border radius applied to text inputs.                    |
| `--input-outline`          | The outline applied to text inputs with applicable stylings. |
| `--input-outline-disabled` | As above, but for disabled text inputs.                      |
| `--color-accent`           | The accent color used on buttons, links, etc.                |
| `--color-content`          | The dynamic color the content uses (e.g. in buttons).        |
| `--font-default`           | The font family to use by default.                           |
| `--font-size-default`      | The font size to use by default.                             |
| `--line-spacing`           | The default line spacing to apply.                           |
| `--min-page-width`         | The minimum width of the `<body>`.                           |
| `--page-width`             | The maximum width used when using the `page-centerer` mixin. |

### Mixins

The mixins available in this template:

| Mixin                         | Description                                                |
| ----------------------------- | ---------------------------------------------------------- |
| `button-base`                 | Base mixin for all button stylings.                        |
| `button-classic`              | Grey filled button with subtle outline.                    |
| `button-filled`               | Accent-color filled button.                                |
| `button-filled-neutral`       | Grey filled button.                                        |
| `button-hover`                | Button with transparent highlight until hovered.           |
| `content-text`                | Text inside conforms to `--color-content`.                 |
| `content-text-icon`           | Text and icons inside conform to `--color-content`.        |
| `dialog`                      | Centers `<dialog>` and adds nice shadow.                   |
| `flex-grow`                   | Applies `flex-grow: 1;`.                                   |
| `flip-180`                    | Applies an upside-down rotate transform.                   |
| `gone`                        | Applies `display: none;`.                                  |
| `init`                        | Initialises the template (required).                       |
| `input-base`                  | Base mixin for all text input stylings.                    |
| `input-button-base`           | Base mixin for all input button stylings.                  |
| `input-button-classic`        | Grey filled button with subtle outline.                    |
| `input-button-filled`         | Accent-color filled button.                                |
| `input-button-filled-neutral` | Grey filled button.                                        |
| `input-button-hover`          | Button with transparent highlight until hovered.           |
| `input-filled-neutral`        | Grey filled text input.                                    |
| `link`                        | Inline accent colored text with underline on hover.        |
| `no-select`                   | Makes text inside element unselectable.                    |
| `no-select-override`          | Undoes `no-select` (to fight specificity).                 |
| `one-line`                    | Forces child text to a single line with elipsis if needed. |
| `page-centerer`               | Centers child element when `--page-width` reached.         |
| `row`                         | Changes flex direction to row.                             |
| `select-base`                 | Base mixin for select stylings.                            |
| `select-filled-neutral`       | Grey filled select button.                                 |
| `theme-apply`                 | Applies the given theme to an element.                     |
| `theme-apply-base`            | Applies the given theme to the page.                       |
| `theme-dark`                  | Applies the dark theme to an element.                      |
| `theme-dark-base`             | Applies the dark theme to the page.                        |
| `theme-light`                 | Applies the light theme to an element.                     |
| `theme-light-base`            | Applies the light theme to a page.                         |

## Layout

The template enables and requires `border-box` box sizing mode. All element have their default margin and padding is removed, and all `<div>` and `<div>`-like elements (e.g. `<a>`, `<dialog>`, `<main>`, `<section>`, and `<button>`) use flex-box column layout. Flex shrink is disabled for all elements, so the developer can choose more easily which elements shrink.

### Centering the page

Centering the page once it reaches a certain width can be achieved with the following:

```css
/* Center the .page-centered div inside main once it becomes wider than 64rem. */
:root {
  --page-width: 64rem;
}
main {
  @include template.page-centerer($centered-class: "page-centered");
}
```

```html
<header>
  <h1>This is not centered</h1>
</header>
<main>
  <div class="page-centered">
    <p>This content can be 60rem at most, after which it is centered.</p>
  </div>
</main>
<footer>
  <p>This is also not centered</p>
</footer>
```

Note that `--page-width` has a default value of `64rem`, and if not provided, the `$centered-class` parameter will be `"page-centered"` by default, so the above code could be simplified to just:

```css
/* Center the .page-centered div inside main once it becomes wider than 64rem. */
main {
  @include template.page-centerer;
}
```

### Minimum page width

By default, a minimum width of `20rem` will be applied to the `<body>`, however this can be customized by adjusting the `--min-page-width` property on the `:root`.

```css
:root {
  --min-page-width: 20rem;
}
```

## Color theming

By default, light theme is applied unless the browser's `prefers-color-scheme` is set to `dark`.

### Color swatches

Each theme contains the following color swatches:

- `--color-paper-X`
  - Where `X` is 0, 10, 20, or 30
  - For use on the background color of surfaces
  - 0 is the lowest-level (darkest), 30 is the highest-level (brightest)
- `--color-ink-X`,
  - Where `X` is 10, 20, 30, ..., 80, 90, 100
  - For use on text, icons, etc.
  - 10 is the most subtle (transparent), 100 is the most bold (opaque)
- `--color-accent`
  - A bright color for use on high emphasis elements
- `--color-on-accent`
  - A contrasting color to `--color-accent`, suitable for text or icons on accent color surfaces
- `--color-shadow-X`
  - Where `X` is 10, 20, 30, or 100
  - For use underneath elevated surfaces
  - Always a dark color, even in dark theme
  - 10 is the most subtle (transparent), 100 is completely opaque

### Adding custom color swatches

Custom color swatches can be added when initializing the template, by providing the `$custom-colors` parameter:

```css
/* Before */
@include template.init;

/* With custom color swatch */
@include template.init(
  $custom-colors: (
    "bacon": (
      "light": red,
      "dark": green
    )
  )
);
```

Now our custom color is available with `--color-bacon`, and will be red in light theme, and green in dark theme.

### Overriding the default theme (for the whole page)

To override the value of `prefers-color-scheme`, the `theme-light-base`/`theme-dark-base` mixins can be used. They should be used outside of any selector (apply it to the stylesheet, not an element).

```css
/* Make the page always dark. */
@include template.theme-dark-base;
```

### Overriding the default theme (for a particular element)

Regardless of the page theme, the theme inside each element can be changed by including `theme-light`/`theme-dark` inside its selector. This leverages cascading in CSS, and so will apply to all child elements unless one of them also explicitly uses different theme, which is then consequentially apply to _its_ children.

```css
#foo {
  @include template.theme-dark;
  background-color: var(--color-paper-20);
}
#bar {
  @include template.theme-light;
  background-color: var(--color-paper-20);
}
```

```html
<div id="foo">
  <!-- @include template.theme-dark; -->
  <button>Dark mode button</button>
  <div id="bar">
    <!-- @include template.theme-light; -->
    <p>This div is in light-mode, inside a dark-mode div.</p>
    <button>Light mode button</button>
  </div>
  <button>Dark mode button</button>
  <div>
    <p>This div is still in dark-mode.</p>
  </div>
</div>
```

### Additional themes

If the two built-in themes ("light" and "dark") are not enough, additional themes can be added when initializing the template by providing the `$themes` parameter. Let's create an "amoled" theme, which is like "dark" but has darker background colors. First, we will create functions which generate the colors for the `--color-paper-X` and `--color-ink-X` swatches. The `$shade` parameter these functions take are the values of `X` (10, 20, 30, etc.).

```css
@function amoled-paper($shade) {
  @return hsl(220, calc(15% + $shade * 0.1%), calc(($shade - 10) * 0.5%));
}

@function amoled-ink($shade) {
  @return hsla(220, 100%, calc(80% + $shade * 0.2%), calc($shade * 1%));
}
```

Next, using the `template.theme-define` function, we create the theme definition. Note that `sass:meta` must be imported so we can use `meta.get-function`. We also provide some other swatches (all of which are mandatory), such as the accent color here.

```css
@use "sass:meta";

@function theme-amoled-definition() {
  @return template.theme-define(
    $paper-shade-function: meta.get-function("amoled-paper"),
    $ink-shade-function: meta.get-function("amoled-ink"),
    $color-accent: hsl(210, 100%, 70%),
    $color-on-accent: #000000,
    $color-shadow-100: black,
    $color-shadow-30: rgba(0, 0, 0, 80%),
    $color-shadow-20: rgba(0, 0, 0, 60%),
    $color-shadow-10: rgba(0, 0, 0, 20%)
  );
}
```

Now, when initializing the template, we provide our theme. Assuming we also still want the light and dark themes as options, we have to add these too. They can be found at `template.theme-light-definition()` and `template.theme-dark-definition()`.

```css
@include template.init(
  $themes: (
    "light": template.theme-light-definition(),
    "dark": template.theme-dark-definition(),
    "amoled": theme-amoled-definition()
  )
);
```

Note that if we want to define any custom color swatches, we'll need to do it for our new theme too.

```css
@include template.init(
  $themes: (
    "light": template.theme-light-definition(),
    "dark": template.theme-dark-definition(),
    "amoled": theme-amoled-definition()
  ),
  $custom-colors: (
    "bacon": (
      "light": red,
      "dark": green,
      "amoled": cyan
    )
  )
);
```

All done! Now, when it comes time to _actually use_ the theme, note that named mixins like `theme-amoled`/`theme-amoled-base` are not automatically generated. Instead, you should do:

```css
/* To apply it to the whole page */
@include template.theme-apply-base("amoled");

/* To apply it to a single element */
#foo {
  @include template.theme-apply("amoled");
}
```

Of course, these can be used to create your own `theme-amoled`/`theme-amoled-base` mixins if you prefer. You might also decide to replace an existing theme, for example "dark", rather than giving your's a unique name. In that case, the `theme-dark`/`theme-dark-base` mixins will apply your custom theme.

## Utilities

The template provides a few utility mixins that can be optionally assigned to classes for use inside the HTML.

| Mixin name  | Description                                             |
| ----------- | ------------------------------------------------------- |
| `gone`      | Removes the element from the layout.                    |
| `row`       | Makes the element a flex-box row container.             |
| `flex-grow` | Sets `flex-grow: 1;` to the element.                    |
| `flip-180`  | Applies a rotate 180 degrees transform to this element. |
| `no-select` | Prevents the user selecting the text in this element.   |

The `no-select-override` mixin is also available to undo the effects of `no-select` in a more specific selector if needed.

## Text

Text will use color `--color-ink-80` by default, and the font defined by `--font-default` with the font size of `--font-size-default`. All text elements (including headers) will use this default font and color, and will have their font weight reset to regular.

Some fonts appear too tight or loose in a block paragraph, so `--line-spacing` can be adjusted to make text elements (`<p>`, `<h1>`, etc.) display it with more space without ruining the bottom margin.

### Preventing text wrapping

To constrain text to one line, and to enable ellipsis when text is too long, wrap the text element (`<p>`, `<h1>`, etc.) in a div where the `one-line` is applied.

```css
#foo {
  @include template.one-line;
}
```

```html
<div id="foo">
  <p>This text will be locked to one line, and show ... when it's oversize.</p>
</div>
<p>And this text won't!</p>
```

## Anchor tags and links

`<a>` tags by default act as `<div>`s (no special styling). All button styling can be applied to anchor tags too, making `<a>` and `<button>` essentially interchangable.

### Link styling

For text link styling, anchor tags must be placed inside paragraph tags, and will display themselves inline again, rather than as a flexbox div.

```css
.link {
  @include template.link;
}
```

```html
<p>
  You should <a class="link" href="/">click here</a> to return to the homepage.
</p>
```

Link styling will make the text and underline match the accent color by default. To override the color, override the `--color-accent` property for this element.

```css
#foo {
  @include template.link;
  --color-accent: red;
}
```

## Buttons and button styles

`<button>` tags by default act as `<div>`s (without special styling), and all the following styles support `<a>`, `<button>`, or `<div>` tags. This makes `<div>`, `<a>`, and `<button>` essentially interchangable, so you can use whatever's best for accessibility.

Many button styles assume the button's content will be able to react to `--color-content` changes, so the content for a button-styled element should almost always be a [generic content](#generic-content-templates) container.

Many button styles will also use the properties defined in the `:root` element, which, being a css custom property, can be overriden for a certain button or a container that has buttons inside. These are:

- `--button-rounding` for how much border radius to use on the button's boundary
- `--button-outline` for the thickness of the outline around the button (if applicable)

Example usage of a button, using generic content:

```css
button {
  /* Button styling */
  @include template.button-hover;

  /* Use generic content template */
  @include template.content-text;
}
```

```html
<button>
  <p>Button</p>
</button>
```

### Available stylings

The following stylings do **_not_** require the content to support `--color-content`.

- `button-hover` buttons are invisible until hovered/focused.
- `button-filled-neutral` is similar, but has a filled neutral background when idle. This button styling does **_not_** require the content to support `--color-content`.
- `button-classic` is identical to `button-filled-neutral`, but with a subtle outline to mimic a classic button design. This button styling does **_not_** require the content to support `--color-content`.

The following stylings **_do_** require the content to support `--color-content`.

- `button-filled` use `--color-accent` for the background and `--color-on-accent` for the content. To change the color, you can override the `--color-accent` for that element.

### Input button styling

Each of the styles mentioned above are available for input buttons (e.g. `<input type="button">`), with the `input-button-` prefix rather than `button-`. However, the use of regular `<button>` element are preferred, as button outlines have rounding issues (on Firefox at least), while regular buttons solve this issue with the use of puesdo-elements.

## Generic content templates

The `content-XXX` mixins define generic layouts mainly designed for use with buttons. The elements inside them color themselves according to a property designed to be set in the parent element `--color-content`.

This allows for the case where the parent element is a button that may dramatically change color on hover, and therefore require its content to use inverted colors during hover.

The available types are

- `content-text` which sets all immediate descendant `<p>` tags to use `--color-content` for their color
- `content-text-icon` which sets all immediate descendant `<p>` tags and all immediate descendant tags with the `iconify` class to use `--color-content` for their color

## Input styling

Inputs can be styled in a similar way to input buttons. Also similarly to buttons, the styles will also use the properties defined in the `:root` element, which, being a css custom property, can be overriden for a certain input or a container that has inputs inside. These are:

- `--input-rounding` for how much border radius to use on the input's boundary
- `--input-outline` for the thickness of the outline around the input
- `--input-outline-disabled` for the thickness of the outline around the input (when disabled)

Example usage of an input:

```css
input[type="text"] {
  @include template.input-filled-neutral;
}
```

```html
<input type="text" placeholder="Enter text here..." />
```

### Available stylings

- `input-filled-neutral` matches the look of `button-filled-neutral`, but for an input.

## Select styling

Selects can be styled to look like their input counterparts. However, to style a
select the HTML must be structured as follows:

```html
<div class="select-wrapper">
  <select>
    <option>Option A</option>
    <option>Option B</option>
    <option>Option C</option>
    <option>Option D</option>
  </select>
  <div class="select-highlight">
    <div class="select-arrow"></div>
  </div>
</div>
```

Now the style can be applied, like so:

```css
.select-wrapper {
  @include template.select-filled-neutral(
    $highlight-class: "select-highlight",
    $arrow-class: "select-arrow"
  );
}
```

If not provided, the `$highlight-class` parameter will be `"select-highlight"` by default, and likewise with `$arrow-class` and `"select-arrow"`, so the above code could be simplified to just:

```css
.select-wrapper {
  @include template.select-filled-neutral;
}
```

### Available stylings

- `select-filled-neutral` matches the look of an `input-filled-neutral`.

### Applying padding

If desired, custom padding can be applied to a styled select. Note that the `select-arrow` is not affected by padding applied to the select, and so must be handled separately using margin.

```css
.select-wrapper {
  @include template.select-filled-neutral;
  select {
    padding: 0.5rem 0.75rem;
  }
  .select-arrow {
    margin-right: 0.25rem;
  }
}
```

## Dialogs

By default, this template doesn't affect dialogs in any way. However, to show a
dialog in the middle of the screen, with a pleasant shadow and backdrop color,
the `dialog` mixin is available.

```css
dialog {
  @include template.dialog;
}
```

```html
<dialog id="dialog">
  <h1>Dialog content</h1>
</dialog>
```

```js
document.getElementById("dialog").showModal();
```

## Known issues/inconsistencies

- Input/select outlines are not curved on Safari.
- Cursor doesn't become pointer on safari
- Hover doesn't work on Safari for input buttons or input fields, but does for select?
- Date/time input text on Safari is blue?
