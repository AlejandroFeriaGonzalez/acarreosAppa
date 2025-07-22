export interface User {
  id:             number;
  nombre_usuario: string;
  apellido:       string;
  contrasena:     string;
  correo:         string;
  estado:         string;
  roleId:         number;
  createdAt:      Date;
  updatedAt:      Date;
}
