/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, PlusIcon, TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InsumosType } from "@/lib/types";
import { Input } from "@/components/ui/input";

export type ProcedimentoFormData = {
  title: string;
  date: Date;
  supplies: {
    supply_id: number;
    qtd: number;
  }[];
};

export function ProcedureForm({
  onSave,
  insumos,
  loading,
}: {
  onSave: (data: ProcedimentoFormData) => void;
  insumos: InsumosType[];
  loading: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm<ProcedimentoFormData>({
    defaultValues: {
      supplies: [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "supplies",
  });

  const [date, setDate] = useState<Date>();

  const onSubmit = (data: ProcedimentoFormData) => {
    onSave({
      ...data,
      supplies: data.supplies.map((s) => ({
        ...s,
        supply_id: Number(s.supply_id),
      })),
    });
    reset();
    setDate(undefined);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Título do Procedimento</Label>
        <Input
          id="title"
          {...register("title", {
            required: "Planejamento do procedimento é obrigatório",
          })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label>Data do procedimento</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, "PPP")
              ) : (
                <span>Selecione do procedimento</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                setDate(date);
                setValue("date", date as Date);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-4 mt-6">
        <h3 className="text-lg font-medium">
          Dados dos Insumos Usados (Opcional)
        </h3>
        {fields.map((field, index) => {
          const selectedInsumo = insumos.find(
            (insumo) =>
              insumo.id ===
              Number((field as { supply_id: number }).supply_id || 0)
          );
          const insumoTotalAvailable = selectedInsumo
            ? selectedInsumo.total_available ||
              selectedInsumo.qtd_by_unit * selectedInsumo.total_units
            : 0;

          console.log(selectedInsumo, insumoTotalAvailable);

          return (
            <div key={field.id} className="flex items-start space-x-4">
              <div className="w-1/2">
                {/* <Label htmlFor={`supplies.${index}.supply_id`}>Insumo</Label> */}
                <Select
                  onValueChange={(value) => {
                    setValue(`supplies.${index}.supply_id`, Number(value));
                    update(index, { supply_id: Number(value), qtd: 0 });
                  }}
                  value={field.supply_id + ""}
                >
                  <SelectTrigger className="text-start">
                    <SelectValue placeholder="Selecione um insumo" />
                  </SelectTrigger>
                  <SelectContent>
                    {insumos.map((insumo) => (
                      <SelectItem
                        disabled={
                          !insumo.total_units && !insumo.total_available
                        }
                        key={insumo.id}
                        value={insumo.id + ""}
                      >
                        {insumo.name} -{" "}
                        {!insumo.total_units && !insumo.total_available
                          ? "Indisponível"
                          : `(${insumo.total_units} unidades)`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/2">
                {/* <Label htmlFor={`supplies.${index}.qtd`}>
                  Quantidade utilizada
                </Label> */}
                <div className="flex items-center relative">
                  <Input
                    id={`supplies.${index}.qtd`}
                    type="number"
                    disabled={
                      !selectedInsumo ||
                      (!selectedInsumo.total_units &&
                        !selectedInsumo.total_available)
                    }
                    {...register(`supplies.${index}.qtd`, {
                      required: "Quantidade é obrigatória",
                      validate: (value) => {
                        if (!value) return "Quantidade é obrigatória";
                        if (
                          selectedInsumo &&
                          Number(value) > insumoTotalAvailable
                        ) {
                          return `Qtd. máxima: ${insumoTotalAvailable}${selectedInsumo.unit_measure} (${selectedInsumo.total_units} unidades)`;
                        }
                        return true;
                      },
                    })}
                  />
                  <div className="absolute right-0 text-sm font-medium text-muted-foreground bg-secondary h-full px-4 border border-border rounded-r-none flex items-center">
                    {selectedInsumo?.unit_measure || "..."}
                  </div>
                </div>
                {errors.supplies && errors.supplies[index]?.qtd && (
                  <p className="text-red-500 text-sm">
                    {(errors.supplies[index].qtd as any).message}
                  </p>
                )}
              </div>
              <Button
                variant="destructive"
                type="button"
                size="icon"
                onClick={() => remove(index)}
              >
                <TrashIcon />
              </Button>
            </div>
          );
        })}
        <Button
          variant="ghost"
          type="button"
          onClick={() => append({ supply_id: 0, qtd: 0 })}
        >
          <PlusIcon />
          Adicionar Insumo
        </Button>
      </div>

      <Button loading={loading} type="submit" className="w-full">
        Enviar
      </Button>
    </form>
  );
}
