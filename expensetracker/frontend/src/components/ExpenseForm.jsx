function ExpenseForm({
  formData,
  handleChange,
  handleSubmit,
  editId
}) {
  return (
    <div className="card p-4 mb-4">

      <input
        className="form-control mb-2"
        type="text"
        name="title"
        value={formData.title}
        placeholder="Title"
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        type="number"
        name="amount"
        value={formData.amount}
        placeholder="Amount"
        onChange={handleChange}
      />

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

      <input
        className="form-control mb-2"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        type="text"
        name="description"
        value={formData.description}
        placeholder="Description"
        onChange={handleChange}
      />

      <button
        className="btn btn-primary"
        onClick={handleSubmit}
      >
        {editId ? "Update Expense" : "Add Expense"}
      </button>

    </div>
  );
}

export default ExpenseForm;