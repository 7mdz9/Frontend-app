import { faker } from '@faker-js/faker';

const categories = [
  { id: 'discounts', name: 'Discounts' },
  { id: 'electrical_plumbing', name: 'Electrical Plumbing' },
  { id: 'cleaning_pest', name: 'Cleaning & Pest' },
  { id: 'home_repairs', name: 'Home Repairs' },
  
  
  
  
];

const NUM_COMPANIES = 5;
const NUM_SUBCATEGORIES = 5;
const NUM_SERVICES_PER_SUBCAT = 5;

export function generateMockCompaniesData() {
  const data = {};
  for (let i = 1; i <= NUM_COMPANIES; i++) {
    const category = faker.helpers.arrayElement(categories);
    const companyId = i.toString();
    const companyName = `Mock Company ${i}`;
    const hasDiscount = category.id === 'discounts';

    const subCategories = [];
    for (let sc = 1; sc <= NUM_SUBCATEGORIES; sc++) {
      const subCatId = `${companyId}_subcat${sc}`;
      const subCatName = `${category.name} Subcat ${sc}`;

      const services = [];
      for (let s = 1; s <= NUM_SERVICES_PER_SUBCAT; s++) {
        const serviceId = `${companyId}_subcat${sc}_service${s}`;
        services.push({
          id: serviceId,
          name: faker.commerce.productName(),
          price: Number(faker.commerce.price(10, 300, 0)),
          description: faker.commerce.productDescription(),
          company: companyName,
        });
      }

      subCategories.push({
        id: subCatId,
        name: subCatName,
        services,
      });
    }

    data[companyName] = {
      id: companyId,
      name: companyName,
      categoryId: category.id,
      hasDiscount,
      description: faker.company.catchPhrase(),
      logo: `https://source.unsplash.com/random/400x400/?business&sig=${i}`,
      subCategories,
    };
  }
  return data;
}
