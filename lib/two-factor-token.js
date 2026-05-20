import { prisma } from "./prisma";

export async function getTwoFactorTokenByToken(token) {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findUnique({
      where: { token },
    });
    return twoFactorToken;
  } catch {
    return null;
  }
}

export async function getTwoFactorTokenByEmail(email) {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findFirst({
      where: { email },
    });
    return twoFactorToken;
  } catch {
    return null;
  }
}

export async function createTwoFactorToken(email) {
  const token = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }

  const twoFactorToken = await prisma.twoFactorToken.create({
    data: { email, token, expires },
  });

  return twoFactorToken;
}
