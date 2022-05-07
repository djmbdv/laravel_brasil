import {
    Chart,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";
import "chart.js/auto";

Chart.register(CategoryScale, LinearScale, Title, Tooltip, Legend);
const Pizza = ({ usuarios, dateStart, dateEnd }) => {
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState(null);
    console.log(usuarios);
    useEffect(() => {
        if (usuarios.length > 0)
            axios
                .post(
                    `/api/pizza/${dateStart}/${dateEnd}`,
                    usuarios.map((u) => u.value)
                )
                .then(({ data }) => {
                    setData(data.map((x) => x.receita_liquida));
                    setLabels(data.map((x) => x.nombre));
                    console.log(data);
                });
    }, [usuarios, dateStart, dateEnd]);

    const suma = data ? data.reduce((p, n) => p + n, 0) : 0;
    const options = {
        responsive: true,
        plugins: {
            labels: {
                render: "value",
                fontColor: "#fff",
            },
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Receitas",
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || "";

                        if (label) {
                            label += ": ";
                        }
                        if (context.parsed != null) {
                            label +=
                                new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(context.parsed) +
                                " " +
                                new Intl.NumberFormat("pt-BR", {
                                    maximumSignificantDigits: 3,
                                }).format((context.parsed / suma) * 100.0) +
                                "%";
                        }
                        return label;
                    },
                },
            },
        },
    };

    const dataset = {
        labels: labels,
        datasets: [
            {
                label: "Receita liquida",
                data: data,
                backgroundColor: data?.map(
                    (x) =>
                        "#" + Math.floor(Math.random() * 16777215).toString(16)
                ),
            },
        ],
    };
    return (
        <div className={"col-lg-5 col-md-6 col-xs-12"}>
            {data && <Pie data={dataset} options={options}></Pie>}
        </div>
    );
};

export default Pizza;
