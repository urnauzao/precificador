import React, { useState, useContext } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import CurrencyInput from 'react-currency-input-field';
import { CalculadoraContext } from '../contexts/CalculadoraContext';
import styles from '../../styles/pages/calculadora.module.css';
import GrupoProduto from './Calculadora/grupoProduto';
import GrupoCustos from './Calculadora/grupoCustos';
import GrupoDespesas from './Calculadora/grupoDespesas';


const camposCalculadora = [
    {key:'sku', texto:'Sku', tipo:'string', placeholder:"Apelido do produto"},
    {key:'qtd', texto:'Quantidade', tipo:'int', placeholder:"2"},
    // {key:'precovenda', texto:'Preço Base de Venda', tipo:'moeda', simbolo:'R$', placeholder:"10%"},
    {key:'custo', texto:'Custo do Produto(und)', tipo:'moeda', simbolo:'R$', placeholder:"R$ 120,00"},
    {key:'custofrete', texto:'Custo de Envio(frete)', tipo:'moeda', simbolo:'R$', placeholder:"R$ 19,00"},
    {key:'imposto', texto:'Imposto sobre a Venda(%)', tipo:'porcentagem', simbolo:'%', placeholder:"2%"},
    {key:'mlucro', texto:'Margem de Lucro Desejada(%)', tipo:'porcentagem', simbolo:'%', placeholder:"10%"},
    {key:'despfixa', texto:'Despesas Fixa:', tipo:'moeda', simbolo:'R$', placeholder:"R$ 2,00"},
    {key:'despop', texto:'Despesas Operacionais', tipo:'moeda', simbolo:'R$', placeholder:"R$ 5,20"},
    {key:'despads', texto:'Despesas com Tráfego Pago(Ads)', tipo:'moeda', simbolo:'R$', placeholder:"R$ 20,00"},
    {key:'comissao', texto:'Comissão por Vendas do Marketplace(%)', tipo:'select', modo_ofertas:{default:{id:'default','tipo':'Padrão', 'taxa':'11', 'precovenda':'300,00'}}},
];

const valoresCamposCalculadora = {
    'sku': "",
    'qtd':"",
    'custo':"",
    'imposto':"",
    'despfixa':"",
    'despop':"",
    'despads':"",
    'comissao':{},
    'mlucro':"",
    'precovenda':"",
    'custofrete':""
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
                ml_p:{id:'ml_p', tipo:'Premium', taxa: '16'},
                ml_c:{id:'ml_c', tipo:'Clássico', taxa: '11'}
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
    }
    // ,{ nome: 'B2W', code: 'B2W', 'sale_fee': null, 'frete_gratis':true},
];

export const Calculadora = () => {

    const [marketplaceSelecionado, setMarketplaceSelecionado] = useState("");
    const {opcoes_comissao, inputsCalculadora} = useContext(CalculadoraContext);

    /** @argument ('comentado apenas para trablabalhar com dados do mock') */
    // const [valoresCalculadora, setValoresCalculadora] = useState(valoresCamposCalculadora);
    const [valoresCalculadora, setValoresCalculadora] = useState({...valoresCamposCalculadora, ...mockValoresCamposCalculadora});
    
    
    const [showPrevisaoLucros, setShowPrevisaoLucros] = useState("fc-limited");
    const [valoresComissao, setValoresComissao] = useState({default:{id:'default','tipo':'Padrão', 'taxa':'16'}});
    


    const interfaceComissao = (vComissao) => {
        // console.log("interfaceComissao", vComissao)
        let result = {};
        result[vComissao.id] = vComissao.taxa;
        return result;
    }

    const preencherValoresCalculadora = ( campo, valor ) => {
        let valores =  {...valoresCalculadora};
        valores[campo] = valor;
        // if(campo === "precovenda")
        //     validaPrecoBaseParaComissao(valor);
        setValoresCalculadora(valores);
    }

    const preencherValoresComissao = (id, nome, valor = null, precoVenda = null) => {
        let valores =  {...valoresCalculadora};
        let comissoes = {...valores.comissao};
        // valor =  valor === null ? (comissoes[id].taxa ?? null) : valor;
        // precoVenda =  precoVenda === null ? (comissoes[id].precovenda ?? null) : precoVenda;
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
        let precoVenda = stringToFloat(valoresCalculadora.comissao[modo].precovenda === null ? "0,0" : valoresCalculadora.comissao[modo].precovenda);
        let custoFixo = 0;
        let comissaoSobreFrete = false;
        let mensagensAlerta = [];
        if(typeof marketplaceSelecionado.taxa_venda.regras === typeof [] && marketplaceSelecionado.taxa_venda.regras.length){
            for(const regra of marketplaceSelecionado.taxa_venda.regras){
                if(regra.ofertas_enquadradas.includes(modo) && precoVenda >= regra.custo_minimo && precoVenda < regra.custo_maximo){
                    custoFixo = regra.custo_fixo;
                    if(!mensagensAlerta.includes(regra.mensagem))
                        mensagensAlerta.push(regra.mensagem);
                }
            }
        }

        let taxaExposicao = valoresCalculadora.comissao[modo].taxa;
        let custoExposicao = (precoVenda * (taxaExposicao/100))+custoFixo;
        let taxaImposto = valoresCalculadora.imposto;        
        let custoImposto = precoVenda * (taxaImposto/100);
        let custoEnvio = stringToFloat(valoresCalculadora.custofrete);
        let custoProduto = stringToFloat(valoresCalculadora.custo);
        let despesasFixas = stringToFloat(valoresCalculadora.despfixa);
        let despesasOperacionais = stringToFloat(valoresCalculadora.despop);
        let despesasTrafego = stringToFloat(valoresCalculadora.despads);
        let margemLucro = valoresCalculadora.mlucro/100;
        let lucroDesejadoVenda = precoVenda*margemLucro;
        let lucroDesejadoProduto = custoProduto*margemLucro;
        let lucroVenda = precoVenda - (
            custoExposicao + custoEnvio + custoProduto + despesasFixas + despesasOperacionais + despesasTrafego + custoImposto
        );
        let porcentagemSobreLucroVenda = (lucroVenda/precoVenda).toLocaleString("pt-BR",{style:"percent", currency:"BRL"});
        let porcentagemSobreLucroProduto = (lucroVenda/custoProduto).toLocaleString("pt-BR",{style:"percent", currency:"BRL"});





        // let status = 
        
        // console.log("taxaExposicao", taxaExposicao)
        // console.log("valoresCalculadora.precovenda", taxaExposicao)

        return {
            status: "Excelente",
            valor_venda: precoVenda,
            valor_lucro: lucroVenda,
            porcentagem_venda:0,
            porcentagem_produto:0,
            custo_imposto:custoImposto,
            custo_exposicao:custoExposicao,
            lucro_desejado_produto:lucroDesejadoProduto,
            lucro_desejado_venda:lucroDesejadoVenda,
            porcentagem_lucro_venda:porcentagemSobreLucroVenda,
            porcentagem_lucro_produto:porcentagemSobreLucroProduto,
            mensagens_alerta:mensagensAlerta
        }
    }

    

    const componentCamposCalculadora = () =>{
        let modo_ofertas = marketplaceSelecionado.taxa_venda.modo_ofertas;
        // let opcoes_comissao = marketplaceSelecionado.taxa_venda.opcoes;

        // console.log("modo_ofertas", modo_ofertas)
        let divClass ="p-col-12 p-md-4 p-lg-2 p-py-0";
        // let divClass ="p-column-resizer p-px-2";
        return camposCalculadora.map(campo => {
            if(campo.tipo === 'int'){
                return(
                    <div className={divClass} key={campo.key}>
                        <div className="p-field">
                            <span className="p-float-label">
                                <InputText className="p-text-center" type="text" id={"input"+campo.key} defaultValue={valoresCalculadora[campo.key]} 
                                    onChange={(e) => preencherValoresCalculadora(campo.key, e.target.value)} />
                                <label htmlFor={"input"+campo.key}>{campo.texto}</label>
                            </span>
                        </div>
                    </div>
                )
            }else if(campo.tipo === 'moeda'){
                return(
                    <div className={divClass} key={campo.key}>
                        <div className="p-field" >
                            <span className="p-float-label">
                                <CurrencyInput
                                id={"input"+campo.key}
                                name={campo.key}
                                className={"p-text-center p-inputtext p-component"+(valoresCalculadora[campo.key] ? " p-filled" : "")}
                                placeholder={campo.texto}
                                defaultValue={valoresCalculadora[campo.key]}
                                decimalsLimit={2}
                                onValueChange={(value, name) => {console.log(value, name);preencherValoresCalculadora(name, value)}}
                                decimalSeparator="," 
                                groupSeparator="."
                                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                                />
                            <label htmlFor={"input"+campo.key}>{campo.texto}</label>
                            </span>
                        </div>
                    </div>
                );                 
            }else if(campo.tipo === 'porcentagem'){
                return(
                    <div className={divClass} key={campo.key}>
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <InputText className="p-text-center p-pr-1" type="number" id={"input"+campo.key} defaultValue={valoresCalculadora[campo.key]}
                                    onChange={(e) => preencherValoresCalculadora(campo.key, e.target.value)} />
                                <i className="pi">%</i>
                                <label htmlFor={"input"+campo.key}>{campo.texto}</label>
                            </span>
                        </div> 
                    </div> 
                )               
                
            }else if(campo.tipo === 'select'){
                let result;
                for(const mOf in modo_ofertas){
                    let modo = modo_ofertas[mOf];
                    result = [result,
                    <div className={divClass} key={'dropdownKey_'+modo.id}>
                        <div className="p-field" >
                            <span className="p-float-label">
                                <Dropdown id={"dropdown_"+modo.id} options={opcoes_comissao} value={valoresCalculadora[campo.key][mOf]['taxa']}
                                onChange={(e) => {preencherValoresComissao(modo.id, modo.tipo, e.value, valoresCalculadora[campo.key][mOf].precovenda) }} optionLabel="texto" optionValue="taxa" className="p-text-center p-pl-6"></Dropdown>
                                <label htmlFor={"dropdown_"+modo.id}>Comissão de Venda: Modo {modo.tipo}</label>
                            </span>
                        </div>
                    </div>];
                }
                return result;  
            }else if(campo.tipo === 'string'){
                return(
                    <div className={divClass} key={campo.key}>
                        <div className="p-field">
                            <span className="p-float-label">
                                <InputText className="p-text-center" type="text" id={"input"+campo.key} maxLength="100" defaultValue={valoresCalculadora[campo.key]}
                                    onChange={(e) => preencherValoresCalculadora(campo.key, e.target.value)} />
                                <label htmlFor={"input"+campo.key}>{campo.texto}</label>
                            </span>
                        </div> 
                    </div> 
                )   
            }
            return <></>
    
    
        })
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
                                    onChange={(e) => preencherValoresCalculadora(campo.key, e.target.value)} />
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
                                placeholder={campo.texto}
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
                                    onChange={(e) => {preencherValoresComissao(modo.id, modo.tipo, e.value, valoresCalculadora[campo.key][mOf].precovenda) }} 
                                    optionLabel="texto" optionValue="taxa" className="p-text-center u-font-title p-pl-6"></Dropdown>
                                    <label className="u-fw-600" htmlFor={"dropdown_"+modo.id}>Comissão de Venda: Modo {modo.tipo}</label>
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
    let ignorar = false;
    if(marketplaceSelecionado && marketplaceSelecionado.taxa_venda && marketplaceSelecionado.taxa_venda.modo_ofertas && !ignorar){
        let modos = {...marketplaceSelecionado.taxa_venda.modo_ofertas};
        for(const key in modos){
            let resultado = calcular(key)
            htmlPreviaoDeLucros = [htmlPreviaoDeLucros,   
            <div className={"p-col-12 p-md-6 p-lg-4 p-fluid contact-form "+showPrevisaoLucros} key={"resultado"+key}>
                {/* <Panel header={"Oferta: Modo "+modos[key].tipo} key={"panel_"+key}> */}
                    <h2 className="p-mb-3">Preço de Venda:</h2>
                    <div className="p-col-12 p-py-0">
                        <div className="p-field" >
                            <span className="p-float-label">
                                <CurrencyInput
                                    id={"inputComissao"+key}
                                    name={key}
                                    className={"p-text-center p-inputtext p-component"+(valoresCalculadora.comissao[key].precovenda === null ? "" : " p-filled")}
                                    placeholder={"Anúncio modo: "+modos[key].tipo}
                                    defaultValue={valoresCalculadora.comissao[key].precovenda}
                                    decimalsLimit={2}
                                    onValueChange={(value, name) => preencherValoresComissao(name, modos[key].tipo, modos[key].taxa, value)}
                                    decimalSeparator="," 
                                    groupSeparator="."
                                    intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                                />
                                <label htmlFor={"inputComissao"+key}>Preço de Venda:</label>
                            </span>
                        </div>
                    </div>
                    <p className="p-my-0">Vendendo o Produto a {formatCurrency(resultado.valor_venda)} você terá</p>
                    <p className="p-my-0 u-b-b-dashed">Lucro Estimado:
                    <span className="u-float-right">{formatCurrency(resultado.valor_lucro)}</span>
                    </p>
                    <p className="p-my-0 u-b-b-dashed">Lucro Desejado Sobre o Custo do Produto:
                    <span className="u-float-right">{formatCurrency(resultado.lucro_desejado_produto)}</span>
                    </p>
                    <p className="p-my-0 u-b-b-dashed">Lucro Desejado Sobre a Venda:
                    <span className="u-float-right">{formatCurrency(resultado.lucro_desejado_venda)}</span>
                    </p>
                    <p className="p-my-0 u-b-b-dashed">Porcentagem do Lucro sobre Valor de Venda:
                    <span className="u-float-right">{resultado.porcentagem_lucro_venda}</span>
                    </p>
                    <p className="p-my-0 u-b-b-dashed">Porcentagem do Lucro sobre Custo do Produto:
                    <span className="u-float-right">{resultado.porcentagem_lucro_produto}</span>
                    </p>
                    <p className="p-my-0 u-b-b-dashed">Custos com Impostos:
                    <span className="u-float-right">{formatCurrency(resultado.custo_imposto)}</span>
                    </p>
                    <p className="p-my-0 u-b-b-dashed">Custo de Exposição do Marketplace:
                    <span className="u-float-right">{formatCurrency(resultado.custo_exposicao)}</span>
                    </p>
                    {resultado.mensagens_alerta.length ? <h5 className="p-mt-5">Aviso(s):</h5> : <></>}
                    {resultado.mensagens_alerta.length ? resultado.mensagens_alerta.map( 
                        (msg) => {
                            return (<p className="" key="avisos">{msg}</p>)
                        }
                    ):<></>
                    }
                {/* </Panel> */}
            </div>
            ];
        }        
    }
    return (
        <div className={styles.containerCalculadora}>
            <div className="p-col-12 p-md-12 p-lg-12 p-fluid contact-form">
                {/* <Panel header="Calcular Custo" key="calculo_de_custo"> */}
                    <div className="p-grid">
                        <div className="p-field p-col-12">
                            <h1>Previsão de Lucros:</h1>
                            <p className="p-mb-4">Selecione um marketplace para iniciar o calculo de previsão de lucros por venda.</p>
                            {/* <span className="p-float-label"> */}
                            <span className="p-float-label" style={{maxWidth: '30rem'}}>
                                <Dropdown id="dropdownMarketplace" className="u-font-title" options={marketplacesOptions} value={marketplaceSelecionado} 
                                onChange={(e) => {setMarketplaceSelecionado(e.value || null); setShowPrevisaoLucros("")}} optionLabel="nome"></Dropdown>
                                <label className="u-fw-600" htmlFor="dropdownMarketplace">Marketplace:</label>
                            </span>
                        </div>
                        
                        { marketplaceSelecionado ? 
                            // componentCamposCalculadora()
                            gerarCamposCalculadora()
                            :
                            <>
                            </>
                        }
                    
                    </div>
                {/* </Panel> */}
            </div>
            <div className="p-col-12 p-md-12 p-lg-12">
                <div className="p-grid">
                    {htmlPreviaoDeLucros}
                </div>
            </div>
        </div>
    );
}
