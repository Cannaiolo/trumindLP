function validateForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,11}$/;
    
    if (name.length < 3) {
      alert('Por favor, insira um nome válido');
      return false;
    }
    
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um e-mail válido');
      return false;
    }
    
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
      alert('Por favor, insira um telefone válido');
      return false;
    }
    
    // Se passou pela validação, envie o formulário
    console.log('Formulário válido:', { name, email, phone });
    alert('Obrigado pelo cadastro! Em breve entraremos em contato.');
    return true;
}