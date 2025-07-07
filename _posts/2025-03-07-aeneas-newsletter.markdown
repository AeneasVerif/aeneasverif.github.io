---
layout: post
title:  "Aeneas-news: March 2025"
date:   2025-03-07 01:07:29 +0100
categories: newsletter
---
A brief update on what's happening in the Aeneas project at large.

## Charon
* Support defaulted trait methods: when a trait has a method with a default implementation, impl blocks for this trait that don't override the method now get a copy of the default method.
* Better error handling: Charon no longer tries to translate code that rustc would reject.
* More parsimonious output: we no longer translate trait methods that aren't used; this greatly reduces the output when using traits like Iterator.
* Added a charon --read-llbc <file.llbc> option that pretty-prints the contents of that llbc file.


## Aeneas
We dramatically improved Aeneas' extraction:
* several changes were made to the code generation to improve its quality and make it more fit to proofs by mean of the progress tactic
* Aeneas now makes use of Charon's option --remove-associated-types to lift the associated types so that they become parameters. In the short term, this will unlock support for a large class of traits, such as iterators.

The Lean backend underwent a massive revamp. This includes:
* changes in the definitions of the machine scalars. There are now two separate definitions, for signed and unsigned integers, and they use bitvectors in their internal representation.
* building on the previous change, we added support for many more operations, such as bitwise operations or wrapping operations, together with the necessary reasoning lemmas
* several attributes such as progress_pure and progress_pure_tac were introduced to automatically lift lemmas so that progress can use them, or automatically introduce progress lemmas for pure definitions
* natify and bvify, inspired by zify, now allow converting propositions to propositions manipulating either natural numbers (useful to convert from bit-vectors or ZMod) or bit-vectors. A zmodify tactic is planned to complement those.
* bv_tac combines bvify and bv_decide to efficiently reason by using bit-vectors
several bug fixes for the progress tactics and quality of life improvements. For instance, progress with ... can now be given a term rather than an identifier.
* scalar_tac is now a lot faster than before, more reliable, and solves more goals.
several range definitions (which can be used with the syntax for ... in ...) together with the necessary theorems have been added to the library, for the purpose of writing clean and concise specification.
* the extract_goal now allows (optionally) minimizing a goal and extracting it as a lemma. extract_assert introduces an assertion which proves the current goal.

## Eurydice
* Overhaul the initialization of arrays -- we should now avoid emitting 1000+ assignments for arrays that are initialized with zeroes.
* Preliminary support for raw pointers
* Allow recursion
* Clean up the test suite to run faster
* Do not hide translation failures anymore, and error out cleanly if something isn't supported (rather than silently generate no code)

## Scylla
A new projet, Scylla, is now public! https://github.com/AeneasVerif/scylla

Scylla aims to translate very regular, data-oriented C code to safe Rust. The ambition is that the programmer should be actively involved in rewriting their C code until it is regular and understandable enough to become eligible to a translation to Safe Rust. This approach allows running performance benchmarks, regression, integration and unit tests in the same original C build environment. Once the programmer is confident that the rewrites introduced no errors, they can invoke Scylla to get clean, idiomatic Rust code with no unsafe blocks.

Naturally, this does not apply to very many pieces of C code. For now, our chief use-case in the HACL* library, where we can already translate all of the bignums, along with the chacha20 algorithm. Expect to see more and more programs supported in the near future.
