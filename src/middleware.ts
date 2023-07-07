// Due to the runtimes in current deployment, we only do a subset of proper auth
// middleware work here. In particular, we'll still read and write users
// downstream from middleware for now.
// https://next-auth.js.org/configuration/nextjs#caveats
export { default } from "next-auth/middleware";
export const config = { matcher: ["/progress"] };
