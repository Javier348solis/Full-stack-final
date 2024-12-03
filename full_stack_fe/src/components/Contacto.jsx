import React from "react";
import '../styles/Contacto.css';
import { useState } from "react";

const Contacto = () =>{
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
        };
    
        emailjs.send('service_4ptxthw', 'template_e2yr83r', templateParams, 'HowEthmonDVO_H_xp')
          .then((response) => {
            console.log('Correo enviado!', response.status, response.text);
          })
          .catch((error) => {
            console.error('Error al enviar el correo:', error);
          });
      };
    
      return (
        <div className="Contenedor-contacto">
        <form onSubmit={handleSubmit} className="Contenedor-formu">
        <h1 className="titulo">Formulario contacto</h1>
          <label>
            Nombre:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Correo Electronico:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Teléfono:
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Mensaje:
            <textarea name="message" value={formData.message} onChange={handleChange} required />
          </label>
          <br />
          <button type="submit">Enviar</button>
        </form>
        </div>
      );
    };

export default Contacto;