import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateServiceResponse {
  user: User;
}

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    // Verifica se o usuário já existe
    const user = await this.usersRepository.findByEmail(email);

    // Retorna um error caso o usuário não esteja cadastrado
    if (!user) {
      throw new InvalidCredentialsError();
    }

    // Compara o password recebido com o do usuário no banco de dados
    const doesPasswordMatches = await compare(password, user.password);

    // Caso o password recebido esteja icorreto retorna um erro
    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
