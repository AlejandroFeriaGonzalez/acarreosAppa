export interface Order {
  id: number;
  numero_guia: string;
  observaciones: null;
  usuarioId: number;
  bisonteId: null;

  descripcion?: string;
  cantidad?: number;
  peso?: number;
  prioridad?: string;
  estado?: string;
  precio?: number;
  origen?: string;
  destino?: string;
  envioId?: null;

  createdAt: Date;
  updatedAt: Date;
}
