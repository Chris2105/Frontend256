function mostrarClientes() {
    let request = sendRequest('clientes', 'GET', '');
    let table = document.getElementById('clientes-table');
    table.innerHTML = "";
    request.onload = function () {
        let data = request.response;
        console.log(data);
        data.forEach(element => {
            table.innerHTML += `
        <tr>
        <td>${element.nombres}</td>
        <td>${element.apellidos}</td>
        <td>${element.documento}</td>
        <td>${element.correo}</td>
        <td>${element.telefono}</td>
        <td>${element.direccion}</td>
        <td>
            <button type="button" class ="btn btn-primary" onclick='window.location = "/formClientes.html?id=${element._id}"'>Editar</button> 
            <button type="button" class ="btn btn-danger" onclick='deleteClientes("${element._id}")'>Eliminar</button>
        </td>
        </tr>
        `
        });
    }
    request.onerror = function(){
        table.innerHTML = `
        <tr>
        <td colspan="">Error al traer los datos</td>
        </tr>
        `
    }
}

function deleteClientes(id) {
    let request = sendRequest('clientes/' + id, 'DELETE', '');
    request.onload = function () {
        if (request.status === 200) {
            console.log('Cliente eliminado con éxito');
            mostrarClientes(); // Actualiza la lista de clientes
        } else {
            console.error('Error al eliminar el cliente:', request.response);
        }
    }
    request.onerror = function() {
        console.error('Error de red al intentar eliminar el cliente');
    }
}


function guardarClientes(){
    let nom = document.getElementById('nombres-n').value
    let ape = document.getElementById('apellidos-a').value
    let doc = document.getElementById('documento-d').value
    let cor = document.getElementById('correo-c').value
    let tel = document.getElementById('telefono-t').value
    let dir = document.getElementById('direccion-d').value
    let data = {'nombres':nom, 'apellidos':ape, 'documento':doc, 'correo':cor, 'telefono':tel, 'direccion':dir}
    let request = sendRequest('clientes/', 'POST', data);
    request.onload = function(){
        window.location = 'clientes.html';
    }
    request.onerror = function(){
        console.log("Error al guardar los datos")
    }
}

function cargarDatos(id) {
    if (!id) {
        console.log("No se proporcionó un ID de cliente");
        return; // Salir de la función si no hay ID
    }

    let request = sendRequest('clientes/' + id, 'GET', '');
    let nom = document.getElementById('nombres-n')
    let ape = document.getElementById('apellidos-a')
    let doc = document.getElementById('documento-d')
    let cor = document.getElementById('correo-c')
    let tel = document.getElementById('telefono-t')
    let dir = document.getElementById('direccion-d')
    
    request.onload = function() {
        if (request.status === 200) {
            let data = request.response;
            if (data && typeof data === 'object') {
                nom.value = data.nombres || '';
                ape.value = data.apellidos || '';
                doc.value = data.documento || '';
                cor.value = data.correo || '';
                tel.value = data.telefono || '';
                dir.value = data.direccion || '';
                console.log(data);
            } else {
                console.error("La respuesta no es un objeto válido:", data);
            }
        } else {
            console.error("Error al cargar los datos. Estado:", request.status);
        }
    }
    request.onerror = function() {
        console.error("Error de red al intentar cargar los datos");
    }
}



function modificarClientes(id){

    let nom = document.getElementById('nombres-n').value
    let ape = document.getElementById('apellidos-a').value
    let doc = document.getElementById('documento-d').value
    let cor = document.getElementById('correo-c').value
    let tel = document.getElementById('telefono-t').value
    let dir = document.getElementById('direccion-d').value
    let data = {'nombres':nom, 'apellidos':ape, 'documento':doc, 'correo':cor, 'telefono':tel, 'direccion':dir}
    let request = sendRequest('clientes/'+id, 'PUT', data);
    request.onload = function(){
        window.location = 'clientes.html';
    }
    request.onerror = function(){
        console.log("Error al guardar los datos")
    }
}


