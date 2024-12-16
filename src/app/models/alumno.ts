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

export class Perfil {
  constructor(
    public idUsuario: number,
    public nombre: string,
    public apellidos: string,
    public email: string,
    public estadoUsuario: boolean,
    public imagen: string,
    public idRole: number,
    public role: string,  // Se agregó el campo 'role' en lugar de 'idRole'
    public idCurso: number,
    public curso: string,
    public idCursoUsuario: number  // Cambié 'idCursosUsuarios' a 'idCursoUsuario'
  ) {}
}

export class PerfilAlumnoCurso {
  constructor(
    public idUsuario: number,
    public usuario: string,
    public estadoUsuario: boolean,
    public imagen: string,
    public email: string,
    public idRole: number,
    public role: string,
    public idCurso: number,
    public curso: string,
    public fechaInicioCurso: string,
    public fechaFinCurso: string,
    public idCursosUsuarios: number
  ) {}
}



export class AlumnoCurso {
  constructor(
    public alumno: PerfilAlumnoCurso, // Datos del alumno basado en la clase Perfil
    public charlasTotales: number, // Total de charlas que el alumno ha tenido
    public charlasPropuestas: number, // Total de charlas propuestas por el alumno
    public charlasAceptadas: number, // Total de charlas aceptadas por el alumno
    public charlas: any[] // Lista de charlas del alumno (puedes definir un tipo específico)
  ) {}
}

