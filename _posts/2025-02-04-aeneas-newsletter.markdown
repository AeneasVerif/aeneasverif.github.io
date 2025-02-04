---
layout: post
title:  "Aeneas-news: February 2025"
date:   2025-02-04 13:50:29 +0100
categories: newsletter
---
A brief update on what's happening in the Aeneas project at large.

## Charon (Rust compiler driver)
* Support for hiding associated types! These are now desugared as type parameters in most cases (which alleviates the need for a dependent encoding with type fields in records). This should be completely transparent for downstream consumers, meaning anyone using Charon can now support associated types by passing `--remove-associated-types '*'` to charon.
* Complete overhaul of the handling of methods, which will allow handling tricky edge-cases, used for instance in Rust's stdlib. Specifically, we now handle the fact that implementations might have types that are more precise than the signature that appears in the trait declaration.
* Performance improvements: several passes that were accidentally quadratic in the number of statements were fixed.
* Improvements to control-flow reconstruction, with cascading code-quality effects in Eurydice notably.

## Eurydice (Rust to C compiler)
* Minor bugfixes related to monomorphization, found via libcrux's ml-kem and ml-dsa implementations
* Refactoring to support custom enum values as specified in the Rust source
* Better support for hoisting loop bodies as separate functions (currently required for Aeneas)

## General
* Website is up! https://aeneasverif.github.io/
* Fernando Leal joins us as an first-year master's intern, to work on verifying post-quantum cryptography with Aeneas

## Aeneas (Rust verification)
* Massive reorganisation and cleanup of the library for the Lean backend (which is now properly called Aeneas)
* The loop joins now properly handles symbolic values containing borrows
* Minor improvements of the quality of extracted models, which are cleaner
* Scaling up Aeneas for a real-world use case (Microsoft-internal project, hopefully made public within the next couple months).
