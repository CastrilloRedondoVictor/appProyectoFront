export class AlumnoRegister {
  constructor(
    public idUsuario: number,
    public nombre: string,
    public apellidos: string,
    public email: string,
    public estadoUsuario: boolean,
    public imagen: string,
    public password: string,
    public idRole: number
  ) {}
}

export class Alumno {
  constructor(
    public idUsuario: number,
    public nombre: string,
    public apellidos: string,
    public email: string,
    public estadoUsuario: boolean,
    public imagen: string,
    public password: string,
    public idRole: number,
    public idCurso: number,
    public curso: string,
    public fechaInicioCurso: string,
    public fechaFinCurso: string,
    public idCursosUsuarios: number
  ) {}
}

export class AlumnoCurso {
  constructor(
    public alumno: Alumno,
    public charlasTotales: number,
    public charlasPropuestas: number,
    public charlasAceptadas: number,
    public charlas: any[] // Puedes definir un tipo más específico para charlas
  ) {}
}
