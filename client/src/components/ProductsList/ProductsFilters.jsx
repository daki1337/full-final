import { useSelector } from "react-redux";
import styles from "./ProductsFilters.module.scss";

const ProductsFilters = ({ filters, setFilters }) => {
  const { categories } = useSelector((state) => state.categories);

  const handlePriceChange = (field) => (e) =>
    setFilters((prev) => ({ ...prev, [field]: e.target.value }));

  const handleCategoryChange = (id) => (e) =>
    setFilters((prev) => {
      const newCategories = e.target.checked
        ? [...prev.category, id]
        : prev.category.filter((catId) => catId !== id);
      return { ...prev, category: newCategories };
    });

  const handleCheckboxChange = (field) => (e) =>
    setFilters((prev) => ({
      ...prev,
      [field]: e.target.checked ? true : "",
    }));

  const otherFilters = [
    { field: "availability", label: "In Stock" },
    { field: "sale", label: "On Sale" },
  ];

  return (
    <aside>
      <form className={styles["filters-form"]}>
        <fieldset className={styles["filters-fieldset"]}>
          <legend>Price</legend>
          <div className={styles["price-container"]}>
            <input
              type="number"
              value={filters.minPrice}
              onChange={handlePriceChange("minPrice")}
              placeholder="Min price"
              className={styles["price-input"]}
            />
            <input
              type="number"
              value={filters.maxPrice}
              onChange={handlePriceChange("maxPrice")}
              placeholder="Max price"
              className={styles["price-input"]}
            />
          </div>
        </fieldset>

        <fieldset className={styles["filters-fieldset"]}>
          <legend>Category</legend>
          {categories.length > 0 ? (
            categories.map((category) => (
              <label key={category._id} className={styles["filters-label"]}>
                <input
                  type="checkbox"
                  value={category._id}
                  checked={filters.category.includes(category._id)}
                  onChange={handleCategoryChange(category._id)}
                />
                <span>{category.name}</span>
              </label>
            ))
          ) : (
            <div className={styles["no-categories"]}>No categories</div>
          )}
        </fieldset>

        <fieldset className={styles["filters-fieldset"]}>
          <legend>Other</legend>
          {otherFilters.map(({ field, label }) => (
            <label key={field}>
              <input
                type="checkbox"
                checked={filters[field] === true}
                onChange={handleCheckboxChange(field)}
              />
              <span>{label}</span>
            </label>
          ))}
        </fieldset>
      </form>
    </aside>
  );
};

export default ProductsFilters;
