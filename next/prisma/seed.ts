import { PrismaClient, Prisma } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
import argon2 from 'argon2';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const adminPassword = process.env.ADMIN_PASSWORD;
const adminEmail = process.env.ADMIN_EMAIL;

if (!adminPassword) {
  throw new Error(
    'ADMIN_PASSWORD environment variable is missing. Please set it in your .env file.'
  );
}

if (!adminEmail) {
  throw new Error(
    'ADMIN_EMAIL environment variable is missing. Please set it in your .env file.'
  );
}

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Admin',
    email: adminEmail,
    password: adminPassword,
  },
  {
    name: 'Bob',
    email: 'bob@gmail.com',
    password: 'password456',
  },
];

export async function main() {
  for (const u of userData) {
    const hashedPassword = await argon2.hash(u.password);

    await prisma.user.create({
      data: {
        email: u.email,
        name: u.name,
        password: hashedPassword,
      },
    });
  }
}

main()
  .catch(e => {
    console.error('Error seeding the database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
