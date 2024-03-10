import React from "react";

export async function TableView({ data }) {
  const dataToDisplay = data.slice(0, 10);
  return (
    <>
      <table className="table-auto">
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
              <td>{index + 1}</td>
              <td>{new Date(item.election_date).toDateString()}</td>
              <td>{item.contest}</td>
              <td>{item.ward_name}</td>
              <td>{item.candidate_name}</td>
              <td>{item.votes_received}</td>
              <td>{item.percent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
