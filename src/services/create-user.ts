import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { User } from "@prisma/client";

interface CreateUserServiceRequest {
  email: string;
  password: string;
}

interface CreateUserServiceResponse {
  user: User;
}

export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: CreateUserServiceRequest): Promise<CreateUserServiceResponse> {
    // Cria um hash do password recebido
    const password_hash = await hash(password, 6);

    // Verifica se o email recebido já foi cadastrado
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    // Caso exista um usuário com o email recebido já cadastrado retorna erro
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    // Cadastra o usuário
    const user = await this.usersRepository.create({
      email,
      password: password_hash,
    });

    return {
      user,
    };
  }
}
