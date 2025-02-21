import { supabase } from "@/lib/supabase";
import { InsumosType } from "@/lib/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useInsumos = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<InsumosType[]>([]);

  useEffect(() => {
    listInsumos();
  }, []);

  // Listar insumos
  async function listInsumos(): Promise<InsumosType[]> {
    setLoading(true);
    const { data, error } = await supabase.from("[JOTA] - Insumos").select("*");
    setLoading(false);

    if (error) {
      toast.error("Erro ao listar insumos");
      throw new Error("Erro ao listar insumos");
    }

    setData(data || []);

    return data || ([] as InsumosType[]);
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

  async function incrementInsumo(
    insumo: InsumosType,
    qtd: number
  ): Promise<boolean> {
    setLoading(true);

    const totalAvailable =
      insumo.total_available === null
        ? null
        : insumo.total_available + qtd * insumo.qtd_by_unit;

    const totalUnits = insumo.total_units + qtd;

    const { error } = await supabase
      .from("[JOTA] - Insumos")
      .update({ total_units: totalUnits, total_available: totalAvailable })
      .eq("id", insumo.id);
    setLoading(false);

    if (error) {
      toast.error("Erro ao incrementar insumo");
      throw new Error("Erro ao incrementar insumo");
    }

    toast.success("Qtd. de unidades do Insumo incrementado com sucesso");
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

  return {
    listInsumos,
    addInsumo,
    deleteInsumo,
    incrementInsumo,
    loading,
    data,
    refetch,
  };
};
