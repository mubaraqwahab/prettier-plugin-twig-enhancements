# prettier-plugin-twig-enhancements

Subtle enhancements for [prettier-plugin-twig-melody](https://github.com/trivago/prettier-plugin-twig-melody) (v0.4.6).

**Note:** The enhancements are somewhat naive and depend on implementation details. It may stop to work when the original plugin is updated.

## Enhancements

### Support for YAML frontmatter

Input:

```njk
---
title:      Home
map: {Hello: World}
items:
  - item1
  -    item2
---
```

Output without this plugin:

```njk
--- layout: layout title: {Hello: World} items: - item1 - item2 ---
```

Output with this plugin:

```njk
layout: layout
title: { Hello: World }
items:
  - item1
  - item2
```

### Formatting HTML more like [Prettier]()

Input:

```njk
<title>
  {{ title }} | {{ site.title }}
</title>
<h1>Hello, world!</h1>

<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit sequi modi voluptate quidem enim! Earum voluptatem accusantium nulla cupiditate exercitationem qui? Facilis explicabo veritatis iusto dignissimos laboriosam quidem ipsa sed!</p>

<input type="email" name="email" id="email" class="form-control form-control--large form-control--email">

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        Success!
</div>
```

Output without this plugin:

```njk

```

Output with this plugin:

```njk
<title>{{ title }} | {{ site.title }}</title>
<h1>Hello, world!</h1>;<p>
  If you're seeing this modal after clicking the button on the page, Bootstrap's
  CSS and JS are both working properly.
</p>

<input
  type="email"
  name="email"
  id="email"
  class="form-control form-control--large form-control--email"
/>

<div
  class="modal fade"
  id="exampleModal"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  Success!
</div>
```

### Printing empty `{% block %}` statements on one line

Input:

```njk
        {% block styles %}

        {% endblock %}

    {% block slides %}{%endblock%}
```

Output without this plugin:

```njk
{% block styles %}

{% endblock %}

{% block slides %}
{% endblock %}
```

Output with this plugin:

```njk
{% block styles %}{% endblock %}

{% block slides %}{% endblock %}
```

## Usage

Install with npm. `prettier-plugin-twig-melody` v0.4.6 is a peer dependency so it should also be installed.

```sh
npm install --save-dev prettier-plugin-twig-enhancements
```

Add it to your Prettier config file (`.prettierrc`):

```json
{
  "parser": "melody",
  "plugins": ["."],
  "twigMelodyPlugins": ["."]
}
```

Example usage on Nunjucks templates (`*.njk`):

```json
{
  "overrides": [
    {
      "files": "*.njk",
      "options": {
        "parser": "melody",
        "plugins": [""],
        "twigMelodyPlugins": [""],
        "twigFollowOfficialCodingStandards": false,
      }
    }
  ]
}
```
