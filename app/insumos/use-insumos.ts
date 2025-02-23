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

  async function addInsumosUsados(
    insumos: InsumosType[],
    values: {
      procedure_id: number;
      control_id: number;
      client_id: number;
      user_id: number;
      supplies: { supply_id: number; qtd: number }[];
    }
  ) {
    setLoading(true);

    const requests = values.supplies.map(async (item) => {
      const insumo = insumos.find((i) => i.id === item.supply_id);

      if (!insumo) {
        return;
      }

      const insumoTotalAvailable =
        insumo.total_available || insumo.qtd_by_unit * insumo.total_units;
      let insumoNewTotal = insumoTotalAvailable - Number(item.qtd);
      insumoNewTotal = insumoNewTotal < 0 ? 0 : insumoNewTotal;

      const insumoNewTotalUnits = Math.ceil(
        insumoNewTotal / insumo.qtd_by_unit
      );

      const { error: insumoUpdateError } = await supabase
        .from("[JOTA] - Insumos")
        .update({
          total_available: insumoNewTotal,
          total_units: insumoNewTotalUnits,
        })
        .eq("id", insumo.id);

      if (insumoUpdateError) {
        toast.error("Erro ao atualizar insumo");
        throw new Error("Erro ao atualizar insumo");
      }

      const { error } = await supabase.from("[JOTA] - Insumos usados").insert({
        supply_id: item.supply_id,
        control_id: values.control_id,
        procedure_id: values.procedure_id,
        client_id: values.client_id,
        user_id: values.user_id,
        qtd: Number(item.qtd),
      });

      if (error) {
        toast.error("Erro ao adicionar insumo usado");
        throw new Error("Erro ao adicionar insumo usado");
      }
    });

    await Promise.all(requests);
    setLoading(false);
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
    addInsumosUsados,
    deleteInsumo,
    incrementInsumo,
    loading,
    data,
    refetch,
  };
};
