<div align="center">

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=tool-belt_type-predicates&metric=coverage)](https://sonarcloud.io/summary/new_code?id=tool-belt_type-predicates)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=tool-belt_type-predicates&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=tool-belt_type-predicates)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=tool-belt_type-predicates&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=tool-belt_type-predicates)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=tool-belt_type-predicates&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=tool-belt_type-predicates)

</div>

# @tool-belt/type-predicates

## Installation

```bash
npm install @tool-belt/type-predicates
```

## Contents

This package includes the following:

- a comprehensive collection of performant and flexible type-guards, that can function as a drop-in replacement for
  the type-guards included in the NodeJS builtin `utils/types` module - with better significantly typing.
- a comprehensive collection of type assertions covering all type-guards included in the package.
- `isUnion`, `createTypeGuard` and `createTypeAssertion` utilities for the composition of type-guards and assertions.
- supports ES modules and tree shaking, i.e., works great with module bundlers such as Webpack for the browser.

See the [docs](https://tool-belt.github.io/type-predicates/) for details.
