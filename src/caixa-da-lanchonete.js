import { priceFormatter } from "./utils/formatter"

class CaixaDaLanchonete {
  constructor() {
    // Preços dos itens disponíveis no cardápio
    this.itemPrices = {
      cafe: 3.0,
      chantily: 1.5,
      suco: 6.2,
      sanduiche: 6.5,
      queijo: 2.0,
      salgado: 7.25,
      combo1: 9.5,
      combo2: 7.5,
    }

    // Combinações de itens extras com principais
    this.extras = [
      { extra: "chantily", principal: "cafe" },
      { extra: "queijo", principal: "sanduiche" },
    ]

    // Diferentes métodos de pagamento e seus descontos
    this.metodoDePagamento = {
      dinheiro: 0.95,
      credito: 1.03,
      debito: 1,
    }
  }

  validarItens(itens) {
    //Verifica se há itens
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!"
    }

    // Valida cada item em itens
    for (const itemComInfo of itens) {
      const [item, quantia] = itemComInfo.split(",")
      const parsedQuantia = parseInt(quantia)

      // Verifica se a quantidade é válida
      if (parsedQuantia <= 0) {
        return "Quantidade inválida!"
      }

      // Verifica se o item existe no cardápio
      if (!this.itemPrices[item]) {
        return "Item inválido!"
      }
    }

    // Verifica se os extras estão sendo pedidos junto com os principais
    const pedido = itens.map((itemComInfo) => itemComInfo.split(",")[0])
    const faltandoExtraComPrincipal = this.extras.find(
      ({ extra, principal }) =>
        pedido.includes(extra) && !pedido.includes(principal)
    )
    if (faltandoExtraComPrincipal) {
      return "Item extra não pode ser pedido sem o principal"
    }

    return null
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    // Validação dos itens
    const erroValidacao = this.validarItens(itens)
    if (erroValidacao) {
      return erroValidacao
    }

    // Obtém o pagamento correspondente ao método de pagamento escolhido
    const pagamento = this.metodoDePagamento[metodoDePagamento]
    if (!pagamento) {
      return "Forma de pagamento inválida!"
    }

    // Calcula o valor total do pedido
    const valorTotal = itens.reduce((total, itemComInfo) => {
      const [item, quantia] = itemComInfo.split(",")
      const parsedQuantia = parseInt(quantia)
      const precoPorItem = this.itemPrices[item]
      return total + precoPorItem * parsedQuantia
    }, 0)

    const valorComDesconto = valorTotal * pagamento

    // Formata o valor finak da compra
    return priceFormatter.format(valorComDesconto.toFixed(2))
  }
}

export { CaixaDaLanchonete }
