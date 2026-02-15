# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of our URL Shortener project seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via:
- Opening a private security advisory on GitHub
- Or emailing the maintainers directly

You should receive a response within 48 hours. If for some reason you do not, please follow up to ensure we received your original message.

Please include the requested information listed below (as much as you can provide) to help us better understand the nature and scope of the possible issue:

* Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
* Full paths of source file(s) related to the manifestation of the issue
* The location of the affected source code (tag/branch/commit or direct URL)
* Any special configuration required to reproduce the issue
* Step-by-step instructions to reproduce the issue
* Proof-of-concept or exploit code (if possible)
* Impact of the issue, including how an attacker might exploit it

## Security Best Practices

When deploying this application in production, please follow these security guidelines:

### Environment Variables
- Never commit `.env` files to version control
- Use strong, unique passwords for MongoDB
- Rotate credentials regularly
- Use environment-specific configurations

### Docker Security
- Always use the provided Dockerfile (runs as non-root user)
- Keep base images updated
- Scan images for vulnerabilities regularly
- Use Docker secrets in production

### MongoDB Security
- Use MongoDB Atlas with IP whitelisting
- Enable authentication and authorization
- Use encrypted connections (TLS/SSL)
- Regular backups
- Apply principle of least privilege for database users

### Application Security
- Keep dependencies updated (`npm audit` regularly)
- Use HTTPS in production
- Implement rate limiting for API endpoints
- Validate and sanitize all user inputs
- Set secure HTTP headers (already implemented with Helmet.js)

### Network Security
- Use firewalls to restrict access
- Implement proper CORS policies
- Use reverse proxy (nginx/Apache) in production
- Enable HTTPS/SSL certificates

## Security Features

Our application includes:

- ✅ **Helmet.js** - Sets secure HTTP headers
- ✅ **CORS Protection** - Configurable cross-origin policies
- ✅ **Input Validation** - Both client and server-side
- ✅ **URL Sanitization** - Prevents malicious URLs
- ✅ **Environment Variables** - Secure credential management
- ✅ **Non-root Docker User** - Runs with limited privileges
- ✅ **Health Checks** - Container monitoring

## Known Security Considerations

### URL Validation
The application validates URLs before shortening, but users should still be cautious about where shortened links lead.

### Rate Limiting
Consider implementing rate limiting in production to prevent abuse.

### Link Scanning
Consider integrating URL scanning services for additional security.

## Updates and Notifications

Security updates will be released as soon as possible after a vulnerability is confirmed. Watch this repository for security advisories.

## Contact

For any security concerns or questions, please reach out to the project maintainers.

---

Thank you for helping keep our project and users safe! 🔒
