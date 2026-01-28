import React, { createContext, useReducer } from "react";
import Register from "./Components/Screens/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Screens/Login";
import Voice2Text from "./Components/Editor/Voice2Text";
import Image2Text from "./Components/Editor/Image2Text";
import Python from "./Components/Editor/Python";
import Html from "./Components/Editor/Html";
import Dart from "./Components/Editor/Dart";
import Java from "./Components/Editor/Java";
import Cpp from "./Components/Editor/CPP";
import C from "./Components/Editor/C";
import JavaScript from "./Components/Editor/Javascript";
import Errorpage from "./Components/Screens/Errorpage";
import Homepage from "./Components/Screens/Homepage";
import Header from "./Components/Header";
import Logout from "./Components/Screens/Logout";
import { Toaster } from "react-hot-toast";

import { initialState, reducer } from "./reducer/UseReducer";

export const UsedContext = createContext();
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UsedContext.Provider value={{ state, dispatch }}>
      <div>
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              theme: {
                primary: "#4aed88",
              },
            },
          }}
        />
      </div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/editor/python" element={<Python />} />
          <Route path="/editor/javascript" element={<JavaScript />} />
          <Route path="/editor/html" element={<Html />} />
          <Route path="/editor/css" element={<Html />} />
          <Route path="/editor/dart" element={<Dart />} />
          <Route path="/editor/java" element={<Java />} />
          <Route path="/editor/cpp" element={<Cpp />} />
          <Route path="/editor/c" element={<C />} />
          <Route path="/editor/voice2text" element={<Voice2Text />} />
          <Route path="/editor/image2text" element={<Image2Text />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </BrowserRouter>
    </UsedContext.Provider>
  );
}

export default App;
