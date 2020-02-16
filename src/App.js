import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { loremIpsum } from "lorem-ipsum";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache
} from "react-virtualized";
import "react-virtualized/styles.css";
const rowCount = 1000;
const listHeight = 600;
const rowHeight = 50;
const rowWidth = 800;
class App extends Component {
  constructor() {
    super();
    this.list = Array(rowCount)
      .fill()
      .map((val, idx) => {
        return {
          id: idx,
          name: "John Doe",
          image: "http://via.placeholder.com/40",
          text: loremIpsum({
            count: 2,
            units: "sentences",
            sentenceLowerBound: 10,
            sentenceUpperBound: 100
          })
        };
      });
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100
    });
  }

  // OLDER WAY

  // renderRow(item) {
  //   return (
  //     <div key={item.id} className="row">
  //       <div className="image">
  //         <img src={item.image} alt="" />
  //       </div>
  //       <div className="content">
  //         <div>{item.name}</div>
  //         <div>{item.text}</div>
  //       </div>
  //     </div>
  //   );
  // }

  // WITHOUT CELLMEASURER
  // renderRow = ({ index, key, style }) => {
  //   return (
  //     <div key={key} style={style} className="row">
  //       <div className="image">
  //         <img src={this.list[index].image} alt="" />
  //       </div>
  //       <div className="content">
  //         <div>
  //           {this.list[index].name}-{index + 1}
  //         </div>
  //         <div>{this.list[index].text}</div>
  //       </div>
  //     </div>
  //   );
  // };

  // WITH CELLMEASURER
  renderRow = ({ index, key, style, parent }) => {
    return (
      <CellMeasurer
        key={key}
        cache={this.cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div style={style} className="row">
          <div className="image">
            <img src={this.list[index].image} alt="" />
          </div>
          <div className="content">
            <div>{this.list[index].name}</div>
            <div>{this.list[index].text}</div>
          </div>
        </div>
      </CellMeasurer>
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {/* OLDER WAY */}
        {/* <div className="list">{this.list.map(this.renderRow)}</div> */}
        <div className="list">
          <AutoSizer>
            {({ height, width }) => (
              <List
                width={width}
                height={height}
                rowHeight={this.cache.rowHeight}
                rowRenderer={this.renderRow}
                rowCount={this.list.length}
                overscanRowCount={3}
                deferredMeasurementCache={this.cache}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }
}

export default App;
