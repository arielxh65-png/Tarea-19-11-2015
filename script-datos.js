// Inicializar EmailJS
emailjs.init("-TNGwUlo26BNoSmCT");

document.getElementById('personalDataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    console.log("=== INICIANDO ENVÍO DE DATOS PERSONALES ===");

    // Obtener valores del formulario
    const formData = {
        ci: document.getElementById('ci').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        direccion: document.getElementById('direccion').value,
        ciudad: document.getElementById('ciudad').value,
        telefono: document.getElementById('telefono').value,
        correo: document.getElementById('correo').value,
        sexo: document.querySelector('input[name="sexo"]:checked')?.value || 'No especificado',
        fechaNacimiento: document.getElementById('fechaNacimiento').value
    };

    console.log("📝 Datos capturados:", formData);

    // Validar campos requeridos
    if (!formData.ci || !formData.nombre || !formData.apellido || !formData.direccion || 
        !formData.ciudad || !formData.telefono || !formData.correo || !formData.fechaNacimiento) {
        showStatus("❌ Por favor, completa todos los campos requeridos.", "error");
        return;
    }

    // Deshabilitar botón y mostrar loading
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    showStatus("⏳ Enviando datos personales...", "loading");

    // Crear mensaje formateado para el email
    const emailMessage = `
📋 FORMULARIO DE DATOS PERSONALES

🆔 INFORMACIÓN BÁSICA:
• Cédula: ${formData.ci}
• Nombre: ${formData.nombre}
• Apellido: ${formData.apellido}

🏠 INFORMACIÓN DE CONTACTO:
• Dirección: ${formData.direccion}
• Ciudad: ${formData.ciudad}
• Teléfono: ${formData.telefono}
• Correo: ${formData.correo}

👤 INFORMACIÓN DEMOGRÁFICA:
• Sexo: ${formData.sexo}
• Fecha de Nacimiento: ${formData.fechaNacimiento}

📅 Fecha de envío: ${new Date().toLocaleString()}
    `;

    console.log("🔄 Enviando a EmailJS...");

    // Enviar con EmailJS
    emailjs.send("service_ojzlb8c", "template_qfbj6rg", {
        firstName: formData.nombre,
        lastName: formData.apellido,
        email: formData.correo,
        phone: formData.telefono,
        message: emailMessage
    })
    .then((response) => {
        console.log("✅ ÉXITO - Datos personales enviados:", response);
        showStatus("🎉 ¡Datos personales enviados con éxito! Hemos recibido tu información.", "success");
        document.getElementById('personalDataForm').reset();
    })
    .catch((error) => {
        console.error("❌ ERROR al enviar datos personales:", error);
        
        let errorMessage = "Hubo un error al enviar los datos personales. ";
        
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

// Animación para los campos del formulario
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});
