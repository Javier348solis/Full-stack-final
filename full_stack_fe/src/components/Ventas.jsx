import { useState,useEffect } from 'react';
import Chart from 'react-apexcharts';
import { guardarPost,obtenerUsuario } from '../services/fetch';
const Ventas = () => {
    const [tipoGrafico, setTipoGrafico] = useState('bar');
    const [ventasHombre, setVentasHombre] = useState(0);
    const [ventasMujer, setVentasMujer] = useState(0);
    const [totalVentas, setTotalVentas] = useState({
        series: [{
            name: "Ventas totales",
            data: [ventasHombre, ventasMujer] // Valores correspondientes a las categorías
        }],
        options: {
            chart: {
                height: 350,
                type: tipoGrafico,
                toolbar: {
                    show: false
                }
            },
            colors: ['#546E7A'],
            dataLabels: {
                enabled: true, // Muestra los valores sobre el gráfico
                style: {
                    colors: ['#fff'], // Color del texto de las etiquetas
                    fontSize: '14px',
                }
            },
            title: {
                text: 'Ventas totales',
                align: 'center'
            },
            xaxis: {
                categories: ['Hombre', 'Mujer'], // Categorías para los ejes
                labels: {
                    style: {
                        fontSize: '12px',
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '12px',
                    }
                }
            }
        }
    });
    useEffect(() => {
        const obtenerDatos = async()=>{
            try {
                const peticion = await obtenerUsuario('crear-producto/')
                const coloniasHombre = peticion.filter((colonia)=>colonia.genero === 'Hombre')
                const coloniasMujer = peticion.filter((colonia)=>colonia.genero === 'Mujer')
                setVentasHombre(coloniasHombre.length);
                setVentasMujer(coloniasMujer.length);
            } catch (error) {
                console.log(error)
            }
        }
        obtenerDatos()
    },[])
    return (
        <>
            <h1>Ventas</h1>
            <Chart
                options={totalVentas.options}
                series={totalVentas.series}
                type={tipoGrafico}
                width="500"
                height="320"
            />
        </>
    );
};

export default Ventas;
