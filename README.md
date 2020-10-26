# prettier-plugin-twig-enhancements

![Prettier Banner](https://raw.githubusercontent.com/prettier/prettier-logo/master/images/prettier-banner-light.png)

Subtle enhancements for [`prettier-plugin-twig-melody`](https://github.com/trivago/prettier-plugin-twig-melody).

**Note:** This is a plugin for `prettier-plugin-twig-melody`, not a [Prettier](https://prettier.io/) plugin.

## Table of Contents

- [Enhancements](#enhancements)
  - [Formatting HTML more like Prettier](#formatting-html-more-like-prettier)
  - [Printing empty `{% block %}` statements on one line](#printing-empty--block--statements-on-one-line)
- [Usage](#usage)
- [Credits](#credits)

## Enhancements

### Formatting HTML more like [Prettier](https://prettier.io/)

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

Install with [npm](npmjs.com). `prettier-plugin-twig-melody` is a peer dependency so it should also be installed.

```sh
npm install --save-dev prettier-plugin-twig-enhancements
```

Add it to your Prettier configuration file (e.g. `.prettierrc`):

```json
{
  "twigMelodyPlugins": ["node_modules/prettier-plugin-twig-enhancements"]
}
```

Example usage on [Nunjucks]() templates (`*.njk`). (**Note:** Nunjucks has a similar syntax to Twig, but the Twig plugin isn't fully compatible with it):

```json
{
  "overrides": [
    {
      "files": "src/**/*.njk",
      "options": {
        "parser": "melody",
        "twigPrintWidth": 120,
        "twigSingleQuote": false,
        "twigFollowOfficialCodingStandards": false,
        "twigMelodyPlugins": ["node_modules/prettier-plugin-twig-enhancements"]
      }
    }
  ]
}
```

Read more about [`prettier-plugin-twig-melody` config options](https://github.com/trivago/prettier-plugin-twig-melody#options) and [Prettier's options](https://prettier.io/docs/en/options.html).

## Credits

The test suites here are from [fvictorio/prettier-plugin-toml](https://github.com/fvictorio/prettier-plugin-toml).
