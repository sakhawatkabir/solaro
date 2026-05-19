import { prisma } from "./prisma";

export async function getTwoFactorConfirmationByUserId(userId: string) {
  try {
    return await prisma.twoFactorConfirmation.findUnique({
      where: { userId },
    });
  } catch {
    return null;
  }
}

export async function createTwoFactorConfirmation(userId: string) {
  return await prisma.twoFactorConfirmation.create({
    data: { userId },
  });
}

export async function deleteTwoFactorConfirmation(id: string) {
  return await prisma.twoFactorConfirmation.delete({
    where: { id },
  });
}
