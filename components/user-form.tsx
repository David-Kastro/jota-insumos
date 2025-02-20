"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ClientFormData = {
  name: string;
  crm: string;
};

type ClientFormProps = {
  onAddClient: (client: { id: string; name: string }) => void;
};

export default function UserForm({ onAddClient }: ClientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormData>();

  const onSubmit = (data: ClientFormData) => {
    // Here you would typically send the data to your backend and get a new ID
    const newClient = {
      id: Date.now().toString(), // This is a temporary ID generation method
      name: data.name,
    };
    onAddClient(newClient);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Nome do médico</Label>
        <Input
          id="name"
          {...register("name", { required: "Nome do médico é obrigatório" })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="crm">CRM</Label>
        <Input
          id="crm"
          type="number"
          {...register("crm", { required: "CRM é obrigatório", min: 0 })}
        />
        {errors.crm && (
          <p className="text-red-500 text-sm">{errors.crm.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Adicionar Médico
      </Button>
    </form>
  );
}
