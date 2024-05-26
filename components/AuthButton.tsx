"use client";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthButton() {
  const supabase = createClient();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (supabase) {
      const { user }: any = supabase.auth.getUser();
      setUser(user);
    }
  }, []);

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut}>
        <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2 bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="bg-black dark:bg-white dark:hover:bg-blue-400 duration-300 rounded-full w-fit text-white dark:text-black px-4 py-2 bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
