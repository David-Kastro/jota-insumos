"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface IncrementInsumoDialogProps {
  open: boolean;
  onSave: (amount: number) => void;
  onClose: () => void;
  loading: boolean;
}

export function IncrementInsumoDialog({
  open,
  onSave,
  onClose,
  loading,
}: IncrementInsumoDialogProps) {
  const [amount, setAmount] = useState<number | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) {
      return;
    }
    onSave(amount);
    setAmount(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent loading={loading}>
        <DialogHeader>
          <DialogTitle>Incrementar Quantidade</DialogTitle>
          <DialogDescription>
            Informe a quantidade adicional para incrementar o insumo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value === "" ? undefined : Number(e.target.value)
              )
            }
            className="border p-2 w-full"
            placeholder="Quantidade adicional"
            required
          />
          <DialogFooter>
            <Button loading={loading} type="submit">
              Incrementar
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              type="button"
              className="ml-2"
            >
              Cancelar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
