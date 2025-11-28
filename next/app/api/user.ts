import prisma from '@/lib/prisma';

export default async function users() {
  return await prisma.user.findMany();
}
