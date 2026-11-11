---
layout: post
title:  "Aeneas-news: November 2026"
date:   2026-11-09 12:00:00 +0100
categories: newsletter
---
## Newsletters are back!

The last issue of this newsletter went out in July 2025, fifteen issues later we're back. 

The projects have been accelerating whilst the newsletter was sidelined. 
Between the end of July 2025 and the end of October 2026, Aeneas grew from about 73k to 126k lines of code, and Charon more than doubled, from about 42k to 91k.

![Lines of code at the end of each month for Aeneas and Charon]({{ "/assets/newsletter/2026-11/lines-of-code.svg" | relative_url }})

Over the same period, Aeneas went from 365 to 885 merged pull requests and from 98 to 220 closed issues, and Charon from 530 to 1,040 merged pull requests and from 182 to 401 closed issues.

![Cumulative issues closed and pull requests merged for Aeneas and Charon]({{ "/assets/newsletter/2026-11/issues-and-prs.svg" | relative_url }})

Aeneas has also been used to verify more and more projects, including: 
- Microsoft's Rust cryptography in [SymCrypt](https://www.microsoft.com/en-us/research/blog/verifying-rust-cryptography-in-symcrypt-from-standards-to-code/), 
- The Signal protocol and its Rust implementation ([Signal Shot](https://leodemoura.github.io/blog/2026-4-20-signal-shot-the-platform-is-ready/)),
- A new Lean kernel written in Rust [con-ron](https://leodemoura.github.io/blog/2026-10-15-lean-now-ships-with-verified-kernels/). 

This issue covers everything since the last one, from July 2025 to the first week
of November 2026. From now on we'll go back to monthly updates.

## Highlights

### Aeneas
* **Iterators.** Iterators are now supported in Aeneas. In particular we now have: `Iterator`, `IntoIterator`, `DoubleEndedIterator`, `FromIterator`/`collect`, `Sum`, `Product` and `Extend`, with iterators over slices, arrays, `Vec`s, ranges, `ChunksExact` and `str::Chars`, and the `Map`, `Enumerate`, `Take`, `Rev`, `Zip` and `StepBy` adapters. `for` loops over these now translate and can be verified end to end (@sonmarcho, @R1kM);
* **`#decompose`.** A new command splits a large generated function into auxiliary definitions, chosen by patterns such as a range of `let`s or a branch of a `match`, and proves an equation relating the original function to the pieces, so that each can be verified separately (@sonmarcho, [#911](https://github.com/AeneasVerif/aeneas/pull/911));
* **Much more general symbolic execution.** Joins and loops were reworked: nested borrows in function signatures and loops, and mutable borrows inside shared borrows, are now supported. Loops are extracted as a `loop` combinator over a separate loop-body definition (@sonmarcho);
* **More of Rust.** `dyn` trait objects, function pointers, closures and the `Fn*` traits, stateful globals, `'static` references, loops in constants and, in a preliminary form, higher-ranked trait bounds are now supported (@sonmarcho);
* **`progress` is now `step`.** Specifications can be written as Hoare triples `f x ⦃ y => post ⦄`, preconditions can be discharged with `grind`, and post-conditions can be inferred (@sonmarcho, @andricicezar, @R1kM, @mpenciak);
* **Faster, and easier to install.** Translation now runs in parallel by default, and prebuilt releases of Aeneas, including a precompiled Lean library, are published on GitHub (@sonmarcho, @joshlf, @Nadrieril);
* **Lean module system.** The Lean library now uses the Lean module system (@oliver-butterley), and the Lean toolchain went from v4.19.0 to v4.36.0-rc2.

### Charon
* **The entire standard library.** In June 2026 Charon reached a milestone: it can now [translate the entire Rust standard library](https://github.com/AeneasVerif/charon/issues/863) (`core`, `alloc` and `std`), with only `async` code still unsupported (@Nadrieril);
* **Performance.** Charon has become dramatically faster over the past year, and its performance is now [benchmarked on every commit](https://aeneasverif.github.io/charon/bench/) (@Nadrieril, @N1ark);
* **Trait objects.** `dyn Trait` is no longer opaque: vtables are explicit structs and values, with method shims, dynamic dispatch, upcasting and drop shims (@Nadrieril, @ssyram, @N1ark);
* **Monomorphisation** was reworked on top of hax, and `--monomorphize-mut` monomorphises only the items instantiated with `&mut` (@Nadrieril, @Sam-Ni);
* **Layouts and constants.** Layouts now record what the Rust Reference guarantees rather than what a single rustc run chose, and constants and statics can be evaluated to values (@Nadrieril, @N1ark);
* **Drops.** Drop glue is translated, including for polymorphic types, with a choice of drop semantics (@Nadrieril, @ssyram);
* **Charon is now beta.** It has a [manual](https://aeneasverif.github.io/charon/manual), with a FAQ, examples and a guide to running it on Rust-for-Linux, and prebuilt nightly binaries are published on GitHub for Linux and macOS (@Nadrieril, @joshlf, @N1ark).

## Charon

**Translation coverage**
* @Nadrieril added support for GATs, all built-in traits, thread locals, inline assembly (first bare-bones, then the contents of `asm` blocks), non-Rust function-pointer ABIs, pattern types, `TypeId`, items defined inside function bodies and matching on `char`;
* Closures, function items and function pointers now get generated `Fn*` impls, and closure lifetimes are tracked properly (@Nadrieril);
* Unsized types are better supported, with pointer metadata on unsize coercions (@ssyram) and an improved unsizing algorithm for `Rc` and similar types (@N1ark);
* @N1ark added more information to the AST: unsafe and negative trait declarations and impls, mutability and safety of statics, `extern` items, `#[export_name]`, `#[link_section]`, and `asm!` versus `naked_asm!`;
* @Nadrieril added a translation from Charon's output to MiniRust.

**Traits, generics and monomorphisation**
* Monomorphisation now runs through hax and the old pass is gone; `--monomorphize-mut` partially monomorphises `&mut` instantiations; `dyn Trait` and trait aliases work in mono mode (@Nadrieril, @Sam-Ni). Mono mode now avoids polymorphic items as much as possible and keeps closure bodies called by opaque code (@port8080);
* Trait associated items were reworked: methods and associated items are identified by ids rather than names, method signatures live in the trait declaration, trait references are normalised, and `--remove-associated-types` became `--lift-associated-types` (@Nadrieril);
* @Nadrieril added `--remove-adt-clauses` and `--remove-unused-clauses`;
* Vtables are explicit structs and values, with method shims, dispatch, upcasting, drop shims and vtables for built-in traits (@Nadrieril, @ssyram), and @N1ark fixed higher-ranked vtables, by-value `self` receivers and `Fn*` vtables, and made vtables lazy.

**Lifetimes**
* Body lifetimes get best-effort unification, lifetime mutability is tracked, variance is translated and implied outlives bounds are made explicit (@Nadrieril); @N1ark added `--erase-body-lifetimes`;
* Higher-ranked clauses are now instantiated, `Region::Lub` replaces type-outlives predicates, and inferred lifetimes from typeck are plumbed through correctly (@Nadrieril).

**Drops**
* Drop glue is translated for polymorphic types as a `drop_glue` intrinsic with a body, there are two drop semantics with `--precise-drops`, a flag undoes drop elaboration, and built-in types get `Drop` impls (@Nadrieril); drops are a ULLBC terminator and can be desugared into calls (@ssyram).

**Constants, layouts and targets**
* @N1ark reworked constants: globals are places, there are new constant kinds for function pointers, slices and calls, constant references carry metadata, and `--consts=values|initializers` evaluates constants where possible. Most recently `rustc_const_uneval` keeps constants unevaluated where possible, which brought support for `TypeId` and `VTable` provenance, nested statics, `#[linkage]` statics, provenance-less wide pointers and projections in constant references;
* Layouts record what is guaranteed by the Rust Reference, `size_of`, `align_of` and `offset_of` became constants, and guaranteed layouts are tested with a layout fuzzer (@Nadrieril, @N1ark); `--print-layouts` displays them (@N1ark);
* Target information grew: per-target layouts, scalars and `#[repr]` options (@firefighterduck), and target parsing, target families, `repr(simd)`, union padding and linker magic (@N1ark);
* Multi-target translation (`--targets`) merges the results for several targets into one file (@Nadrieril, @sonmarcho).

**Control flow and bodies**
* @Nadrieril reworked control-flow reconstruction, with Relooper as an alternative algorithm, better loop exits and a new representation of switches;
* Promoted MIR is used by default, unwinding information reaches LLBC, and every local gets a `StorageDead` (@Nadrieril), with `--deallocate-all-locals` (@N1ark);
* Reads are now distinguished from copies, and user type annotations have a new representation (@Nadrieril).

**Choosing what to translate**
* New ways to pick entry points: start-from patterns, `--start-from-attribute`, `--start-from-pub` and `--start-from-if-exists`, and the `verify::opaque`, `verify::exclude` and `verify::test` attributes (@Nadrieril, @N1ark, @sonmarcho);
* Per-crate configuration moved from `Charon.toml` into `[package.metadata.charon]` in `Cargo.toml` (@oliver-butterley).

**Usability**
* CLI options and defaults were reworked, and wrong options are no longer silently accepted; there are new commands `charon version`, `charon toolchain-version` and `charon print-sysroot` (@Nadrieril, @N1ark);
* New options `--no-code-duplication` (@port8080), and rerunning cargo for selected crates only while keeping dependencies cached (@youknowone);
* Charon uses a full-MIR sysroot by default, works in cargo workspaces, and several versions can run side by side (@Nadrieril, @maximebuyse, @JoJoDeveloping);
* There are presets for consumers: `aeneas`, `eurydice`, `soteria`, `fast` and `raw-mir`.

**AST, output and Charon-ML**
* Many AST names were made consistent (@EschericHya), arrays and slices are real types and built-in ADTs get a type declaration (@N1ark);
* The output is smaller: types are hash-consed, serialisation is deduplicated, and a binary format is available (@Nadrieril, @N1ark);
* Charon-ML has new JSON deserialisation and printers aligned with the Rust ones (@N1ark), is faster and supports hashing (@N1ark), and has new helpers and visitors (@sonmarcho).

**Infrastructure, docs and community**
* @Nadrieril merged the hax frontend into the Charon repository, which removes a cross-repository dependency;
* Prebuilt nightly binaries are published on GitHub releases (@joshlf, @Nadrieril), for Linux x86_64 and aarch64 (@erickt) and macOS, and run on older glibc (@abentkamp); `charon-lib` builds on stable Rust;
* Charon is now beta software, with a [manual](https://aeneasverif.github.io/charon/manual), FAQ, examples and a guide for Rust-for-Linux (@Nadrieril, @N1ark);
* @Nadrieril added a Zulip bot that runs Rust snippets through Charon;
* Testing grew a rustc ui-test harness, a popular-crates harness and benchmarks; @Opale is now listed among the crate authors;
* Various improvements and bug fixes, including from @MantasBaksys, @G26karthik, @jdonszelmann and @sanxiyn, and a faster CI.

## Aeneas

**Symbolic execution and translation**
* @sonmarcho reworked joins and the translation of loops, and added support for nested shared borrows in signatures, nested borrows in loops and mutable borrows inside shared borrows; if a join fails, the code after a `match` is duplicated instead of failing;
* @sonmarcho added support for `dyn` traits, function pointers and the built-in `Fn*` impls, closures, stateful globals, `'static` references and the `'static` region, loops in constants, the `Never` type and raw pointers, enums without variants, and preliminary support for higher-ranked trait bounds and `println!`. Drops are evaluated as no-ops;
* Loops are extracted as a `loop` combinator over separate loop-body definitions, with `-loops-to-rec` to keep the old recursive functions (@sonmarcho);
* `cfg`-dependent code can be extracted for several targets at once (@sonmarcho);
* Promoted constants are now inlined in the pure micro-passes instead of in LLBC;
* @maximebuyse added non-short-circuiting boolean operators; @EschericHya added `match` on `char`.

**Extraction and tooling**
* Translation runs in parallel by default, with a progress bar and timing diagnostics, and the interpreter is faster (@sonmarcho);
* Name generation and escaping of Lean keywords were improved (@sonmarcho, @oliver-butterley);
* New CLI options: `-max-heartbeats`, `-max-recdepth`, `-feature-gates` and `-warnings-as-errors` (@sonmarcho), `-filter-trait-methods` (@mpenciak), and `-emit-json`, which writes a mapping from Rust to Lean alongside the output (@oliver-butterley);
* Generated comments are now docstrings, including the Rust visibility (@oliver-butterley);
* `#[verify::test]` lets Rust unit tests be translated and checked, and many failures are now recoverable or reported as warnings (@sonmarcho);
* @Nadrieril reworked the internal representation of trait methods and default methods.

**Lean tactics and proofs**
* `progress` was renamed to `step`, with deprecation aliases, and gained `step* n`, names taken from `let`-bindings, and `∃` in post-conditions (@sonmarcho);
* Specifications can be written as Hoare triples `e ⦃ x => P ⦄` (@sonmarcho, @andricicezar);
* `step` discharges preconditions with `grind` (@R1kM, @sonmarcho);
* @mpenciak added post-condition inference and a new `do` elaborator;
* @abentkamp generates `mvcgen` specs from `@[step]` theorems, and allowed divergence for partial correctness;
* @jeprinz added registrable specification predicates with a partial-fixpoint induction tactic, and coinductive ITrees; @andricicezar generalised `step` to registered specifications, let specs register their own discharge tactic, and added generic weakest preconditions for ITrees;
* @sonmarcho added `ring_eq_nf`, `fapply`/`fexact`, `split_disjs` and bit-vector helpers, and extended `bvify`, `simp_scalar` and `simp_lists`;
* @sonmarcho added the `#decompose` command, documented by @mpenciak.

**Standard library models**
* Iterators: slices, arrays, `Vec`s, ranges, `Chars` and `ChunksExact`, and the `StepBy`, `Enumerate`, `Take`, `Rev`, `Map` and `Zip` adapters (@R1kM, @sonmarcho), plus `TakeWhile` and `next_back` for `slice::Iter` (@jmchapman);
* Models are declared with `@[rust_*]` attributes in Lean, from which the extraction tables are generated, which makes adding models much easier (@sonmarcho);
* Many new models: `Option::map`, `Option::is_some_and`, `bool::then` and `Result::unwrap_or` (@tellocam); `Result::map`, `core::array::from_fn`, `div_ceil`, `Vec::is_empty`, `impl Borrow<T> for T` and `IntoIterator for &mut [T; N]` (@oliver-butterley); overflowing arithmetic, `BITS` and `Option` methods (@lotzk); xor and negation (@msprotz); big-endian byte conversions (@remix7531); shift specs (@abentkamp); `is_power_of_two` (@jmchapman);
* The `PartialOrd` and `Ord` models were fixed (@mennanov, @abentkamp, @tellocam); the `alloc` models live in their own folder (@andricicezar), and `Result` has a `Repr` instance (@TitiSkywalker).

**Lean, releases and documentation**
* The Lean toolchain went from v4.19.0 to v4.36.0-rc2 (@R1kM, @oliver-butterley and others);
* The Lean library migrated to the Lean module system (@oliver-butterley, @sonmarcho);
* Prebuilt releases are published on GitHub for Linux and macOS, including a precompiled Lean library (@joshlf, @Nadrieril, @jswrenn);
* There is a documentation landing page and issue templates (@oliver-butterley), a PR template, and skill files for AI agents (@sonmarcho);
* `dune-project` now specifies its dependencies (@LebedevRI), and OCaml 5.2 and 5.3 are supported (@msprotz); plus regular Charon updates and release and nix fixes (@Nadrieril, @N1ark).
