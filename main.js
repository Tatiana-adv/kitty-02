// Espera o conteúdo do HTML ser totalmente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona o contêiner onde os cards dos produtos serão inseridos
    const productGrid = document.getElementById('product-grid');

    // Função assíncrona para buscar e exibir os produtos
    async function fetchProducts() {
        try {
            // 1. FAZ A REQUISIÇÃO (FETCH)
            // Tenta buscar o arquivo db.json. 'await' pausa a execução até a promessa ser resolvida.
            const response = await fetch('db.json');

            // 2. TRATAMENTO DE ERRO HTTP
            // Se a resposta não for 'ok' (ex: erro 404, 500), lança um erro para ser pego pelo 'catch'.
            if (!response.ok) {
                throw new Error(`Erro na rede: ${response.status} - ${response.statusText}`);
            }

            // 3. CONVERTE A RESPOSTA PARA JSON
            // 'await' pausa novamente até os dados serem completamente lidos e convertidos.
            const data = await response.json();
            
            // 4. CHAMA A FUNÇÃO PARA RENDERIZAR OS DADOS
            displayProducts(data.featuredProducts);

        } catch (error) {
            // 5. BLOCO 'CATCH' PARA TRATAMENTO DE ERROS
            // Captura qualquer erro que ocorra no bloco 'try' (seja de rede ou de código).
            console.error('Falha ao buscar produtos:', error);
            // Exibe uma mensagem de erro amigável para o usuário no lugar do "Carregando...".
            productGrid.innerHTML = `<p class="error-message">Oops! Não foi possível carregar os produtos. Tente novamente mais tarde.</p>`;
        }
    }

    // Função para criar o HTML dos cards e inseri-lo na página
    function displayProducts(products) {
        // Limpa a mensagem de "Carregando..."
        productGrid.innerHTML = '';

        // Verifica se a lista de produtos está vazia
        if (products.length === 0) {
            productGrid.innerHTML = `<p class="loading-message">Nenhum produto em destaque no momento.</p>`;
            return;
        }

        // Usa map() para transformar cada objeto 'produto' em uma string HTML de um card
        const productsHTML = products.map(product => `
            <div class="card-wrapper">
                <div class="card">
                    <img src="${product.image}" alt="${product.title}" class="card__image">
                    <div class="card__body">
                        <h3 class="card__title">${product.title}</h3>
                        <a href="#" class="card-button">${product.buttonText}</a>
                    </div>
                </div>
            </div>
        `).join(''); // .join('') junta todos os cards em uma única string

        // Insere a string HTML completa no grid de produtos
        productGrid.innerHTML = productsHTML;
    }

    // Inicia todo o processo chamando a função principal
    fetchProducts();
});
