// app/page.tsx
import { redirect } from "next/navigation";

export default function Root() {
  redirect("/signin"); // or "/auth/signin" if that’s your path
}
