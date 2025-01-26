import { users } from './schema';
import { db } from '.';
import { hashPassword } from '../auth/session';


async function seed() {
  const email = 'admin@gmail.com';
  const password = 'admin123';
  const passwordHash = await hashPassword(password);

  await db
    .insert(users)
    .values([
      {
        email: email,
        passwordHash: passwordHash,
        role: "owner",
      },
    ])
    .returning();

  console.log('Initial user created.');
}

seed()
  .catch((error) => {
    console.error('Seed process failed:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('Seed process finished. Exiting...');
    process.exit(0);
  });
