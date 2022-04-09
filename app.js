let inputModelo = document.getElementById('modelo_form')
let inputMarca = document.getElementById('marca_form')
let inputPrecio = document.getElementById('precio_form')
const form = document.getElementById('form_container');
const btnEditar = document.getElementById('editar_form')
const btnAgregar = document.getElementById('agregar_form')
const contenedor = document.getElementById('alert_container')
let producto = []

 //Para Mostrar el Formulario y la alerta-----------------------------------------------------------------------------------------
 function mostrarform(opcion){
     if(opcion == 'agregar'){
        form.classList.add('form_container_mostrar');
        btnAgregar.classList.remove('agregar_form_novisto')
        btnEditar.classList.remove('editar_form_visto')
        inputModelo.value = ''
        inputMarca.value = ''
        inputPrecio.value = ''
    }else if (opcion === 'editar'){
        form.classList.add('form_container_mostrar');
        btnAgregar.classList.add('agregar_form_novisto')
        btnEditar.classList.add('editar_form_visto')
    }else if(opcion === 'cerrar') {
        form.classList.remove('form_container_mostrar');
    }else if (opcion === 'cerrar alert'){
        contenedor.classList.remove('alert_container_mostrar')
    }
}
//Para mostrar alertas-----------------------------------------------------------------------------------------
function alertas(valor,accion) {
    contenedor.classList.add('alert_container_mostrar')
            let lugarAlert = document.getElementById('alert_container_info')
            let nodoAlert = document.createElement ('h3')
            let estatus;
            if  (accion === 'agregar') {
                estatus = 'ya existe'
            } else if (accion === 'buscar') {
                estatus = 'no existe'
            }
            let textAlert = document.createTextNode(`El elemento: ${valor}, ${estatus}`)
                lugarAlert.innerHTML=''
                nodoAlert.appendChild(textAlert)
                lugarAlert.appendChild(nodoAlert)
}
//Para agreagr los ITEMS-----------------------------------------------------------------------------------------
class objeto {
    constructor(modelo,marca,precio) {
        this.modelo = modelo;
        this.marca = marca;
        this.precio = precio;
    }
}

function agergarProducto(){
    let resultIndex = producto.findIndex(function(item){ 
        return item.modelo.toLowerCase() === inputModelo.value.toLowerCase()
    })
        if(resultIndex === -1 ){
            let obj = new objeto (inputModelo.value , inputMarca.value , inputPrecio.value)
            producto.push(obj)
            localStorage.setItem('productos' , JSON.stringify(producto))
            renderItem(producto)
            mostrarform('cerrar')
        } else{
            mostrarform('cerrar')
            alertas(inputModelo.value , 'agregar')
        }
} 
//Para Imprimir los ITEMS-----------------------------------------------------------------------------------------
function renderItem(arregloAImprimir){
    const lugar = document.getElementById('lugarItem')
    if (arregloAImprimir.length > 0){
        lugar.innerHTML = ''
        arregloAImprimir.forEach( function (item) {
            lugar.innerHTML += ` <div class="producto">
                                   <div class="producto_info">
                                       <div class="producto_info_modelo">
                                           <h3>Modelo: </h3>
                                           <p>${item.modelo}</p>
                                       </div>
                                       <div class="producto_info_marca">
                                           <h3>Marca: </h3>
                                           <p>${item.marca}</p>
                                       </div>
                                       <div class="producto_info_precio">
                                           <h3>Precio: </h3>
                                           <p>$ ${item.precio}</p>
                                       </div>
                                       <div class="producto_info_accion">
                                           <a href="#" id="editar" onclick="editarItem(producto, '${item.modelo}', '${item.marca}')">
                                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                 </svg>
                                           </a>
                                           <a href="#" id="borrar" onclick="eliminarItem(producto, '${item.modelo}', '${item.marca}')" >
                                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                     <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                 </svg>
                                           </a>
                                       </div>
                                   </div>
                               </div>`
           })
    }else{
        lugar.innerHTML = `
                <div class="no_hay_producto" id="no_hay_producto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                    </svg>
                    <h2>No tienes ningun producto agregado</h2>
                </div>
        `
    }
}
//Para imprimir del localStorage los ITEMS al cargar la pagina-----------------------------------------------------------------------------------------

function traerDelLocalStorage() {
    
        let arregloLocalStorage = JSON.parse(localStorage.getItem('productos'))
        if(arregloLocalStorage === null){
            producto = []
            renderItem(producto)
        }else {
            producto = arregloLocalStorage
            renderItem(producto)
        }
}

traerDelLocalStorage()

//Para eliminar los ITEMS-----------------------------------------------------------------------------------------
function eliminarItem (arreglo,modelo,marca) {
    arreglo.forEach(function (item,index) {
        if( item.modelo === modelo && item.marca === marca ) {
            arreglo.splice( index,1 )
            localStorage.setItem('productos' , JSON.stringify(producto))
            renderItem( producto )
        }
    })
    if(arreglo.length === 0){
        localStorage.removeItem('productos')
    }
}

//Para buscar los ITEMS-----------------------------------------------------------------------------------------
let buscador = document.getElementById('buscador')
    buscador.addEventListener('change', () => {
        let valorBuscador = buscador.value
        const productoFiltro = producto.filter( function (item) {return item.modelo == valorBuscador || item.marca == valorBuscador})
        if(productoFiltro.length > 0){
            renderItem(productoFiltro)
        }else {
            alertas(buscador.value , 'buscar')
            buscador.value = ''
        }
    })

let mostrarTodos = document.getElementById('btn_list')
    mostrarTodos.addEventListener('click', () => {
        renderItem(producto)
        buscador.value = ''
    })
//Para Editar los ITEMS-----------------------------------------------------------------------------------------
function editarItem (arreglo,modelo,marca) {
    arreglo.map(function(item,index){   
        if(item.modelo === modelo && item.marca === marca){
            mostrarform('editar');
            inputMarca.value = item.marca
            inputModelo.value = item.modelo
            inputPrecio.value = item.precio
            let btnEditarForm = document.getElementById('editar_form');
                  btnEditarForm.onclick = function(){                     
                    let objEditar = new objeto(inputModelo.value , inputMarca.value , inputPrecio.value);
                     producto.splice(index,1,objEditar);
                     localStorage.setItem('productos' , JSON.stringify(producto))
                     renderItem( producto );
                     mostrarform('cerrar');
                    }
        }
    }) 
}





