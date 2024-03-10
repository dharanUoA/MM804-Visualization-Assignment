"use client";

import { useEffect, useState } from "react";
import { PieChart, BarChart } from "@mui/x-charts";

export function VisualizationView({ data }) {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [selectedContest, setSelectedContext] = useState();
  const [selectedWard, setSelectedWard] = useState();
  const [selectedType, setSelectedType] = useState("pie");
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
    if (opts) {
      setSelectedOption(opts[0]);
      visualizeData(opts[0].contest, opts[0].wards[0], selectedType);
    }
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
      <div>
        <label htmlFor="contest">Select Contest</label>
        <select
          id="contest"
          name="contest"
          onChange={(event) => onContestChange(event.target.value)}
          value={selectedContest}
        >
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
        <div>
          <label htmlFor="ward">Select Ward</label>
          <select
            id="ward"
            name="ward"
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
      <div>
        <label htmlFor="type">Select Visualization Type</label>
        <select
          name="type"
          id="type"
          value={selectedType}
          onChange={(event) => onTypeChange(event.target.value)}
        >
          <option value="pie">Pie</option>
          <option value="bar">Bar</option>
        </select>
      </div>
      {pieChartData && <PieChart series={pieChartData.seriesData} />}
      {barChartData && (
        <BarChart
          series={barChartData.seriesData}
          xAxis={barChartData.axisData}
        />
      )}
    </>
  );
}
