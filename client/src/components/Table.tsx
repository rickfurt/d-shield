import React from 'react'
import {useStore} from "@/helpers/useStore";
import styles from '@/helpers/styles.module.css'

export type Sensor = {
  name: string,
  serial_number: string,
  firmware_version: string,
  status: "OFFLINE" | "ONLINE"
}

type Props = {
  toggleStatus: Function
}

export const Table: React.FC<Props> = ({toggleStatus}) => {
  const {sensors} = useStore()

  return (
    <section className="bg-coolGray-50 py-4 w-full ">
      <div className="container px-4 mx-auto ">
        <div
          className="pt-6 bg-white overflow-hidden border border-coolGray-100 rounded-md shadow-dashboard shadow-2xl">
          <h2 className="px-6 mb-4 text-lg text-coolGray-900 font-semibold">Sensors</h2>
          <div className="px-6 overflow-x-auto">
            <table className="w-full">
              <tbody>
              <tr className="whitespace-nowrap h-11 bg-coolGray-50 bg-opacity-80">
                <th className="px-4 font-semibold text-xs text-coolGray-500 uppercase text-left rounded-l-md">
                  <p>Name</p>
                </th>
                <th className="whitespace-nowrap px-4 font-semibold text-xs text-coolGray-500 uppercase text-center"
                >Serial number
                </th>
                <th className="whitespace-nowrap px-4 font-semibold text-xs text-coolGray-500 uppercase text-center"
                >firmware version
                </th>
                <th className="whitespace-nowrap px-4 font-semibold text-xs text-coolGray-500 uppercase text-center"
                >status
                </th>
              </tr>
              {sensors?.sort((a: Sensor, b: Sensor) => {
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
              })?.map((sensor: Sensor) => (
                <tr key={sensor.serial_number}
                    className={`h-18 border-b border-coolGray-100 ${sensor.status === 'OFFLINE' ? styles.offline : ''}`}>
                  <th className="whitespace-nowrap px-4 bg-white text-left">
                    <div className="flex items-center -m-2">
                      <div className="w-auto p-2">
                        <p className="text-sm font-medium text-coolGray-800">{sensor.name}</p>
                      </div>
                    </div>
                  </th>
                  <th className="whitespace-nowrap px-4 bg-white text-sm font-medium text-coolGray-800 text-center"
                  >
                    {sensor.serial_number}
                  </th>
                  <th className="whitespace-nowrap px-4 bg-white text-sm font-medium text-coolGray-800 text-center"
                  >{sensor.firmware_version}
                  </th>
                  <th
                    className={`whitespace-nowrap cursor-pointer px-4 bg-white text-sm font-medium text-center ${sensor.status === 'ONLINE' ? "text-green-600" : "text-red-600"}`}
                    onClick={() => toggleStatus(sensor.serial_number)}
                  >{sensor.status}
                  </th>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between  py-4 px-6 -m-2">
            <p
              className="text-sm font-semibold text-coolGray-500">Showing {sensors.length} Sensors</p>
            <p className={'w-auto text-center px-2 text-sm font-semibold text-coolGray-500'}>CLick on
              the status to alternate between
              <span className={"text-green-600"}> online</span>/
              <span
                className={"text-red-600"}>offline</span></p>
          </div>
        </div>
      </div>
    </section>
  );
};