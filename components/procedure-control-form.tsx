"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ClientForm from "@/components/client-form";
import { toast } from "sonner";
import UserForm from "./user-form";

type Client = {
  id: string;
  name: string;
};

type FormData = {
  clientId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  procedurePlan: string;
};

export default function ProcedureControlForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [clients, setClients] = useState<Client[]>([
    // { id: "1", name: "João Silva" },
    // { id: "2", name: "Maria Santos" },
  ]);
  const [users, setUsers] = useState<Client[]>([
    // { id: "1", name: "João Silva" },
    // { id: "2", name: "Maria Santos" },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogUserOpen, setIsDialogUserOpen] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Here you would typically send the data to your backend
    toast.error("Erro ao criar controle! Tente novamente.");
  };

  const handleAddClient = (newClient: Client) => {
    setClients([...clients, newClient]);
    setIsDialogOpen(false);
  };

  const handleAddUser = (newClient: Client) => {
    setUsers([...users, newClient]);
    setIsDialogUserOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-end space-x-4">
        <div className="flex-grow">
          <Label htmlFor="clientSelect">Cliente</Label>
          <Select onValueChange={(value) => setValue("clientId", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um cliente" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline">
              Adicionar Cliente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Cliente</DialogTitle>
            </DialogHeader>
            <ClientForm onAddClient={handleAddClient} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-end space-x-4">
        <div className="flex-grow">
          <Label htmlFor="clientSelect">Médico</Label>
          <Select onValueChange={(value) => setValue("userId", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um cliente" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isDialogUserOpen} onOpenChange={setIsDialogUserOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline">
              Adicionar Médico
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo médico</DialogTitle>
            </DialogHeader>
            <UserForm onAddClient={handleAddUser} />
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <Label>Data de Início</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? (
                format(startDate, "PPP")
              ) : (
                <span>Selecione a data de início</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={(date) => {
                setStartDate(date);
                setValue("startDate", date as Date);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label>Data de Fim</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !endDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? (
                format(endDate, "PPP")
              ) : (
                <span>Selecione a data de fim</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={(date) => {
                setEndDate(date);
                setValue("endDate", date as Date);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label htmlFor="procedurePlan">Planejamento do Procedimento</Label>
        <Textarea
          id="procedurePlan"
          {...register("procedurePlan", {
            required: "Planejamento do procedimento é obrigatório",
          })}
          rows={5}
        />
        {errors.procedurePlan && (
          <p className="text-red-500 text-sm">{errors.procedurePlan.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Enviar
      </Button>
    </form>
  );
}
