# CSS Template
A somewhat visually appealling CSS template using [SASS](https://sass-lang.com/).

## Usage
1. Add this project into yours as a git submodule (`git submodule add <url>`)
2. In the directory above `css-template/`, create a `_theme.scss` file to override theme variables (a file in that location is mandatory, any contents are optional!)
3. Add `@use 'css-template/css-template';` into your sass files to use the theme

## Mixins
-   `row()` - Creates a flexbox row with centered items.
-   `one-line($margin-bottom, $padding-bottom)` - Forces text onto one line with ellipsis if oversized. Unfortunately overrides margin-bottom and padding-bottom, so any override values will need to passed as arguments (0px by default).

## Classes
### All
-   `.gone`
-   `.light`/`.dark`
-   `.level0`/`.level1`/`.level2`
-   `.dark-only`/`.light-only`
-   `.border`/`.border-accent`/`.border-error`
-   `.border-top`/`.border-bottom`/`.border-left`/`.border-right`
-   `.vertical-separators`/`.horizontal-separators`
-   `a.button`/`a.icon-button`
-   `button.icon-button`
-   `button.subtle`
-   `body.dialog-open`
-   `.dialog-overlay`
-   `.dialog-overlay #dialog`
-   `.dialog-overlay #dialog button#dialog-close-button`
-   `.error`
-   `p.error`/`span.error`/`i.error`
-   `p.strikethrough`/`span.strikethrough`
-   `.no-select`
-   `.color-accent`
-   `.color-strong`
-   `.color-weak`
-   `.color-normal`
-   `label.radio`
-   `.radio-check`
-   `label.picker-subtle`

### Surfaces
-   `.gone` - Sets `display: none`.
-   `.light`/`.dark` - Use light or dark theme.
    ```html
    <div class="dark">
        <p>This is in dark theme!</p>
        <button>Amazing!</button>
    </div>
    ```
-   `.level0`/`.level1`/`.level2` - Different levels of surface color, higher numbers are a slightly lighter shade. Used to give depth to a page.
    -   The page background is colored like `.level0` by default.
-   `.dark-only`/`.light-only` - Sets `display: none` when using the other theme. Allows for elements to be swapped out when the theme changes.
    ```html
    <div>
        <img class="dark-only" src='logo-dark.png'/>
        <img class="light-only" src='logo-light.png'/>
    </div>
    ```
-   `.border` - Applies a 1px border.
-   `.border-accent` - Applies a 1px border with the accent color.
-   `.border-error` - Applies a 1px border with the error color.
-   `.border-top`/`.border-bottom`/`.border-left`/`.border-right` - Same as `.border`, but only for one side.
-   `.vertical-separators` - Adds a 1px border to the bottom of each child element, unless it's the last one.
    ```html
    <div class="vertical-separators">
        <div>
            <p>Hello.</p>
        </div>
        <div>
            <p>Hello.</p>
        </div>
        <div>
            <p>Hello.</p>
        </div>
    </div>
    ```
-   `.horizontal-separators` - Same as `.vertical-separators`, but designed for `flex-direction: row`.

### Buttons
-   `a.button`/`a.icon-button` - Styles an `a` tag to behave like a regular button.
-   `button.icon-button` - A button that looks like an icon, until hovered over.
-   `button.subtle` - A button without an outline or fill color until hovered.

### Dialogs
-   `body.dialog-open` - Should be applied to the body tag when a dialog window is open. Prevents scrolling.
-   `.dialog-overlay` - The semi-transparent dark overlay that applies to the whole screen when a dialog is open, and prevents clicking through to the content underneath.
-   `.dialog-overlay #dialog` - The actual dialog window itself.
-   `.dialog-overlay #dialog button#dialog-close-button` - The close button inside the dialog window. Moves it to the correct location.
    
### Text
-   `.error` - Gives everything inside error styling (red text).
-   `p.error`/`span.error`/`i.error` - Gives the element error styling.
-   `p.strikethrough`/`span.strikethrough` - Adds strikethrough to the text.
-   `.no-select` - Makes the element unselectable.
-   `.color-accent` - Text uses the accent color.
-   `.color-strong` - Text uses the strong text color.
-   `.color-weak` - Text uses the weak text color.
-   `.color-normal` - Text uses the normal text color (could be used for overriding headers' colors).

### Radio buttons
-   `label.radio` - A label which an input type radio, empty `.radio-check` element, and a paragraph go inside for radio button styling.
    ```html
    <label class="radio">
        <input type="radio" name="thingo">
        <div class="radio-check"></div>
        <p>This is a radio button</p>
    </div>
    ```
-   `.radio-check` - An initially hidden element that becomes the check inside the radio button.
-   `label.picker-subtle` - A label which an input type radio and a paragraph go inside for picker styling.