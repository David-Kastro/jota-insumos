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
import { Plus, Trash } from "lucide-react";

export function InsumosListTemplate() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, loading, addInsumo, deleteInsumo } = useInsumos();

  const handleCreateInsumo = async (values: InsumosType) => {
    const added = await addInsumo(values);
    if (added) {
      setIsModalOpen(false);
    }
  };

  const handleDeleteInsumo = (id: number) => {
    deleteInsumo(id);
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
              <TableCell>{item.unit_measure}</TableCell>
              <TableCell>{item.qtd_by_unit}</TableCell>
              <TableCell>{item.total_units}</TableCell>
              <TableCell>
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
    </div>
  );
}
