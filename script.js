const dadosMoçambique = {
    "CABO DELGADO": ["Ancuabe", "Balama", "Chiúre", "Ibo", "Macomia", "Mecúfi", "Meluco", "Metuge", "Mocímboa da Praia", "Montepuez", "Mueda", "Muidumbe", "Namuno", "Nangade", "Palma", "Quissanga"],
    "GAZA": ["Bilene", "Chibuto", "Chicualacuala", "Chigubo", "Chókwè", "Guijá", "Mabalane", "Manjacaze", "Mapai", "Massangena", "Massingir", "Xai-Xai"],
    "INHAMBANE": ["Funhalouro", "Govuro", "Homoíne", "Inharrime", "Inhassoro", "Jangamo", "Mabote", "Massinga", "Maxixe", "Morrumbene", "Panda", "Vilankulo", "Zavala"],
    "MANICA": ["Barué", "Gondola", "Guro", "Macate", "Machaze", "Macossa", "Manica", "Mossurize", "Mussorize", "Sussundenga", "Tambara", "Vanduzi"],
    "MAPUTO PROVINCIA": ["Boane", "Magude", "Manhiça", "Marracuene", "Matola", "Matutuíne", "Moamba", "Namaacha"],
    "NAMPULA": ["Angoche", "Eráti", "Ilha de Moçambique", "Lalaua", "Larde", "Liúpo", "Malema", "Meconta", "Mecubúri", "Memba", "Mogincual", "Mogovolas", "Moma", "Monapo", "Mossuril", "Muecate", "Murrupula", "Nacala-a-Velha", "Nacala Porto", "Nacarôa", "Nampula", "Rapale", "Ribáuè"],
    "NIASSA": ["Chimbonila", "Cuamba", "Lago", "Lichinga", "Majune", "Marrupa", "Maúa", "Mavago", "Mecanhelas", "Mecula", "Metarica", "Muembe", "N'gauma", "Nipepe", "Sanga"],
    "SOFALA": ["Búzi", "Caia", "Chemba", "Cheringoma", "Chibabava", "Dondo", "Gorongosa", "Machanga", "Maringué", "Muanza", "Nhamatanda"],
    "TETE": ["Angónia", "Cahora-Bassa", "Changara", "Chifunde", "Chiuta", "Dôa", "Macanga", "Magoé", "Marávia", "Moatize", "Mutarara", "Tsangano", "Zumbo"],
    "ZAMBEZIA": ["Alto Molócue", "Chinde", "Derre", "Gile", "Gurué", "Ilede", "Inhassunge", "Luabo", "Maganja da Costa", "Milange", "Mocuba", "Mocubela", "Molumbo", "Mopeia", "Morrumbala", "Mulevala", "Namacurra", "Namarroi", "Nicoadala", "Pebane", "Quelimane"]
};

// --- FUNÇÕES DE INTERFACE ---

function toggleAccordion(header) {
    const parent = header.parentElement;
    document.querySelectorAll('.selection-box').forEach(box => {
        if (box !== parent) box.classList.remove('active');
    });
    parent.classList.toggle('active');
}

function fecharModal() {
    document.getElementById('modalConfirma').style.display = 'none';
}

// --- LÓGICA DO FORMULÁRIO ---

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.registration-form');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const bairro = document.querySelector('input[name="bairro"]:checked')?.value;
            const horario = document.querySelector('input[name="horario"]:checked')?.value;
            const nivel = document.querySelector('input[name="nivel"]:checked')?.value;


            // Preencher resumo no Modal
            document.getElementById('resumoDados').innerHTML = `
                <div style="border-bottom: 1px dashed #ccc; padding: 5px 0;"><strong>Nome:</strong> ${document.getElementById('nome').value}</div>
                <div style="border-bottom: 1px dashed #ccc; padding: 5px 0;"><strong>Bairro:</strong> ${bairro.toUpperCase()}</div>
                <div style="border-bottom: 1px dashed #ccc; padding: 5px 0;"><strong>Horário:</strong> ${horario}</div>
                <div style="border-bottom: 1px dashed #ccc; padding: 5px 0;"><strong>Nível:</strong> ${nivel}</div>
            `;

            document.getElementById('modalConfirma').style.display = 'flex';
        });
    }
});

function enviarFinal() {
    const btn = event.target;
    btn.disabled = true;
    btn.innerText = "ENVIANDO...";

    // 1. Coletar os dados
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const tel = document.getElementById('telefone').value;
    const idade = document.getElementById('idade').value;
    const bairro = document.querySelector('input[name="bairro"]:checked').value;
    const horario = document.querySelector('input[name="horario"]:checked').value;
    const nivel = document.querySelector('input[name="nivel"]:checked').value;

    // 2. SALVAR NA MEMÓRIA (Essencial para a página de pagamentos ler depois)
    const dadosMatricula = {
        nome: nome,
        bairro: bairro,
        horario: horario,
        nivel: nivel
    };
    localStorage.setItem('dadosMatricula', JSON.stringify(dadosMatricula));

    // 3. Preparar dados para o EmailJS
    const dadosParaEnvio = {
        to_name: nome,
        aluno_email: email,
        aluno_tel: tel,
        aluno_idade: idade,
        aluno_bairro: bairro.toUpperCase(),
        aluno_horario: horario,
        aluno_nivel: nivel
    };

    // 4. Enviar via EmailJS
    emailjs.send("service_i6u51l1", "template_7f4fcc1", dadosParaEnvio)
    .then(() => {
        // Redireciona para a página de pagamentos após o sucesso
        window.location.href = "pagamentos.html";
    })
    .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao enviar. Verifique sua conexão.");
        btn.disabled = false;
        btn.innerText = "TUDO CERTO, ENVIAR!";
    });
}

