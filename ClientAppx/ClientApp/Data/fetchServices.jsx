// /Data/fetchServices.jsx
import { unifiedCompaniesData } from './unifiedData';

export async function fetchServices(page = 1, pageSize = 50, query = '', companyName = '') {
  return new Promise((resolve) => {
    setTimeout(() => {
      let allServices = [];

      Object.values(unifiedCompaniesData).forEach((company) => {
        if (company.subCategories) {
          company.subCategories.forEach((subCat) => {
            if (subCat.services) {
              allServices.push(...subCat.services);
            }
          });
        }
      });

      if (query.trim()) {
        const q = query.trim().toLowerCase();
        allServices = allServices.filter(s => s.name.toLowerCase().includes(q));
      } else if (companyName.trim()) {
        allServices = allServices.filter(s => s.company === companyName);
      }

      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const pageData = allServices.slice(start, end);
      resolve(pageData);
    }, 500);
  });
}
