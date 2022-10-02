const passwordValidator = (password) => {
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}

interface State {
  isSuccess: boolean | null;
  message: string;
}

type Action = {
  type: "success" | "error" | "reset";
  payload?: string;
}
const loginReginitialState: State = { isSuccess: null, message: '' }

const loginRegReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'success':
      return { isSuccess: true, message: action.payload }
    case 'error':
      return { isSuccess: false, message: action.payload }
    case 'reset':
      return loginReginitialState
  }
}

export { passwordValidator, loginReginitialState, loginRegReducer }
