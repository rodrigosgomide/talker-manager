const errorMensages = {
    emptyEmail: 'O campo "email" é obrigatório',
    emailFormat: 'O "email" deve ter o formato "email@email.com"',
    emptyPassword: 'O campo "password" é obrigatório',
    passwordFormat: 'O "password" deve ter pelo menos 6 caracteres',
};

function emailValidate(email) {
    const regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const isValidEmail = regex.test(email);
    if (!email || email.length === 0) throw new Error(errorMensages.emptyEmail);
    if (!isValidEmail) throw new Error(errorMensages.emailFormat);
}

function passwordValidate(password) {
    if (!password || password.length === 0) throw new Error(errorMensages.emptyPassword);
    if (password.length < 5) throw new Error(errorMensages.passwordFormat);
}

function validateLogin(req, res, next) {
    const { email, password } = req.body;
    try {
        emailValidate(email);
        passwordValidate(password);
        next();
    } catch (err) {
        console.error(err.message);
       return res.status(400).json({ message: err.message });
    }
}

module.exports = validateLogin;