// import { createClient } from "@/lib/supabase/server";
import { ProcedimentosTemplate } from "./procedimentos/procedimentos-template";

export default async function Home() {
  return <ProcedimentosTemplate />;
}
