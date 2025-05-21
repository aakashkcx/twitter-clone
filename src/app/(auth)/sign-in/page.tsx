import { SignInForm } from "@/components/forms/sign-in-form";
import { Card, CardTitle } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <Card className="w-full max-w-md self-center">
      <CardTitle className="text-3xl">Sign In</CardTitle>
      <SignInForm />
    </Card>
  );
}
