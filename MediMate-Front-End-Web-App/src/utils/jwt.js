/**
 * Utility function to decode a JWT payload from a full encoded token string
 *
 * @param {string} token
 * @returns the decoded payload of the JWT, or null if invalid
 */

export function getJwtPayload(token) {
  try {
    const base64 = token.split('.')[1];
    const tokenJson = atob(base64.replace(/-/, '+').replace(/_/, '/'));
    return JSON.parse(tokenJson);
  } catch {
    return null;
  }
}
