import {Response} from "next/dist/compiled/@edge-runtime/primitives";
import {Sensor} from "@/components/Table";

export const getSensors = async () => {
  const response: Response = await fetch(`http://localhost:3001/sensor`, {cache: 'no-store'})
  return response.json() as unknown as Sensor[]
}
