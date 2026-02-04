import React from 'react';

/**
 * ProtectedEmail Component
 * 
 * Obfuscates email addresses to prevent scraping while maintaining functionality.
 * Emails are NOT visible in HTML source but work perfectly for users.
 * 
 * @param {string} user - Base64 encoded username part (before @)
 * @param {string} domain - Base64 encoded domain part (after @)
 * @param {string} [subject] - Optional email subject
 * @param {string} [className] - CSS classes for styling
 * @param {React.ReactNode} [children] - Display text (if different from email)
 * @param {object} [style] - Inline styles
 */
export const ProtectedEmail = ({
    user,
    domain,
    subject,
    className = '',
    children,
    style
}) => {
    const handleClick = (e) => {
        e.preventDefault();

        try {
            // Decode email parts
            const username = atob(user);
            const domainName = atob(domain);
            const email = `${username}@${domainName}`;

            // Construct mailto link
            const mailtoLink = subject
                ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
                : `mailto:${email}`;

            // Open email client
            window.location.href = mailtoLink;
        } catch (error) {
            console.error('Failed to decode email:', error);
        }
    };

    // Display email if no children provided
    const displayText = children || (() => {
        try {
            return `${atob(user)}@${atob(domain)}`;
        } catch {
            return 'Email';
        }
    })();

    return (
        <a
            href="#contact"
            onClick={handleClick}
            className={className}
            style={style}
            aria-label="Send email"
        >
            {displayText}
        </a>
    );
};

/**
 * Helper function to encode email for use in ProtectedEmail
 * Usage: getEncodedEmail('sales@roboaiq.in')
 * Returns: { user: 'c2FsZXM=', domain: 'cm9ib2FpcS5pbg==' }
 */
export const encodeEmail = (email) => {
    const [user, domain] = email.split('@');
    return {
        user: btoa(user),
        domain: btoa(domain)
    };
};

// Pre-encoded email addresses for RoboAIQ
export const ROBOAIQ_EMAILS = {
    sales: {
        user: 'c2FsZXM=',              // sales
        domain: 'cm9ib2FpcS5pbg==',     // roboaiq.in
    },
    partnership: {
        user: 'cGFydG5lcnNoaXA=',       // partnership
        domain: 'cm9ib2FpcS5pbg==',     // roboaiq.in
    },
    jobs: {
        user: 'am9icw==',               // jobs
        domain: 'cm9ib2FpcS5pbg==',     // roboaiq.in
    },
    inquiry: {
        user: 'aW5xdWlyeQ==',           // inquiry
        domain: 'cm9ib2FpcS5pbg==',     // roboaiq.in
    },
};

export default ProtectedEmail;
