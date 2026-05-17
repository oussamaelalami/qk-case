import { PrismaClient, OrderStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Admin user
  const adminPassword = await bcrypt.hash('admin123!', 12);
  await prisma.adminUser.upsert({
    where: { email: 'admin@qkcase.com' },
    update: {},
    create: {
      email: 'admin@qkcase.com',
      password: adminPassword,
      name: 'Alex Rivera',
    },
  });
  console.log('✅ Admin user created: admin@qkcase.com / admin123!');

  // Categories
  const categoryData = [
    { name: 'Anime', slug: 'anime', sortOrder: 1, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyV7Lkseyx5xaePMkQ49fUJKqXjMJqxyBh9OQT9kIsDr-M9uDaLwrVOAXiixGKRJsoabfDpUmLMAyx_GJRNSwA-qRqpzeto_AiMwJhluHnric4guc1nt91FKfTc3Y6rSUN5wjoUmkPkXXbuOo5VSQFDtR_WAIrDBz__Sb4pi7y1VwEfyC0NbBiDUEoguTIk4JGidJk6EnKUAvvc-YU2zkHIPrJ3dsFAUk0k-JqI6qy28gcGEiWFXf_qGRIo2RNn2TIjUDUonXURu0' },
    { name: 'Football', slug: 'football', sortOrder: 2, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLgQke2zmgYBNInFsGw6KlH_4_q8Qnc_6j9L0D5rZS_s_tGD_T6ZnrFTxcTc9w8zcY_O0ItKaycHVfCu4lQwn_wBzDXlG0tSyFTQfr7hSYMQJVrP8UrDJzji9cPTarrHzKSMPr2zFAScgd5EEzZtG0gSDzpSdmXUHgfXHFCJPMCfVqCuqQBQ8rGbfJDY7mbPhI5mYs6WFMrs7CbnSghiV0N5VE4eqPqsdivl59Xk_pmMP8im78btXz128Jfas-t_og3QQlP1KaOjg' },
    { name: 'Cars', slug: 'cars', sortOrder: 3, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBEktw3skTz1hTs0Llhn3ROceBbl554JwZ1mx4WPgy_iXAzoUPJ-e8NHa0uIBzI7pEjjOb32iDLglV6mhm80nUCfJxqdFYGcnrCW7CRxTmhHgSHLSO1PJoc0NPBMSmxZPdxginjo3f5WupTJGoyoBcN9lkT2j4KQuvcC1scqvtEWTXf3kznozg1BpAeG6JnjiB9gTc-EF0vAP6Q2ipQA-trWVIH32ORS7HhjfarekWhFGtdnAcHViQVON5XmR6z5QQ9NU2HFGbewg' },
    { name: 'Minimal', slug: 'minimal', sortOrder: 4, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1SamNskYdhh6tmxWtMEvjqsQ1CSvvA4MVcf2Rdx289gWtJlgd_HQsV0C-hO0UMFn4Is6lwMgNhpgmOblwI0iyrcMXbEGLggSnFd_Pqut1Hdn0NDzkKuDoead9k76t4a3hjAnRairOPr9zZXOFcmFImCcks-INRc6ZPAMVHY8uTQmCzyv1zt-XaoZN9Omsh3_ntsBw__-d_-4qiAnpE2jH_j9x7xyTBqOtRwBA5WHPOdoxHHYQ3oCWMnicrF5xD9gFnhvJilQApAc' },
    { name: 'Gaming', slug: 'gaming', sortOrder: 5, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwt2-E3yEowNnlKNlFJvpzmJ8o9unVhwHQrF-m9PaMnxjuaORomT9h2xBU7A9p1hAoLVnkkQAEIiNNwItwVqeYYyh0gT_nqZKbn1A2QGVrSjsWGempzskVtkz0xU-09gSYEKnliSu9gvETou7ujuj2aMoB0-eciQYrWb46fUcmON1Gs7_4Zu4H_yDqIj5mdjAcCyv67iNmq0hoXDHH5-zNg0uQ05ip3TDVrFy7wgbxYlMwGh7x9-nlkRGT2iHn97D2a_t_F8bRGI4' },
    { name: 'Custom', slug: 'custom', sortOrder: 6, active: true },
  ];

  const categories: Record<string, string> = {};
  for (const cat of categoryData) {
    const c = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    categories[cat.slug] = c.id;
  }
  console.log('✅ Categories created');

  // Designs
  const designData = [
    { name: 'Nebula Drift', slug: 'nebula-drift', price: 49, categorySlug: 'gaming', featured: true, images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuD1tuUHABt5xsYEAJ1R26p6lrwRCtDbA672Syg_TpXBV-_7QENBixow0R6Q1zbugSbmAaOQv0TqqAkvYkzrESno9n_B6dPuLZXu4WhDAAyiB7-Jl_cWvrOsuZI2XNAWjDmd_dW6-fqA66NYFt7-4BqUsuTIMuSpMDpX0seUTxpmiaXWAxpOdLIXqH9u3uA3wcmggospnbD2jSyeXMwz3emuZVWlFoTWXkFnoBQqE9R2KudLyGi73opBgmCi0Lxrb9OSS5OMjoUQm4g'] },
    { name: 'Zen Wave', slug: 'zen-wave', price: 45, categorySlug: 'minimal', featured: false, images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBLgQke2zmgYBNInFsGw6KlH_4_q8Qnc_6j9L0D5rZS_s_tGD_T6ZnrFTxcTc9w8zcY_O0ItKaycHVfCu4lQwn_wBzDXlG0tSyFTQfr7hSYMQJVrP8UrDJzji9cPTarrHzKSMPr2zFAScgd5EEzZtG0gSDzpSdmXUHgfXHFCJPMCfVqCuqQBQ8rGbfJDY7mbPhI5mYs6WFMrs7CbnSghiV0N5VE4eqPqsdivl59Xk_pmMP8im78btXz128Jfas-t_og3QQlP1KaOjg'] },
    { name: 'Carbon Stealth', slug: 'carbon-stealth', price: 39, categorySlug: 'gaming', featured: true, images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCbvZPHExijYV6fUnxg3h9QFyk3fWqCq1xaQnZG1rZkP21aub3SmX0JO7Pd3AsqmgbC2j0jDhC0cx1GJqPq6ahVmO6hhi9NjDAGOO6uuUH9N9bBF_zpKopuB-ibEHJjwP5sxO8xUP-b5cATB2QcoWDtkppUROh4nII6xG_ZA_hDp0KAgZiwWchS-Pq0xXYpcABibfpdrALKNqOmqm4kYAhQfaMVajJDapHoseXrCH1X5EdGLM-CCPRuvRPZ_QdzraSrxMeBf4jSFGA'] },
    { name: 'Galactic Peak', slug: 'galactic-peak', price: 29, categorySlug: 'minimal', featured: true, images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuA5AhQs2NIwszpEQEBKacTYEmsXso-sHtv7Uyhtf28mu7bb-ofh2YNlw0jM5npLzOxiKRkgCl4vEl4GTnCwsp-AHASu-C6mHnCUO_Trqgb_JvBzPovSOUqvvk5MiqCFlfjh1OEJzSy1EB5kaTFli5YibENDXW9ztpLQ26cjPXgDRW2Oo0kQ3e4AfVNOk3GSkUGKDYc_OibWdbhCYkHBYpHxjyz12gLaUdKr-NEYKBGjb5uBiDlGIh1fjg_ZXsij7VrQKnbpTMcAuOM'] },
    { name: 'Abstract Emerald', slug: 'abstract-emerald', price: 34, categorySlug: 'minimal', featured: false, images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuATMP0DOA2k5odXIpVD8wjfrP7fr7NjjV2Na9sAogQt_pxbOZEzdHNZH4TPl67eZYDHBZ-8-ZJwzYT9JtQi-247b2zBSBQf82DknMopLjvHzTGALtbVDjzuJmALzIBUqfKPGyqmlqgZk_h6iNTbaDFPNmBZKdUa7uJZkwkTDaRRsRUEblVmK4YGSqVACSBw_ET94QAVx2Pr8MfwhHZk-o-ax0nldLdMqNe_6O3cUo6n5Gq_61kfG38kTWAQLFhThSjX7LUV1oLu-io'] },
    { name: 'Cyber Neon V.1', slug: 'cyber-neon-v1', price: 29, categorySlug: 'gaming', featured: true, images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuB0h03T_9MfKnS8gj2e-HSs2prrE1K77Rnkl_mqpDnXTGnOAg3ka3BlCx9Mov51nf0cuSw2eEQzioh99SCbH4hfGpX1uOn3q_TiBMdF-C-dx8YvP9otZGQg46X8hliMBG-zUL2se3kVQ3xEn4sU47GErIgtqshVOyTVVWwRKyoKzc_aRTmQPbgvuGhjzQ1QMYVIUSvSavrt_ZD6CLJd3JlE_cqDoZFgfFjf52yL8C7-G1G5wTvuOj_Teun9rEU5boB3SKUNho79ZQw'] },
  ];

  for (const d of designData) {
    await prisma.design.upsert({
      where: { slug: d.slug },
      update: {},
      create: {
        name: d.name,
        slug: d.slug,
        price: d.price,
        images: d.images,
        featured: d.featured,
        categoryId: categories[d.categorySlug],
      },
    });
  }
  console.log('✅ Designs created');

  // Sample orders
  await prisma.order.createMany({
    skipDuplicates: true,
    data: [
      { customerName: 'Lucas Martin', phoneNumber: '+33 6 12 34 56 78', instagram: '@lucas_m', phoneBrand: 'iPhone', phoneModel: 'iPhone 15 Pro', status: OrderStatus.DELIVERED },
      { customerName: 'Sarah Khalil', phoneNumber: '+33 6 98 76 54 32', instagram: '@sarah_k', phoneBrand: 'Samsung', phoneModel: 'Galaxy S24', status: OrderStatus.CONFIRMED },
      { customerName: 'Alexandre Tazi', phoneNumber: '+212 6 00 11 22 33', instagram: '@alex_t', phoneBrand: 'iPhone', phoneModel: 'iPhone 14', status: OrderStatus.PENDING },
    ],
  });
  console.log('✅ Sample orders created');

  console.log('\n🎉 Seeding complete!');
  console.log('Admin login → email: admin@qkcase.com | password: admin123!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
