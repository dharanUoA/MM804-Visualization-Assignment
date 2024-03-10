import React from "react";
import { getData } from "@/server-actions/actions";
import { TableView } from "@/components/TableView";
import { VisualizationView } from "@/components/VisualizationView";

export default async function Home() {
  const resp = await getData();
  return (
    <>
      <TableView data={resp}></TableView>
      <VisualizationView data={resp}></VisualizationView>
    </>
  );
}
