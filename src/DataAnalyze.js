import SwipeableTemporaryDrawer from './SwipeableDrawer.js';
import StackedBarChart from './StackedBarChart.js';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { PureComponent, useContext, useEffect } from 'react';
import axios from 'axios';
import { TodoContext } from './TodoContext.js';


export function parseDate(dateString) {
  const parts = dateString.split('-');
  // parts[0] is day, parts[1] is month, parts[2] is year
  return new Date(parts[0], parts[1] - 1, parts[2]); // Month is 0-indexed
}

// transforming data according to dates
export function transformData(input, dayswithin) {
  const result = {};

  // Iterate through the input array
  input.forEach(item => {
      // Iterate through each key in the object
      for (const key in item) {
          const dates = item[key];

          // Iterate through each date in the nested object
          for (const date in dates) {
            let currentD = new Date();
              // filtered 7 days before
              if (parseDate(date) >= new Date(currentD.getFullYear(), currentD.getMonth() , currentD.getDate() - dayswithin)) {
                // If the date is not already in the result, initialize it
                if (!result[date]) {
                    result[date] = { name: date };
                }
                // Add the item name and its value to the corresponding date
                
                  result[date][key] = dates[date];
              }
          }
      }
  });

  // Convert the result object into an array and sort by date
  const data = Object.values(result).sort((a, b) => new Date(a.name) - new Date(b.name));

  return data;
}

export default function DataAnalyze(){

  const [,,,,,,,,isLogin,,sevenday,setSevenday, itemstodate, setItemtodate] = useContext(TodoContext);


  
  
    


    function getRandomColor() {
      // Generate random values for red, green, and blue
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      
      // Convert RGB to hex format
      const toHex = (c) => {
          const hex = c.toString(16);
          return hex.length === 1 ? '0' + hex : hex; // Ensure two digits
      };
  
      // Construct the hex color string
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

  // what if it has to load longer time?
  useEffect(() => {
    axios.get(process.env.REACT_APP_Backend_Url + '/7days', 
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
    ).then((res) => {
        console.log(res.status, res.data)
        console.log(transformData(res.data, 7))
        // saving the data in localstorage as "7days"
        localStorage.setItem("itemtodate", JSON.stringify(res.data))
        localStorage.setItem("7days", JSON.stringify(transformData(res.data, 7)))
        setItemtodate(res.data)
        setSevenday(transformData(res.data, 7))
    }).catch((err) =>{
        console.log(err)
        // show previous loaded if cant load
        let sevenD = localStorage.getItem("7days")
        let itemD = localStorage.getItem("itemtodate")
        if (sevenD) {
          setSevenday(JSON.parse(sevenD))
          setItemtodate(JSON.parse(itemD))
        }
    })
  },[])
    
 

    const data = [
        {
          name: 'Day 1',
          breakfast: 1,
          lunch: 1,
          dinner: 1,
        },
        {
          name: 'Day 2',
          breakfast: 1,
          lunch: 1,
          dinner: 1,
        },
        {
          name: 'Day 3',
          breakfast: 1,
          lunch: 1,
          dinner: 1,
        },
        {
          name: 'Day 4',
          breakfast: 1,
          lunch: 1,
          dinner: 1,
        },
        {
          name: 'Day 5',
          breakfast: 1,
          lunch: 1,
          dinner: 1,
        },
        {
          name: 'Day 6',
          breakfast: 1,
          lunch: 1,
          dinner: 1,
        },
        {
          name: 'Day 7',
          breakfast: 1,
          lunch: 1,
          dinner: 1,
        },
      ];

    return(
        <>
            <SwipeableTemporaryDrawer/>

            <ResponsiveContainer width="100%" height="100%" minHeight={'300px'} minWidth={'500px'}>
                <BarChart
                width={500}
                height={300}
                data={(sevenday.length !== 0)?sevenday: data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {itemstodate[0]!== undefined && Object.keys(itemstodate[0]).map((key, index) => {
                  return <Bar dataKey={key} stackId={"a"} fill={getRandomColor()} />
                })}
                {itemstodate[0] === undefined && 
                <Bar dataKey="breakfast" stackId="a" fill="#8884d8" />}
                {itemstodate[0] === undefined && 
                <Bar dataKey="lunch" stackId="a" fill="#82ca9d" />}
                {itemstodate[0]=== undefined && 
                <Bar dataKey="dinner" stackId="a" fill="#828c9d" />}
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}