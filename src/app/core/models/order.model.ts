export interface Order {
  id:                number;
  numero_guia:       string;
  observaciones:     string;
  createdAt:         Date;
  updatedAt:         Date;
  envioId:           number;
  usuarioId:         number;
  bisonteId:         null;
  tbl_detalle_items: TblDetalleItem[];
}

export interface TblDetalleItem {
  id:          number;
  descripcion: string;
  cantidad:    number;
  peso:        string;
  prioridad:   string;
  estado:      string;
  precio:      string;
  origen:      string;
  destino:     string;
  createdAt:   Date;
  updatedAt:   Date;
  envioId:     number;
}
