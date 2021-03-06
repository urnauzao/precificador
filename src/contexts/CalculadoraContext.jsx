import {createContext, useState} from "react";

export const CalculadoraContext = createContext();

export function CalculadoraProvider({children,...rest}){
    const [teste,setTeste] = useState(rest.teste ?? 'qualquer coisa')
    
    const opcoes_comissao = [
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
    ];

    const inputsCalculadora = [
        {key:'sku', texto: 'SKU:' ,subtitulo:'Apelido do Produto', tipo:'string', placeholder:"Apelido do produto", grupo:"produto"},
        {key:'qtd', texto: 'Quantidade:' ,subtitulo:'Quantidade do Produto no Anúncio', tipo:'int', placeholder:"2", grupo:"produto"},
        {key:'custo', texto: 'Custo(und):' ,subtitulo:'Custo do Produto(und)', tipo:'moeda', simbolo:'R$', placeholder:"R$ 120,00", grupo:"produto"},
        {key:'custofrete', texto: 'Frete:' ,subtitulo:'Custo de Envio(frete)', tipo:'moeda', simbolo:'R$', placeholder:"R$ 19,00", grupo:"custos"},
        {key:'imposto', texto: 'Imposto:' ,subtitulo:'Imposto sobre a Venda(%)', tipo:'porcentagem', simbolo:'%', placeholder:"2%", grupo:"custos"},
        {key:'mlucro', texto: 'Margem de Lucro:' ,subtitulo:'Margem de Lucro Desejada(%)', tipo:'porcentagem', simbolo:'%', placeholder:"10%", grupo:"produto"},
        {key:'despfixa', texto: 'Fixas:' ,subtitulo:'Despesas Fixa:', tipo:'moeda', simbolo:'R$', placeholder:"R$ 2,00", grupo:"despesas"},
        {key:'despop', texto: 'Operacionais:' ,subtitulo:'Despesas Operacionais', tipo:'moeda', simbolo:'R$', placeholder:"R$ 5,20", grupo:"despesas"},
        {key:'despads', texto: 'Ads:' ,subtitulo:'Despesas com Tráfego Pago(Ads)', tipo:'moeda', simbolo:'R$', placeholder:"R$ 20,00", grupo:"despesas"},
        {key:'comissao', texto: 'Taxas:' ,subtitulo:'Comissão por Vendas do Marketplace(%)', tipo:'select', modo_ofertas:{default:{id:'default','tipo':'Padrão', 'taxa':'11', 'precovenda':'300,00'}}, grupo:"custos"},
        // {key:'precovenda', texto:'Preço Base de Venda', tipo:'moeda', simbolo:'R$', placeholder:"10%", grupo:"produto"},
    ];

    return(
        <CalculadoraContext.Provider value={{
            teste,
            opcoes_comissao,
            inputsCalculadora
        }}>
            {children}
        </CalculadoraContext.Provider>
    );
}