// src/public/js/script.js

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.querySelector('#phoneModal');
    const openModalButton = document.querySelector('#openModalButton');
    const closeButton = document.querySelector('#closeModal');
    const leadForm = document.getElementById('leadForm');

    // Abrir o modal
    openModalButton.addEventListener('click', function(event) {
        event.preventDefault(); // Previne o comportamento padrão do link
        modal.style.display = 'flex'; // Torna o modal visível
    });

    // Fechar o modal
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none'; // Oculta o modal
    });

    // Fechar o modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Evento de envio do formulário
    leadForm.addEventListener('submit', saveLeadData);
});

// Função para salvar os dados do lead
function saveLeadData(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const nomeCompleto = document.getElementById('nomeCompleto').value;
    const numeroTelefone = document.getElementById('numeroTelefone').value;
    const email = document.getElementById('email').value;

    // Enviar os dados para o servidor
    fetch('/leads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: nomeCompleto, telefone: numeroTelefone, email: email }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar o lead');
        }
        return response.json();
    })
    .then(data => {
        console.log('Lead salvo:', data);
        document.getElementById('leadForm').reset();
        alert('Lead cadastrado com sucesso! ID: ' + data.id);
    })
    .catch((error) => {
        console.error('Erro ao salvar o lead:', error);
        alert('Erro ao cadastrar o lead. Tente novamente.');
    });
}