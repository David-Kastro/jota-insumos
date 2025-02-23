"use client";

import { Button } from "@/components/ui/button";
import { List, Plus, Syringe } from "lucide-react";
import {
  ProcedimentoControle,
  ProcedimentoControleList,
  useProcedimentos,
} from "./use-procedimentos";
import { useState } from "react";
import { AddControleDialog } from "./add-controle-dialog";
import { AddProcedimentoDialog } from "./add-procedimento-dialog";
import { useInsumos } from "../insumos/use-insumos";
import { AddProcedimentoType } from "@/lib/types";
import { ProcedimentoFormData } from "./procedure-form";
import { ListProcedimentosDialog } from "./list-procedimentos-dialog";
import { formatData } from "@/lib/utils";

export function ProcedimentosTemplate() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcedimentoModalOpen, setIsProcedimentoModalOpen] = useState(false);
  const [isProcedimentoListModalOpen, setIsProcedimentoListModalOpen] =
    useState(false);
  const [selectedProcedimento, setSelectedProcedimento] =
    useState<ProcedimentoControleList | null>(null);
  const { data, addControle, addProcedimento, loading } = useProcedimentos();
  const { data: insumos, addInsumosUsados } = useInsumos();

  const handleCreateControl = async (
    values: Omit<ProcedimentoControle, "id">
  ) => {
    const added = await addControle(values);
    if (added) {
      setIsModalOpen(false);
    }
  };

  const handleAddProcedimento = (item: ProcedimentoControleList) => () => {
    setSelectedProcedimento(item);
    setIsProcedimentoModalOpen(true);
  };

  const handleCreateProcedimento = async (values: ProcedimentoFormData) => {
    if (!selectedProcedimento) {
      return;
    }

    const { title, date, supplies } = values;

    const procedimentoData: AddProcedimentoType = {
      title,
      date,
      control_id: selectedProcedimento.id,
    };

    const newProcedureId = await addProcedimento(procedimentoData);

    if (!newProcedureId) {
      return;
    }

    const insumosData = {
      procedure_id: newProcedureId,
      control_id: selectedProcedimento.id,
      user_id: selectedProcedimento.user_id,
      client_id: selectedProcedimento.client_id,
      supplies,
    };

    if (insumos && supplies.length > 0) {
      const added = await addInsumosUsados(insumos, insumosData);
      if (!added) {
        return;
      }
    }
    setIsModalOpen(false);
  };

  // const handleDeleteProcedimento = (id: number) => {
  //   deleteControle(id);
  // };

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        <div className="w-[180px] h-8 rounded-lg bg-muted/75 animate-pulse" />
        <div className="w-[180px] h-10 rounded-lg bg-muted/75 animate-pulse" />
        <div className="grid auto-rows-min gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="aspect-square rounded-xl bg-muted/75 animate-pulse" />
          <div className="aspect-square rounded-xl bg-muted/75 animate-pulse" />
          <div className="aspect-square rounded-xl bg-muted/75 animate-pulse" />
          <div className="aspect-square rounded-xl bg-muted/75 animate-pulse" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/75 md:min-h-min" />
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-medium">Procedimentos</h1>
      <div className="w-full flex">
        <Button variant="outline" onClick={() => setIsModalOpen(true)}>
          <Plus />
          Adicionar controle
        </Button>
      </div>

      <div className="grid auto-rows-min gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="lg:aspect-video rounded-xl bg-background dark:border dark:border-border shadow-lg dark:shadow-none p-4 flex flex-col gap-4 justify-between"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-[2px]">
                <h2 className=" text-2xl font-medium">{item.client.name}</h2>
                <p className=" text-sm text-muted-foreground">
                  Médico: <strong>{item.user.name}</strong>
                </p>
                <p className="text-sm text-muted-foreground inline">
                  Status:{" "}
                  {String(item.date_end) < new Date().toISOString() ? (
                    <span className=" bg-secondary p-1 rounded-sm w-fit">
                      Finalizado
                    </span>
                  ) : (
                    <span className=" bg-green-600 p-1 rounded-sm w-fit text-white">
                      Em andamento
                    </span>
                  )}
                </p>
                <p className=" text-sm text-muted-foreground">
                  Período:{" "}
                  <strong>
                    {formatData(item.date_start)} até{" "}
                    {formatData(item.date_end)}
                  </strong>
                </p>
                <p className=" text-sm text-muted-foreground">
                  Procedimentos realizados:{" "}
                  <strong>{item.procedimentos.length}</strong>
                </p>
              </div>

              <p className=" line-clamp-2">{`"${item.procedure_plan}"`}</p>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedProcedimento(item);
                  setIsProcedimentoListModalOpen(true);
                }}
              >
                <List />
                Listar procedimentos
              </Button>
              <Button variant="outline" onClick={handleAddProcedimento(item)}>
                <Syringe />
                Registrar procedimento
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      <AddControleDialog
        open={isModalOpen}
        loading={loading}
        onSave={handleCreateControl}
        onClose={() => setIsModalOpen(false)}
      />
      <AddProcedimentoDialog
        open={isProcedimentoModalOpen}
        insumos={insumos}
        loading={loading}
        onSave={handleCreateProcedimento}
        onClose={() => {
          setIsProcedimentoModalOpen(false);
          setSelectedProcedimento(null);
        }}
      />
      <ListProcedimentosDialog
        open={isProcedimentoListModalOpen && !!selectedProcedimento}
        onClose={() => {
          setIsProcedimentoListModalOpen(false);
          setTimeout(() => setSelectedProcedimento(null), 300);
        }}
        procedimentos={selectedProcedimento?.procedimentos || []}
      />
    </div>
  );
}
