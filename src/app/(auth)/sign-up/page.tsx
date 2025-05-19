import { SignUpForm } from "@/components/auth/sign-up-form";
import { Card, CardTitle } from "@/components/ui/card";

export default function SignUpPage() {
  return (
    <Card className="w-full max-w-md self-center">
      <CardTitle className="text-3xl">Sign Up</CardTitle>
      <SignUpForm />
    </Card>
  );
}
