import DeployButton from "../../components/DeployButton";
import AuthButton from "../../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";

export default async function Index() {
  const supabase = createClient();
  const { data: notes } = await supabase.from("notes").select();

  const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/healthchecker`);
  const more_data = await data.json();
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <DeployButton />
          <AuthButton />
        </div>
      </nav>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
      <pre>{JSON.stringify(more_data)}</pre>
    </div>
  );
}
