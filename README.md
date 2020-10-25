# prettier-plugin-twig-enhancements

Subtle enhancements for [`prettier-plugin-twig-melody`](https://github.com/trivago/prettier-plugin-twig-melody) (v0.4.6).

**Notes:**
* This is a plugin for `prettier-plugin-twig-melody`, not a [Prettier](https://prettier.io/) plugin.
* The enhancements of this plugin are somewhat naive and depend on implementation details of the Twig plugin v0.4.6. Thus this plugin may not work with other versions of the Twig plugin.

## Enhancements

### Support for YAML frontmatter

Frontmatter is not used in [Twig](https://twig.symfony.com/) templates but it is in templates of [Nunjucks](https://mozilla.github.io/nunjucks/) and [Liquid](https://liquidjs.com/), both of which are similar to Twig in syntax.

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
--- title: Home map: {Hello: World} items: - item1 - item2 ---
```

Output with this plugin:

```njk
---
title: Home
map: { Hello: World }
items:
  - item1
  - item2
---
```

### Formatting HTML more like Prettier

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
<title>
  {{ title }} | {{ site.title }}
</title>

<h1>
  Hello, world!
</h1>

<p>
  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit sequi modi
  voluptate quidem enim! Earum voluptatem accusantium nulla cupiditate
  exercitationem qui? Facilis explicabo veritatis iusto dignissimos laboriosam
  quidem ipsa sed!
</p>

<input type="email"
  name="email"
  id="email"
  class="form-control form-control--large form-control--email" />

<div class="modal fade"
  id="exampleModal"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  Success!
</div>
```

Output with this plugin:

```njk
<title>{{ title }} | {{ site.title }}</title>

<h1>Hello, world!</h1>

<p>
  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit sequi modi
  voluptate quidem enim! Earum voluptatem accusantium nulla cupiditate
  exercitationem qui? Facilis explicabo veritatis iusto dignissimos laboriosam
  quidem ipsa sed!
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

    {% block scripts %}{%endblock%}
```

Output without this plugin:

```njk
{% block styles %}

{% endblock %}

{% block scripts %}
{% endblock %}
```

Output with this plugin:

```njk
{% block styles %}{% endblock %}

{% block scripts %}{% endblock %}
```

## Usage

Install with [npm](npmjs.com). `prettier-plugin-twig-melody` v0.4.6 is a peer dependency so it should also be installed.

```sh
npm install --save-dev prettier-plugin-twig-enhancements
```

Add it to your Prettier configuration file (e.g. `.prettierrc`):

```json
{
  "twigMelodyPlugins": ["node_modules/prettier-plugin-twig-enhancements"]
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
        "twigMelodyPlugins": ["node_modules/prettier-plugin-twig-enhancements"]
      }
    }
  ]
}
```

Read more about [`prettier-plugin-twig-melody` config options](https://github.com/trivago/prettier-plugin-twig-melody#options) and [Prettier's options](https://prettier.io/docs/en/options.html).

## Credits

The test suite here is from [fvictorio/prettier-plugin-toml](https://github.com/fvictorio/prettier-plugin-toml).