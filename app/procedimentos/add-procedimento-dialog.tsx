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
  onSave: (values: ProcedimentoControle) => void;
  onClose: () => void;
};

export const AddProcedimentoDialog: FC<AddProcedimentoDialogProps> = ({
  open,
  onClose,
  loading,
  // onSave,
}) => {
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget);
  //   onSave({
  //     name: data.get("nome") as string,
  //     unit_measure: data.get("unit_measure"),
  //     qtd_by_unit: parseInt(data.get("qtd_by_unit") as string),
  //     total_units: parseInt(data.get("total_units") as string),
  //   } as ProcedimentoControle);
  //   onClose();
  // };
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent loading={loading}>
        <DialogHeader>
          <DialogTitle>Criar novo controle</DialogTitle>
          <DialogDescription>
            {/* ...existing instructions... */}
          </DialogDescription>
        </DialogHeader>
        <ProcedureControlForm />
      </DialogContent>
    </Dialog>
  );
};
