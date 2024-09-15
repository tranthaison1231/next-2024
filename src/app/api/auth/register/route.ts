import { hashPassword } from "@/core/helpers/hash";
import {
  conflictResponse,
  createdResponse,
  internalServerErrorResponse,
} from "@/core/helpers/response";
import { UserRepository } from "@/core/repositories/user";
import { RegisterSchema } from "@/core/schemas/register";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const { email, password } = RegisterSchema.parse(body);

    const user = await UserRepository.getUserByEmail(email);
    if (user) {
      return conflictResponse("User already exists.");
    }

    const hashedPassword = await hashPassword(password);
    await UserRepository.insert({
      email,
      password: hashedPassword,
    });

    return createdResponse({
      message: "User created successfully.",
    });
  } catch (error) {
    if (error instanceof Error) {
      return internalServerErrorResponse(error.message);
    }
    throw error;
  }
};
