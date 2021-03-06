export default function GrupoProduto({...rest}) {
    return(
        <div className="p-field p-col-12 p-mb-0" key="ComponentGrupoProduto">
            <div className="card">
                <h2>Dados do Produto</h2>
                <p className="p-mb-4">Preencha estes dados para que o sistema consiga reconhecer os principais custos de seu produto.</p>
                <div className="p-grid p-fluid">
                    {rest.grupoProduto.map( html => {return html})}
                </div>
            </div>
        </div>
    );
}