
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
  // Seed admin user
  // const hashedPassword = await bcrypt.hash("happyHomes@456", 10);
  // const adminEmail = "admin@happyhomes.com";

  // await prisma.admin.upsert({
  //   where: { email: adminEmail },
  //   update: {
  //     last_login: new Date(),
  //   },
  //   create: {
  //     email: adminEmail,
  //     password: hashedPassword,
  //     updated_at: new Date(),
  //   },
  // });
  // console.log("Admin user seeded");

  // Property Categories
  const categories = [
    "Apartment",
    "Villa",
    "Office",
    "Shop",
    "Plot",
    "Farmhouse",
    "Penthouse",
  ];

  for (const name of categories) {
    await prisma.property_Category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Amenities
  const amenities = [
    "Swimming Pool",
    "Gym",
    "Parking",
    "Garden",
    "Power Backup",
    "Lift",
    "Security",
    "Playground",
  ];

  for (const name of amenities) {
    await prisma.amenity.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("Categories and Amenities seeded successfully!");


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
