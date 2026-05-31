# Semantic versioning in JavaScript

Most JavaScript projects follow **Semantic Versioning (SemVer)**, which uses the format:

```text
MAJOR.MINOR.PATCH
```

For example:

```text
2.5.13
│ │  └── PATCH
│ └───── MINOR
└─────── MAJOR
```

## PATCH (`x.x.PATCH`)

Increase the patch version when you make **backward-compatible bug fixes**.

Examples:

- Fix a typo.
- Fix a broken form validation.
- Fix a performance issue.
- Fix a UI bug.

```text
1.0.0 → 1.0.1
1.0.1 → 1.0.2
```

The application behaves essentially the same from the user's perspective; you're just correcting problems.

---

## MINOR (`x.MINOR.x`)

Increase the minor version when you add **new functionality** without breaking existing functionality.

Examples:

- Add a dark mode.
- Add a new dashboard page.
- Add a search feature.
- Add support for exporting data.

```text
1.0.5 → 1.1.0
1.1.0 → 1.2.0
```

Notice that when the minor version increases, the patch version resets to `0`.

---

## MAJOR (`MAJOR.x.x`)

Increase the major version when you make **breaking changes**.

Examples:

- Remove a feature that users depend on.
- Change an API in a way that existing consumers must modify their code.
- Redesign the application's behavior so existing integrations stop working.

```text
1.9.4 → 2.0.0
2.3.7 → 3.0.0
```

When the major version increases, both minor and patch reset to `0`.

---

## Examples for a React application

Imagine you're building an e-commerce site:

| Change                                          | New Version |
| ----------------------------------------------- | ----------- |
| Initial release                                 | `1.0.0`     |
| Fix checkout bug                                | `1.0.1`     |
| Fix product filtering bug                       | `1.0.2`     |
| Add wishlist feature                            | `1.1.0`     |
| Add multilingual support                        | `1.2.0`     |
| Replace the public API with an incompatible one | `2.0.0`     |

---

## Pre-release versions

During development you may see:

```text
1.2.0-alpha.1
1.2.0-beta.1
1.2.0-rc.1
```

Common meanings:

- **alpha** → early development, unstable
- **beta** → feature complete, testing phase
- **rc** (Release Candidate) → expected final version unless bugs are found

Example:

```text
1.3.0-alpha.1
1.3.0-alpha.2
1.3.0-beta.1
1.3.0-rc.1
1.3.0
```

---

## For personal projects

Many solo developers use a simplified rule:

- New feature → increment **MINOR**
- Bug fix → increment **PATCH**
- Major redesign or breaking change → increment **MAJOR**

For example:

```text
0.1.0  Initial project
0.2.0  Added authentication
0.3.0  Added shopping cart
0.3.1  Fixed cart bug
0.3.2  Fixed login bug
1.0.0  First stable public release
```

A version beginning with `0` usually indicates that the project is still in active development and the API or behavior may change significantly. Once you consider the project stable and ready for users, it's common to release `1.0.0`.
