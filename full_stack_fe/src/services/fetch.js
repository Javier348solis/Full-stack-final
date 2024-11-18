const apiUrl = "http://127.0.0.1:8000/"
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
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
      throw error; // Devolver el error para que el consumidor pueda manejarlo
    }
  };
  export { guardarUsuario }

//Put
async function actualizaDatos(id, obj) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/productos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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
      
//Delete
async function deleteProduct(id) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/productos/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }
  
      console.log('Producto eliminado correctamente');
      return true; // Devolver un valor de éxito
    } catch (error) {
      console.error('Error al intentar eliminar el producto:', error);
      throw error; // Lanzar el error para que el consumidor lo maneje
    }
  }
  
export { deleteProduct };