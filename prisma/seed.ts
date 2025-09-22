
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
  // Seed admin user
  const hashedPassword = await bcrypt.hash("happyHomes@456", 10);
  const adminEmail = "admin@happyhomes.com";

  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {
      last_login: new Date(),
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      updated_at: new Date(),
    },
  });
  console.log("Admin user seeded");

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    // process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
