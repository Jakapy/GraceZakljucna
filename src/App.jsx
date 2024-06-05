import { useEffect, useState } from "react";
import School from "./School";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Grafi } from "./Grafi";

export default function App() {
  const [data, setData] = useState([]);
  const [obcine, setObcine] = useState([]);
  const [selectedObcina, setSelectedObcina] = useState("all");
  const [search, setSearch] = useState("");
  const [graf, setGraf] = useState(1);

  async function getSchools() {
    const response = await fetch("https://static.404.si/grace/");
    const data = await response.json();
    setData(data);
  }

  async function getMunicipality() {
    const response = await fetch("https://static.404.si/grace/obcine/");
    const data = await response.json();
    setObcine(data);
  }

  async function getGraf() {
    const response = await fetch("https://static.404.si/grace/prebivalstvo/");
    const data = await response.json();
    setGraf(data);
  }

  useEffect(() => {
    getSchools();
    getMunicipality();
    getGraf();
  }, []);

  return (
    <>
      <div className="container mb-4 mt-4">
        <div className="flex gap-4">
          {/* Ne pozabi na onValueChange event. */}
          <Select onValueChange={(value) => setSelectedObcina(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Občina" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Vse občine</SelectItem>
              {obcine.map((obcina) => (
                <SelectItem value={obcina}>{obcina}</SelectItem>
              ))}

              {/* Uporabi map funkcijo, ki se bo sprehodila, čez vse občine in jih prikazala v obliki SelectItemov. */}
            </SelectContent>
          </Select>

          <Input
            placeholder="iskanje po poštni številki"
            type="number"
            max="99999"
            onChange={(value) => setSearch(value.currentTarget.value)}
          ></Input>
          {/* Dodaj input, ki bo omogčal iskanje po poštni številki. Ne pozabi na onChange event. */}
        </div>
      </div>
      <div className="container">
        <Grafi data={graf}></Grafi>
        <div class="grid grid-cols-3 gap-4">
          {/* Uporabi map funkcijo, ki se bo sprehodila, čez vse šole in jih prikazala v obliki kartic. */}
          {/* Dodaj dva filtra: enega za filtriranje po obcini, drugega za filtriranje glede na poštno številko šole. */}
          {data
            .filter(
              (school) =>
                school.postna_stevilka.toString().startsWith(search) ||
                search == "",
            )
            .filter(
              (school) =>
                selectedObcina == "all" || school.obcina == selectedObcina,
            )
            .map((school) => (
              <div>
                <School data={school}></School>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
