"use client";

import { Button } from "@/components/ui/button";
import { List, Plus, Syringe } from "lucide-react";
import { ProcedimentoControle, useProcedimentos } from "./use-procedimentos";
import { useState } from "react";
import { AddProcedimentoDialog } from "./add-procedimento-dialog";

export function ProcedimentosTemplate() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, addControle, loading } = useProcedimentos();

  const handleCreateProcedimento = async (
    values: Omit<ProcedimentoControle, "id">
  ) => {
    const added = await addControle(values);
    if (added) {
      setIsModalOpen(false);
    }
  };

  // const handleDeleteProcedimento = (id: number) => {
  //   deleteControle(id);
  // };

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          <div className="aspect-square rounded-xl bg-muted/50" />
          <div className="aspect-square rounded-xl bg-muted/50" />
          <div className="aspect-square rounded-xl bg-muted/50" />
          <div className="aspect-square rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    );
  }

  const formatData = (data: Date) => {
    return new Intl.DateTimeFormat("pt-BR").format(new Date(data));
  };

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-medium">Procedimentos</h1>
      <div className="w-full flex">
        <Button variant="outline" onClick={() => setIsModalOpen(true)}>
          <Plus />
          Adicionar controle
        </Button>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="aspect-video rounded-xl bg-background dark:border dark:border-border shadow-lg dark:shadow-none p-4 flex flex-col gap-4 justify-between"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <h2 className=" text-2xl font-medium">{item.client.name}</h2>
                <p className=" text-sm text-muted-foreground">
                  Médico: <strong>{item.user.name}</strong>
                </p>
                <p className=" text-sm text-muted-foreground">
                  Procedimentos realizados: <strong>0</strong>
                </p>
                <p className=" text-sm text-muted-foreground">
                  Período:{" "}
                  <strong>
                    {formatData(item.date_start)} até{" "}
                    {formatData(item.date_end)}
                  </strong>
                </p>
              </div>

              <p className=" line-clamp-2">{`"${item.procedure_plan}"`}</p>
            </div>

            <div className="flex flex-col gap-2">
              <Button variant="outline">
                <List />
                Listar procedimentos
              </Button>
              <Button variant="outline">
                <Syringe />
                Registrar procedimento
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      <AddProcedimentoDialog
        open={isModalOpen}
        loading={loading}
        onSave={handleCreateProcedimento}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
