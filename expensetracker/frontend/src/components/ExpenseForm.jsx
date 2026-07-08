import styles from "./ExpenseForm.module.css";
function ExpenseForm({ formData, handleChange, handleSubmit, editId, errors }) {
  return (
    <div className={styles.formCard}>
      <h4 className={styles.sectionTitle}>ADD EXPENSE</h4>
      <div className={styles.formGrid}>

        <div>

          <label className={styles.label}>Title</label>
          <input
            className="form-control mb-2"
            type="text"
            name="title"
            value={formData.title}
            placeholder="Title"
            onChange={handleChange}
          />
          {errors.title && (
            <small className="text-danger">
              {errors.title[0]}
            </small>
          )}
        </div>
        <div>
          <label className={styles.label}>Amount</label>
          <input
            className="form-control mb-2"
            type="number"
            name="amount"
            value={formData.amount}
            placeholder="Amount"
            onChange={handleChange}
          />
          {errors.amount && (
            <small className="text-danger">
              {errors.amount[0]}
            </small>
          )}
        </div>
        <div>
          <h4 className={styles.sectionTitle}>Category</h4>
          <select
            className="form-select mb-2"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Others">Others</option>
          </select>
          {errors.category && (
            <small className="text-danger">
              {errors.category[0]}
            </small>
          )}
        </div>
        <div>
          <h4 className={styles.sectionTitle}>Date</h4>
          <input
            className="form-control mb-2"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && (
            <small className="text-danger">
              {errors.date[0]}
            </small>
          )}
        </div>
      </div>
      <div className={styles.fullWidth}>
        <h4 className={styles.sectionTitle}>Description</h4>
        <input
          className="form-control"
          type="text"
          name="description"
          value={formData.description}
          placeholder="Description"
          onChange={handleChange}
        />
        {errors.description && (
          <small className="text-danger">
            {errors.description[0]}
          </small>
        )}
      </div>

      <div className={styles.fullWidth}>
        <button
          className={`btn btn-primary ${styles.submitBtn}`}
          onClick={handleSubmit}
        >
          {editId ? "Update Expense" : "Add Expense"}
        </button>
      </div>
    </div>
  );
}

export default ExpenseForm;
