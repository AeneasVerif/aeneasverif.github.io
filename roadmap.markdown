---
layout: roadmap
title: Roadmap
permalink: /roadmap/
---

<section class="roadmap__item">
  <div class="roadmap__text" markdown="1">
## Aeneas, with Guarantees

Using a verification framework doesn't mean the tools themselves are free of
bugs. When it comes to verifying programs written in a subtle language like
Rust, it means the toolchain could miss subtle corner cases, leading to
a false sense of trustworthiness.
In order to address this issue, we're in the process of porting Aeneas from OCaml to Rust,
and verifying it with itself.
The final soundness theorem will connect the models extracted by Aeneas to
a concurrent semantics of Rust that operates at the byte level.
  </div>
  <svg class="roadmap__illustration" viewBox="0 0 320 260" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <path class="roadmap__illustration--light roadmap__shape" d="M160 24 248 62v70c0 54-40 88-88 110-48-22-88-56-88-110V62Z"/>
    <path d="M150 65h20l4 14 12 5 13-7 14 14-7 13 5 12 14 4v20l-14 4-5 12 7 13-14 14-13-7-12 5-4 14h-20l-4-14-12-5-13 7-14-14 7-13-5-12-14-4v-20l14-4 5-12-7-13 14-14 13 7 12-5Z"/>
    <circle cx="160" cy="130" r="25"/>
  </svg>
</section>

<section class="roadmap__item">
  <div class="roadmap__text" markdown="1">
## All Safe Rust

We're extending the translation engine and the supporting Lean backend
to lift the existing limitations of the toolchain on safe Rust.
This means updating the translation to support all possible
uses of borrows, but also extending the Lean backend so that it can
consume objects that are not natively supported by Lean's type system,
such as, e.g., ADTs with non-positive recursive occurrences.
  </div>
  <svg class="roadmap__illustration" viewBox="0 0 320 260" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <path class="roadmap__illustration--light" d="M160 72v30M72 128v-26h176v26M160 102v26M72 176v32h44v8M248 176v32h-44v8"/>
    <rect class="roadmap__shape" x="128" y="28" width="64" height="44" rx="6"/>
    <g class="roadmap__illustration--dark">
      <rect x="44" y="128" width="56" height="48" rx="6"/>
      <rect x="132" y="128" width="56" height="48" rx="6"/>
      <rect x="220" y="128" width="56" height="48" rx="6"/>
    </g>
    <g class="roadmap__illustration--light">
      <rect x="88" y="216" width="56" height="32" rx="6"/>
      <rect x="176" y="216" width="56" height="32" rx="6"/>
    </g>
  </svg>
</section>

<section class="roadmap__item">
  <div class="roadmap__text" markdown="1">
## Unsafe Pointers and Interior Mutability

We're adding support for separation logic to support the verification
of unsafe code that manipulates raw pointers, and interior mutability
patterns that lead to aliasing (e.g., `Cell`).
  </div>
  <svg class="roadmap__illustration" viewBox="0 0 320 260" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <g class="roadmap__illustration--light">
      <rect x="36" y="40" width="90" height="52" rx="6"/>
      <rect x="194" y="40" width="90" height="52" rx="6"/>
    </g>
    <path d="M81 92v28l65 46m-8-13 8 13-15-3"/>
    <path class="roadmap__illustration--dark" d="M239 92v28l-65 46m8-13-8 13 15-3"/>
    <rect class="roadmap__shape" x="122" y="166" width="76" height="58" rx="6"/>
    <circle cx="160" cy="195" r="11"/>
  </svg>
</section>

<section class="roadmap__item">
  <div class="roadmap__text" markdown="1">
## Concurrency and Async

Beyond sequential code, we're targeting concurrent verification with
concurrent separation logic.
  </div>
  <svg class="roadmap__illustration" viewBox="0 0 320 260" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <path class="roadmap__illustration--light" d="M160 28v20M80 72V48h160v24M80 188v24h160v-24M160 212v20"/>
    <circle class="roadmap__node" cx="160" cy="20" r="8"/>
    <circle class="roadmap__node" cx="160" cy="240" r="8"/>
    <g class="roadmap__illustration--light">
      <path d="M80 72v116"/>
      <circle class="roadmap__node" cx="80" cy="100" r="9"/>
      <circle class="roadmap__node" cx="80" cy="160" r="9"/>
    </g>
    <path d="M160 48v164"/>
    <circle class="roadmap__node" cx="160" cy="90" r="9"/>
    <circle class="roadmap__node" cx="160" cy="150" r="9"/>
    <g class="roadmap__illustration--dark">
      <path d="M240 72v116"/>
      <circle class="roadmap__node" cx="240" cy="100" r="9"/>
      <circle class="roadmap__node" cx="240" cy="160" r="9"/>
    </g>
  </svg>
</section>

<section class="roadmap__item">
  <div class="roadmap__text" markdown="1">
## Low-level Representations and Transmute

One of Aeneas' strengths is the ability to abstract away the low-level
representation of objects and their memory footprints.
Sometimes however, we need to be able to open the abstraction boxes
and look at the details of the objects we manipulate.
This is particularly true when verifying libraries that provide safe
interfaces but use unsafe implementations, or when transmuting
between types.
We're in the process of allowing the proofs to toggle between several
views, depending on the level of precision one needs at a given point
in the proofs.
  </div>
  <svg class="roadmap__illustration" viewBox="0 0 320 260" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <path class="roadmap__illustration--light roadmap__shape" d="m26 62 64-32 64 32-64 32Z"/>
    <path d="M26 62v96l64 32 64-32V62M90 94v96"/>
    <path class="roadmap__illustration--dark" d="M154 110h34m-10-10 10 10-10 10"/>
    <rect class="roadmap__shape" x="202" y="80" width="96" height="96" rx="4"/>
    <path class="roadmap__illustration--light" d="M234 80v96M266 80v96M202 112h96M202 144h96"/>
  </svg>
</section>

<section class="roadmap__item">
  <div class="roadmap__text" markdown="1">
## Automation

Proofs can not work without automation, and Lean's meta-programming
facilities, which enable custom, extensible automation, are the perfect
mean to extend the possibilities of verification.
  </div>
  <svg class="roadmap__illustration" viewBox="0 0 320 260" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <g class="roadmap__illustration--light">
      <path d="M132 82V34H72M150 82V18M170 82V38h48M188 82V52h70M132 178v52H72M150 178v66M170 178v46h48M188 178v30h52"/>
      <circle class="roadmap__node" cx="72" cy="34" r="4"/>
      <circle class="roadmap__node" cx="150" cy="18" r="4"/>
      <circle class="roadmap__node" cx="218" cy="38" r="4"/>
      <circle class="roadmap__node" cx="258" cy="52" r="4"/>
      <circle class="roadmap__node" cx="72" cy="230" r="4"/>
      <circle class="roadmap__node" cx="150" cy="244" r="4"/>
      <circle class="roadmap__node" cx="218" cy="224" r="4"/>
      <circle class="roadmap__node" cx="240" cy="208" r="4"/>
    </g>
    <path d="M112 102H62V76H30M112 120H26M112 140H42v36H26M112 158H70v48H36M208 102h50V76h32M208 120h86M208 140h70v36h16M208 158h42v48h34"/>
    <g class="roadmap__illustration--dark">
      <circle class="roadmap__node" cx="30" cy="76" r="4"/>
      <circle class="roadmap__node" cx="26" cy="120" r="4"/>
      <circle class="roadmap__node" cx="26" cy="176" r="4"/>
      <circle class="roadmap__node" cx="36" cy="206" r="4"/>
      <circle class="roadmap__node" cx="290" cy="76" r="4"/>
      <circle class="roadmap__node" cx="294" cy="120" r="4"/>
      <circle class="roadmap__node" cx="294" cy="176" r="4"/>
      <circle class="roadmap__node" cx="284" cy="206" r="4"/>
    </g>
    <rect class="roadmap__shape" x="112" y="82" width="96" height="96" rx="8"/>
    <rect class="roadmap__illustration--dark" x="132" y="102" width="56" height="56" rx="4"/>
    <path class="roadmap__illustration--dark" d="M144 114h12v12h-12ZM164 134h12v12h-12ZM156 120h20M164 140h-20"/>
  </svg>
</section>
