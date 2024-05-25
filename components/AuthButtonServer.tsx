import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MoveLeft } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";


function LogoutIcon({className}:any) {
  return (
  <Button variant="outline" size="icon" className={cn(className)}>
      <MoveLeft className="h-8 w-8" />
  </Button>
  )
}

/* Hey, {user.email}! You are a {user.user_metadata.role}! */

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      <form action={signOut}>
          <LogoutIcon className=""/>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
