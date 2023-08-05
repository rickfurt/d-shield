'use client';
import {getSensors} from "@/components/Fetch";
import {Sensor, Table} from "@/components/Table";
import WebSocketClient from "@/components/WebSocketClient";
import React, {useEffect, useState} from "react";
import {useStore} from "@/helpers/useStore";

export default function Home() {
  const {setSensors} = useStore()

  useEffect(() => {
    getSensors().then(res => setSensors(res))
  }, []);

  const handleDataReceived = (newData: Sensor) => {
    setSensors(newData)
  };

  const {sendMessage} = WebSocketClient({onDataReceived: handleDataReceived});

  const toggleStatus = async (serial_number: string) => {
    const response = await fetch(`http://localhost:3001/sensor/${serial_number}`, {
      method: "PATCH"
    })
    if (response.status === 200) {
      sendMessage({event: 'events'});
    }
  }

  return (
    <main className={'flex justify-center items-center h-screen'}>
      <Table toggleStatus={toggleStatus}/>
    </main>
  )
}
