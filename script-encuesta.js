// Inicializar EmailJS
emailjs.init("-TNGwUlo26BNoSmCT");

document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    console.log("=== INICIANDO ENVÍO DE ENCUESTA ===");

    // Obtener valores del formulario
    const formData = {
        musica: Array.from(document.querySelectorAll('input[name="musica"]:checked')).map(cb => cb.value),
        artistaFavorito: document.getElementById('artistaFavorito').value,
        deportes: Array.from(document.querySelectorAll('input[name="deportes"]:checked')).map(cb => cb.value),
        equipoFavorito: document.getElementById('equipoFavorito').value,
        nivelEstudios: document.getElementById('nivelEstudios').value,
        carrera: document.getElementById('carrera').value,
        situacionLaboral: document.getElementById('situacionLaboral').value,
        sectorTrabajo: document.getElementById('sectorTrabajo').value,
        experienciaLaboral: document.getElementById('experienciaLaboral').value,
        comentarios: document.getElementById('comentarios').value
    };

    console.log("📝 Datos de encuesta capturados:", formData);

    // Validar campos requeridos
    if (!formData.musica.length || !formData.deportes.length || !formData.nivelEstudios || !formData.situacionLaboral) {
        showStatus("❌ Por favor, completa todos los campos requeridos.", "error");
        return;
    }

    // Deshabilitar botón y mostrar loading
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    showStatus("⏳ Enviando encuesta...", "loading");

    // Crear mensaje formateado para el email
    const emailMessage = `
📊 FORMULARIO DE ENCUESTA - RESULTADOS

🎵 GUSTOS MUSICALES:
• Géneros: ${formData.musica.join(', ') || 'No especificado'}
• Artista/Grupo: ${formData.artistaFavorito || 'No especificado'}

⚽ GUSTOS DEPORTIVOS:
• Deportes: ${formData.deportes.join(', ') || 'No especificado'}
• Equipo: ${formData.equipoFavorito || 'No especificado'}

🎓 ESTUDIOS:
• Nivel: ${formData.nivelEstudios}
• Carrera: ${formData.carrera || 'No especificado'}

💼 SITUACIÓN LABORAL:
• Situación: ${formData.situacionLaboral}
• Sector: ${formData.sectorTrabajo || 'No especificado'}
• Experiencia: ${formData.experienciaLaboral || '0'} años

💬 COMENTARIOS:
${formData.comentarios || 'No hay comentarios'}

📅 Fecha: ${new Date().toLocaleString()}
    `;

    console.log("🔄 Enviando a EmailJS...");

    // Enviar con EmailJS - SIN DATOS PERSONALES
    emailjs.send("service_ojzlb8c", "template_qfbj6rg", {
        firstName: "Encuesta Anónima",
        lastName: "Sistema",
        email: "encuesta@formularios.com",
        phone: "No requerido",
        message: emailMessage
    })
    .then((response) => {
        console.log("✅ ÉXITO - Encuesta enviada:", response);
        showStatus("🎉 ¡Encuesta enviada con éxito! Gracias por compartir tus preferencias.", "success");
        document.getElementById('surveyForm').reset();
    })
    .catch((error) => {
        console.error("❌ ERROR al enviar encuesta:", error);
        
        let errorMessage = "Hubo un error al enviar la encuesta. ";
        
        if (error.text) {
            errorMessage += `Error: ${error.text}`;
        } else if (error.status) {
            errorMessage += `Código de error: ${error.status}`;
        }
        
        showStatus(errorMessage, "error");
    })
    .finally(() => {
        // Rehabilitar botón
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    });
});

function showStatus(message, type) {
    const statusElement = document.getElementById('status-message');
    statusElement.innerText = message;
    statusElement.className = `status-message ${type}`;
}
