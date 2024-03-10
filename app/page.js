import React from "react";
import { getData } from "@/server-actions/actions";
import { TableView } from "@/components/TableView";
import { VisualizationView } from "@/components/VisualizationView";

export default async function Home() {
  const resp = await getData();
  return (
    <>
      <div className="text-2xl font-bold mb-5">
        MM804 Assignment 3 - Visualization of 2017 Edmonton General Elections
      </div>
      <TableView data={resp}></TableView>
      <VisualizationView data={resp}></VisualizationView>
    </>
  );
}
