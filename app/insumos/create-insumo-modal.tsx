import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InsumosType } from "@/lib/types";

type CreateInsumoModalProps = {
  open: boolean;
  loading: boolean;
  onSave: (values: InsumosType) => void;
  onClose: () => void;
};

export const CreateInsumoModal: FC<CreateInsumoModalProps> = ({
  open,
  onClose,
  loading,
  onSave,
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onSave({
      name: data.get("nome") as string,
      unit_measure: data.get("unit_measure"),
      qtd_by_unit: parseInt(data.get("qtd_by_unit") as string),
      total_units: parseInt(data.get("total_units") as string),
    } as InsumosType);
    onClose();
  };
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent loading={loading}>
        <DialogHeader>
          <DialogTitle>Criar Novo Insumo</DialogTitle>
          <DialogDescription>
            {/* ...existing instructions... */}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-4">
            <label className="block">
              Nome:
              <Input name="nome" type="text" placeholder="Nome" />
            </label>
            <label className="block">
              Unidade de Medida:
              <Input
                name="unit_measure"
                type="text"
                placeholder="Unidade de Medida"
              />
            </label>
            <label className="block">
              Qtd. por Unidade:
              <Input
                name="qtd_by_unit"
                type="number"
                placeholder="Qtd. por Unidade"
              />
            </label>
            <label className="block">
              Unidades Totais:
              <Input
                name="total_units"
                type="number"
                placeholder="Unidades Totais"
              />
            </label>
            {/* ...other form fields if needed... */}
          </div>
          <DialogFooter>
            <Button loading={loading} type="submit" variant="default">
              Salvar
            </Button>
            <Button
              disabled={loading}
              type="button"
              onClick={onClose}
              variant="outline"
            >
              Fechar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
