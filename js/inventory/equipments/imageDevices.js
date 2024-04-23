export const deleteImageDevice = (device, images) => {
    images.forEach(id => {
        fetch('../server/insert/delete_img.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                Equipo_id: device,
                Imagen_id: id, 
            })
        })
        .then( response => response.json())
        .then( data => console.log(data))
        .catch( error => console.error('Error:', error));
    });
}