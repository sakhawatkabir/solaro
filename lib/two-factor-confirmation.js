import { prisma } from "./prisma";

export async function getTwoFactorConfirmationByUserId(userId) {
  try {
    return await prisma.twoFactorConfirmation.findUnique({
      where: { userId },
    });
  } catch {
    return null;
  }
}

export async function createTwoFactorConfirmation(userId) {
  return await prisma.twoFactorConfirmation.create({
    data: { userId },
  });
}

export async function deleteTwoFactorConfirmation(id) {
  return await prisma.twoFactorConfirmation.delete({
    where: { id },
  });
}
