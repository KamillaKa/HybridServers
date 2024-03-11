import {fetchData} from './functions';
import {UserWithNoPassword} from '@sharedTypes/DBTypes';
import {LoginResponse} from '@sharedTypes/MessageTypes';

// select forms from the DOM
const loginForm = document.querySelector('#login-form');
const fileForm = document.querySelector('#file-form');

// select inputs from the DOM
const usernameInput = document.querySelector('#username') as HTMLInputElement;
const passwordInput = document.querySelector('#password') as HTMLInputElement;

// select profile elements from the DOM
const usernameTarget = document.querySelector('#username-target');
const emailTarget = document.querySelector('#email-target');

// TODO: function to login
const login = async (): Promise<LoginResponse> => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  const options = {
    method: 'POST',
    body: JSON.stringify({username, password}),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const loginResponse = await fetchData<LoginResponse>(
    import.meta.env.VITE_AUTH_SERVER + '/auth/login',
    options
  );
  return loginResponse;
};

// TODO: function to add userdata (email, username and avatar image) to the
// Profile DOM and Edit Profile Form
const addUserDataToDom = (user: UserWithNoPassword): void => {
  if (!usernameTarget || !emailTarget) {
    return;
  }
  usernameTarget.textContent = user.username;
  emailTarget.textContent = user.email;
};

// function to get userdata from API using token
const getUserData = async (token: string): Promise<UserWithNoPassword> => {
  return {} as UserWithNoPassword;
};

// TODO: function to check local storage for token and if it exists fetch
// userdata with getUserData then update the DOM with addUserDataToDom
const checkToken = async (): Promise<void> => {};

// call checkToken on page load to check if token exists and update the DOM
checkToken();

// TODO: login form event listener
// event listener should call login function and save token to local storage
// then call addUserDataToDom to update the DOM with the user data
if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      const loginResponse = await login();
      localStorage.setItem('token', loginResponse.token);
      addUserDataToDom(loginResponse.user);
      alert(loginResponse.message);
    } catch (error) {
      console.log(error);
      alert((error as Error).message);
    }
  });
}

// TODO: avatar form event listener
// event listener should call uploadAvatar function and update the DOM with
// the user data by calling addUserDataToDom or checkToken
