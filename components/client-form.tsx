"use client"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type ClientFormData = {
  name: string
  age: number
  occupation: string
  phoneNumber: string
}

type ClientFormProps = {
  onAddClient: (client: { id: string; name: string }) => void
}

export default function ClientForm({ onAddClient }: ClientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormData>()

  const onSubmit = (data: ClientFormData) => {
    // Here you would typically send the data to your backend and get a new ID
    const newClient = {
      id: Date.now().toString(), // This is a temporary ID generation method
      name: data.name,
    }
    onAddClient(newClient)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Nome do Cliente</Label>
        <Input id="name" {...register("name", { required: "Nome do cliente é obrigatório" })} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="age">Idade</Label>
        <Input id="age" type="number" {...register("age", { required: "Idade é obrigatória", min: 0 })} />
        {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
      </div>

      <div>
        <Label htmlFor="occupation">Ocupação</Label>
        <Input id="occupation" {...register("occupation", { required: "Ocupação é obrigatória" })} />
        {errors.occupation && <p className="text-red-500 text-sm">{errors.occupation.message}</p>}
      </div>

      <div>
        <Label htmlFor="phoneNumber">Telefone</Label>
        <Input id="phoneNumber" {...register("phoneNumber", { required: "Telefone é obrigatório" })} />
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
      </div>

      <Button type="submit" className="w-full">
        Adicionar Cliente
      </Button>
    </form>
  )
}

