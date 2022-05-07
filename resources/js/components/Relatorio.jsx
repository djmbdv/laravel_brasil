import CardRelatorio from "./CardRelatorio";

const Relatorio = (props) => {
    const { usuarios, dateStart, dateEnd } = props;

    console.log(usuarios);

    return (
        <div>
            {usuarios &&
                usuarios.map((o, k) => (
                    <CardRelatorio
                        key={k}
                        user={o}
                        date_start={dateStart}
                        date_end={dateEnd}
                    />
                ))}
        </div>
    );
};

export default Relatorio;
