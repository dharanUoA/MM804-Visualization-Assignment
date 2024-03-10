"use client";

import { useEffect, useState } from "react";
import { PieChart, BarChart } from "@mui/x-charts";

export function VisualizationView({ data }) {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [selectedContest, setSelectedContext] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [pieChartData, setPieChartData] = useState();
  const [barChartData, setBarChartData] = useState();

  useEffect(() => {
    const length = data.length;
    let opts = [];
    for (let i = 0; i < length; i++) {
      const item = data[i];
      const match = opts.find((opt) => opt.contest == item.contest);
      if (match) {
        if (!match.wards.some((ward) => item.ward_name == ward)) {
          match.wards.push(item.ward_name);
        }
      } else {
        opts.push({
          contest: item.contest,
          wards: [item.ward_name],
        });
      }
    }
    setOptions(opts);
  }, []);

  const onContestChange = (contest) => {
    setSelectedContext(contest);
    setSelectedWard("");
    const selection = options.find((opt) => opt.contest == contest);
    setSelectedOption(selection);
    setPieChartData(null);
    setBarChartData(null);
  };

  const onWardChange = (ward) => {
    setSelectedWard((prev) => ward);
    visualizeData(selectedContest, ward, selectedType);
  };

  const onTypeChange = (type) => {
    setSelectedType(type);
    visualizeData(selectedContest, selectedWard, type);
  };

  const visualizeData = (contest, ward, type) => {
    if (!contest || !ward) return;
    const filteredColumns =
      data.filter(
        (item) => item.contest == contest && item.ward_name == ward
      ) ?? [];

    switch (type) {
      case "pie":
        const pieSeriesData = filteredColumns.map((item, index) => ({
          id: index,
          value: +item.votes_received,
          label: item.candidate_name,
        }));
        if (pieSeriesData) {
          setPieChartData({ seriesData: [{ data: pieSeriesData }] });
        } else {
          setPieChartData(null);
        }
        setBarChartData(null);
        break;
      case "bar":
        const barSeriesData = filteredColumns.map(
          (item, index) => +item.votes_received
        );
        const axisData = filteredColumns.map((item) => item.candidate_name);
        if (barSeriesData) {
          setBarChartData({
            seriesData: [{ data: barSeriesData }],
            axisData: [{ scaleType: "band", data: axisData }],
          });
        } else {
          setBarChartData(null);
        }
        setPieChartData(null);
        break;
    }
  };

  if (!options) return <></>;

  return (
    <>
      <div className="w-full mb-8">
        <div className="text-xl uppercase font-bold mb-5">
          Visualization settings
        </div>
        <div className="grid grid-rows-1 grid-cols-3 gap-0">
          <div className="w-full">
            <label htmlFor="contest" className="mr-2">
              Select Contest
            </label>
            <select
              id="contest"
              name="contest"
              className="w-full mr-2"
              onChange={(event) => onContestChange(event.target.value)}
              value={selectedContest}
            >
              <option value="" disabled>
                ...
              </option>
              {options.map((opt, index) => (
                <option
                  value={opt.contest}
                  key={index}
                  onSelect={() => onContestChange(index)}
                >
                  {opt.contest}
                </option>
              ))}
            </select>
          </div>
          {!!selectedOption ? (
            <div className="w-full">
              <label htmlFor="ward" className="mr-2">
                Select Ward
              </label>
              <select
                id="ward"
                name="ward"
                className="w-full mr-2"
                value={selectedWard}
                onChange={(event) => onWardChange(event.target.value)}
              >
                <option value="" disabled>
                  ...
                </option>
                {selectedOption.wards.map((ward, index) => (
                  <option value={ward} key={index}>
                    {ward}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            ""
          )}
          <div className="w-full">
            <label htmlFor="type" className="mr-2">
              Select Visualization Type
            </label>
            <select
              name="type"
              id="type"
              className="w-full mr-2"
              value={selectedType}
              onChange={(event) => onTypeChange(event.target.value)}
            >
              <option value="" disabled>
                ...
              </option>
              <option value="pie">Pie</option>
              <option value="bar">Bar</option>
            </select>
          </div>
        </div>
      </div>
      <div className="text-xl uppercase font-bold mb-5 w-full">Results</div>
      {pieChartData && (
        <PieChart series={pieChartData.seriesData} height={300} />
      )}
      {barChartData && (
        <BarChart
          height={300}
          series={barChartData.seriesData}
          xAxis={barChartData.axisData}
        />
      )}
    </>
  );
}
