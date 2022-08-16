# Building Management Webapp 🏢

Manage building with ease

## Preview

To be updated

## Installation

Install dependencies

```bash
  yarn install
```

Run dev server

```bash
  ng serve --o
```

## Build and run with Docker

Build with different environment configuration

```bash
  docker build -t <image-name> . --no-cache --build-arg env=<dev/stag/prod>
```

Run image

```bash
  docker run --name <container-name> -p <port>:80 <image-name>
```

## References

[Angular Command Reference](https://angular.io/cli)\
[Themeisle Illustrations](https://themeisle.com/illustrations/)

## Module List
- [x] Auth
  - [x] Login
  - [x] Resend verification
  - [x] Reset
  - [x] Verify account
- [ ] Dashboard
- [x] Settings
- [ ] Management
  - [x] Units
    - [x] *
    - [x] Detail
    - [x] Configuration
    - [x] Activities
  - [x] Residents
    - [x] *
    - [x] Detail
  - [ ] Parkings
    - [ ] *
    - [ ] Information
  - [ ] Billings
    - [ ] *
    - [ ] Payment
  - [ ] Tickets
    - [x] *
    - [ ] Overview
    - [x] Detail
- [ ] Reporting
- [x] System admin
- [x] About system
- [x] Not authorized