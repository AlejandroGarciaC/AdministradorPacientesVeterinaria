import {sincronizarLocalStorage} from '../funciones.js'

class Citas{
    constructor(){
        this.citas = JSON.parse(localStorage.getItem('citas')) || [];
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita];
        sincronizarLocalStorage(this.citas); 
    }

    eliminarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id)
        sincronizarLocalStorage(this.citas); 
    }

    editarCita(citaActualizada){
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita)
        sincronizarLocalStorage(this.citas); 
    }

    //
}

export default Citas;