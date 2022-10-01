const passwordValidator = (password) => {
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
}
const loginReginitialState = { isSuccess: false, message: "" };

const loginRegReducer = (state, action) => {
    switch (action.type) {
        case "success":
            return { isSuccess: true, message: action.payload };
        case "error":
            return { isSuccess: false, message: action.payload };
    }
};

export { passwordValidator, loginReginitialState, loginRegReducer }