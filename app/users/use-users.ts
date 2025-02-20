import { supabase } from "@/lib/supabase";
import { ClientType, UserType } from "@/lib/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserType[]>([]);
  const [clients, setClients] = useState<ClientType[]>([]);

  useEffect(() => {
    listClientes();
    listUsers();
  }, []);

  // Listar clientes de procedimento
  async function listClientes(): Promise<ClientType[]> {
    setLoading(true);
    const { data, error } = await supabase
      .from("[JOTA] - Clientes")
      .select(`*`);
    setLoading(false);

    if (error) {
      toast.error("Erro ao listar clientes de procedimento");
      throw new Error("Erro ao listar clientes de procedimento");
    }

    setClients(data || []);

    return data || ([] as ClientType[]);
  }

  async function listUsers(): Promise<UserType[]> {
    setLoading(true);
    const { data, error } = await supabase.from("[JOTA] - Users").select(`*`);
    setLoading(false);

    if (error) {
      toast.error("Erro ao listar clientes de procedimento");
      throw new Error("Erro ao listar clientes de procedimento");
    }

    setUsers(data || []);

    return data || ([] as UserType[]);
  }

  const refetch = async () => {
    listClientes();
    listUsers();
  };

  async function addUser(values: Partial<UserType>): Promise<boolean> {
    setLoading(true);
    const { error } = await supabase.from("[JOTA] - Users").insert([values]);
    setLoading(false);

    if (error) {
      toast.error("Erro ao adicionar médico");
      throw new Error("Erro ao adicionar médico");
    }

    toast.success("Médico adicionado com sucesso");
    refetch();
    return true;
  }

  async function addClient(values: Partial<ClientType>): Promise<boolean> {
    setLoading(true);
    const { error } = await supabase.from("[JOTA] - Clientes").insert([values]);
    setLoading(false);

    if (error) {
      toast.error("Erro ao adicionar cliente");
      throw new Error("Erro ao adicionar cliente");
    }

    toast.success("Cliente adicionado com sucesso");
    refetch();
    return true;
  }

  return {
    listClientes,
    listUsers,
    addUser,
    addClient,
    loading,
    users,
    clients,
    refetch,
  };
};
