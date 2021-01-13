
exports.fakeAuth = {
    isAuthenticated: "0",
    page: "",
    authenticate(value) {
        this.isAuthenticated = value;
        //console.log(this.isAuthenticated);
        //setTimeout(cb, 100);
    },
    signout(cb) {
        this.isAuthenticated = "0";
        // console.log("au: false");
        setTimeout(cb, 100);
    },
    getLocalStorage_IsAuthenticated() {
        if (localStorage.getItem("isAuthenticated") == null) {
            this.setLocalStorage_IsAuthenticated("0");
        } else if (localStorage.getItem("isAuthenticated") !== "0") {
            console.log(localStorage.getItem("isAuthenticated"));
            this.authenticate(localStorage.getItem("isAuthenticated"));
        } else {
            this.signout();
        }
    },
    setLocalStorage_IsAuthenticated(value) {
        /* Lưu biến vào bộ nhớ application */
        localStorage.setItem("isAuthenticated", value);
    }
};