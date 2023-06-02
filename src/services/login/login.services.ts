import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppErrors";
import "dotenv/config";
import { Repository } from "typeorm";
import { iLogin } from "../../interfaces/login.interfaces";

export const createLoginService = async (
  loginData: iLogin
): Promise<string> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      email: loginData.email,
    },
    withDeleted: true,
  });

  if (!user || user.deletedAt !== null) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordMatch = await compare(loginData.password, user.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = jwt.sign(
    {
      email: user.email,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(user.id),
    }
  );

  return token;
};
