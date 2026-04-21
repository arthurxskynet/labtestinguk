import { AuthChrome } from "@/components/layout/auth-chrome";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthChrome>{children}</AuthChrome>;
}
