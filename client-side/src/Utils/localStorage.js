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

ls.setAuthenticate = (role, accountId) => {
    localStorage.setItem('authentication', JSON.stringify({
        account_id: accountId,
        isAuthenticated: true,
        role: role
    }) )
}

ls.getAuthenticate = () => {
    return JSON.parse(localStorage.getItem('authentication'))
}

ls.logOut =() =>{
    localStorage.removeItem('authentication');
}

module.exports = ls;