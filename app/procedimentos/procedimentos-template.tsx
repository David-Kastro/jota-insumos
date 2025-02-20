"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProcedimentoControle, useProcedimentos } from "./use-procedimentos";
import { useState } from "react";
import { AddProcedimentoDialog } from "./add-procedimento-dialog";

export function ProcedimentosTemplate() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addControle, loading } = useProcedimentos();

  const handleCreateProcedimento = async (values: ProcedimentoControle) => {
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
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-medium">Procedimentos</h1>
      <div className="w-full flex">
        <Button variant="outline">
          <Plus />
          Adicionar controle
        </Button>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
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
