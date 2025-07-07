---
layout: post
title:  "Aeneas-news: May 2025"
date:   2025-05-15 19:39:29 +0100
categories: newsletter
---
## Charon
* Significant progress on supporting later MIRs: most constant-related shanigans have been fixed;
* Added --mir elaborated which returns a MIR that includes drops. This works in common cases, open an issue if you encounter errors with this;
* Progress towards better support for closures, thanks in particular to @Opale;
* Added --start-from <name> to extract the given item instead of the whole current crate;
* @Opale added an experimental --monomorphize flag that monomorphizes the whole contents of the crate;
* Upgraded the rustc used to build charon to a recent version.

## Aeneas
* make Aeneas more resilient to errors happening either when extracting the crate with Charon or during the translation (because of unsupported features in particular)
* add support for dynamically sized types
* add support for blanket implementations (those used to trigger name collisions)
* add support for definitions with name clashes (in particular, functions and constants
defined inside function bodies) by taking the Rust discriminators into account
* general improvement of the Lean backends (more lemmas, general improvements to the tactics) and update to Lean v4.19.0

## Eurydice
* New internal library to facilitate authoring "peephole" optimizations that rewrite AST fragments; much better support for resugaring MIR loops as for-loops as a result, with more to come

## Scylla
* Considerable progress on the libclang-based frontend that now supports a much larger subset of actual C; many rewrites to make the translation more modular, and to synthesize well-typed internal krml ASTs before translation to Rust
* Take into account C integer promotion rules
* Take into account C assignments returning values
* Support for nested assignments
* General support for for-loops
* Usability improvements with more user options
* Handling of multifile projects
* Support for bundling and visibility analysis
* Handle C typedefs properly since the translation from C to krml's AST is type-driven
