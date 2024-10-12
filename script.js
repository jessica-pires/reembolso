const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")
const form = document.querySelector("form")
const expenseList = document.querySelector("ul")
const despesasQuantidade = document.querySelector("aside header p span")
const expenseTotal = document.querySelector("aside header h2")


//captura o evento do input
amount.oninput = () => {
    let value = amount.value.replace(/\D/g, "")


    //Transforma o valor em centavos (R$1,50)
    value= Number(value) /100

    //atualiza o valor do input
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value){
    //formata o valor para moeda brasileiro
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    return value
}

form.onsubmit = (event)=>{
    event.preventDefault()


    //Cria um objeto com os detalhes na nova despesa
    const newExpense={
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_ad: new Date()

    }

    expenseAdd(newExpense)
}

// Adiciona um novo item a lista
function expenseAdd(newExpense) {
    try {

        //Cria o elemento para adicionar o item (li) na lista (ul)
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        //Cria o icone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name )


        //Cria info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        //Cria o nome da despesa
        const expenseName = document.createElement("strong") 
        expenseName.textContent = newExpense.expense

        //Cria a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        //Adiciona nome e categoria na div das informações da despesa
        expenseInfo.append(expenseName, expenseCategory)


        //cria o valor da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML= `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        //Cria o icone de remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover")

        //Adiciona as informações no item.
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        //Adiciona o item na lista
        expenseList.append(expenseItem)

        //Limpa  formulario
        formClear()

        //atualiza os totais
        updateTotals()        
    }catch (error){
        alert("Não foi possível atualizar a lista de despesas")
    }
}

// Atualiza os totais
function updateTotals(){
    try{

    //captura os itens da lista
    const items = expenseList.children 
    
    // atualiza a quantidade de itens da lista
    despesasQuantidade.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

    //variavel que incrementa o total das despesas
    let total = 0
    //percorre cada item li da lista ul
    for(let i= 0;i < items.length; i++ ){
        itemAmount = items[i].querySelector(".expense-amount")
        
        //remover caracteres nao numericos
        let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace("," , ".")

    //converte o valor para float
    value = parseFloat(value)
    if(isNaN(value)){
        return alert("Não foi possovel calcular o total.")
    }
    total += Number(value)
    }

    //Cria a span para adicionar o R$ formatado
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent =  "R$"

    //Formata o valor e remove o R$ que será exibido pela small com um esilo customizado
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")
    
    //Limpa o conteudo do elemento
    expenseTotal.innerHTML = ""

    //adicina o símbolo da moeda e o valor 
    expenseTotal.append(symbolBRL, total)

    }catch(error){
        console.log(error)
        alert("Não foi possivel atualizar os totais")
    }
}

//evento que captura o clique nos itens da lista
expenseList.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-icon")){

        //Obtem a li pai do elemento clicado
        const item = event.target.closest(".expense")
        item.remove()

        // atualiza os totais
        updateTotals()
    }
})

function formClear(){
    //limpa os inputs
    expense.value = ""
    category.value = ""
    amount.value = ""

    
    expense.focus()
}


