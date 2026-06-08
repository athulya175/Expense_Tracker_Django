function ExpenseList({ expense,deleteExpense }) {
  return (
    <>
      {expense.map((exp) => (
        <div className="card mb-3" key={exp.id}>
          <div className="card-body">
            <h5>{exp.title}</h5>
            <p>₹{exp.amount}</p>
            <p>{exp.category}</p>
            <button className="btn btn-danger" onClick={()=>deleteExpense(exp.id)}>Delete</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default ExpenseList;