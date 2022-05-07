import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Point,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";

import "chart.js/auto";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "receitas",
        },
    },
    scales: {
        y: {
            ticks: {
                callback: function (value, index, ticks) {
                    return Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    }).format(value);
                },
            },
        },
    },
};

import { meses } from "./TabConsultor";

const formatPeriodo = (f) => {
    return `${meses[parseInt(f.toString().slice(4)) - 1]} de ${f
        .toString()
        .slice(0, 4)}`;
};

const BarGra = ({ usuarios, dateStart, dateEnd }) => {
    const [labels, setLabels] = useState([]);
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        if (usuarios)
            axios
                .post(
                    `/api/bar/${dateStart}/${dateEnd}`,
                    usuarios.map((u) => u.value)
                )
                .then((data) => {
                    const l = data.data;
                    const o = [...new Set(l.map((a) => a.fecha))].map((f) => {
                        return {
                            list: l.filter((j) => j.fecha == f),
                            fecha: f,
                        };
                    });
                    const datos = usuarios.map((u) => {
                        return {
                            label: u.name,
                            data: o.map(
                                (x) =>
                                    x.list.filter(
                                        (y) => y.usuario == u.value
                                    )[0]?.receita_liquida ?? 0
                            ),
                            backgroundColor:
                                "#" +
                                Math.floor(Math.random() * 16777215).toString(
                                    16
                                ),
                        };
                    });
                    setLabels(
                        o.map((x) => x.fecha).map((x) => formatPeriodo(x))
                    );
                    const dataline = {
                        label: "Cuxto fixo",
                        backgroundColor: "yellow",
                        data: o.map((x) => {
                            return (
                                x.list.reduce((p, n) => p + n.salario, 0) /
                                x.list.length
                            );
                        }),
                        type: "line",
                    };

                    console.log(dataline);
                    console.log(o);
                    console.log(datos);
                    setDatas([dataline, ...datos]);
                });
    }, [dateStart, dateEnd, usuarios]);
    console.log("datas", datas);
    const data = {
        labels,
        datasets: [...datas],
    };
    return <Bar options={options} data={data} />;
};

export default BarGra;
