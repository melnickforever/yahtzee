# Security Policy

## Supported Versions

This is a personal hobby project. Only the latest version on `main` is maintained.

| Version | Supported |
| ------- | --------- |
| latest (main) | ✅ |
| older commits | ❌ |

## Reporting a Vulnerability

If you discover a security vulnerability, please **do not open a public GitHub issue**.

Instead, report it privately:

- Open a [GitHub Security Advisory](../../security/advisories/new) in this repository.

Please include:
- A description of the vulnerability
- Steps to reproduce it
- Potential impact
- Any suggested fix (optional)

You can expect an acknowledgement within **7 days**. Given this is a hobby project with no server-side logic and no user data collected, the attack surface is minimal (static Next.js frontend only).

## Scope

This project is a **client-side only** Next.js 14 app with:
- No backend / API routes
- No authentication
- No database
- No user data collection or storage

Security reports related to third-party dependencies (Next.js, React) should be directed to their respective maintainers.

## License

GPL v3 — see [LICENSE](LICENSE).
