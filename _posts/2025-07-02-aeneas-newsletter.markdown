---
layout: post
title:  "Aeneas-news: July 2025"
date:   2025-07-02 18:40:29 +0100
categories: newsletter
---
## Charon
* @FireFighterDuck added more details to the type layouts, in particular for the representation of enums;
* @Opale added support for closure-to-fn-ptr casts;
* Charon names no longer contain disambiguators for impls; this makes them more stable across time;
* Work is ongoing to rework monomorphisation to be able to handle monomorphized layouts and evaluated constants;
* @Opale added an option that translates Box sa a normal type instead of a built-in;
* @ssyram added pointer metadata information to types (for DSTs);
* Added support for the unstable trait_alias feature;
* Various improvements and bug fixes, in particular around handling of generics.

## Aeneas
* the scalar_tac attribute can now be used on theorems with preconditions, such as:
```
@[scalar_tac x * y]
theorem lt_mul_lt_le (x y a b : ℕ) (h0 : x < a) (h1 : y < b) :
  x * y ≤ (a - 1) * (b - 1) := by apply Nat.le_mul_le; omega
```
* the tactics based on conditional rewriting with scalar_tac (simp_scalar, simp_lists, etc.) are now a lot faster
* attributes like progress and scalar_tac are now compatible with asynchronous execution

## Eurydice
* Support for &str and &String (contribution by ssyram)
* Support for u128 and i128 (contribution by ssyram)
* Support for closures (multiple people, relying on upstream work in charon) via closure conversion
* Improvements to the compilation scheme of reborrows (&*e)
* Improvement: calls to array::from_fn may now be nested, and the closure passed to array::from_fn may now capture variables
* Lots of improvements to handling of traits and the compilation of trait clauses -- several cases that were previously unsupported are now handled
