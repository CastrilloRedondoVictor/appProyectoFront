import { AlumnoCurso } from "./alumno";
import { Charla } from "./charla";
import { Curso } from "./curso";


export class Usuario {
  constructor(
    public idUsuario: number,
    public nombre: string,
    public apellidos: string,
    public email: string,
    public estadoUsuario: boolean,
    public imagen: string,
    public idRole: number,
    public role: string,
    public idCurso: number,
    public curso: string,
    public idCursoUsuario: number
  ) { }
}

export class AlumnosCursoProfesor {
  constructor(
    public numeroAlumnos: number,
    public curso: Curso,
    public alumnos: AlumnoCurso[]
  ) { }
}

export class Perfil {
  constructor(
    public usuario: Usuario,
    public charlas: Charla[]  // Array de charlas (puedes expandir el tipo de datos de charla)
  ) { }
}


