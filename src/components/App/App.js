import { Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import GraphEditor from "../GraphEditor/GraphEditor";
import AlgorithmPresenter from "../AlgorithmPresenter/AlgorithmPresenter";
import React, { useState } from "react";


function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path='editor' element={<GraphEditor />} />
                <Route path='algorithm' element={<AlgorithmPresenter />} />
            </Routes>
        </div>
    );
}

export default App;