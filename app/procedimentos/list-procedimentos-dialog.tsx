"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProcedimentoComInsumosType } from "@/lib/types";
import { formatData } from "@/lib/utils";

export function ListProcedimentosDialog({
  open,
  onClose,
  procedimentos,
}: {
  open: boolean;
  onClose: () => void;
  procedimentos: ProcedimentoComInsumosType[];
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Procedimentos</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4 max-h-[480px] overflow-y-auto">
          {!procedimentos.length && (
            <div className="font-medium text-muted-foreground">
              Nenhum procedimento registrado ainda
            </div>
          )}
          {procedimentos.map((procedimento, idx) => (
            <div key={idx} className="border p-4 rounded">
              <div>
                <strong>Data:</strong> {formatData(procedimento.date)}
              </div>
              <div>
                <strong>Título:</strong> {procedimento.title}
              </div>
              <div>
                <strong>Insumos Utilizados:</strong>
                <ul className="list-disc list-inside">
                  {procedimento.insumos_usados.map((insumo, i) => (
                    <li key={i}>
                      {insumo.supply.name} - {insumo.qtd}
                      {insumo.supply.unit_measure}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <DialogClose asChild>
          <Button variant="secondary" className="mt-4">
            Fechar
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
