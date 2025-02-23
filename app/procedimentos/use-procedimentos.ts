import { supabase } from "@/lib/supabase";
import {
  AddProcedimentoType,
  ClientType,
  ProcedimentoComInsumosType,
  UserType,
} from "@/lib/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type ProcedimentoControle = {
  id: number;
  date_start: Date;
  date_end: Date;
  procedure_plan: string;
  client_id: number;
  user_id: number;
};

export type ProcedimentoControleList = {
  id: number;
  date_start: Date;
  date_end: Date;
  procedure_plan: string;
  client_id: number;
  user_id: number;
  client: ClientType;
  user: UserType;
  procedimentos: ProcedimentoComInsumosType[];
};

export const useProcedimentos = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProcedimentoControleList[]>([]);

  useEffect(() => {
    listControles();
  }, []);

  // Listar controles de procedimento
  async function listControles(): Promise<ProcedimentoControleList[]> {
    setLoading(true);
    const { data, error } = await supabase
      .from("[JOTA] - Controle")
      .select(
        `*, "client":"[JOTA] - Clientes"(*), "user":"[JOTA] - Users"(*), "procedimentos":"[JOTA] - Procedimentos"(date, title, insumos_usados:"[JOTA] - Insumos usados"(qtd, supply:"[JOTA] - Insumos"(name, unit_measure)))`
      )
      .order("id", { ascending: false });
    setLoading(false);

    if (error) {
      toast.error("Erro ao listar controles de procedimento");
      throw new Error("Erro ao listar controles de procedimento");
    }

    setData(data || []);

    return data || ([] as ProcedimentoControle[]);
  }

  const refetch = async () => {
    listControles();
  };

  async function addControle(
    values: Omit<ProcedimentoControle, "id">
  ): Promise<boolean> {
    setLoading(true);
    const { error } = await supabase.from("[JOTA] - Controle").insert([values]);
    setLoading(false);

    if (error) {
      toast.error("Erro ao adicionar controle");
      throw new Error("Erro ao adicionar controle");
    }

    toast.success("Controle adicionado com sucesso");
    refetch();
    return true;
  }

  async function addProcedimento(values: AddProcedimentoType): Promise<number> {
    setLoading(true);
    const { data, error } = await supabase
      .from("[JOTA] - Procedimentos")
      .insert([values])
      .select("id");
    setLoading(false);

    if (error) {
      toast.error("Erro ao adicionar procedimento");
      throw new Error("Erro ao adicionar procedimento");
    }
    refetch();
    toast.success("Procedimento adicionado com sucesso");
    return data[0].id;
  }

  async function deleteControle(id: number): Promise<boolean> {
    setLoading(true);
    const { error } = await supabase
      .from("[JOTA] - Controle")
      .delete()
      .eq("id", id);
    setLoading(false);

    if (error) {
      toast.error("Erro ao deletar controle");
      throw new Error("Erro ao deletar controle");
    }

    toast.success("Controle deletado com sucesso");
    refetch();
    return true;
  }

  return {
    listControles,
    addControle,
    addProcedimento,
    deleteControle,
    loading,
    data,
    refetch,
  };
};
