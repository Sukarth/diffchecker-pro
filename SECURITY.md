# Security Policy

## Supported Versions

We actively support the following versions of Diff Checker Pro with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| 1.x.x   | :x:                |

## Security Considerations

Diff Checker Pro is a client-side application that runs entirely in your browser. Here are the key security aspects:

### Data Privacy
- **No server communication**: All data processing happens locally in your browser
- **No data storage**: Files and text are not stored on any external servers
- **Local storage only**: Settings are saved only in your browser's local storage
- **No analytics**: We don't track or collect any user data

### File Processing
- **Client-side only**: Files are processed entirely in your browser
- **Memory-based**: File contents are held in memory temporarily
- **No uploads**: Files are never uploaded to external servers
- **Same-origin policy**: Follows browser security guidelines

### URL Sharing
- **Encoded data**: Shared URLs contain base64-encoded comparison data
- **No external storage**: Shared data is embedded in the URL itself
- **Voluntary sharing**: Data is only shared when explicitly requested by the user

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

### For Security Issues
**DO NOT** create a public GitHub issue for security vulnerabilities.

Instead, please:

1. **Email directly**: Send details to the maintainer (create a private issue or discussion)
2. **Include details**: Provide a clear description of the vulnerability
3. **Provide steps**: Include steps to reproduce the issue
4. **Be patient**: Allow reasonable time for investigation and resolution

### What to Include
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Suggested fix (if you have one)
- Your contact information for follow-up

### Response Timeline
- **Acknowledgment**: Within 48 hours
- **Initial assessment**: Within 1 week
- **Resolution timeline**: Provided after assessment
- **Public disclosure**: After fix is implemented and deployed

## Security Best Practices for Users

### When Using Diff Checker Pro
- **Sensitive data**: Be cautious when comparing files with sensitive information
- **Public computers**: Clear browser data after use on shared computers
- **URL sharing**: Be aware that shared URLs contain your comparison data
- **Browser security**: Keep your browser updated for best security

### Recommended Practices
- Use on trusted devices and networks
- Don't share URLs containing sensitive information
- Clear browser cache/data if using on public computers
- Report any suspicious behavior immediately

## Security Features

### Current Security Measures
- **Client-side processing**: No data leaves your device
- **HTTPS recommended**: Use HTTPS when hosting
- **No external dependencies**: Minimal external library usage
- **Content Security Policy**: Implements CSP headers when possible
- **Input validation**: Proper handling of user inputs
- **XSS prevention**: Careful handling of dynamic content

### Browser Security
- **Same-origin policy**: Follows browser security guidelines
- **Local storage**: Uses browser's secure local storage APIs
- **File API**: Uses browser's secure File API for file reading
- **Clipboard API**: Uses secure Clipboard API for copy functionality

## Acknowledgments

We appreciate security researchers and users who help us maintain the security of Diff Checker Pro. Responsible disclosure helps us improve the tool for everyone.

### Hall of Fame
Contributors who have helped improve security will be acknowledged here (with their permission).

## Questions?

If you have questions about this security policy:
- Create a [discussion](https://github.com/Sukarth/diffchecker-pro/discussions)
- Check our [FAQ](https://github.com/Sukarth/diffchecker-pro#faq) in the README
- Review our [documentation](https://github.com/Sukarth/diffchecker-pro)

---

*This security policy is effective as of January 24, 2025, and may be updated as needed.*
