import { getSession, requireAuth } from "@/lib/auth";

export type ChatGPTUser = {
  userId: string;
  email: string;
  displayName: string;
  fullName: string | null;
};

export async function getChatGPTUser(): Promise<ChatGPTUser | null> {
  const session = await getSession();
  if (!session) return null;
  return {
    userId: "admin",
    email: session.email,
    displayName: session.email,
    fullName: null,
  };
}

export function chatGPTSignInPath(returnTo: string = "/admin") {
  return `/admin/login?returnTo=${encodeURIComponent(returnTo)}`;
}

export function chatGPTSignOutPath() {
  return "/admin/logout";
}

export async function requireChatGPTUser(returnTo: string = "/admin") {
  await requireAuth(returnTo);
  return await getChatGPTUser();
}
