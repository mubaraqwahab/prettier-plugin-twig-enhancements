# prettier-plugin-twig-enhancements

Subtle enhancements for [prettier-plugin-twig-melody](https://github.com/trivago/prettier-plugin-twig-melody).

## Features

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

### Format HTML in a manner more similar to Prettier's default HTML formatter.

Input:

```njk
<title>
  {{ title }} | {{ site.title }}
</title>
<h1>Hello, world!</h1>

<p>If you're seeing this modal after clicking the button on the page, Bootstrap's CSS and JS are both working properly.</p>

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

### Empty `{% block %}` statements are printed on one line.

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

TODO: Explain why? Give code samples. Explain why you did how you did (i.e. why not extend the parser?)
