export class Charla {
  constructor(
    public idCharla: number,
    public titulo: string,
    public descripcion: string,
    public tiempo: number,
    public fechaPropuesta: string,
    public imagenCharla: string,
    public idUsuario: number,
    public usuario: string,
    public idEstadoCharla: number,
    public estadoCharla: string,
    public idRonda: number,
    public idCurso: number,
    public nombreCurso: string
  ) { }
}

export class CharlaSin {
  constructor(
    public idCharla: number,
    public titulo: string,
    public descripcion: string,
    public tiempo: number,
    public fechaPropuesta: string,
    public idUsuario: number,
    public idEstadoCharla: number,
    public idRonda: number,
    public imagenCharla: string
  ) { }
}

export class Ronda {
  constructor(
    public idRonda: number,
    public idCursoUsuario: number,
    public fechaPresentacion: string,
    public fechaCierre: string,
    public duracion: number,
    public descripcionModulo: string,
    public fechaLimiteVotacion: string
  ) { }
}
