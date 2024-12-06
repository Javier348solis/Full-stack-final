import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { obtenerUsuario } from "../services/fetch";

const GraficosVentas = () => {
  const [ventas, setVentas] = useState({ hombre: 0, mujer: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const data = await obtenerUsuario('ventas-por-genero');
      setVentas(data);
    };
    fetchData();
  }, []);

  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Hombre', 'Mujer'],
    },
    yaxis: {
      title: {
        text: 'Ventas'
      }
    },
    title: {
      text: 'Ventas de Perfumes por Género',
      align: 'center'
    }
  };

  const series = [{
    name: 'Ventas',
    data: [ventas.hombre, ventas.mujer]
  }];

  return (
    <div>
      <ApexCharts options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default GraficosVentas;

