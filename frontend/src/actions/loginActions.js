
export const registrate = (login) => ({
  type: 'REG',
  login: login,
  isAuthorised: true
});

export const failure = () => ({
  type: 'SIGN_FAILURE',
  failure: true
});

export const signOut = () => ({
  type: 'SIGN_OUT',
  isAuthorised: false,
  login: '',
});

export const signIn = (login) => ({
  type: 'SIGN_IN',
  login: login,
  isAuthorised: true,
  failure: false
});
