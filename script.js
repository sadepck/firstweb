// Función para alternar el modo oscuro
function toggleDarkMode() {
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkIcon = darkModeToggle.querySelector('.dark-mode-icon');
    const lightIcon = darkModeToggle.querySelector('.light-mode-icon');
    
    // Alternar la clase dark-mode en el body
    body.classList.toggle('dark-mode');
    
    // Verificar si el modo oscuro está activo
    const isDarkMode = body.classList.contains('dark-mode');
    
    // Guardar la preferencia en localStorage
    localStorage.setItem('darkMode', isDarkMode);
    
    // Actualizar los iconos
    if (isDarkMode) {
        darkIcon.style.display = 'none';
        lightIcon.style.display = 'inline';
    } else {
        darkIcon.style.display = 'inline';
        lightIcon.style.display = 'none';
    }
}

// Verificar el modo guardado al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Cargar la preferencia del modo oscuro
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkIcon = darkModeToggle.querySelector('.dark-mode-icon');
    const lightIcon = darkModeToggle.querySelector('.light-mode-icon');
    
    // Aplicar el modo guardado
    if (savedDarkMode) {
        body.classList.add('dark-mode');
        darkIcon.style.display = 'none';
        lightIcon.style.display = 'inline';
    } else {
        body.classList.remove('dark-mode');
        darkIcon.style.display = 'inline';
        lightIcon.style.display = 'none';
    }
    
    // Agregar el evento de clic al botón
    darkModeToggle.addEventListener('click', toggleDarkMode);
    
    // Agregar clase de carga inicial
    document.body.classList.add('loaded');
    
    // Resto del código de animaciones...
    const fadeElements = document.querySelectorAll('.gallery, .artists, .contact');
    
    const fadeInOnScroll = function() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
    
    fadeInOnScroll();
    window.addEventListener('scroll', fadeInOnScroll);
    
    // Inicializar el reloj en tiempo real
    (function() {
        const relojElemento = document.getElementById('hora-actual');
        
        if (!relojElemento) return;
        
        // Función para formatear la hora con ceros a la izquierda
        function agregarCero(numero) {
            return numero < 10 ? '0' + numero : numero;
        }
        
        // Función para actualizar el reloj
        function actualizarReloj() {
            const ahora = new Date();
            const horas = ahora.getHours();
            const minutos = ahora.getMinutes();
            const segundos = ahora.getSeconds();
            
            // Formato de 24 horas con ceros a la izquierda
            const horaFormateada = `${agregarCero(horas)}:${agregarCero(minutos)}:${agregarCero(segundos)}`;
            
            relojElemento.textContent = horaFormateada;
            
            // Actualizar la fecha (opcional, descomenta si quieres mostrarla)
            // const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            // const fechaFormateada = ahora.toLocaleDateString('es-ES', opcionesFecha);
            // document.getElementById('fecha-actual').textContent = fechaFormateada;
        }
        
        // Actualizar el reloj inmediatamente y luego cada segundo
        actualizarReloj();
        setInterval(actualizarReloj, 1000);
        
        // Actualizar el reloj cuando cambie el modo oscuro para asegurar la visibilidad
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => {
                // Forzar una actualización del reloj después del cambio de tema
                setTimeout(actualizarReloj, 100);
            });
        }
    })();
    
    // Función para el botón Volver Arriba
    (function() {
        const btnVolverArriba = document.getElementById('btnVolverArriba');
        
        if (!btnVolverArriba) return;
        
        // Mostrar u ocultar el botón según el scroll
        function toggleBotonVolverArriba() {
            if (window.pageYOffset > 300) { // Mostrar después de 300px de scroll
                btnVolverArriba.classList.add('visible');
            } else {
                btnVolverArriba.classList.remove('visible');
            }
        }
        
        // Desplazamiento suave al hacer clic
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Event Listeners
        window.addEventListener('scroll', toggleBotonVolverArriba);
        btnVolverArriba.addEventListener('click', scrollToTop);
        
        // Inicializar el estado del botón
        toggleBotonVolverArriba();
    })();
});
