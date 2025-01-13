---
layout: page
title: Projects
permalink: /projects/
---

This page lists the different subprojects included in the AeneasVerif umbrella.
We happily welcome contributions, issues, and pull requests on GitHub!

## Charon

[Charon](https://github.com/AeneasVerif/charon) acts as an interface between
the rustc compiler and program verification projects. Its purpose is to process
Rust crates and convert them into files easy to handle by program verifiers. It
is implemented as a custom driver for the rustc compiler.

Charon operates on MIR, one of the intermediate representations of the rustc
compiler. Charon converts MIR code to ULLBC (Unstructured Low-Level Borrow
Calculus), a slightly simplified, analysis-oriented representation of MIR.
It then performs control-flow reconstruction to translate ULLBC to LLBC
(Low-Level Borrow Calculus). While Charon is implemented in Rust, it includes
JSON serializers for both ULLBC and LLBC, enabling the development of Rust
analyses in other programming languages. In particular, it also provides an
OCaml library, dubbed `charon-ml`, with utilities to manipulate ULLBC and LLBC
representations in OCaml.

## Aeneas

[Aeneas](https://github.com/AeneasVerif/aeneas) is a verification toolchain for
Rust programs. It relies on a translation from Charon's LLBC language to a
pure, functional model, and supports several verification backends, including
[F\*](https://www.fstar-lang.org), [Coq](https://coq.inria.fr/),
[HOL4](https://hol-theorem-prover.org/) and
[Lean](https://leanprover.github.io/).
Aeneas currently targets a *safe*, sequential Rust code. See the [Aeneas
README](https://github.com/AeneasVerif/aeneas?tab=readme-ov-file#targeted-subset-and-current-limitations)
for more details about the Rust subset currently supported!

To simplify verification of Rust programs, Aeneas also provides specific proof
automation for several backends. We particularly recommend the use of the Lean
backend, which provides support for partial functions and extrinsic proofs of
termination, as well as tactics specialized for monadic programs. See our
[tutorial](https://github.com/AeneasVerif/aeneas/blob/main/tests/lean/Tutorial)
on using Lean for verifying Rust programs translated by Aeneas.

## Eurydice

Eurydice is a compiler from (a subset of) Rust to C. The purpose of Eurydice is to provide a
backwards-compatibility story as the verification ecosystem gradually
transitions to Rust. New programs can be written in Rust, in turn making them
safer and easier to verify; but for legacy environments that cannot yet take a
dependency on the Rust toolchain, Eurydice allows generating C code as a
stopgap measure.

Currently (late 2023), the flagship example for Eurydice is Kyber, also known as ML-KEM,
a Post-Quantum cryptographic algorithm authored and verified in Rust for the
general public, and [compiled to C](https://github.com/cryspen/hacl-packages/tree/7a7bfbb17d1d912bdb1a80e86a917e1eec8b6264/libcrux/src)
via Eurydice for Mozilla's NSS library.

In terms of software architecture, Eurydice consumes Rust programs via the
Charon infrastructure, then extracts Rust to
[KaRaMeL](https://github.com/FStarLang/karamel)'s internal AST via a
type-driven translation. Once in the KaRaMeL AST, 30+ nano-passes allow going
from Rust down to C code. About half of these passes were already implemented
for KaRaMeL, the rest of the passes reuse the KaRaMeL infrastructure but were
freshly written for Eurydice.

