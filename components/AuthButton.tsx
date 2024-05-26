"use client";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthButton() {
  const supabase = createClient();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // useEffect(() => {
  //   console.log("session", session);
  // }, [session]);
  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  // session?.user
  return false ? (
    <div className="flex items-center gap-4">
      Hey, {session.user.email}!
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
