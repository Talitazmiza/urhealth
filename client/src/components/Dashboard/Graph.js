import React, { useEffect, useState } from 'react';

import HGraph, { hGraphConvert, calculateHealthScore } from 'hgraph-react';
import data2017 from '../../data/2017.json';
import data2018 from '../../data/2018.json';

import '../../data.css';

function Graph() {
    const convertDataSet = (data) => {
        // const newData = JSON.parse(data);
        return data.map(d => {
            const converted = hGraphConvert('male', d.metric, d);
            converted.id = d.metric;
            if (d.children) {
                converted.children = d.children.map(c => {
                    const convertedChild = hGraphConvert('male', c.metric, c);
                    convertedChild.parentKey = c.parentKey;
                    convertedChild.id = c.metric;
                    return convertedChild;
                });
            }
            return converted;
        });
    };
    const converted2017 = convertDataSet(data2017);
    const converted2018 = convertDataSet(data2018);
    // const me = 'aku';
    const yearData = [
        {
            label: '2017',
            data: converted2017,
            score: parseInt(calculateHealthScore(converted2017), 10),
        },
        {
            label: '2018',
            data: converted2018,
            score: parseInt(calculateHealthScore(converted2018), 10),
        },
    ];
    console.log(yearData[0].data[0].value);
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);
    const [currentYearData] = useState(yearData[0]);
    console.log(currentYearData);
    // this.state = {
    //   windowWidth: window.innerWidth,
    //   yearData,
    //   data: yearData[0],
    //   historyOpen: false,
    //   historyData: yearData[0].data[0],
    // }

    // const card = React.createRef();

    useEffect(() => {
        updateWindowDimensions();
        window.addEventListener('resize', updateWindowDimensions);
        // document.addEventListener('mousedown', handleClick);

        return function cleanup() {
            window.removeEventListener('resize', updateWindowDimensions);
            // document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    const updateWindowDimensions = () => {
        setwindowWidth(window.innerWidth);
    };

    // const setYearData = (index) => (e) => {
    //     setCurrentYearData(yearData[index]);
    // };

    const handlePointClick = (data, event) => {
        // setHistoryOpen(true);
        // setHistoryData(data);
        console.log(data);
        console.log(event);
    };

    // const handleClick = (e) => {
    //     if (historyOpen && card.current && !card.current.contains(e.target)) {
    //         setHistoryOpen(false)
    //     }
    // }
    // const handlePointClick = (data, event) => {
    //     console.log(data);
    //     console.log(event);
    // }
    const sizeBasedOnWindow = ((windowWidth / 4) * 2);
    const size = sizeBasedOnWindow > 1000 ? 1000 : sizeBasedOnWindow;
    // const historySize = card.current ? card.current.clientWidth - 20 : 0;

    return (
        <>
            <div className="vis-container">
                <HGraph
                  data={currentYearData.data}
                  score={currentYearData.score}
                  width={size}
                  height={size}
                  fontSize={size < 300 ? 12 : 16}
                  pointRadius={size < 300 ? 5 : 10}
                  scoreFontSize={size < 300 ? 50 : 120}
                  onPointClick={handlePointClick}
                />
            </div>
        </>
    );
}

export default Graph;
