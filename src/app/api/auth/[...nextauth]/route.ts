import { getAuth } from "@/lib/auth";
const { authHandler } = await getAuth();
export { authHandler as GET, authHandler as POST };
