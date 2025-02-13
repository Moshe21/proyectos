document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const parallax = document.querySelector('.parallax');
        let scrollPosition = window.pageYOffset;
        parallax.style.backgroundPositionY = (scrollPosition * 0.5) + 'px';
    });

    // Form submission handling
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = {
                nombre: form.querySelector('[name="nombre"]').value,
                email: form.querySelector('[name="email"]').value,
                telefono: form.querySelector('[name="telefono"]').value,
                destino: form.querySelector('[name="destino"]').value,
                personas: form.querySelector('[name="personas"]').value,
                fecha: form.querySelector('[name="fecha"]').value,
                mensaje: form.querySelector('[name="mensaje"]').value
            };

            try {
                const response = await fetch('/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
                    form.reset();
                } else {
                    alert('Error al enviar el mensaje: ' + data.error);
                }
            } catch (error) {
                alert('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
                console.error('Error:', error);
            }
        });
    }

    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card, .post, .gallery-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if(elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial styles for animation
    document.querySelectorAll('.card, .post, .gallery-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.5s ease-out';
    });

    // Listen for scroll to trigger animations
    window.addEventListener('scroll', animateOnScroll);
    // Initial check for elements in view
    animateOnScroll();
});