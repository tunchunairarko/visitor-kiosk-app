---
mode: "agent"
description: "Create a GitHub Actions workflows for testing, building and publishing new release against an auto-generated git tag for the Visitor Kiosk desktop application using Electron and Next.js, styled with Tailwind CSS and Shadcn UI."
---

## GitHub Actions Workflows for Visitor Kiosk App

### Workflow for Testing and Building

Create a GitHub Actions workflow to run tests and test build for the Visitor Kiosk application. This workflow should:
- Trigger on pull requests and pushes to any branch.
- Use Node.js as the runtime environment.
- Install dependencies using `pnpm install`.
- Run tests using `pnpm test`.
```yaml
name: Test
on:
  pull_request:
    branches:
      - '*'
  push:
    branches:
      - '*'
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '22'
        - name: Install dependencies
        run: pnpm install
        - name: Run tests
        run: pnpm test
        - name: Build application
        run: pnpm build
```

### Workflow for Publishing New Release (only when a commit is pushed to the `main` branch and tests pass)

Create a GitHub Actions workflow to publish a new release of the Visitor Kiosk application. We will need to create a release with an Electron build and publish it to GitHub Releases. We need to create release for Windows and Linux platforms. For each platform, there needs to be separate jobs in the workflow, and the application should be built and packaged using Electron Packager or Electron Builder. We need to use different runners for Windows and Linux to ensure compatibility with the respective platforms.

The application should be built and packaged using Electron Packager or Electron Builder, and the release should be tagged with an auto-generated version number based on the commit history.

This workflow should:
- Trigger on pushes to the `main` branch.
- Use Node.js as the runtime environment.
- Install dependencies using `pnpm install`.
- Build the application using `pnpm build`.
- Package the application using Electron Packager or Electron Builder.
- Create a new release on GitHub with the generated build artifacts.

