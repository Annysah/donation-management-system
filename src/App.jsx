import { useState } from "react";

const App = () => {
  const [donations, setDonations] = useState([]); //state to handle the donations array,
  const [donorName, setDonorName] = useState(""); //state to handle the name of the donor
  const [donationType, setDonationType] = useState(""); //state to handle type of the donation
  const [donationQuantity, setDonationQuantity] = useState(""); //state to handle the quantity or amount donated
  const [donationDate, setDonationDate] = useState(""); //state to handle the date of the donation
  const [filterDonationType, setFilterDonationType] = useState(""); //state to handle the filtered donation type

  const handleSubmit = (e) => {
    e.preventDefault(); //this prevents the form from submitting by default when the page loads

    //This statement validates the form input fields. It checks if the form inputs are not filled, then it displays an alert which prompts the user to fill in the missing fields
    if (!donorName || !donationType || !donationQuantity || !donationDate) {
      alert('Please fill missing fields');
      return;
    }

    const newDonation = { // to make my code cleaner, I stored my form values in this object
      donorName,
      donationType,
      donationQuantity,
      donationDate,
    };

    setDonations([...donations, newDonation]); // this adds the new donation form values to already existing donations list

    //This clears the form fields
    setDonorName("");
    setDonationType("");
    setDonationQuantity("");
    setDonationDate("");
  };

  //Function to delete a donation entry from the list
  //Here, the filter method creates a new array. 
  //This array stores donations where the index (i) is not the same as the index (id) of the selected donation that needs to be deleted.
  const handleDelete = (id) => {
    const filterDonation = donations.filter((donation, i) => i !== id); 
    setDonations(filterDonation);
  };

  //This function captures the user selection from the filter types dropdown menu
  const handleFilter = (e) => {
    setFilterDonationType(e.target.value);
  };


  //This function executes the display of filtered donations, using the ternary operator
  //If the value of the selected filter type is for instance "money", using the filter method it creates a new array with the donation type equal to money else it displays the donations list.
  const filteredDonations = filterDonationType
    ? donations.filter(
        (donation) => donation.donationType === filterDonationType
      )
    : donations;


  //This function used the JavaScript reduce method to return a single value accumulated results 
  //Here the initial value is set to 0. This means that 0 + whatever the current donation quantity is
  const totalAmountDonated = donations.reduce(
    (accumulator, donation) => accumulator + Number(donation.donationQuantity),
    0
  );

  return (
    <>
      <div className="container mx-auto p-4 w-1/3">
        <h1 className="text-2xl font-bold mb-4">Donation Management App</h1>

        {/* Donation Input Form */}
        <div className="border rounded-lg p-8 w-auto mb-4">
          <form className="mb-4" onSubmit={handleSubmit}>
            <label className="block mb-2">Donor Name</label>
            <input
              type="text"
              className="border p-2 mb-2 w-full"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
            />

            <label className="block mb-2">Donation Type</label>
            <input
              type="text"
              className="border p-2 mb-2 w-full"
              value={donationType}
              onChange={(e) => setDonationType(e.target.value)}
            />

            <label className="block mb-2">Quantity or Amount Donated (kg, $, 0r pieces)</label>
            <input
              type="number"
              className="border p-2 mb-2 w-full"
              value={donationQuantity}
              onChange={(e) => setDonationQuantity(e.target.value)}
            />

            <label className="block mb-2">Date of Donation</label>
            <input
              type="date"
              className="border p-2 mb-2 w-full"
              value={donationDate}
              onChange={(e) => setDonationDate(e.target.value)}
            />

            <button type="submit" className="bg-black text-white p-2 mt-2">
              Submit Donation
            </button>
          </form>
        </div>

        {/* Donation List */}
        <div>
          <h2 className="text-xl font-bold mb-4">Donation List</h2>
          <label className="block mb-2">Filter by Type</label>
          <select
            className="border p-2 mb-2"
            value={filterDonationType}
            onChange={handleFilter}
          >
            <option value="">All Types</option>
            <option value="money">Money($)</option>
            <option value="food">Food(kg)</option>
            <option value="clothing">Clothing(Pieces)</option>
          </select>

          {/*Table displaying the donation list*/}
          <table className="table-auto text-center border-spacing-2 border border-slate-400">
            <thead>
              <tr>
                <th className="py-2 px-4 border border-slate-300">
                  Donor Name
                </th>
                <th className="py-2 px-4 border border-slate-300">
                  Donation Type
                </th>
                <th className="py-2 px-4 border border-slate-300">
                  Quantity or Amount Donated
                </th>
                <th className="py-2 px-4 border border-slate-300">
                  Date of Donation
                </th>
                <th className="py-2 px-4 border border-slate-300"></th>
              </tr>
            </thead>
            
            {filteredDonations.map((donation, index) => (
              <tbody key={index}>
                <tr>
                  <td className="p-2 border border-slate-300">
                    {donation.donorName}
                  </td>
                  <td className="p-2 border border-slate-300">
                    {donation.donationType}
                  </td>
                  <td className="p-2 border border-slate-300">
                    {donation.donationQuantity}
                  </td>
                  <td className="p-2 border border-slate-300">
                    {donation.donationDate}
                  </td>
                  <td className="p-2 border border-slate-300">
                    <button
                      className="text-red-500 font-bold"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
            </table>

          <p className="my-4">Total Amount Donated: {totalAmountDonated}</p>
          <p>Number of Donations: {donations.length}</p>
        </div>

      </div>
    </>
  );
};

export default App;
