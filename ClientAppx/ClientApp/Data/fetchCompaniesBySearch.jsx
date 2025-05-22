// /Data/fetchCompaniesBySearch.jsx
import { unifiedCompaniesData } from './unifiedData';

export async function fetchCompaniesBySearch(page = 1, pageSize = 50, query = '') {
  return new Promise((resolve) => {
    setTimeout(() => {
      let allCompanies = Object.values(unifiedCompaniesData);
      const q = query.trim().toLowerCase();

      if (q) {
        allCompanies = allCompanies.filter((company) =>
          company.name.toLowerCase().includes(q)
        );
      }

      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const pageData = allCompanies.slice(start, end);

      resolve(pageData);
    }, 500);
  });
}
