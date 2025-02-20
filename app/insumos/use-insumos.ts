import { supabase } from "@/lib/supabase";
import { InsumosType } from "@/lib/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type Insumo = {
  id: string | number;
  name: string;
  unit_measure: string;
  qtd_by_unit: number;
  total_units: number;
};

export const useInsumos = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Insumo[]>([]);

  useEffect(() => {
    listInsumos();
  }, []);

  // Listar insumos
  async function listInsumos(): Promise<Insumo[]> {
    setLoading(true);
    const { data, error } = await supabase.from("[JOTA] - Insumos").select("*");
    setLoading(false);

    if (error) {
      toast.error("Erro ao listar insumos");
      throw new Error("Erro ao listar insumos");
    }

    setData(data || []);

    return data || ([] as Insumo[]);
  }

  const refetch = async () => {
    listInsumos();
  };

  async function addInsumo(values: InsumosType): Promise<boolean> {
    setLoading(true);
    const { error } = await supabase.from("[JOTA] - Insumos").insert([values]);
    setLoading(false);

    if (error) {
      toast.error("Erro ao adicionar insumo");
      throw new Error("Erro ao adicionar insumo");
    }

    toast.success("Insumo adicionado com sucesso");
    refetch();
    return true;
  }

  async function deleteInsumo(id: number): Promise<boolean> {
    setLoading(true);
    const { error } = await supabase
      .from("[JOTA] - Insumos")
      .delete()
      .eq("id", id);
    setLoading(false);

    if (error) {
      toast.error("Erro ao deletar insumo");
      throw new Error("Erro ao deletar insumo");
    }

    toast.success("Insumo deletado com sucesso");
    refetch();
    return true;
  }

  return { listInsumos, addInsumo, deleteInsumo, loading, data, refetch };
};
