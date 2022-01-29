import GraphEditor from "../GraphEditor/GraphEditor";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import Graphin from "@antv/graphin";
import AlgorithmPresenter from "../AlgorithmPresenter/AlgorithmPresenter";


function App() {
    return (
        <div className="app-container">
            <Header />
            <Graphin data={{}}>
                <Routes>
                    <Route path='editor' element={<GraphEditor />} />
                    <Route path='algorithm' element={<AlgorithmPresenter />} />
                </Routes>
            </Graphin>        
        </div>
    );
}

export default App;