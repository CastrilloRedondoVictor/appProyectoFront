export class Charla {
  constructor(
    public idCharla: number,
    public titulo: string,
    public descripcion: string
  ) {}
}

export class Ronda {
  constructor(
    public idRonda: number,
    public idCursoUsuario: number,
    public fechaPresentacion: string,
    public fechaCierre: string,
    public duracion: number,
    public descripcionModulo: string,
    public fechaLimiteVotacion: string,
  ) {}
}
