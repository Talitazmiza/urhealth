import React, { useEffect, useState } from 'react';
import HGraph, { hGraphConvert, calculateHealthScore } from 'modified-lite-hgraph';
import '../Data/data.css';
import { getGraph } from '../../../api';
import CircularProgress from '@material-ui/core/CircularProgress';

function Graph() {
    const [graph, setGraph] = useState([]);

    useEffect(() => {
        updateWindowDimensions();
        window.addEventListener('resize', updateWindowDimensions);
        // document.addEventListener('mousedown', handleClick);
        retrieveGraph();
        return function cleanup() {
            window.removeEventListener('resize', updateWindowDimensions);
            // document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    const retrieveGraph = () => {
        getGraph()
            .then(response => {
                setGraph(response.data.result);
            })
            .catch(e => {
                console.log(e);
            });
    }
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

    // const converted2017 = convertDataSet(data2017);
    // const converted2018 = convertDataSet(data2018);
    const convertDbData = convertDataSet(graph);
    console.log(convertDbData)
    // const yearData = [
        // {
        //     label: '2017',
        //     data: converted2017,
        //     score: parseInt(calculateHealthScore(converted2017), 10),
        // },
    //     {
    //         label: '2018',
    //         data: converted2018,
    //         score: parseInt(calculateHealthScore(converted2018), 10),
    //     },
    //
    // ];
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);
    // const [currentYearData] = useState(yearData[0]);
    // console.log(data2017)
    // this.state = {
    //   windowWidth: window.innerWidth,
    //   yearData,
    //   data: yearData[0],
    //   historyOpen: false,
    //   historyData: yearData[0].data[0],
    // }

    // const card = React.createRef();



    const updateWindowDimensions = () => {
        setwindowWidth(window.innerWidth);
    };

    // const setYearData = (index) => (e) => {
    //     setCurrentYearData(yearData[index]);
    // };

    const handlePointClick = (data, event) => {
        // setHistoryOpen(true);
        // setHistoryData(data);
        // console.log(data);
        // console.log(event);
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
    const size = sizeBasedOnWindow > 2000 ? 2000 : sizeBasedOnWindow;
    // const historySize = card.current ? card.current.clientWidth - 20 : 0;
    // console.log(grafik)

    return (
        !graph.length ? <CircularProgress /> : (
            <div>
                <div className="vis-container">
                    <HGraph
                        data={convertDbData}
                        score={parseInt(calculateHealthScore(convertDbData), 10)}
                        width={size}
                        height={size}
                        fontSize={size < 300 ? 12 : 16}
                        pointRadius={size < 300 ? 5 : 10}
                        scoreFontSize={size < 300 ? 50 : 120}
                        onPointClick={handlePointClick}
                    />
                </div>
            </div>
        )
    );
}


export default Graph;
