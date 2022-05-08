import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { meses } from "./TabConsultor";

const formatPeriodo = (f) => {
    return `${meses[parseInt(f.toString().slice(4)) - 1]} de ${f
        .toString()
        .slice(0, 4)}`;
};
const CardRelatorio = ({ user, date_start, date_end }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios
            .get(`/api/data/${user.value}/${date_start}/${date_end}`)
            .then((data) => setData(data.data));
    }, [date_start, date_end]);
    console.log(data);
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <table className="table table-hover text-nowrap">
                    <thead>
                        <tr>
                            <th scope="col">Periodo</th>
                            <th scope="col">Receita Líquida</th>
                            <th scope="col">Custo Fixo</th>
                            <th scope="col">Comissão</th>
                            <th scope="col">Lucro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((p, k) => (
                                <tr key={k}>
                                    <th scope="row">
                                        {formatPeriodo(p.fecha)}
                                    </th>
                                    <td>
                                        <span>
                                            <span>
                                                {new Intl.NumberFormat(
                                                    "pt-BR",
                                                    {
                                                        style: "currency",
                                                        currency: "BRL",
                                                    }
                                                ).format(p.receita_liquida)}
                                            </span>
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                            <span>
                                                {new Intl.NumberFormat(
                                                    "pt-BR",
                                                    {
                                                        style: "currency",
                                                        currency: "BRL",
                                                    }
                                                ).format(p.salario)}
                                            </span>
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                            <span>
                                                {new Intl.NumberFormat(
                                                    "pt-BR",
                                                    {
                                                        style: "currency",
                                                        currency: "BRL",
                                                    }
                                                ).format(p.comissao)}
                                            </span>
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`text-${p.receita_liquida -
                                                        p.comissao -
                                                        p.salario >
                                                    0 ? "success":"danger"}`}>
                                            <i
                                                className={`fas fa-caret-${
                                                    p.receita_liquida -
                                                        p.comissao -
                                                        p.salario >
                                                    0
                                                        ? "up"
                                                        : "down"
                                                } me-1`}
                                            ></i>
                                            <span>
                                                {new Intl.NumberFormat(
                                                    "pt-BR",
                                                    {
                                                        style: "currency",
                                                        currency: "BRL",
                                                    }
                                                ).format(
                                                    p.receita_liquida -
                                                        p.comissao -
                                                        p.salario
                                                )}
                                            </span>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CardRelatorio;
