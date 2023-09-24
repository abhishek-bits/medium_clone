// Making an interface to match the reponse
// structure as expected by the POST API: /api/users
export interface RegisterRequestInterface {
  user: {
    username: string;
    email: string;
    password: string;
  };
}
