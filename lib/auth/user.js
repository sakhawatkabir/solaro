import { prisma } from "../prisma";

export async function getUserByEmail(email) {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch {
    return null;
  }
}

export async function getUserById(id) {
  try {
    return await prisma.user.findUnique({ where: { id } });
  } catch {
    return null;
  }
}
