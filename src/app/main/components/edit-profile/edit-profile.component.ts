import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth-service.service';
import { Perfil } from '../../../models/alumno';
import { FileModel } from '../../../models/fileModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  standalone: false,
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css', '../../../app.component.css']
})
export class EditProfileComponent implements OnInit {
  @ViewChild('cajaFile') cajaFileRef!: ElementRef; // Referencia al input file
  public fileContent: string | null = null; // Base64 para la previsualización
  public perfil!: Perfil;
  perfilForm!: FormGroup;

  constructor(private _service: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    // Obtener datos del perfil del usuario
    this._service.getPerfil().subscribe((response:any) => {
      this.perfil = response.usuario;
      this.initForm();
    });
  }

  initForm() {
    this.perfilForm = this.fb.group({
      idUsuario: [{ value: this.perfil.idUsuario, disabled: true }],
      nombre: [this.perfil.nombre],
      apellidos: [this.perfil.apellidos],
      email: [this.perfil.email],
      estadoUsuario: [this.perfil.estadoUsuario],
      imagen: [this.perfil.imagen],
      role: [{ value: this.perfil.role, disabled: true }],
      curso: [{ value: this.perfil.curso, disabled: true }]
    });
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
        console.log('Imagen seleccionada en Base64:', this.fileContent);

        // Crear el objeto FileModel
        const base64Content = this.fileContent.split(',')[1]; // Extraer solo la parte Base64
        const fileModel = new FileModel(fileName, base64Content);

        // Subir al servidor
        this.subirImagenAlServidor(fileModel);
      };
      reader.readAsDataURL(file);
    }
  }

  // Subir la imagen al servidor
  subirImagenAlServidor(fileModel: FileModel) {
    this._service.postFile(fileModel, this.perfil.idUsuario).subscribe(
      (response: any) => {
        Swal.fire({
                  title: 'Imagen actualizada',
                  text: 'Se ha completado el cambio de imagen de perfil',
                  icon: 'success',
                  confirmButtonText: 'ACEPTAR',
                  background: '#2b2e38',
                  color: '#c4c3ca',
                  focusConfirm: false,
                  buttonsStyling: false,
                  didOpen: () => {
                    const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
                    if (confirmButton) {
                      // Estilos iniciales
                      confirmButton.style.backgroundColor = '#ffeba7';
                      confirmButton.style.color = '#2b2e38';
                      confirmButton.style.padding = '10px 20px';
                      confirmButton.style.border = 'none';
                      confirmButton.style.borderRadius = '4px';
                      confirmButton.style.transition = 'all 0.3s ease';

                      // Hover con JavaScript
                      confirmButton.addEventListener('mouseover', () => {
                        confirmButton.style.backgroundColor = '#000000';
                        confirmButton.style.color = '#ffeba7';
                      });

                      confirmButton.addEventListener('mouseout', () => {
                        confirmButton.style.backgroundColor = '#ffeba7';
                        confirmButton.style.color = '#000000';
                      });
                    }
                  },
                });
      },
      (error:any) => {
        Swal.fire({
          title: 'Imagen no actualizada',
          text: 'No se ha podido completar el cambio de imagen de perfil',
          icon: 'error',
          confirmButtonText: 'ACEPTAR',
          background: '#2b2e38',
          color: '#c4c3ca',
          focusConfirm: false,
          buttonsStyling: false,
          didOpen: () => {
            const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
            if (confirmButton) {
              // Estilos iniciales
              confirmButton.style.backgroundColor = '#ffeba7';
              confirmButton.style.color = '#2b2e38';
              confirmButton.style.padding = '10px 20px';
              confirmButton.style.border = 'none';
              confirmButton.style.borderRadius = '4px';
              confirmButton.style.transition = 'all 0.3s ease';

              // Hover con JavaScript
              confirmButton.addEventListener('mouseover', () => {
                confirmButton.style.backgroundColor = '#000000';
                confirmButton.style.color = '#ffeba7';
              });

              confirmButton.addEventListener('mouseout', () => {
                confirmButton.style.backgroundColor = '#ffeba7';
                confirmButton.style.color = '#000000';
              });
            }
          },
        });
      }
    );
  }

  // Método para guardar los cambios del formulario
  onSubmit() {
    if (this.perfilForm.valid) {
      const formData = this.perfilForm.getRawValue();
      console.log('Datos del formulario:', formData);
      alert('Perfil actualizado correctamente');
    }
  }
}
