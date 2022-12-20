const errorMensages = {
    emptyName: 'O campo "name" é obrigatório',
    nameFormat: 'O "name" deve ter pelo menos 3 caracteres',
    emptyAge: 'O campo "age" é obrigatório',
    minorAge: 'A pessoa palestrante deve ser maior de idade',
    emptyTalk: 'O campo "talk" é obrigatório',
    emptyWatchedAt: 'O campo "watchedAt" é obrigatório',
    watchedAtFormat: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    emptyRate: 'O campo "rate" é obrigatório',
    rateFormat: 'O campo "rate" deve ser um inteiro de 1 à 5',
};

function validateDate(dateString) {
      return /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString);
}

function validateWatchedAt(talk) {
    if (!talk.watchedAt || talk.watchedAt.length === 0) {
        throw new Error(errorMensages.emptyWatchedAt);
    }
    if (!validateDate(talk.watchedAt)) throw new Error(errorMensages.watchedAtFormat);
}

function rateIsBetween(rate) {
    return rate >= 1 && rate <= 5;
}

function validateRate(talk) {
    if (!talk.rate || talk.rate.length === 0) throw new Error(errorMensages.emptyRate);
    if (!Number.isInteger(talk.rate) || !rateIsBetween(talk.rate)) {
        throw new Error(errorMensages.rateFormat);
    }
}

function validateTalk(talk) {
    if (!talk) throw new Error(errorMensages.emptyTalk);
    validateWatchedAt(talk);
    validateRate(talk);
}

function validateName(name) {
    if (!name || name.length === 0) throw new Error(errorMensages.emptyName);
    if (name.length < 3) throw new Error(errorMensages.nameFormat);
}

function validateAge(age) {
    if (!age || age.length === 0) throw new Error(errorMensages.emptyAge);
    if (age < 18) throw new Error(errorMensages.minorAge);
}

function validateTalker(req, res, next) {
    const { name, age, talk } = req.body;
    try {
        validateName(name);
        validateAge(age);
        validateTalk(talk);
        next();
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

module.exports = validateTalker;