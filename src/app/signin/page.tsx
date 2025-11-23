import SignInClient from "./sign-in-client";

export const dynamic = "force-dynamic";

type SignInSearch = {
  callbackUrl?: string;
  error?: string;
};

export default function SignInPage({
  searchParams,
}: {
  searchParams?: SignInSearch;
}) {
  const callbackUrl = searchParams?.callbackUrl ?? "/dashboard";
  const error = searchParams?.error ?? null;

  return <SignInClient callbackUrl={callbackUrl} error={error} />;
}