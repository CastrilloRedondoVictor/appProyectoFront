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
  ) {}
}

export class Comentarios {
  constructor(
    public idComentario: number,
    public idCharla: number,
    public idUsuario: number,
    public usuario: string,
    public contenido: string,
    public fecha: string
  ) {}
}

export class ComentariosSin {
  constructor(
    public idComentario: number,
    public idCharla: number,
    public idUsuario: number,
    public contenido: string,
    public fecha: string
  ) {}
}


export class Recursos {
  constructor(
    public idRecurso: number,
    public idCharla: number,
    public url: string,
    public nombre: string,
    public descripcion: string
  ) {}
}

export class CharlaDetalles {
  constructor(
    public charla: Charla,
    public comentarios: Comentarios[],
    public recursos: Recursos[]
  ) {}
}
