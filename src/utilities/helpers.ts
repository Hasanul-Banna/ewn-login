const passwordValidator = (password: string) => {
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

interface StateType {
  isSuccess: boolean | null;
  message: string;
}

export type ActionType = {
  type: "success" | "error" | "reset";
  payload?: string;
};
const loginReginitialState: StateType = { isSuccess: null, message: "" };

const loginRegReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "success":
      return { isSuccess: true, message: action.payload };
    case "error":
      return { isSuccess: false, message: action.payload };
    case "reset":
      return loginReginitialState;
    default:
      return state;
  }
};

export { passwordValidator, loginReginitialState, loginRegReducer };
