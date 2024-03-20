import React, { PureComponent } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { month: 'Jan', tasks: 15 },
  { month: 'Feb', tasks: 20 },
  { month: 'Mar', tasks: 10 },
  { month: 'Apr', tasks: 25 },
  { month: 'May', tasks: 18 },
  { month: 'Jun', tasks: 22 },
  { month: 'Jul', tasks: 30 },
]

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/bar-chart-has-no-padding-jphoc'

  render() {
    return (
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="month"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="tasks" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>
    )
  }
}
