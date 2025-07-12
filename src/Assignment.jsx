import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { toast } from "react-toastify";

function Assignment() {
  const [error, setError] = useState({ input: false, select: false });
  const [formEntire, setFormEntire] = useState([{ name: "", country: "" }]);
  const [submitData, SetSubmitData] = useState([]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newFormEntire = [...formEntire];
    newFormEntire[index][name] = value;
    setFormEntire(newFormEntire);
  };

  const handleAdd = () => {
    setFormEntire([...formEntire, { name: "", country: "" }]);
  };

  const handleDelete = (index) => {
    const deleteForm = formEntire.filter((_, i) => i !== index);
    setFormEntire(deleteForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkError = formEntire.map((entry) => ({
      input: !entry.name.trim(),
      select: !entry.country.trim(),
    }));

    const errorOccur = checkError.some((err) => err.input || err.select);
    setError({
      input: errorOccur,
      select: errorOccur,
    });

    if (errorOccur) return;

    SetSubmitData(formEntire);
    toast.success("Submit Successfully!");

    setError({ input: false, select: false });
    // const form = new FormData(e.target);
    // const name = form.get("name");
    // const country = form.get("country");

    // const checkError = {
    //   input: !name.trim(),
    //   select: !country.trim(),
    // };

    // setError(checkError);

    // if (checkError.input || checkError.select) return;
    // toast.success("submit successfully");

    // setFormData({ name, country });

    // console.log(name);
    // console.log(country);
  };

  return (
    <div className="min-h-[calc(100vh-301px)] m-4 p-4 border-2  border-blue-400 rounded-xl">
      <h1 className="text-4xl font-bold text-center underline">
        Frontend Developer Challenge{" "}
      </h1>

      {/* Form section */}
      <form onSubmit={handleSubmit} className="py-4 ">
        <h1 className="text-2xl font-bold pb-2">User Information :</h1>
        {formEntire.map((entry, index) => (
          <div key={index} className="flex gap-3 items-start pt-3">
            {/* Input field */}
            <div className="flex flex-col">
              <input
                type="text"
                name="name"
                value={entry.name}
                onChange={(e) => handleChange(index, e)}
                placeholder="Enter your name ..."
                className="border-2 p-2 rounded-xl text-gray-950 w-68"
              />
              {error?.input && !entry.name && (
                <span className="text-red-500 text-sm ">Input is required</span>
              )}
            </div>
            {/* select box */}
            <div className="flex flex-col">
              <select
                name="country"
                value={entry.country}
                onChange={(e) => handleChange(index, e)}
                className="border-2 p-2 w-68 rounded-xl"
              >
                <option value="">Select your Country.</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Canada">Canada</option>
                <option value="Italy">Italy</option>
                <option value="France">France</option>
                <option value="Australia">Australia</option>
              </select>
              {error?.select && !entry.country && (
                <span className="text-red-500 text-sm ">
                  Select is required
                </span>
              )}
            </div>
            {/* Delete button */}
            <button
              type="button"
              onClick={() => handleDelete(index)}
              className="text-red-500 mt-2.5 ml-6 font-bold px-3 cursor-pointer border border-red-500 rounded-full"
            >
              Delete
            </button>
          </div>
        ))}

        {/* submit and Add button */}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="text-green-500 font-bold px-4 py-1 cursor-pointer border border-green-500 rounded-full"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleAdd}
            className="text-purple-500 font-bold px-4 py-1 cursor-pointer border border-purple-500 rounded-full"
          >
            <span className="flex items-center gap-1.5">
              <span>Add</span>
              <span>
                {" "}
                <HiPlus style={{ fontSize: "20px" }} />
              </span>
            </span>
          </button>
        </div>
      </form>

      {/* Form data view */}
      <div className="mt-10">
        <h1 className="text-xl font-bold ">Print Form state with h3 tags:</h1>
        {submitData.map((data, index) => (
          <div
            key={index}
            className="border border-gray-500 rounded-xl p-2 mt-1.5 w-2xl"
          >
            <h3 className="text-lg font-semibold">
              Name: <span className="text-blue-500">{data.name}</span>
            </h3>
            <h3 className="text-lg font-semibold">
              Country: <span className="text-blue-500">{data.country}</span>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Assignment;
