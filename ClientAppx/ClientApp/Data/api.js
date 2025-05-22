import { unifiedCompaniesData } from './unifiedData';

export const fetchCompanies = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.values(unifiedCompaniesData));
    }, 500);
  });
};

export const fetchCompanyById = async (companyId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const companiesArray = Object.values(unifiedCompaniesData);
      const company = companiesArray.find((c) => c.id === companyId);
      if (company) {
        resolve(company);
      } else {
        reject(new Error('Company not found'));
      }
    }, 500);
  });
};

export const fetchCategories = async () =>
  new Promise((res) =>
    setTimeout(
      () =>
        res([
          { id: 'discounts',            name: 'Discounts',            usage: 73 },
          { id: 'electrical_plumbing',  name: 'Electrical Plumbing',  usage: 122 },
          { id: 'cleaning_pest',        name: 'Cleaning & Pest',      usage: 86 },
          { id: 'home_repairs',         name: 'Home Repairs',         usage: 41 },
          // add the rest with `usage`
        ]),
      500
    )
  );
