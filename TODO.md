# TODO

- Fix this:

Input

```njk
{% block url %}

{% endblock %}
Hey


<div></div>
```

Output

```njk
{% block url %}{% endblock %}Hey<div></div>
```

Should be:

```njk
{% block url %}{% endblock %}
Hey

<div></div>
```

You need to study the way whitespace around opening and closing tags (of njk and html) is handled.

- There's extra hardlines when file only contains frontmatter. Remove it!
