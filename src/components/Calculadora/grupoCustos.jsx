export default function GrupoCustos({...rest}) {
    return(
        <div className="p-field p-col-12 p-mb-0" key="ComponentGrupoCustos">
            <div className="card">
                <h2>Custos por Venda:</h2>
                <p className="p-mb-4">Informe aqui seus principais custos ao realizar uma venda deste produto</p>
                <div className="p-grid p-fluid">
                    {rest.grupoCustos.map( html => {return html})}
                </div>
            </div>
        </div>
    );
}