let ls = {};
ls.setItem = (key, value) => {
    localStorage.setItem(key, value);
};
ls.getItem = (key) => {
    return JSON.parse(localStorage.getItem(key));
};
ls.removeItem = (key) => {
    localStorage.removeItem(key);
};

ls.updateItem = (key, value) => {
    localStorage.removeItem(key);
    localStorage.setItem(key, value)
}

ls.setAuthenticate = (role) => {
    localStorage.setItem('authentication', JSON.stringify({
        isAuthenticated: true,
        role: role
    }) )
}

ls.getAuthenticate = () => {
    return JSON.parse(localStorage.getItem('authentication'))
}

module.exports = ls;