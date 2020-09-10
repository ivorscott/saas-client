import { IdentityPayload, User } from "./types";

export function transform(user: IdentityPayload): Partial<User> {
  return {
    auth0Id: user.sub,
    email: user.email,
    emailVerified: user.email_verified,
    firstName: user.given_name || user.nickname,
    lastName: user.family_name || "",
    picture: user.picture || "",
    locale: user.locale || "",
  };
}
