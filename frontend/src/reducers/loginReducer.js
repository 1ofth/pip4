export function loginReducer(state = {isAuthorised: false, login: ""}, action) {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        isAuthorised: true,
        login: action.login
      };

    case 'SIGN_OUT':
      return {
        isAuthorised: false
      };

    case 'REG':
      return {
        login: action.login,
        isAuthorised: true
      };


    default:
      return {
        isAuthorised: true,
        login: action.login,
      };
  }
}
