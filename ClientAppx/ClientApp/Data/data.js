// /Data/data.js

export const categoriesData = [
  { id: '1', name: 'Electrical Plumbing' },
  { id: '2', name: 'Cleaning & Pest' },
  { id: '3', name: 'Home Repairs' },
];

/**
 * We now define exactly 3 companies
 * matching the names in "unifiedData.js".
 */
export const companiesData = [
  {
    id: '1',
    name: 'SuperFix LLC',
    category: 'Electrical Plumbing',
    logo: 'https://via.placeholder.com/100?text=SuperFix+Logo',
  },
  {
    id: '2',
    name: 'SparkleClean',
    category: 'Cleaning & Pest',
    logo: 'https://via.placeholder.com/100?text=SparkleClean+Logo',
  },
  {
    id: '3',
    name: 'HandyHome Pros',
    category: 'Home Repairs',
    logo: 'https://via.placeholder.com/100?text=HandyHome+Logo',
  },
];

/**
 * (Optional) If your app references "companyDetailsData",
 * you can remove or leave it empty. We'll leave it here for reference,
 * but your new "UnifiedTemplateScreen" uses unifiedData.js instead.
 */
export const companyDetailsData = {};
