import React, { PureComponent } from 'react'
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const data = [
  { name: 'Medium', value: 300 },
  { name: 'High', value: 500 },
  { name: 'Low', value: 300 },
  { name: 'Critical', value: 200 },
]
const COLORS = ['#f87171', '#00C49F', '#FFBB28', '#60a5fa']

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o'

  render() {
    return (
      <main className="">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart className="ml-24">
            <Pie
              data={data}
              cx={120}
              cy={200}
              innerRadius={50}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Legend
              className=""
              align="left"
              verticalAlign="bottom"
              iconSize={30}
              height={36}
              wrapperStyle={{
                bottom: 0,
                left: '40%',
                transform: 'translate(-50%, 0)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </main>
    )
  }
}
