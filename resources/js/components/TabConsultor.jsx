import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import BarGra from "./Bar";
import Pizza from "./Pizza";
import Relatorio from "./Relatorio";

export const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];

const MES_INICIAL = 0;
const ANO_INICIAL = 2006;

const MES_FINAL = 11; // december
const ANO_FINAL = 2022;
export default function TabConsultor(props) {
    const [listaConsultores, setListaConsultores] = useState([]);
    const [listaConsultados, setListaConsultados] = useState([]);
    const [typeShowData, setTypeShowData] = useState("relatorio");
    const selectConsultores = useRef();
    const selectConsultados = useRef();
    const selectDateMothStart = useRef();
    const selectDateYearStart = useRef();
    const selectDateMothEnd = useRef();
    const selectDateYearEnd = useRef();
    const [filtro, setFiltro] = useState("");
    const [dateStart, setDateStart] = useState("200601");
    const [dateEnd, setDateEnd] = useState("202212");
    useEffect(() => {
        axios
            .get("/api/usuarios")
            .then((data) => {
                console.log(JSON.stringify(data));
                setListaConsultores(
                    data.data.map((a) => {
                        return { name: a.no_usuario, value: a.co_usuario };
                    })
                );
            })
            .catch((e) => console.error("Ocurrio un error"));
    }, []);

    const years = [...Array(17).keys()].map((k) => k + 2006);

    return (
        <>
            <div className="row container pt-3">
                <div className="row">
                    <div>
                        Periodo
                        <select
                            className="form-control date"
                            ref={selectDateMothStart}
                            defaultValue={MES_INICIAL}
                            onChange={(e) =>
                                setDateStart(
                                    `${selectDateYearStart.current.value}${e.target.value}`
                                )
                            }
                            type="date"
                        >
                            {meses.map((m, k) => (
                                <option
                                    key={k}
                                    value={k + 1 < 10 ? `0${k + 1}` : k + 1}
                                >
                                    {m}
                                </option>
                            ))}
                        </select>
                        <select
                            className="form-control date"
                            ref={selectDateYearStart}
                            defaultValue={ANO_INICIAL}
                            onChange={(e) =>
                                setDateStart(
                                    `${e.target.value}${selectDateMothStart.current.value}`
                                )
                            }
                            type="date"
                        >
                            {years.map((m, k) => (
                                <option key={k} value={m}>
                                    {m}
                                </option>
                            ))}
                        </select>{" "}
                        a{" "}
                        <select
                            className="form-control date"
                            ref={selectDateMothEnd}
                            defaultValue={MES_FINAL}
                            onChange={(e) =>
                                setDateEnd(
                                    `${selectDateYearEnd.current.value}${e.target.value}`
                                )
                            }
                            type="date"
                        >
                            <option></option>
                            {meses.map((m, k) => (
                                <option
                                    key={k}
                                    value={k + 1 < 10 ? `0${k + 1}` : k + 1}
                                >
                                    {m}
                                </option>
                            ))}
                        </select>
                        <select
                            className="form-control date"
                            defaultValue={ANO_FINAL}
                            ref={selectDateYearEnd}
                            onChange={(e) =>
                                setDateEnd(
                                    `${e.target.value}${selectDateMothEnd.current.value}`
                                )
                            }
                            type="date"
                        >
                            {years.map((m, k) => (
                                <option key={k} value={m}>
                                    {m}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-outline m-2 filtro">
                        <input
                            type="text"
                            id="formText"
                            className="form-control"
                            aria-describedby="filtro"
                            onChange={(e) => setFiltro(e.target.value)}
                        />
                        <label className="form-label" htmlFor="formText">
                            Filtro
                        </label>
                    </div>
                </div>

                <div className="col-lg-4 col-sm-12">
                    <div className="row p-2">
                        <select
                            className="custom-select lista"
                            ref={selectConsultores}
                            multiple={true}
                            onChange={(e) => {
                                console.log(e.target.value);
                            }}
                        >
                            {listaConsultores &&
                                listaConsultores.map((a, k) => (
                                    <option key={k} value={a.value}>
                                        {a.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
                <div className="col-1 col-sm-1">
                    <div className="row p-2">
                        <button
                            className="btn"
                            onClick={() => {
                                var list = [];
                                const selecteds =
                                    selectConsultores.current.selectedOptions;
                                for (
                                    let index = 0;
                                    index < selecteds.length;
                                    index++
                                ) {
                                    list.push({
                                        value: selecteds.item(index).value,
                                        name: selecteds.item(index).text,
                                    });
                                }
                                setListaConsultados([
                                    ...listaConsultados,
                                    ...list,
                                ]);
                                console.log(
                                    listaConsultores.filter(
                                        (e) => list.indexOf(e) < 0
                                    )
                                );
                                setListaConsultores(
                                    listaConsultores.filter(
                                        (e) =>
                                            !list
                                                .map((a) => a.value)
                                                .includes(e.value)
                                    )
                                );
                            }}
                        >
                            <i className={"fa-solid fa-arrow-right"}></i>
                        </button>
                        <button
                            className="btn"
                            onClick={() => {
                                var list = [];
                                const selecteds =
                                    selectConsultados.current.selectedOptions;
                                for (
                                    let index = 0;
                                    index < selecteds.length;
                                    index++
                                ) {
                                    list.push({
                                        value: selecteds.item(index).value,
                                        name: selecteds.item(index).text,
                                    });
                                }
                                setListaConsultores([
                                    ...listaConsultores,
                                    ...list,
                                ]);
                                setListaConsultados(
                                    listaConsultados.filter(
                                        (e) =>
                                            !list
                                                .map((a) => a.value)
                                                .includes(e.value)
                                    )
                                );
                            }}
                        >
                            <i className={"fa-solid fa-arrow-left"}></i>
                        </button>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-12  m-sm-2">
                    <div className="row p-2">
                        <select
                            className="custom-select lista"
                            ref={selectConsultados}
                            multiple={true}
                        >
                            {listaConsultados &&
                                listaConsultados.map((a, k) => (
                                    <option key={k} value={a.value}>
                                        {a.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
                <div className="col-1">
                    <div className="btn-group-vertical" role="group">
                        <button
                            className={`btn btn-outline${
                                typeShowData == "relatorio" ? "-primary" : ""
                            }`}
                            onClick={() => setTypeShowData("relatorio")}
                        >
                            Relatorio
                        </button>
                        <button
                            className={`btn btn-outline${
                                typeShowData == "grafico" ? "-primary" : ""
                            }`}
                            onClick={() => setTypeShowData("grafico")}
                        >
                            Grafico
                        </button>
                        <button
                            className={`btn btn-outline${
                                typeShowData == "pizza" ? "-primary" : ""
                            }`}
                            onClick={() => setTypeShowData("pizza")}
                        >
                            Pizza
                        </button>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                {typeShowData == "relatorio" && (
                    <Relatorio
                        usuarios={listaConsultados}
                        dateStart={dateStart}
                        dateEnd={dateEnd}
                    ></Relatorio>
                )}
                {typeShowData == "grafico" && (
                    <BarGra
                        usuarios={listaConsultados}
                        dateStart={dateStart}
                        dateEnd={dateEnd}
                    ></BarGra>
                )}
                {typeShowData == "pizza" && (
                    <Pizza
                        usuarios={listaConsultados}
                        dateStart={dateStart}
                        dateEnd={dateEnd}
                    ></Pizza>
                )}
            </div>
        </>
    );
}
