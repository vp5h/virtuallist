import { useState, useEffect } from "react";
import List from "react-virtualized/dist/commonjs/List";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";

import "./styles.css";

export default function App() {
  const [virtualListData, setVirtualListData] = useState(
    Array.from({ length: 10000 }, () => Math.floor(Math.random() * 10000))
  );

  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const rowRenderer = ({ index, key, style }) => {
    for (let i = 0; i < 1000; i++) {
      // assumption: runs some complex on each render
    }
    return (
      <div key={key} style={style}>
        {index}-{virtualListData[index]}-{time}
      </div>
    );
  };
  return (
    <div className="App">
      <h2>Virtual List</h2>
      <div className="normalList">
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowHeight={20}
              rowRenderer={rowRenderer}
              rowCount={virtualListData.length}
              overscanRowCount={3}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  );
}
