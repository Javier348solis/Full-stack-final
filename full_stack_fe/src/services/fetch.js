const apiUrl = "http://127.0.0.1:8000/api/"

const imgURL = "https://api.cloudinary.com/v1_1/dz4ghehm5/upload"

const obtenerUsuario = async (endpoint) => {
    try {
      const response = await fetch(apiUrl + endpoint);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
      throw error; // Se Devuelve el error para que el consumidor pueda manejarlo
    }
  };
  export { obtenerUsuario }

  //POST
  const guardarUsuario = async (obj, endpoint) => {
    try {
      const response = await fetch(apiUrl + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });
  
  
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }
  };
  export { guardarUsuario }

  //POST 
  const guardarPost = async (obj, endpoint) => {
    try {
      const response = await fetch(apiUrl + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(obj),
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error al guardar el post:', error);
    }
  }
  export { guardarPost }



  //POST Imagenes
  const guardarImagenes = async (file, preset) => {
    try {
      const formData = new FormData();
      

      formData.append('file', file)
      formData.append('upload_preset', preset)

      const response = await fetch(imgURL , {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error al guardar las imágenes:', error);
    }
  };
  
  export { guardarImagenes };  
  

//Patch
async function actualizaDatos(id, obj) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/productos/update/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const datos = await response.json();
    console.log(datos);
    return datos; // Devuelves los datos actualizados
  } catch (error) {
    console.error('Error al actualizar datos:', error);
    throw error; // Lanzar el error para que el consumidor lo maneje
  }
}
export {actualizaDatos }  
      
/// Función para eliminar un producto
async function deleteProduct(id) {
  if (!id) throw new Error("ID no proporcionado para eliminar el producto");

  try {
    const response = await fetch(`http://127.0.0.1:8000/productos/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error ${response.status}: ${
          errorData.detail || "No se pudo eliminar el producto"
        }`
      );
    }

    console.log("Producto eliminado correctamente");
    return true;
  } catch (error) {
    console.error("Error al intentar eliminar el producto:", error);
    throw error;
  }
}
export { deleteProduct };

function eliminarTodasLasCookies() {
  // Obtener todas las cookies como un solo string
  const cookies = document.cookie.split(";");

  // Iterar sobre todas las cookies y eliminarlas
  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const [nombre] = cookie.split("=");

      // Configurar la cookie con una fecha de expiración en el pasado
      document.cookie = nombre.trim() + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
  }
  console.log("Todas las cookies han sido eliminadas.");
}

export { eliminarTodasLasCookies }