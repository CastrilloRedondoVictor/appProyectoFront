export class Curso {
  constructor(
    public idCurso: number,
    public nombre: string,
    public fechaInicio: string, // O puedes usar Date si prefieres
    public fechaFin: string,    // O puedes usar Date si prefieres
    public activo: boolean
  ) { }
}
