let inputModelo = document.getElementById('modelo_form')
let inputMarca = document.getElementById('marca_form')
let inputPrecio = document.getElementById('precio_form')
let inputUrl = document.getElementById('urlImg_form')

 //Para Mostrar el Formulario-----------------------------------------------------------------------------------------
 function mostrarform(opcion){
     const form = document.getElementById('form_container');
     const btnEditar = document.getElementById('editar_form')
     const btnAgregar = document.getElementById('agregar_form')
     const contenedor = document.getElementById('alert_container')
     if(opcion == 'agregar'){
        form.classList.add('form_container_mostrar');
        btnAgregar.classList.remove('agregar_form_novisto')
        btnEditar.classList.remove('editar_form_visto')
        inputModelo.value = ''
        inputMarca.value = ''
        inputPrecio.value = ''
        inputUrl.value = ''
    }else if (opcion === 'editar'){
        form.classList.toggle('form_container_mostrar');
        btnAgregar.classList.add('agregar_form_novisto')
        btnEditar.classList.add('editar_form_visto')
        inputModelo.value = ''
        inputMarca.value = ''
        inputPrecio.value = ''
        inputUrl.value = ''
    }else if(opcion === 'cerrar') {
        form.classList.remove('form_container_mostrar');
    }else if (opcion === 'cerrar alert'){
        contenedor.classList.remove('alert_container_mostrar')
    }
}
//Para agreagr los ITEMS-----------------------------------------------------------------------------------------
class objeto {
    constructor(modelo,marca,precio,url) {
        this.modelo = modelo;
        this.marca = marca;
        this.precio = precio;
        this.url = url;
    }
}
let producto = []

function agergarProducto(){
    let resultIndex = producto.findIndex(function(item){ 
        return item.modelo.toLowerCase() === inputModelo.value.toLowerCase()
    })
    
        if(resultIndex === -1 ){
            let obj = new objeto (inputModelo.value , inputMarca.value , inputPrecio.value , inputUrl.value)
            producto.push(obj)
            localStorage.setItem('productos' , JSON.stringify(producto))
            renderItem(producto)
            mostrarform('cerrar')
        } else{
            mostrarform('cerrar')
            let contenedor = document.getElementById('alert_container')
                contenedor.classList.add('alert_container_mostrar')
            let lugarAlert = document.getElementById('alert_container_info')
            let nodoAlert = document.createElement ('p')
            let textAlert = document.createTextNode(`El elemento: ${inputModelo.value}, ya existe`)
                lugarAlert.innerHTML=''
                nodoAlert.appendChild(textAlert)
                lugarAlert.appendChild(nodoAlert)
        }
} 
//Para Imprimir los ITEMS-----------------------------------------------------------------------------------------
function renderItem(arregloAImprimir){
    const lugar = document.getElementById('lugarItem')
    if (arregloAImprimir.length > 0){
        lugar.innerHTML = ''
        arregloAImprimir.forEach( function (item) {
            lugar.innerHTML += ` <div class="producto" id = "${item.id}">
                                   <div class="producto_imagen">
                                       <img src="${item.url}" alt="">
                                   </div>
                                   <div class="producto_info">
                                       <div class="producto_info_modelo">
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
                                           <a href="#" id="editar" onclick="editarItem(producto, '${item.modelo}', '${item.marca}')">Editar</a>
                                           <a href="#" id="borrar" onclick="eliminarItem(producto, '${item.modelo}', '${item.marca}')" >Eliminar</a>
                                       </div>
                                   </div>
                               </div>`
           })
    }else{
        let lugarimprimireso = lugar.innerHTML = `
                <div class="no_hay_producto" id="no_hay_producto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                    </svg>
                    <h2>No tienes ningun producto agregado</h2>
                </div>
        `
    }
}
//Para eliminar los ITEMS-----------------------------------------------------------------------------------------

function traerDelLocalStorage() {
    
        let arregloLocalStorage = JSON.parse(localStorage.getItem('productos'))
        if(arregloLocalStorage === null){
            producto = []
            const lugar = document.getElementById('lugarItem')
            let lugarimprimireso = lugar.innerHTML = `
                <div class="no_hay_producto" id="no_hay_producto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                    </svg>
                    <h2>No tienes ningun producto agregado</h2>
                </div>
        `
        }else {
            producto = arregloLocalStorage
        renderItem(producto)
        }
}

traerDelLocalStorage()


function eliminarItem (arreglo,modelo,marca) {
    arreglo.forEach(function (item,index) {
        if( item.modelo === modelo && item.marca === marca ) {
            arreglo.splice( index,1 )
            localStorage.setItem('productos' , JSON.stringify(producto))
            renderItem( producto )
        }
    })
}

//Para buscar los ITEMS-----------------------------------------------------------------------------------------
let buscador = document.getElementById('buscador')
    buscador.addEventListener('change', () => {
        let valorBuscador = document.getElementById('buscador').value
        const productoFiltro = producto.filter( function (item) {return item.modelo == valorBuscador || item.marca == valorBuscador})
        renderItem(productoFiltro)
    })
//Para Editar los ITEMS-----------------------------------------------------------------------------------------
function editarItem (arreglo,modelo,marca) {
    arreglo.map(function(item,index){   
        if(item.modelo === modelo && item.marca === marca){
            mostrarform('editar');
            let btnEditarForm = document.getElementById('editar_form');
                  btnEditarForm.onclick = function(){                     
                    let objEditar = new objeto(inputModelo.value , inputMarca.value , inputPrecio.value , inputUrl.value);
                     producto.splice(index,1,objEditar);
                     renderItem( producto );
                     mostrarform('cerrar');
                    }
        }
    }) 
}