export type InsumosType = {
  id: number;
  name: string;
  unit_measure: string;
  total_units: number;
  qtd_by_unit: number;
  created_at?: Date;
  total_available: number | null;
};

export type ControleType = {
  id: number;
  date_start: Date;
  date_end: Date;
  procedure_plan: string;
  client_id: number;
  user_id: number;
  created_at?: Date;
};

export type ClientType = {
  id: number;
  age: number;
  name: string;
  phone: string;
  occupation: string;
  created_at: Date;
};

export type UserType = {
  id: number;
  crm: string;
  name: string;
  avatar: string | null;
  created_at: Date;
};

export type ProcedimentoType = {
  id: number;
  title: string;
  control_id: number;
  control: ControleType;
  date: Date;
  created_at: Date;
};

export type AddProcedimentoType = Omit<
  ProcedimentoType,
  "id" | "created_at" | "control"
>;

export type ProcedimentoComInsumosType = {
  id: number;
  title: string;
  control_id: number;
  control: ControleType;
  date: Date;
  created_at: Date;
  insumos_usados: InsumoUsadoType[];
};

export type InsumoUsadoType = {
  id: number;
  user_id: number;
  client_id: number;
  supply_id: number;
  control_id: number;
  procedure_id: number;

  user: UserType;
  client: ClientType;
  supply: InsumosType;
  control: ControleType;
  procedure: ProcedimentoType;

  qtd: number;
  created_at: Date;
};

export type AddInsumoUsadoType = Omit<
  InsumoUsadoType,
  "id" | "created_at" | "user" | "client" | "supply" | "control" | "procedure"
>;
