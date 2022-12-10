import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [leftString, setLeftString] = useState("");
  const [rightString, setRightString] = useState("");
  const handleSubmit = () => {
    const leftArr = left.split("\n");
    const rightArr = right.split("\n");
    const leftArrSet = new Set(leftArr);
    const rightArrSet = new Set(rightArr);
    const leftFinal = [...leftArrSet].filter((item) => !rightArrSet.has(item));
    const rightFinal = [...rightArrSet].filter((item) => !leftArrSet.has(item));

    setLeftString(leftFinal.join("<br />"));
    setRightString(rightFinal.join("<br />"));
  };

  const values = [
    {
      name: "Left",
      value: left,
      onChange: (e) => setLeft(e),
      final: leftString,
    },
    {
      name: "Right",
      value: right,
      onChange: (e) => setRight(e),
      final: rightString,
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-4 gap-x-4 px-10 py-5">
        <div className="col-span-2 ">
          <div className="col-span-2 grid grid-cols-2 gap-x-4">
            {values.map((item) => (
              <div className="col-span-1">
                {item.name}:
                <br />
                <textarea
                  id="text"
                  rows="10"
                  cols="1"
                  className="w-full border-2 rounded-md h-[75vh] px-2"
                  onChange={(e) => item.onChange(e.target.value)}
                  value={item.value}
                />
              </div>
            ))}
          </div>
          <button
            className="w-full p-4 rounded-md bg-blue-600 text-white font-semibold text-center"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-x-4">
          {values.map((item) => (
            <div className="col-span-1 ">
              {item.name} Final:
              <div
                id={`final-${item.name}`}
                className="h-[75vh] overflow-y-auto border-2 rounded-md px-2"
                dangerouslySetInnerHTML={{ __html: item.final }}
              ></div>
              <button
                className="bg-green-400 text-white font-semibold text-center w-full p-4 rounded-md mt-1"
                onClick={() => {
                  const final = document.getElementById(
                    `final-${item.name}`
                  ).innerText;
                  final === ""
                    ? toast.error("No data to copy!")
                    : toast.success(`Copied ${item.name} to clipboard!`);
                  navigator.clipboard.writeText(final);
                }}
              >
                Copy {item.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
