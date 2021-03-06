export default function GrupoDespesas({...rest}) {
    return(
        <div className="p-field p-col-12 p-mb-0" key="ComponentGrupoDespesas">
            <div className="card">
                <h2>Outras Despesas:</h2>
                <p className="p-mb-4">Caso possua, informe as suas devidas despesas para cada venda do produto em calculo.</p>
                <div className="p-grid p-fluid">
                    {rest.grupoDespesas.map( html => {return html})}
                </div>
            </div>
        </div>

    );
}