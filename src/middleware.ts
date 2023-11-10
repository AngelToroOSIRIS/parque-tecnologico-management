export { default } from "next-auth/middleware"

export const config = { matcher: ["/", "/categories/:path*", "/sites/:path*", "/financial/:path*", "/users/:path*"]}