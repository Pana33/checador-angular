import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  showYesNoQuestionAlert(title:string,msg:string,iconSelected:SweetAlertIcon){
    return new Promise((res,rej)=>{
      Swal.fire({
        title: title,
        text: msg,
        icon: iconSelected,
        showCancelButton: true,
        cancelButtonColor: '#ED1B2F',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#1EBD27',
        confirmButtonText: 'Confirmar',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          res("ok")
        }
      })
    })
  }

  showSuccessfulOperation(title:string = 'Operacion realizada',icon:SweetAlertIcon = 'success'){
    let Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    })
    
    Toast.fire({
      icon: icon,
      title: title,
    })
  }

  showErrorOperation(
    title:string ='Hubo un problema',
    msg:string = 'No se pudo realizar la operacion, por favor vuelve a intentarlo',
    icon:SweetAlertIcon = 'error'){
    Swal.fire(
      title,
      msg,
      icon,
    )
  }

}
