export interface UserMetadata {
    iss: string; // Issuer URL, always present.
    sub: string; // Subject (unique user ID), always present.
    name: string | null; // Display name, can be null if not set.
    email: string | null; // Email address, can be null if private.
    full_name: string | null; // Full name, can be null if not set.
    user_name: string | null; // Username, can be null if not set.
    avatar_url: string | null; // Avatar URL, can be null if no avatar.
    provider_id: string; // Provider ID, same as 'sub', always present.
    email_verified: boolean; // True if email is verified.
    phone_verified: boolean | null; // Can be null if phone verification is not applicable.
    preferred_username: string | null; // Preferred username, can be null if not set.
}
