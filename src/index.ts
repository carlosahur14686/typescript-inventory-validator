enum ProductStatus {
  Active = "active",
  Inactive = "inactive"
}

interface Product {
  code: string;
  name: string;
  stock: number;
  price: number;
  status: ProductStatus;
}

interface ValidationResult {
  code: string;
  issues: string[];
}

interface InventorySummary {
  totalProducts: number;
  validProducts: number;
  invalidProducts: number;
  totalStockValue: number;
}

function validateProduct(product: Product): ValidationResult {
  const issues: string[] = [];

  if (!product.code.trim()) {
    issues.push("Product code is required.");
  }

  if (!product.name.trim()) {
    issues.push("Product name is required.");
  }

  if (!Number.isInteger(product.stock)) {
    issues.push("Stock must be an integer.");
  } else if (product.stock < 0) {
    issues.push("Stock cannot be negative.");
  }

  if (!Number.isFinite(product.price)) {
    issues.push("Price must be numeric.");
  } else if (product.price < 0) {
    issues.push("Price cannot be negative.");
  }

  return {
    code: product.code || "(missing)",
    issues
  };
}

function buildSummary(products: Product[]): InventorySummary {
  const validationResults = products.map(validateProduct);

  const validProducts = validationResults.filter(
    result => result.issues.length === 0
  ).length;

  const totalStockValue = products
    .filter((product, index) => validationResults[index].issues.length === 0)
    .reduce((total, product) => total + product.stock * product.price, 0);

  return {
    totalProducts: products.length,
    validProducts,
    invalidProducts: products.length - validProducts,
    totalStockValue
  };
}

const products: Product[] = [
  {
    code: "CRD-001",
    name: "Work Table",
    stock: 4,
    price: 250,
    status: ProductStatus.Active
  },
  {
    code: "CRD-002",
    name: "Storage Rack",
    stock: -2,
    price: 180,
    status: ProductStatus.Active
  },
  {
    code: "",
    name: "Side Table",
    stock: 1,
    price: 120,
    status: ProductStatus.Inactive
  }
];

const validationResults = products.map(validateProduct);
const invalidProducts = validationResults.filter(
  result => result.issues.length > 0
);

if (invalidProducts.length === 0) {
  console.log("All products are valid.");
} else {
  console.log(`Found ${invalidProducts.length} invalid product(s):`);

  for (const result of invalidProducts) {
    console.log(`- ${result.code}: ${result.issues.join(" ")}`);
  }
}

const summary = buildSummary(products);

console.log("\nInventory summary:");
console.log(`Total products: ${summary.totalProducts}`);
console.log(`Valid products: ${summary.validProducts}`);
console.log(`Invalid products: ${summary.invalidProducts}`);
console.log(`Valid stock value: $${summary.totalStockValue.toFixed(2)}`);
