---
layout: post
title:  "Aeneas-news: January 2025"
date:   2025-01-07 11:13:29 +0100
categories: newsletter
---
A very short update to open the new year, since development slowed down in December for the holidays. We wish everyone a happy 2025!

## General + roadmap:
* Son Ho successfully defended his PhD. Congratulations, Son!
* 2025 goal: a website for the whole project, with a blog to better communicate with our users, proper pointers to documentation, etc.
* 2025 goal: official alpha release of Charon (see our [preprint](https://arxiv.org/abs/2410.18042))

## Charon (Rust compiler driver):
* charon-lib no longer depends on rustc internals, meaning charon now builds like a normal crate (although it still requires a nightly compiler toolchain)
* lots of groundwork to prepare upcoming features, such as an enhanced representation of binders in types in order to support associated types
* fixes to control-flow reconstruction

## Aeneas (Rust verification):
* support for borrows within ADTs
* improvements to error messages

## Eurydice (Rust to C compiler):
* support for associated constants
* honor custom values for enums
* peephole optimizations to generate better-quality code, notably around loops
* support for struct-tuples
* numerous bugfixes
