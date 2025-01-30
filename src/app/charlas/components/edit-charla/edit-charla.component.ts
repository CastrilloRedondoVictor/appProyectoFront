import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Perfil } from '../../../models/alumno';
import { CharlaSin, Ronda } from '../../../models/charla';
import { FileModel } from '../../../models/fileModel';
import { AuthService } from '../../../services/auth-service.service';
import { CharlasService } from '../../../services/charlas-service.service';

@Component({
  selector: 'app-edit-charla',
  standalone: false,

  templateUrl: './edit-charla.component.html',
  styleUrls: [
    './edit-charla.component.css',
    '../post-charla/post-charla.component.css',
    '../../../app.component.css',
    '../../../auth/components/login/login.component.css',
  ],
})
export class EditCharlaComponent {
  @ViewChild('cajaTitulo') cajaTitulo!: ElementRef;
  @ViewChild('cajaDescripcion') cajaDescripcion!: ElementRef;
  @ViewChild('cajaTiempo') cajaTiempo!: ElementRef;

  public charla!: CharlaSin;
  public perfil!: Perfil;
  public ronda!: Ronda;

  tiempoIngresado!: number;
  errors: boolean[] = [false, false, false];
  errorTiempo: boolean = false;

  imagenInicial: FileModel = new FileModel('imgCharla.png', '');
  imagen: FileModel = new FileModel('imgCharla.png', '');
  @ViewChild('cajaFile') cajaFileRef!: ElementRef; // Referencia al input file
  public fileContent: string | null = null; // Base64 para la previsualización

  idRonda!: number;
  idCharla!: number;

  constructor(
    private _service: CharlasService,
    private _servicePerfil: AuthService,
    private _router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this._servicePerfil.getPerfil().subscribe((response) => {
      this.perfil = response.usuario;
    });

    this.idRonda = Number(this.route.snapshot.paramMap.get('idRonda'));
    this.idCharla = Number(this.route.snapshot.paramMap.get('idCharla'));

    this._service.getRondasCurso().subscribe((response) => {
      this.ronda = response.filter(
        (ronda: Ronda) => ronda.idRonda == this.idRonda
      )[0];
    });

    this._service.getCharlaById(this.idCharla).subscribe((response) => {
      this.charla = response.charla;
      this.getImagenCharla();
    });
  }

  adjustHeight(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto'; // Resetea la altura para recalcular
    textarea.style.height = textarea.scrollHeight + 'px'; // Ajusta la altura al contenido
  }

  validarTiempo(): void {
    if (this.tiempoIngresado > this.ronda.duracion) {
      this.errors[2] = true;
    } else {
      this.errors[2] = false;
    }
  }

  getImagenCharla(): void {
    this.imagenInicial.filecontent = this.charla.imagenCharla;
    this.imagen.filecontent = this.charla.imagenCharla;
  }

  // Método para abrir el input file
  cambiarImagen() {
    this.cajaFileRef.nativeElement.click();
  }

  // Método para previsualizar la imagen y enviarla como FileModel
  subirFichero(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const fileName = file.name;

      // Leer el archivo como Base64
      const reader = new FileReader();
      reader.onload = () => {
        this.fileContent = reader.result as string; // Actualizar previsualización

        // Crear el objeto FileModel
        const base64Content = this.fileContent.split(',')[1]; // Extraer solo la parte Base64
        const fileModel = new FileModel(fileName, base64Content);

        // Subir al servidor
        this.imagen = fileModel;
      };
      reader.readAsDataURL(file);
    }
  }

  editarCharla(): void {
    var titulo = this.cajaTitulo.nativeElement.value;
    var descripcion = this.cajaDescripcion.nativeElement.value;
    var tiempo = this.cajaTiempo.nativeElement.value;

    if (tiempo <= this.ronda.duracion) {
      this.charla = new CharlaSin(
        this.charla.idCharla,
        titulo,
        descripcion,
        tiempo,
        this.ronda.fechaPresentacion,
        this.perfil.idUsuario,
        1,
        this.idRonda,
        this.charla.imagenCharla
      );

      this._service.putCharla(this.charla).subscribe((response: CharlaSin) => {
        if (
          this.imagen.filecontent != '' &&
          this.imagen.filecontent != null &&
          this.imagen.filecontent != this.imagenInicial.filecontent
        ) {
          // console.log(this.imagen.filecontent);
          this._service
            .postFile(this.imagen, this.idCharla)
            .subscribe((response) => {
              this._router.navigate([
                'charlas/charlasRonda/detallesCharla/' +
                this.idRonda +
                '/' +
                this.charla.idCharla,
              ]);

              Swal.fire({
                title: 'Charla editada',
                text: 'La charla se ha editado con éxito.',
                icon: 'success',
                confirmButtonText: 'ACEPTAR',
                background: '#2b2e38',
                color: '#c4c3ca',
                focusConfirm: false,
                buttonsStyling: false,
                didOpen: () => {
                  // Estilizar contenedor de botones
                  const buttonsContainer = document.querySelector('.swal2-actions') as HTMLElement;
                  if (buttonsContainer) {
                    buttonsContainer.style.display = 'flex';
                    buttonsContainer.style.justifyContent = 'space-between';
                    buttonsContainer.style.gap = '20px'; // Espaciado entre botones
                  }

                  // Botón de confirmar
                  const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
                  if (confirmButton) {
                    confirmButton.style.backgroundColor = '#ffeba7';
                    confirmButton.style.color = '#2b2e38';
                    confirmButton.style.padding = '10px 20px';
                    confirmButton.style.border = 'none';
                    confirmButton.style.borderRadius = '4px';
                    confirmButton.style.transition = 'all 0.3s ease';

                    confirmButton.addEventListener('mouseover', () => {
                      confirmButton.style.backgroundColor = '#1f2029';
                      confirmButton.style.color = '#ffeba7';
                    });

                    confirmButton.addEventListener('mouseout', () => {
                      confirmButton.style.backgroundColor = '#ffeba7';
                      confirmButton.style.color = '#2b2e38';
                    });
                  }

                  // Botón de cancelar
                  const cancelButton = document.querySelector('.swal2-cancel') as HTMLElement;
                  if (cancelButton) {
                    cancelButton.style.backgroundColor = '#e74c3c';
                    cancelButton.style.color = '#ffffff';
                    cancelButton.style.padding = '10px 20px';
                    cancelButton.style.border = 'none';
                    cancelButton.style.borderRadius = '4px';
                    cancelButton.style.transition = 'all 0.3s ease';

                    cancelButton.addEventListener('mouseover', () => {
                      cancelButton.style.backgroundColor = '#a93226';
                    });

                    cancelButton.addEventListener('mouseout', () => {
                      cancelButton.style.backgroundColor = '#e74c3c';
                      cancelButton.style.color = '#ffffff';
                    });
                  }
                },
              });
            });
        } else {
          this._router.navigate([
            'charlas/charlasRonda/detallesCharla/' +
            this.idRonda +
            '/' +
            this.charla.idCharla,
          ]);

          Swal.fire({
            title: 'Charla editada',
            text: 'La charla se ha editado con éxito.',
            icon: 'success',
            confirmButtonText: 'ACEPTAR',
            background: '#2b2e38',
            color: '#c4c3ca',
            focusConfirm: false,
            buttonsStyling: false,
            didOpen: () => {
              // Estilizar contenedor de botones
              const buttonsContainer = document.querySelector('.swal2-actions') as HTMLElement;
              if (buttonsContainer) {
                buttonsContainer.style.display = 'flex';
                buttonsContainer.style.justifyContent = 'space-between';
                buttonsContainer.style.gap = '20px'; // Espaciado entre botones
              }

              // Botón de confirmar
              const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
              if (confirmButton) {
                confirmButton.style.backgroundColor = '#ffeba7';
                confirmButton.style.color = '#2b2e38';
                confirmButton.style.padding = '10px 20px';
                confirmButton.style.border = 'none';
                confirmButton.style.borderRadius = '4px';
                confirmButton.style.transition = 'all 0.3s ease';

                confirmButton.addEventListener('mouseover', () => {
                  confirmButton.style.backgroundColor = '#1f2029';
                  confirmButton.style.color = '#ffeba7';
                });

                confirmButton.addEventListener('mouseout', () => {
                  confirmButton.style.backgroundColor = '#ffeba7';
                  confirmButton.style.color = '#2b2e38';
                });
              }

              // Botón de cancelar
              const cancelButton = document.querySelector('.swal2-cancel') as HTMLElement;
              if (cancelButton) {
                cancelButton.style.backgroundColor = '#e74c3c';
                cancelButton.style.color = '#ffffff';
                cancelButton.style.padding = '10px 20px';
                cancelButton.style.border = 'none';
                cancelButton.style.borderRadius = '4px';
                cancelButton.style.transition = 'all 0.3s ease';

                cancelButton.addEventListener('mouseover', () => {
                  cancelButton.style.backgroundColor = '#a93226';
                });

                cancelButton.addEventListener('mouseout', () => {
                  cancelButton.style.backgroundColor = '#e74c3c';
                  cancelButton.style.color = '#ffffff';
                });
              }
            },
          });
        }
      });
    }
  }
}
