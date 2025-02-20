export type InsumosType = {
  id: number;
  name: string;
  unit_measure: string;
  total_units: number;
  qtd_by_unit: number;
  created_at?: Date;
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
