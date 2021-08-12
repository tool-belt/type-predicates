![Tests](https://github.com/tool-belt/type-predicates/actions/workflows/main.yaml/badge.svg)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=tool-belt_type-guards&metric=coverage)](https://sonarcloud.io/dashboard?id=tool-belt_type-guards)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=tool-belt_type-guards&metric=alert_status)](https://sonarcloud.io/dashboard?id=tool-belt_type-guards)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=tool-belt_type-guards&metric=security_rating)](https://sonarcloud.io/dashboard?id=tool-belt_type-guards)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=tool-belt_type-guards&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=tool-belt_type-guards)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=tool-belt_type-guards&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=tool-belt_type-guards)

# @tool-belt/type-predicates

## Installation

```bash
npm install @tool-belt/type-predicates
```

Or

```bash
yarn add @tool-belt/type-predicates
```

## Contents

This package includes the following:

- a comprehensive collection of performant and flexible type-guards, that can function as a drop-in replacement for 
  the type-guards included in the NodeJS builtin `utils/types` module - with better significantly typing.
- a comprehensive collection of type assertions covering all type-guards included in the package.
- `isUnion`, `createTypeGuard` and `createTypeAssertion` utilities for the composition of type-guards and assertions.
- supports ES modules and tree shaking, i.e., works great with module bundlers such as Webpack for the browser.

See the [docs](https://tool-belt.github.io/type-predicates/) for details.
