// Only accessible for logged in users
export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/trips",
        "/reservation",
        "/properties",
        "/favorites",
    ]
}