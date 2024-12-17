import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import { useCarrito } from '../components/Carrito'; // Obtener el carrito
import Swal from 'sweetalert2';

const Pago = () => {
    const navigate = useNavigate();
    const { productos } = useCarrito(); // Acceder a los productos del carrito

    // Estados del formulario
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [metodoPago, setMetodoPago] = useState(''); // "sinpe" o "transferencia"
    const [comentarios, setComentarios] = useState('');

    // Calcular total del carrito
    const totalCarrito = productos.reduce((total, producto) => total + producto.precio, 0);

    const handlePago = (e) => {
        e.preventDefault();

        // Validar campos obligatorios
        if (!nombre || !telefono || !metodoPago) {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor, complete todos los campos obligatorios.',
            });
            return;
        }

        // Simular envío de los datos al backend
        const datosPago = {
            nombre,
            telefono,
            metodoPago,
            comentarios,
            productos,
            total: totalCarrito,
        };

        console.log('Datos del Pago:', datosPago);

        // Mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: 'Pago registrado',
            text: 'Su pago ha sido registrado con éxito.',
        });

        // Redirigir a la página de confirmación
        navigate('/confirmacion');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 3,
                maxWidth: 600,
                margin: 'auto',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Sistema de Pagos
            </Typography>

            {/* Información del total */}
            <Typography variant="h6" gutterBottom>
                Total a pagar: ₡{totalCarrito.toLocaleString()}
            </Typography>

            {/* Formulario de pago */}
            <form onSubmit={handlePago} style={{ width: '100%' }}>
                <TextField
                    fullWidth
                    label="Nombre completo"
                    variant="outlined"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />

                <TextField
                    fullWidth
                    label="Teléfono"
                    variant="outlined"
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />

                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel>Método de Pago</InputLabel>
                    <Select
                        value={metodoPago}
                        onChange={(e) => setMetodoPago(e.target.value)}
                        label="Método de Pago"
                    >
                        <MenuItem value="sinpe">Sinpe Móvil</MenuItem>
                        <MenuItem value="transferencia">Transferencia Bancaria</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    label="Comentarios adicionales (opcional)"
                    variant="outlined"
                    multiline
                    rows={3}
                    value={comentarios}
                    onChange={(e) => setComentarios(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Confirmar Pago
                </Button>
            </form>
        </Box>
    );
};

export default Pago;
