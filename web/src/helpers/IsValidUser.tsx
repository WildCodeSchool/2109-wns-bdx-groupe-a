import { UserSignUp } from '../types/user/UserSignUpTypes';

  const isValidEmail = (email: string) => {
    const re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  //function valid if password is valid (8 caracters minimum, 1 number, 1 special caracter)
  const isValidPassword = (password: string) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/;
    return re.test(String(password));
  };

  const isValidName = (name: string) => {
    const re = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return re.test(String(name));
  };

  export const isValidUser = (user: UserSignUp) => {
    return (
      isValidEmail(user.email) &&
      isValidPassword(user.password) &&
      isValidName(user.firstName) &&
      isValidName(user.lastName)
    );
  };

  export const handleIsNotValidUserError = (setError: React.Dispatch<React.SetStateAction<string>>, user: UserSignUp) => {
    if (!isValidEmail(user.email)) {
      setError('L\'adresse email n\'est pas valide');
    } else if (!isValidPassword(user.password)) {
      setError('Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial');
    }   else if (!isValidName(user.firstName)) {
      setError('Le prénom n\'est pas valide');
    }  else if (!isValidName(user.lastName)) {
      setError('Le nom n\'est pas valide');
    }
  }