import React from "react";

export async function TableView({ data }) {
  const dataToDisplay = data.slice(0, 10);
  return (
    <>
      <div className="w-full">
        <div className="text-xl uppercase font-bold mb-5">First 10 data points</div>
        <table className="table-auto w-full mb-8">
          <thead>
            <tr>
              <th>#</th>
              <th>Election data</th>
              <th>Contest</th>
              <th>Ward name</th>
              <th>Candidate name</th>
              <th>Votes received</th>
              <th>Precent</th>
            </tr>
          </thead>
          <tbody>
            {dataToDisplay.map((item, index) => (
              <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">
                  {new Date(item.election_date).toDateString()}
                </td>
                <td className="text-center">{item.contest}</td>
                <td className="text-center">{item.ward_name}</td>
                <td className="text-center">{item.candidate_name}</td>
                <td className="text-center">{item.votes_received}</td>
                <td className="text-center">{item.percent} %</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
