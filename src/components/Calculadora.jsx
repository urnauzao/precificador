import React, { useState, useContext } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import CurrencyInput from 'react-currency-input-field';
import { CalculadoraContext } from '../contexts/CalculadoraContext';
import styles from '../../styles/pages/calculadora.module.css';
import GrupoProduto from './Calculadora/grupoProduto';
import GrupoCustos from './Calculadora/grupoCustos';
import GrupoDespesas from './Calculadora/grupoDespesas';

const valoresCamposCalculadora = {
    'sku': "",
    'qtd':"1",
    'custo':"0",
    'imposto':"0",
    'despfixa':"0",
    'despop':"0",
    'despads':"0",
    'comissao':{
        'ml_p':{id:'ml_p','tipo':'Premium', 'taxa':'16', 'precovenda':'0'}, 
        'ml_c':{id:'ml_c','tipo':'Clássico', 'taxa':'11', 'precovenda':'0'},
        'sh_d':{id:'sh_d','tipo':'Padrão', 'taxa': '5', 'precovenda': '0'}
    },
    // 'mlucro':"10",
    // 'precovenda':"0",
    'custofrete':"0"
}

const mockValoresCamposCalculadora = {
    'sku': "Tenis All Star Und",
    'qtd':"1",
    'precovenda':"210,00",
    'custo':"10,90",
    'custofrete':"6,90",
    'mlucro':"20",
    'despfixa':"12",
    'despop':"13",
    'despads':"10",
    'imposto':"11",
    'comissao':{'ml_p':{id:'ml_p','tipo':'Premium', 'taxa':'15', 'precovenda':'210,00'}, 'ml_c':{id:'ml_c','tipo':'Clássico', 'taxa':'10', 'precovenda':'190,00'}},
}

const marketplacesOptions = [
    {
        nome: 'Mercado Livre',
        sigla: 'ML',
        moeda: 'BRL',
        taxa_venda:{
            custom: false,
            modo_ofertas: {
                ml_c:{id:'ml_c', tipo:'Clássico', taxa: '11'},
                ml_p:{id:'ml_p', tipo:'Premium', taxa: '16'}
            },  
            opcoes: [
                {taxa:'9', texto:"9%"},
                {taxa:'10', texto:"10%"},
                {taxa:'11', texto:"11%"},
                {taxa:'12', texto:"12%"},
                {taxa:'13', texto:"13%"},
                {taxa:'14', texto:"14%"},
                {taxa:'15', texto:"15%"},
                {taxa:'16', texto:"16%"},
                {taxa:'17', texto:"17%"},
                {taxa:'18', texto:"18%"},
                {taxa:'19', texto:"19%"},
                {taxa:'20', texto:"20%"}
            ],
            regras:[
                {
                    mensagem:"Até R$ 79,00: frete grátis opcional e taxa de R$ 5,00 a mais sobre comissão do marketplace",
                    custo_fixo:5,
                    frete_gratis_obrigatorio: false,
                    comissao_fixa: false,
                    comissao_sobre_frete: false,
                    custo_minimo: 7,
                    custo_maximo: 79,
                    ofertas_enquadradas:['ml_p','ml_c']
                }
            ]
        },
        forma_envio:{
            frete_gratis_obrigatorio: false,
            permite_frete_gratis:true,
            custo_frete_gratis: 0,
            envio_gratis_personalizado: true,
            custo_envio_personalizado: 0,
            custo_regional_personalizado: false,
            custo_regional:{
                norte:0,
                sudest:0,
                nordeste:0,
                noroeste:0,
                sul:0
            },
            imposto_sobre_envio: false,
        },
    },
    {
        nome: 'Shopee',
        sigla: 'sh',
        moeda: 'BRL',
        taxa_venda:{
            custom: false,
            modo_ofertas: {
                sh_d:{id:'sh_d', tipo:'Padrão', taxa: '11'},
            },  
            opcoes: [
                {taxa:'0', texto:"Sem custos"},
                {taxa:'5', texto:"5%"},
            ],
            regras:[
            ]
        },
        forma_envio:{
            frete_gratis_obrigatorio: false,
            permite_frete_gratis:true,
            custo_frete_gratis: 0,
            envio_gratis_personalizado: true,
            custo_envio_personalizado: 0,
            custo_regional_personalizado: false,
            custo_regional:{
                norte:0,
                sudest:0,
                nordeste:0,
                noroeste:0,
                sul:0
            },
            imposto_sobre_envio: false,
        },
    }
    // ,{ nome: 'B2W', code: 'B2W', 'sale_fee': null, 'frete_gratis':true},
];

export const Calculadora = () => {

    const [marketplaceSelecionado, setMarketplaceSelecionado] = useState("");
    const {opcoes_comissao, inputsCalculadora} = useContext(CalculadoraContext);

    /** @argument ('comentado apenas para trablabalhar com dados do mock') */
    const [valoresCalculadora, setValoresCalculadora] = useState(valoresCamposCalculadora);
    // const [valoresCalculadora, setValoresCalculadora] = useState({...valoresCamposCalculadora, ...mockValoresCamposCalculadora});
    
    
    const [showPrevisaoLucros, setShowPrevisaoLucros] = useState("fc-limited");
    const [valoresComissao, setValoresComissao] = useState({default:{id:'default','tipo':'Padrão', 'taxa':'16'}});

    const preencherValoresCalculadora = ( campo, valor ) => {
        let valores =  {...valoresCalculadora};
        valores[campo] = valor;
        setValoresCalculadora(valores);
    }

    const preencherValoresComissao = (id, nome, valor = null, precoVenda = null) => {
        let valores =  {...valoresCalculadora};
        let comissoes = {...valores.comissao};
        comissoes[id] = {id:id,'tipo':nome,'taxa':valor,'precovenda':precoVenda};
        preencherValoresCalculadora('comissao', comissoes);
    }

    const validarValorDecimal = (valor) => {
        console.log(valor)
        let valorValido = valor;
        if(typeof valor === typeof ""){
            if(valor.includes(".") && valor[(valor.length-1)] !== ".")
                valorValido = valor.replace(".", "");
            if(valor.includes(",") && valor[(valor.length-1)] !== ",")
                valorValido = valor.replace(",", ".");
        }
        return valorValido;
    }

    const stringToFloat = (valor) => {
        let result = valor.replace(',', '.');
        return parseFloat(result);
    }

    const formatCurrency = (value) => {
        value = parseFloat(value);
        if(isNaN(value))
        value = 0;
        return value.toLocaleString('pt-BR', { minimumFractionDigits:2, maximumFractionDigits: 2 , style: 'currency', currency: 'BRL', currencyDisplay: "symbol"});
    }

    const validaPrecoBaseParaComissao = (valor) => {
        let valores =  {...valoresCalculadora};
        let comissoes = {...valores.comissao};
        for(const key in comissoes){
            if(comissoes[key].precovenda === null){
                comissoes[key].precovenda = valor;
                preencherValoresCalculadora('comissao', comissoes);
            }
        }

    }

    const calcular = (modo) => {
        if(typeof valoresCalculadora.comissao[modo] === typeof undefined || typeof valoresCalculadora.comissao[modo].precovenda === ""){
            return {
                status: "---",
                mensagens_alerta:"Selecione um valor de comissão para que o sistema realize a previsão de lucros!",
                tabela:[]
            }
        }
        let precoVenda = stringToFloat(valoresCalculadora.comissao[modo].precovenda === null ? "0,0" : valoresCalculadora.comissao[modo].precovenda);
        let custoFixo = 0;
        let comissaoSobreFrete = false;
        let mensagensAlerta = [];
        if(typeof marketplaceSelecionado.taxa_venda.regras === typeof [] && marketplaceSelecionado.taxa_venda.regras.length){
            for(const regra of marketplaceSelecionado.taxa_venda.regras){
                if(regra.ofertas_enquadradas.includes(modo) && precoVenda >= regra.custo_minimo && precoVenda < regra.custo_maximo){
                    custoFixo = regra.custo_fixo === "" ? 0 : regra.custo_fixo;
                    if(!mensagensAlerta.includes(regra.mensagem))
                        mensagensAlerta.push(regra.mensagem);
                }
            }
        }
        
        let taxaExposicao = valoresCalculadora.comissao[modo].taxa;
        if(taxaExposicao === "") taxaExposicao = 0;
        let custoExposicao = (precoVenda * (taxaExposicao/100))+custoFixo;
        let taxaImposto = valoresCalculadora.imposto === "" ? 0 : valoresCalculadora.imposto;        
        let custoImposto = precoVenda * (taxaImposto/100);
        let custoEnvio = stringToFloat((valoresCalculadora.custofrete === "" || typeof valoresCalculadora.custofrete === typeof undefined ? "0" : valoresCalculadora.custofrete));
        let custoProduto = stringToFloat((valoresCalculadora.custo === "" || typeof valoresCalculadora.custo === typeof undefined ? "0" : valoresCalculadora.custo));
        if(custoProduto === 0){
            mensagensAlerta.push("Recomendamos que insira uma valor de custo de produto para fazer sentido ao calculo de lucros");
        }
        let qtd = stringToFloat((valoresCalculadora.qtd === "" || typeof valoresCalculadora.qtd === typeof undefined ? "0" : valoresCalculadora.qtd));
        let custoTotalProduto = custoProduto*qtd;
        let despesasFixas = stringToFloat((valoresCalculadora.despfixa === "" || typeof valoresCalculadora.despfixa === typeof undefined ? "0" : valoresCalculadora.despfixa));
        let despesasOperacionais = stringToFloat((valoresCalculadora.despop === "" || typeof valoresCalculadora.despop === typeof undefined ? "0" : valoresCalculadora.despop));
        let despesasTrafego = stringToFloat((valoresCalculadora.despads === "" || typeof valoresCalculadora.despads === typeof undefined ? "0" : valoresCalculadora.despads));
        // let margemLucro = (valoresCalculadora.mlucro === "" ? 0 : valoresCalculadora.mlucro);
        // margemLucro = margemLucro/100;
        // let lucroDesejadoVenda = precoVenda*margemLucro;
        // let lucroDesejadoProduto = custoProduto*margemLucro;
        let lucroVenda = precoVenda - (
            custoExposicao + custoEnvio + custoTotalProduto + despesasFixas + despesasOperacionais + despesasTrafego + custoImposto
        );
        let porcentagemSobreLucroVenda = 0;
        if(precoVenda !== 0){
            if(!isNaN(lucroVenda/precoVenda)) porcentagemSobreLucroVenda = (lucroVenda/precoVenda).toLocaleString("pt-BR",{style:"percent", currency:"BRL"});
        }else{
            porcentagemSobreLucroVenda = "0".toLocaleString("pt-BR",{style:"percent", currency:"BRL"});
        }
        let porcentagemSobreLucroProduto = 0;
        if(custoProduto !== 0){
            if(!isNaN(lucroVenda/custoProduto)) porcentagemSobreLucroProduto = (lucroVenda/custoProduto).toLocaleString("pt-BR",{style:"percent", currency:"BRL"});
        }else{
            porcentagemSobreLucroProduto = "0".toLocaleString("pt-BR",{style:"percent", currency:"BRL"});
        }
        

        let tabela = [
            {nome:"Preço de Venda:", valor:formatCurrency(precoVenda)},
            {nome:"Lucro Estimado:", valor:formatCurrency(lucroVenda)},
            {nome:"Impostos:", valor:formatCurrency(custoImposto)},
            {nome:"Custo Total do Produto:", valor:formatCurrency(custoTotalProduto)},
            {nome:"Taxa Marketplace:", valor:formatCurrency(custoExposicao)},
            // {nome:"Lucro sobre Produto:", valor:formatCurrency(lucroDesejadoProduto)},
            {nome:"Margem de Lucro sobre Produto:", valor:porcentagemSobreLucroProduto},
            // {nome:"Lucro sobre Venda:", valor:formatCurrency(lucroDesejadoVenda)},
            {nome:"Margem de Lucro sobre Venda:", valor:porcentagemSobreLucroVenda},
        ];

        return {
            status: "Excelente",
            mensagens_alerta:mensagensAlerta,
            tabela:tabela
        }
        
    }

    const gerarCamposCalculadora = () =>{
        let modo_ofertas = marketplaceSelecionado.taxa_venda.modo_ofertas;
        let divClass ="p-col-12 p-md-4 p-lg-2 p-py-0";
        let grupoProduto = [];
        let grupoCustos = [];
        let grupoDespesas = [];
        let conjuntoCampos = [];
        for(const campo of inputsCalculadora){
            let elemento;
            switch(campo.tipo){
                case 'int':
                    elemento = <div className={divClass} key={campo.key}>
                        <div className="p-field">
                            <span className="p-float-label">
                                <InputText className="p-text-center u-font-title" type="text" id={"input"+campo.key} defaultValue={valoresCalculadora[campo.key]} 
                                    onChange={(e) => {if(campo.min && e.target.value < campo.min){e.target.value = campo.min} preencherValoresCalculadora(campo.key, e.target.value)}}/>
                                <label className="u-fw-600" htmlFor={"input"+campo.key}>{campo.texto}</label>
                            </span>
                        </div>
                    </div>;
                    switch(campo.grupo){
                        case 'produto':
                            grupoProduto = [...grupoProduto,elemento];
                        break;
                        case 'custos':
                            grupoCustos = [...grupoCustos,elemento];
                        break;
                        case 'despesas':
                            grupoDespesas = [...grupoDespesas,elemento];
                        break;
                    }
                break;
                case 'moeda':
                    elemento = <div className={divClass} key={campo.key}>
                        <div className="p-field" >
                            <span className="p-float-label">
                                <CurrencyInput
                                id={"input"+campo.key}
                                name={campo.key}
                                className={"p-text-center p-inputtext u-font-title p-component"+(valoresCalculadora[campo.key] ? " p-filled" : "")}
                                // placeholder={campo.texto}
                                defaultValue={valoresCalculadora[campo.key]}
                                decimalsLimit={2}
                                onValueChange={(value, name) => {console.log(value, name);preencherValoresCalculadora(name, value)}}
                                decimalSeparator="," 
                                groupSeparator="."
                                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                                />
                            <label className="u-fw-600" htmlFor={"input"+campo.key}>{campo.texto}</label>
                            </span>
                        </div>
                    </div>;
                    switch(campo.grupo){
                        case 'produto':
                            grupoProduto = [...grupoProduto,elemento];
                        break;
                        case 'custos':
                            grupoCustos = [...grupoCustos,elemento];
                        break;
                        case 'despesas':
                            grupoDespesas = [...grupoDespesas,elemento];
                        break;
                    }
                break;
                case 'porcentagem':
                    elemento = <div className={divClass} key={campo.key}>
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <InputText className="p-text-center u-font-title p-pr-1" type="number" id={"input"+campo.key} defaultValue={valoresCalculadora[campo.key]}
                                    onChange={(e) => preencherValoresCalculadora(campo.key, e.target.value)} />
                                <i className="pi">%</i>
                                <label className="u-fw-600" htmlFor={"input"+campo.key}>{campo.texto}</label>
                            </span>
                        </div> 
                    </div> 
                    switch(campo.grupo){
                        case 'produto':
                            grupoProduto = [...grupoProduto,elemento];
                        break;
                        case 'custos':
                            grupoCustos = [...grupoCustos,elemento];
                        break;
                        case 'despesas':
                            grupoDespesas = [...grupoDespesas,elemento];
                        break;
                    }
                break;
                case 'select':
                    elemento=[];
                    for(const mOf in modo_ofertas){
                        let modo = modo_ofertas[mOf];
                        elemento = [...elemento,
                        <div className={divClass} key={'dropdownKey_'+modo.id}>
                            <div className="p-field" >
                                <span className="p-float-label">
                                    <Dropdown id={"dropdown_"+modo.id} options={opcoes_comissao} value={valoresCalculadora[campo.key][mOf]['taxa']}
                                    onChange={(e) => {preencherValoresComissao(modo.id, modo.tipo, e.value, valoresCalculadora[campo.key][mOf].precovenda)}} 
                                    optionLabel="texto" optionValue="taxa" className="p-text-center u-font-title p-pl-6"></Dropdown>
                                    <label className="u-fw-600" htmlFor={"dropdown_"+modo.id}>Taxa {modo.tipo}:</label>
                                </span>
                            </div>
                        </div>];
                    }
                    switch(campo.grupo){
                        case 'produto':
                            grupoProduto = [...grupoProduto,...elemento];
                        break;
                        case 'custos':
                            grupoCustos = [...grupoCustos,...elemento];
                        break;
                        case 'despesas':
                            grupoDespesas = [...grupoDespesas,...elemento];
                        break;
                    }
                break;
                case 'string':
                    elemento = <div className={divClass} key={campo.key}>
                        <div className="p-field">
                            <span className="p-float-label">
                                <InputText className="p-text-center u-font-title" type="text" id={"input"+campo.key} maxLength="100" defaultValue={valoresCalculadora[campo.key]}
                                    onChange={(e) => preencherValoresCalculadora(campo.key, e.target.value)} />
                                <label className="u-fw-600" htmlFor={"input"+campo.key}>{campo.texto}</label>
                            </span>
                        </div> 
                    </div> 
                    switch(campo.grupo){
                        case 'produto':
                            grupoProduto = [...grupoProduto,elemento];
                        break;
                        case 'custos':
                            grupoCustos = [...grupoCustos,elemento];
                        break;
                        case 'despesas':
                            grupoDespesas = [...grupoDespesas,elemento];
                        break;
                    }
                break;
            }
        }

        if(grupoProduto){
            console.log(grupoProduto);
            conjuntoCampos = [...conjuntoCampos,
                <GrupoProduto key="GrupoProduto" grupoProduto={grupoProduto}/>
            ];
        }
        if(grupoCustos){
            conjuntoCampos = [...conjuntoCampos,
                <GrupoCustos key="GrupoCustos" grupoCustos={grupoCustos}/>
            ];
        }
        if(grupoDespesas){
            conjuntoCampos = [...conjuntoCampos,
                <GrupoDespesas key="GrupoDespesas" grupoDespesas={grupoDespesas}/>
            ];
        }

        return conjuntoCampos;
    }
    
    var htmlPreviaoDeLucros;
    if(marketplaceSelecionado && marketplaceSelecionado.taxa_venda && marketplaceSelecionado.taxa_venda.modo_ofertas){
        let modos = {...marketplaceSelecionado.taxa_venda.modo_ofertas};
        htmlPreviaoDeLucros = <div className="p-col-12" key="tituloPrevisaoDeLucros">
            <Divider align="left" type="dashed">
                <h2 className="p-tag" style={{fontSize:"1.5em"}}>Previsão de Lucros:</h2>
            </Divider>
        </div>
        for(const key in modos){
            let resultado = calcular(key);
            if(!resultado.tabela.length){
                htmlPreviaoDeLucros = <h2>{resultado.mensagens_alerta}</h2>;
                break;
            }
            htmlPreviaoDeLucros = [htmlPreviaoDeLucros,   
            <div className={"p-col-12 p-md-6 p-lg-4 p-fluid contact-form "+showPrevisaoLucros} key={"resultado"+key}>
                <h3 className="p-mb-3">Modo: {modos[key].tipo}</h3>
                <div className="p-col-12 p-py-0">
                    <div className="p-field" >
                        <span className="p-float-label">
                            <CurrencyInput
                                id={"inputComissao"+key}
                                name={key}
                                className={"p-text-center u-font-title p-inputtext p-component"+(valoresCalculadora.comissao[key].precovenda === null ? "" : " p-filled")}
                                // placeholder={"Anúncio modo: "+modos[key].tipo}
                                defaultValue={valoresCalculadora.comissao[key].precovenda}
                                decimalsLimit={2}
                                onValueChange={(value, name) => preencherValoresComissao(name, modos[key].tipo, modos[key].taxa, value)}
                                decimalSeparator="," 
                                groupSeparator="."
                                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                            />
                            <label htmlFor={"inputComissao"+key} className="u-fw-600">Preço de Venda:</label>
                        </span>
                    </div>
                </div>
                <div className="card">
                    <DataTable value={resultado.tabela}>
                        <Column field="nome" header="Nome:" ></Column>
                        <Column field="valor" header="Valor:" className="p-text-right"></Column>
                    </DataTable>
                </div>
                    {resultado.mensagens_alerta.length ? <h5 className="p-mt-5">Aviso(s):</h5> : <></>}
                    {resultado.mensagens_alerta.length ? resultado.mensagens_alerta.map( 
                        (msg,index) => {
                            return (<p className="" key={"avisos::"+index}>{msg}</p>)
                        }
                    ):<></>
                    }
            </div>
            ];
        }        
    }
    return (
        <div className={styles.containerCalculadora}>
            <div className="p-col-12 p-md-12 p-lg-12 p-fluid contact-form">
                <div className="p-grid">
                    <div className="p-field p-col-12">
                        <h1>Calculadora de Lucros por Venda</h1>
                        <p className="p-mb-4">Selecione um marketplace para iniciar o calculo de previsão de lucros por venda.</p>
                        <span className="p-float-label" style={{maxWidth: '30rem'}}>
                            <Dropdown id="dropdownMarketplace" className="u-font-title" options={marketplacesOptions} value={marketplaceSelecionado} 
                            onChange={(e) => {setMarketplaceSelecionado(e.value || null); setShowPrevisaoLucros("")}} optionLabel="nome"></Dropdown>
                            <label className="u-fw-600" htmlFor="dropdownMarketplace">Marketplace:</label>
                        </span>
                    </div>
                    { marketplaceSelecionado ? gerarCamposCalculadora():<></> }
                </div>
            </div>
            <div className="p-col-12 p-md-12 p-lg-12">
                <div className="p-grid">
                    {htmlPreviaoDeLucros}
                </div>
            </div>
        </div>
    );
}
