# TinyMCE Paste from Word Plugin

This plugin adds the "Paste from Word" functionality from the 5.x branch of TinyMCE as a plugin for the 6.x branch.

## Basic setup

The Paste from Word plugin extends the built-in Paste plugin, so both must be enabled:

```js
tinymce.init({
  selector: 'textarea', // change this value according to your HTML
  plugins: 'paste paste_from_word'
});
```

## Options

These settings affect the execution of the `paste_from_word` plugin.

* `pastefromword_valid_elements` (default long list...)
* `pastefromword_convert_fake_lists` (default true)

TBD

Add note about `paste_webkit_styles` and `paste_remove_styles_if_webkit` (Paste from Word converts Word content into Webkit content, so these options impact the resulting HTML.

- https://www.tiny.cloud/docs/tinymce/6/copy-and-paste/#paste_webkit_styles
- https://www.tiny.cloud/docs/tinymce/6/copy-and-paste/#paste_remove_styles_if_webkit

