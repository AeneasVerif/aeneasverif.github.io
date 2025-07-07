---
layout: post
title:  "Aeneas-news: June 2025"
date:   2025-06-03 09:35:29 +0100
categories: newsletter
---
## Charon
* The representation of closures was reworked in depth thanks to @Opale. They are now translated as plain structs with the appropriate Fn{Mut,Once,} impls which should require no special support from users.
* Work is in progress to reconstruct the information for which code runs in drop in a polymorphic context.
* ULLBC now contains details about what happens when unwinding from a function call. This doesn't yet contain all unwinding data (it's missing drop unwinds and asserts). We plan to keep this ULLBC-only short term.
* Thanks to @FireFighterDuck, Charon now emits layout information for types whose layout does not depend on generic parameters!

## Aeneas
* minor fixes and improvements of the Lean backend

## Eurydice
* Improved support for globals
* Fix issues related to phase ordering and empty struct types
* Broader support for DSTs, now supporting user-defined DSTs (e.g. struct T<U: ?Sized>), built-in DSTs (e.g. Box<[T]>), and proper coercions between the two (experimental, still some issues to be ironed out)

## Scylla
* Support for alignment directives
* Properly implement integer conversion and integer promotion rules from C
* Improved set of annotations to better control e.g. what goes to a Box type or not
* Fixes related to post- vs pre-increment operators
* Support for casts betwent uintN* and uint8* via scylla_lib
* Add support for reconstructing tagged unions as ADTs
* Add support for tuples
* Add support for slice reconstruction
