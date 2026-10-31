---
layout: page
title: Publications & Posts
permalink: /publications/
---

## Blog posts

* [A case study with Aeneas and jxl-rs](https://jonathan.protzenko.fr/2026/05/05/jxl-rs.html),
  Jonathan Protzenko, _May 5, 2026_.
* [An Overview of the Aeneas Rust Verification Toolchain](https://www.sonho.fr/2026/03/18/aeneas-overview.html),
  Son Ho, _March 18, 2026_.
* [Eurydice: a Rust to C compiler (yes)](https://jonathan.protzenko.fr/2025/10/28/eurydice.html),
  Jonathan Protzenko, _October 28, 2025_.

## Publications

* [Scaling Verification of Cryptographic Software with Aeneas, Rust, and
  Lean](https://arxiv.org/abs/2609.15648v1), Son Ho, C&eacute;dric Fournet, Jonathan
  Protzenko, Michael Naehrig, Joshua Clune, Patrick Longa, Guillaume Boisseau,
  Fernando Leal S&aacute;nchez, Aymeric Fromherz, Antoine Delignat-Lavaud,
  _Preprint, 2026_.
  \[ [bib](publications_bib.html#ho2026symcrypt) \].
* [Charon: An Analysis Framework for Rust](https://dl.acm.org/doi/10.1007/978-3-031-98685-7_18), Son Ho,
  Guillaume Boisseau, Lucas Franceschino, Yoann Prak, Aymeric Fromherz, Jonathan
  Protzenko, _International Conference on Computer Aided Verification (CAV), 2025
  (tool paper)_.
  \[ [bib](publications_bib.html#ho2024charon) | [long version](https://arxiv.org/abs/2410.18042) \].
* [Formal Verification of Rust Programs by Functional
  Translation](https://theses.hal.science/tel-05004605), Son Ho,
  _PhD thesis, Universit&eacute; PSL (Paris Sciences &amp; Lettres), 2024_.
  \[ [bib](publications_bib.html#ho2024thesis) \].
* [Sound Borrow-Checking for Rust via Symbolic
  Semantics](https://dl.acm.org/doi/10.1145/3674640), Son Ho, Aymeric Fromherz, Jonathan
  Protzenko, _International Conference on Functional Programming (ICFP), 2024_.
  \[ [bib](publications_bib.html#ho2024rust) \].
* [Aeneas: Rust verification by functional
  translation](https://dl.acm.org/doi/10.1145/3547647), Son Ho, Jonathan Protzenko,
  _International Conference on Functional Programming (ICFP), 2022_. 
  \[ [bib](publications_bib.html#ho2022aeneas) | [long version](https://arxiv.org/abs/2206.07185)\].

{% if site.posts.size > 0 %}
<h2 class="post-list-heading">News</h2>
<ul class="post-list">
  {%- for post in site.posts -%}
  <li>
    {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
    <span class="post-meta">{{ post.date | date: date_format }}</span>
    <h3>
      <a class="post-link" href="{{ post.url | relative_url }}">
        {{ post.title | escape }}
      </a>
    </h3>
    {%- if site.show_excerpts -%}
      {{ post.excerpt }}
    {%- endif -%}
  </li>
  {%- endfor -%}
</ul>
{% endif %}
