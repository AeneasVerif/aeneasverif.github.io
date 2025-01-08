---
layout: post
title:  "Aeneas-news: December 2024"
date:   2024-12-02 14:43:29 +0100
categories: newsletter
---
New year's resolution, early! We will be posting monthly updates on the Aeneas project at large, to better communicate with our users, share key parts of our roadmap, and generally gather feedback and thoughts on where the project is headed.

## Charon (Rust compiler driver)
Most of the recent action happened on Charon, where we added tons of support for new Rust features. In addition to paving the way for a wider support of Rust in Aeneas, we also expect this to be valuable independently of Aeneas, e.g., to develop novel tools and analyses for Rust. Highlights include:
* Support for quantified clauses
* Support for unsafe code
* Support for type aliases
* Better error handling for unsupported features
* Performance improvements, particularly for code using typenum
* Usability improvements, e.g., preserving Rust comments throughout Charon

This streak of work culminated in a paper submission currently on arXiv. With these additions, we are now able to successfully run Charon on many existing Rust crates.

Our plan is to stabilize features in Charon, and continue to make the tool generally useful (we heard of potentially more interested users).

## Eurydice (Rust to C compiler)
Eurydice consumes the output of Charon and provides an escape hatch for people who want to author Rust, and get memory safety (and possibly verification with Aeneas), while still needing to produce C. Eurydice was recently used to extract libcrux's [ML-KEM implementation](https://github.com/cryspen/libcrux/tree/main/libcrux-ml-kem/c), developed by [Cryspen](https://cryspen.com/). This C code has now made it into Google's BoringSSL, Mozilla Firefox, OpenSSH, and more.

Recent improvements include bugfixes, improved support for traits, retaining inline comments, and more.

The plan is to continue to develop features in Eurydice as needed by downstream consumers; for now, libcrux is the chief user of Eurydice, and we expect more work to happen on libcrux starts extracting their ML-DSA implementation to C via Eurydice, too.

## Aeneas (Rust verification)
Aeneas is the chief consumer of Charon, and allows verifying Rust programs via a functional translation. The past several months have been busy with Son (main developer of Aeneas) writing his PhD dissertation, doing tutorials, and generally working on Charon to lay the groundwork for more features in Aeneas.

A list of improvements have still made it into Aeneas, with the following highlights:
* An experimental -borrow-check attribute which allows borrow-checking code without generating a pure model; doing so relaxes some constraints which are required by the pure translation
* The use of implicit parameters in the generated code whenever possible
* Backward functions now can't fail (they don't use the Result type)
* More definitions in the standard libraries for the different backends
* Bug fixes and improvements for scalar_tac and the progress tactics in Lean, which include the scalar_tac attribute to indicate theorems which have to be automatically applied byscalar_tac
* Various bug fixes and improvements of the generated output

Son recently joined Microsoft Azure Research, with a mandate to work on verifying Microsoft code with Aeneas, using the Lean backend. Expect to see numerous tooling improvements landing at a rapid clip as the (friendly) pressure builds up on Aeneas to support more features. It goes without saying that the entirety of the tooling will remain open-source.

That's it for now, we are happy to engage the [Aeneas Zulip](https://aeneas-verif.zulipchat.com/), and we will be using Zulip as the main communication channel for future updates!
