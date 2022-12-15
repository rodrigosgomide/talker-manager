const errorMensages = {
    emptyEmail: 'O campo "email" é obrigatório',
    emailFormat: 'O "email" deve ter o formato "email@email.com"',
    emptyPassword: 'O campo "password" é obrigatório',
    passwordFormat: 'O "password" deve ter pelo menos 6 caracteres',
};

function emailValidate(email) {
    const regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const isValidEmail = regex.test(email);
    if (!email || email.length === 0) return 'emptyEmail';
    if (!isValidEmail) return 'emailFormat';
    return isValidEmail;
}

function passwordValidate(password) {
    if (!password || password.length === 0) return 'emptyPassword';
    if (password.length < 5) return 'passwordFormat';
    return password.length > 5;
}

function validateLogin(req, res, next) {
    const { email, password } = req.body;
    const isValidEmail = emailValidate(email);
    const isValidPassword = passwordValidate(password);

    const errorMensage = errorMensages[isValidEmail] || errorMensages[isValidPassword];

    if (!errorMensage) {
        next(); 
    } else {
       return res.status(400).json({ message: errorMensage });
    }
}

module.exports = validateLogin;