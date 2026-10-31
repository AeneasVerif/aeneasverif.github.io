---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---

The [AeneasVerif](https://github.com/AeneasVerif) organization is an umbrella
for Rust verification projects. Its flagship project is
[Aeneas](https://github.com/AeneasVerif/aeneas) (pronunced [Eh-nee-as]), a
toolchain to verify Rust programs to functional models in a variety of
proof assistants, with [Lean](https://leanprover.github.io/) as its main backend.

<div class="home-hero__actions">
  {% assign roadmap_page = site.pages | where: "path", "roadmap.markdown" | first %}
  {% if roadmap_page %}
  <a class="home-hero__button" href="{{ roadmap_page.url | relative_url }}">Roadmap</a>
  {% endif %}
  <a class="home-hero__button{% if roadmap_page %} home-hero__button--secondary{% endif %}" href="https://github.com/AeneasVerif">Github</a>
  <a class="home-hero__button{% unless roadmap_page %} home-hero__button--secondary{% endunless %}" href="https://aeneas-verif.zulipchat.com/">Zulip</a>
</div>
