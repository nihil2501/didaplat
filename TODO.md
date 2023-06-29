* consider auth strategy of rewrite in middleware
  * https://github.com/chronark/unkey/blob/main/apps/web/middleware.ts
  * https://nextjs.org/docs/app/api-reference/components/link#middleware
  * https://next-auth.js.org/configuration/nextjs#middleware
  * also consider (ideal?) use case:
    * nav to /progress
    * opens login dialog (reiterating attempted action that needs it [progress])
      * https://ui.shadcn.com/docs/components/dialog
* think through client-side caching of dynamically rendered server components
  * https://github.com/vercel/next.js/issues/42991
  * https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#client-side-caching-of-rendered-server-components
  * https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#conditions-for-soft-navigation
  * https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#dynamic-functions