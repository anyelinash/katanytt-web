import React from "react";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area } from "recharts";
import Navbar from '../Dashboard/Navbar';
import Sidebark from '../Dashboard/Sidebark';
import '../../Styles/style.css';

const data = [
  {
    name: "Sun",
    sonido: 4000,
    aire: 2400,
    luz: 2400,
  },
  {
    name: "Mon",
    sonido: 3000,
    aire: 1398,
    luz: 2210,
  },
  {
    name: "Tue",
    sonido: 2000,
    aire: 9800,
    luz: 2290,
  },
  {
    name: "Wed",
    sonido: 2780,
    aire: 3908,
    luz: 2000,
  },
  {
    name: "Thu",
    sonido: 1890,
    aire: 4800,
    luz: 2181,
  },
  {
    name: "Fri",
    sonido: 2390,
    aire: 3800,
    luz: 2500,
  },
  {
    name: "Sat",
    sonido: 3490,
    aire: 4300,
    luz: 2100,
  },
];

const Homekata = () => {
    return (
      <div className="cuerpo">
        <Navbar />
        <Sidebark />
        <div className="row justify-content-end">
          <div className="col-md-4">
            <div className="card" style={{ marginTop: '80px', marginRight: '30px' }}>
              <div className="card-body">
                <h1 className="card-title text-center mb-4">Consumo de Recursos</h1>
                <div className="chart" style={{ height: '200px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="luz"
                        stackId="1"
                        stroke="#8884d8"
                        fill="#8884d8"
                      />
                      <Area
                        type="monotone"
                        dataKey="aire"
                        stackId="1"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                      />
                      <Area
                        type="monotone"
                        dataKey="sonido"
                        stackId="1"
                        stroke="#ffc658"
                        fill="#ffc658"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Homekata;