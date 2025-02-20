import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ProcedureControlForm from "@/components/procedure-control-form";
import { ProcedimentoControle } from "./use-procedimentos";

type AddProcedimentoDialogProps = {
  open: boolean;
  loading: boolean;
  onSave: (values: Omit<ProcedimentoControle, "id">) => void;
  onClose: () => void;
};

export const AddProcedimentoDialog: FC<AddProcedimentoDialogProps> = ({
  open,
  onClose,
  loading,
  onSave,
}) => {
  const handleSave = async (values: Omit<ProcedimentoControle, "id">) => {
    await onSave(values);
    onClose();
  };
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent loading={loading}>
        <DialogHeader>
          <DialogTitle>Criar novo controle</DialogTitle>
          <DialogDescription>
            {/* ...existing instructions... */}
          </DialogDescription>
        </DialogHeader>
        <ProcedureControlForm onSave={handleSave} />
      </DialogContent>
    </Dialog>
  );
};
