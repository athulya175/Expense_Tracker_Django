function DashboardCards({
  totalExpense,
  foodExpense,
  travelExpense,
  othersExpense
}) {
  return (
    <div className="row mb-4">

      <div className="col-md-3">
        <div className="card text-center shadow-sm">
          <div className="card-body">
            <h6>Total Expense</h6>
            <h3>₹{totalExpense}</h3>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card text-center shadow-sm">
          <div className="card-body">
            <h6>Food</h6>
            <h3>₹{foodExpense}</h3>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card text-center shadow-sm">
          <div className="card-body">
            <h6>Travel</h6>
            <h3>₹{travelExpense}</h3>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card text-center shadow-sm">
          <div className="card-body">
            <h6>Others</h6>
            <h3>₹{othersExpense}</h3>
          </div>
        </div>
      </div>

    </div>
  );
}

export default DashboardCards;