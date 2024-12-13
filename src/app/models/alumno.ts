export class Alumno {
  constructor(
    public idUsuario: number,
    public nombre: string,
    public apellidos: string,
    public email: string,
    public estadoUsuario: true,
    public imagen: string,
    public password: string,
    public idRole: number
  ) {}
}
