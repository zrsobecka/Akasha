# Security policy

Akasha is an early local-first desktop project. There are no supported public binaries or security-maintenance guarantees yet.

## Report a vulnerability

Do not include secrets, private profiles, exploit details, or other sensitive data in a public issue. Use GitHub's private vulnerability reporting feature when it is available. Otherwise, open a minimal issue asking the maintainer to establish a private reporting channel before sharing details.

Include the affected version or commit, operating system, impact, reproduction outline, and any safe remediation ideas. Use synthetic data in demonstrations.

## Security boundaries

- User records live in WebView local storage and are not encrypted by Akasha.
- The native layer communicates only with LM Studio on `127.0.0.1:1234` in the current implementation.
- LM Studio responses are untrusted and must pass frontend validation.
- Tauri capabilities should remain narrow; new filesystem, shell, network, or process permissions require explicit review and documentation.
- Dependencies, generated installers, and unsigned executables are part of the trust boundary and require verification before distribution.

## Repository hygiene

Never commit environment files, credentials, keys, cookies, sessions, databases, exports, real profiles, contact lists, logs, recordings, or screenshots containing private information. The ignore rules are a guardrail, not a substitute for reviewing every change before publication.
