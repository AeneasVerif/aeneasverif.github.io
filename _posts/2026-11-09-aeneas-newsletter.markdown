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

Aeneas has also been used to verify more and more projects, including: 
- Microsoft's Rust cryptography in [SymCrypt](https://www.microsoft.com/en-us/research/blog/verifying-rust-cryptography-in-symcrypt-from-standards-to-code/), 
- The Signal protocol and its Rust implementation ([Signal Shot](https://leodemoura.github.io/blog/2026-4-20-signal-shot-the-platform-is-ready/)),
- A new Lean kernel written in Rust [con-ron](https://leodemoura.github.io/blog/2026-10-15-lean-now-ships-with-verified-kernels/). 

Charon reached a milestone in June 2026: it can now
[translate the entire Rust standard library](https://github.com/AeneasVerif/charon/issues/863)
(`core`, `alloc` and `std`), with only `async` code still unsupported. Charon has
also become dramatically faster over the past year, and its performance is now
[benchmarked on every commit](https://aeneasverif.github.io/charon/bench/).

From now on we'll go back to monthly updates. This issue covers October and the
first week of November 2026.

## Charon
* @Nadrieril added a translation from Charon's output to MiniRust, and improved MiniRust support;
* @Nadrieril added translation of the contents of inline `asm` blocks;
* @N1ark added `rustc_const_uneval`, which keeps constants unevaluated where possible; with it came support for `TypeId` and `VTable` provenance, nested statics, `#[linkage]` statics, provenance-less wide pointers and projections in constant references;
* @N1ark added more target information: target parsing, target families, `repr(simd)`, union padding and linker magic;
* Higher-ranked and lifetime handling was reworked: higher-kinded clauses are now instantiated, `Region::Lub` replaces type-outlives predicates, inferred lifetimes from typeck are plumbed through correctly, and the mutability of locals is tracked (@Nadrieril);
* Reads are now distinguished from copies, and user type annotations have a new representation (@Nadrieril);
* Mono mode now avoids polymorphic items as much as possible, and keeps closure bodies called by opaque code (@port8080);
* New options and commands: `--no-code-duplication` (@port8080), `charon print-sysroot` (@N1ark), and rerunning cargo for selected crates only while keeping dependencies cached (@youknowone);
* Charon-ML is faster and now supports hashing (@N1ark);
* @Opale is now listed among the crate authors;
* Various improvements and bug fixes, including fixes for `vec!` with repeated elements, ordering of associated-constant initializers (@MantasBaksys), `--dest-file`/`--dest-dir` under cargo (@G26karthik), and a faster CI.

## Aeneas
* @sonmarcho added support for the `'static` region, and fixed several cases of the symbolic evaluation that were previously unsupported;
* Promoted constants are now inlined in the pure micro-passes instead of in LLBC;
* @andricicezar extracted type parameters as `Type _` in Lean, let specs register their own discharge tactic, and added generic weakest preconditions for ITrees;
* The Lean toolchain was updated to v4.35.0 and then to v4.36 rc2;
* The standard library models keep growing: `Option::map`, `Option::is_some_and`, `bool::then` and `Result::unwrap_or` (@tellocam); `Result::map`, `core::array::from_fn`, `div_ceil`, `Vec::is_empty`, the blanket `impl Borrow<T> for T` and `IntoIterator for &mut [T; N]` (@oliver-butterley); the `TakeWhile` adapter and `next_back` for `slice::Iter` (@jmchapman);
* The `alloc` models now live in their own folder (@andricicezar), and `Result` has a `Repr` instance (@TitiSkywalker);
* `dune-project` now specifies its dependencies (@LebedevRI), and several release and nix fixes landed (@Nadrieril, @N1ark).
<!-- Optional, if merged before publication: "The Lean toolchain was updated to v4.36.0-rc2, following Mathlib's change of `Set` into a structure." -->
