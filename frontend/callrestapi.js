// Usamos la constante BASE_URL definida en config.js
var url = BASE_URL + "/autos";

// 1. POST - Guardar Auto
function postAuto() {
    var myAuto = {
        marca: $('#marca').val(),
        modelo: $('#modelo').val(),
        color: $('#color').val(),
        anio: parseInt($('#anio').val()),
        imagen_url: $('#imagen_url').val()
    };

    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            alert("¡Auto guardado con éxito!");
            $('#marca').val(''); $('#modelo').val(''); $('#color').val('');
            $('#anio').val(''); $('#imagen_url').val('');
            getAutos();
        },
        error: function(error) {
            alert("Error al guardar el auto.");
        },
        data: JSON.stringify(myAuto)
    });
}

// 2. DELETE - Borrar Auto (¡NUEVO!)
function deleteAuto(id) {
    // Agregamos una alerta para confirmar que no le dimos clic por accidente
    if(confirm("¿Estás seguro de que quieres eliminar este vehículo?")) {
        $.ajax({
            url: url + '/' + id, // Le pasamos el ID en la URL
            type: 'DELETE',
            success: function(result) {
                alert("¡Vehículo eliminado de la base de datos!");
                getAutos(); // Recargamos la tabla para que desaparezca
            },
            error: function(error) {
                alert("Hubo un error al eliminar.");
            }
        });
    }
}

// 3. GET - Mostrar Autos (Actualizado a Grid de Tarjetas Material)
function getAutos() {
    $.getJSON(url, function(json) {
        var arrAutos = json.autos;
        var htmlCards = '';

        if (!arrAutos || arrAutos.length === 0) {
            $('#resultado').html('<p style="text-align:center; color:#5f6368; width:100%;">No hay autos registrados aún. ¡Añade uno!</p>');
            return;
        }

        arrAutos.forEach(function(item) {
            // Manejar si falta la imagen (esto lo hacemos por si un auto llega sin URL)
            var imgUrl = item.imagen_url || 'https://via.placeholder.com/300x180?text=Sin+Imagen';

            htmlCards += `
                <div class="car-card">
                    <img src="${imgUrl}" alt="Foto ${item.marca} ${item.modelo}" class="car-image">
                    <div class="car-content">
                        <h3 class="car-title">${item.marca} ${item.modelo}</h3>
                        <p class="car-subtitle">ID: ${item.id}</p>
                        <div class="car-details">
                            <strong>Color:</strong> ${item.color} <br>
                            <strong>Año:</strong> ${item.anio}
                        </div>
                    </div>
                    <div class="car-actions">
                        <button class="btn-delete" onclick="deleteAuto(${item.id})">Eliminar</button>
                    </div>
                </div>
            `;
        });

        $('#resultado').html(htmlCards);
    }).fail(function() {
        $('#resultado').html('<p style="text-align:center; color:#d93025; width:100%;">Error al conectar con la API.</p>');
    });
}