export type SocialName = "twitter" | "pinterest" | "instagram" | "youtube" | "facebook" | "github";

export type SocialLink = { name: SocialName; url: string };

export function SocialIcon({ name, className = "h-4 w-4" }: { name: SocialName; className?: string }) {
    switch (name) {
        case "twitter":
            return (
                <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
                    <path d="M23 4.6a9.4 9.4 0 0 1-2.7.7 4.7 4.7 0 0 0 2-2.6 9.4 9.4 0 0 1-3 1.2 4.7 4.7 0 0 0-8 4.3A13.3 13.3 0 0 1 1.6 3.2a4.7 4.7 0 0 0 1.5 6.3 4.7 4.7 0 0 1-2.1-.6v.1a4.7 4.7 0 0 0 3.8 4.6 4.7 4.7 0 0 1-2.1.1 4.7 4.7 0 0 0 4.4 3.2A9.4 9.4 0 0 1 0 18.9a13.3 13.3 0 0 0 7.2 2.1c8.6 0 13.4-7.2 13.4-13.4v-.6A9.6 9.6 0 0 0 23 4.6z" />
                </svg>
            );
        case "pinterest":
            return (
                <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
                    <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.3-5.4s-.3-.7-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.6-.3 1.1.5 2 1.6 2 1.9 0 3.4-2 3.4-4.9 0-2.6-1.9-4.4-4.5-4.4-3.1 0-4.9 2.3-4.9 4.7 0 .9.4 1.9.8 2.5.1.1.1.2.1.3l-.3 1.2c0 .2-.2.3-.4.2-1.4-.6-2.2-2.6-2.2-4.2 0-3.4 2.5-6.6 7.2-6.6 3.8 0 6.7 2.7 6.7 6.3 0 3.8-2.4 6.8-5.7 6.8-1.1 0-2.2-.6-2.5-1.3l-.7 2.6c-.2.9-.9 2.1-1.4 2.8A10 10 0 1 0 12 2z" />
                </svg>
            );
        case "instagram":
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className} aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                </svg>
            );
        case "youtube":
            return (
                <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
                    <path d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 4.8 2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-4.8zM9.8 15.1V8.9l5.6 3.1z" />
                </svg>
            );
        case "facebook":
            return (
                <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
                    <path d="M14 8h3V4h-3c-2.8 0-4.5 1.7-4.5 4.5V11H7v4h2.5v9h4v-9H17l.5-4h-4V8.8c0-.5.3-.8.5-.8z" />
                </svg>
            );
        case "github":
            return (
                <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
                    <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
                </svg>
            );
    }
}