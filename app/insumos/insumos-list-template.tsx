"use client";

import { useState } from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { CreateInsumoModal } from "./create-insumo-modal";
import { Button } from "@/components/ui/button";
import { useInsumos } from "./use-insumos";
import { InsumosType } from "@/lib/types";
import { Plus, PlusIcon, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { IncrementInsumoDialog } from "./increment-insumo-dialog";

export function InsumosListTemplate() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, loading, addInsumo, deleteInsumo, incrementInsumo } =
    useInsumos();

  const [incrementDialogOpen, setIncrementDialogOpen] = useState(false);
  const [selectedInsumoId, setSelectedInsumoId] = useState<number | null>(null);

  const handleCreateInsumo = async (values: InsumosType) => {
    const added = await addInsumo(values);
    if (added) {
      setIsModalOpen(false);
    }
  };

  const handleDeleteInsumo = (id: number) => {
    deleteInsumo(id);
  };

  const incrementInsumoQtd = async (id: number, amount: number) => {
    if (!selectedInsumoId) {
      return;
    }

    const insumo = data.find((item) => item.id === id);

    if (!insumo) {
      return;
    }

    await incrementInsumo(insumo, amount);
    setIncrementDialogOpen(false);
    setSelectedInsumoId(null);
  };

  const handleIncrementInsumo = async (amount: number) => {
    if (selectedInsumoId !== null) {
      await incrementInsumoQtd(selectedInsumoId, amount);
      setIncrementDialogOpen(false);
      setSelectedInsumoId(null);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-medium">Listagem de insumos</h1>
      <div className="w-full flex">
        <Button variant="outline" onClick={() => setIsModalOpen(true)}>
          <Plus />
          Adicionar insumo
        </Button>
      </div>
      <Table>
        <TableCaption>Listagem de insumos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Unidade de Medida</TableCell>
            <TableCell>Qtd. por Unidade</TableCell>
            <TableCell>Unidades Totais</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                {item.total_units > 0 ? (
                  <span className=" bg-green-600 p-1 rounded-sm w-fit text-white text-xs">
                    Disponível
                  </span>
                ) : (
                  <span className=" bg-red-600 p-1 rounded-sm w-fit text-white text-xs">
                    Indisponível
                  </span>
                )}
              </TableCell>
              <TableCell>{item.unit_measure}</TableCell>
              <TableCell>{item.qtd_by_unit}</TableCell>
              <TableCell>
                <span className={cn(!item.total_units && "text-red-600")}>
                  {item.total_units}
                </span>
              </TableCell>
              <TableCell className="flex items-center gap-2">
                <Button
                  loading={loading}
                  onClick={() => {
                    setSelectedInsumoId(item.id);
                    setIncrementDialogOpen(true);
                  }}
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 ml-2"
                >
                  <PlusIcon />
                </Button>
                <Button
                  loading={loading}
                  onClick={() => handleDeleteInsumo(Number(item.id))}
                  variant="destructive"
                  size="icon"
                  className="w-8 h-8"
                >
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CreateInsumoModal
        open={isModalOpen}
        loading={loading}
        onSave={handleCreateInsumo}
        onClose={() => setIsModalOpen(false)}
      />
      <IncrementInsumoDialog
        open={incrementDialogOpen}
        loading={loading}
        onSave={handleIncrementInsumo}
        onClose={() => {
          setIncrementDialogOpen(false);
          setSelectedInsumoId(null);
        }}
      />
    </div>
  );
}
