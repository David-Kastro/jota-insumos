"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ProcedimentoFormData, ProcedureForm } from "./procedure-form";
import { InsumosType } from "@/lib/types";

type AddProcedimentoDialogProps = {
  open: boolean;
  onClose: () => void;
  insumos: InsumosType[];
  loading: boolean;
  onSave: (values: ProcedimentoFormData) => void;
};

export function AddProcedimentoDialog({
  open,
  onClose,
  loading,
  insumos,
  onSave,
}: AddProcedimentoDialogProps) {
  const handleSave = async (values: ProcedimentoFormData) => {
    await onSave(values);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent loading={loading}>
        <DialogHeader>
          <DialogTitle>Cadastro de Procedimento</DialogTitle>
        </DialogHeader>
        <ProcedureForm
          onSave={handleSave}
          insumos={insumos}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
}
