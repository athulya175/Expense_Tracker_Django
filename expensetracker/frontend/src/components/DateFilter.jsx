function DateFilter({ selectedDate, setSelectedDate }) {
  return (
    <div className="mb-3">
      <label>Select Date</label>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
    </div>
  );
}

export default DateFilter;