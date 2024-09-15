import { prisma } from "@/core/db/prisma";

export interface CreateUserDto {
  email: string;
  password: string;
}

export interface UpdateUser {
  email: string;
}

export class UserRepository {
  static async getUserByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  static getAll = () => {
    return prisma.user.findMany({});
  };

  static insert({ email, password }: CreateUserDto) {
    return prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }

  static update(userId: string, { email }: UpdateUser) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        email,
      },
    });
  }

  static delete(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}
