import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { UsersRepository } from '@/repositories/users-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  // na forma abaixo usando uma key word de visibilidade que faz com que o paramentro recebido na funcao da classe se torne
  // um atributo da classe que a funcao pertence
  constructor(private usersRepository: UsersRepository) {}

  async create({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new Error('Email already exists')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
