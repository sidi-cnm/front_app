// app/signin/page.tsx
import SignInClient from "./sign-in-client";

export const dynamic = "force-dynamic";

type SignInSearch = {
  callbackUrl?: string;
  error?: string;
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<SignInSearch>;
}) {
  const sp = await searchParams;
  const callbackUrl = sp?.callbackUrl ?? "/dashboard";
  const error = sp?.error ?? null;

  return <SignInClient callbackUrl={callbackUrl} error={error} />;
}
