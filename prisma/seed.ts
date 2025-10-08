
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

  // Seed Keywords
  const keywordNames = ["Furnished", "Unfurnished", "Semi furnished"];
  for (const name of keywordNames) {
    await prisma.keyword.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log("Keywords seeded");

  // Seed Property Categories
  const categoryNames = [
    "1BHK",
    "2BHK",
    "3BHK",
    "4BHK",
    "Villa",
    "Banglow",
  ];
  for (const name of categoryNames) {
    await prisma.property_Category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log("Property categories seeded");

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
