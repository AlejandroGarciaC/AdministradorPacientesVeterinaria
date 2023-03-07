import Citas from './clases/citas.js';
import UI from './clases/UI.js';
import {mascotaInput,
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    formulario} from './selectores.js';


export const ui = new UI();
export const administrarCitas = new Citas();

let editando = false;

//Objeto con la informacion de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha:'',
    hora: '',
    sintomas: ''
}

//Agrega datos al objeto cita
export function datosCita(e){
    citaObj[e.target.name] = e.target.value;
}


//Valida y agrega una nueva cita a la clase
export function nuevaCita(e){
    e.preventDefault();
    //Extraer la informacion del objeto cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;
    //Validar
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '' ){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if(editando){

        ui.imprimirAlerta('Editado correctamente');

        administrarCitas.editarCita({...citaObj});

        //Regresa el texto del boton al estado original
        formulario.querySelector('button[type="submit"]').textContent = "Crear Cita";

        editando = false;
    }else{
        //Generar un id unico
        citaObj.id=Date.now();
        //Creando la cita
        administrarCitas.agregarCita({...citaObj});
        //Mensaje de agregado correctamente
        ui.imprimirAlerta('Se agrego correctamente');
    }
    
    //Reiniciar objeto
    reiniciarObjeto();
    //Reiniciar formulario
    formulario.reset();

    //Mostrar el html de las citas
    ui.imprimirCitas(administrarCitas);
}

export function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export function eliminarCita(id){
    //Eliminar la cita
    administrarCitas.eliminarCita(id);

    //Muestra mensaje
    ui.imprimirAlerta('La cita se elimino correctamente')
    //Refresca la cita
    ui.imprimirCitas(administrarCitas);
}

export function cargarEdicion(cita){
    const {mascota, propietario, telefono, fecha, hora, sintomas,id} = cita;

    //Llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.fecha = fecha;
    citaObj.telefono = telefono;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    //Cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = "Guardar Cambios";

    editando= true;
}

///////////
export function sincronizarLocalStorage (thisCitas) {
    localStorage.setItem('citas', JSON.stringify(thisCitas))
}

export function reloadStorage(){
    const citasR = JSON.parse(localStorage.getItem('citas'));
    const citasReload = {
        citas: citasR
    }
    // console.log(administrarCitas);
    // console.log(citasReload);
    ui.imprimirCitas(citasReload);
}