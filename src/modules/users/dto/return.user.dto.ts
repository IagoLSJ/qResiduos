export class ReturnUserDTO {
  id: string;
  email: string;
  username: string;
  cpf: string;
  telephone: string;

  constructor(
    id: string,
    email: string,
    username: string,
    cpf: string,
    telephone: string,
  ) {
    this.id = id;
    this.username = username;
    this.cpf = cpf;
    this.email = email;
    this.telephone = telephone;
  }
}
