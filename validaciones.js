const form = document.getElementById('registroForm');
const referencia = document.getElementById('referencia');
const contador = document.getElementById('referenciaContador');

const errors = {
    nombre: document.getElementById('error-nombre'),
    fecha: document.getElementById('error-fecha'),
    rut: document.getElementById('error-rut'),
    genero: document.getElementById('error-genero'),
    nacionalidad: document.getElementById('error-nacionalidad'),
    email: document.getElementById('error-email'),
    confirmarEmail: document.getElementById('error-confirmarEmail'),
    password: document.getElementById('error-password'),
    confirmarPassword: document.getElementById('error-confirmarPassword'),
    telefono: document.getElementById('error-telefono'),
    pais: document.getElementById('error-pais'),
    provincia: document.getElementById('error-provincia'),
    ciudad: document.getElementById('error-ciudad'),
    calle: document.getElementById('error-calle'),
    codigoPostal: document.getElementById('error-codigoPostal'),
    referencia: document.getElementById('error-referencia')
};

const regex = {
    nombre: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,60}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    rut: /^\d{7,8}$/,
    nacionalidad: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,60}$/,
    ciudad: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,}$/, 
    telefono: /^[+\d\s-]+$/,
    codigoPostal: /^[A-Za-z0-9]{4,10}$/,
    password: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
};

function clearErrors() {
    Object.values(errors).forEach(el => el.textContent = '');
}

function calcularEdad(fecha) {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad -= 1;
    }
    return edad;
}

function isValidRutNumber(value) {
    if (!regex.rut.test(value)) return false;
    if (/^(\d)\1*$/.test(value)) return false;
    return true;
}

function countDigits(value) {
    return (value.match(/\d/g) || []).length;
}

function validarFormulario() {
    clearErrors();
    let valido = true;

    const nombre = form.nombre.value.trim();
    if (!regex.nombre.test(nombre)) {
        errors.nombre.textContent = 'Nombre inválido. Solo letras y espacios entre 3 y 60 caracteres.';
        valido = false;
    }

    const fechaNacimiento = form.fechaNacimiento.value;
    if (!fechaNacimiento) {
        errors.fecha.textContent = 'La fecha de nacimiento es obligatoria.';
        valido = false;
    } else if (calcularEdad(fechaNacimiento) < 18) {
        errors.fecha.textContent = 'Debes ser mayor de 18 años.';
        valido = false;
    }

    const rut = form.rut.value.trim();
    if (!isValidRutNumber(rut)) {
        errors.rut.textContent = 'RUT inválido. Debe tener 7 u 8 dígitos numéricos.';
        valido = false;
    }

    if (!form.genero.value) {
        errors.genero.textContent = 'Selecciona un género.';
        valido = false;
    }

    const nacionalidad = form.nacionalidad.value.trim();
    if (!regex.nacionalidad.test(nacionalidad)) {
        errors.nacionalidad.textContent = 'Nacionalidad inválida. Solo letras y espacios entre 3 y 60 caracteres.';
        valido = false;
    }

    const email = form.email.value.trim();
    if (!regex.email.test(email)) {
        errors.email.textContent = 'Email inválido.';
        valido = false;
    }

    const confirmarEmail = form.confirmarEmail.value.trim();
    if (email !== confirmarEmail) {
        errors.confirmarEmail.textContent = 'Los emails no coinciden.';
        valido = false;
    }

    const password = form.password.value;
    if (!regex.password.test(password)) {
        errors.password.textContent = 'La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 número y 1 carácter especial.';
        valido = false;
    }

    const confirmarPassword = form.confirmarPassword.value;
    if (password !== confirmarPassword) {
        errors.confirmarPassword.textContent = 'Las contraseñas no coinciden.';
        valido = false;
    }

    const telefono = form.telefono.value.trim();
    if (!regex.telefono.test(telefono) || countDigits(telefono) < 8) {
        errors.telefono.textContent = 'Teléfono inválido. Debe tener al menos 8 dígitos numéricos.';
        valido = false;
    }

    if (!form.pais.value.trim()) {
        errors.pais.textContent = 'El país no puede estar vacío.';
        valido = false;
    }

    if (!form.provincia.value.trim()) {
        errors.provincia.textContent = 'La provincia no puede estar vacía.';
        valido = false;
    }

    const ciudad = form.ciudad.value.trim();
    if (!regex.ciudad.test(ciudad)) {
        errors.ciudad.textContent = 'Ciudad inválida. Solo letras y espacios, mínimo 2 caracteres.';
        valido = false;
    }

    const calle = form.calle.value.trim();
    if (calle.length < 5) {
        errors.calle.textContent = 'Calle y número deben tener al menos 5 caracteres.';
        valido = false;
    }

    const codigoPostal = form.codigoPostal.value.trim();
    if (!regex.codigoPostal.test(codigoPostal)) {
        errors.codigoPostal.textContent = 'Código postal inválido. Sólo 4-10 caracteres alfanuméricos.';
        valido = false;
    }

    const referenciaValor = referencia.value.trim();
    if (referenciaValor.length > 200) {
        errors.referencia.textContent = 'Referencia no puede superar los 200 caracteres.';
        valido = false;
    }

    return valido;
}

referencia.addEventListener('input', () => {
    const longitud = referencia.value.length;
    contador.textContent = `${longitud}/200`;
    if (longitud > 200) {
        errors.referencia.textContent = 'Referencia no puede superar los 200 caracteres.';
    } else {
        errors.referencia.textContent = '';
    }
});

form.addEventListener('submit', event => {
    event.preventDefault();
    if (validarFormulario()) {
        alert('Registro enviado correctamente.');
        form.reset();
        contador.textContent = '0/200';
    }
});
