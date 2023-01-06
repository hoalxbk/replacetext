import logo from './logo.svg';
import './App.css';
import {FloatingLabel, Form, Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import arrow from "./assets/icon/arrow.svg"
function App() {
    const [textOutput, setTextOutput] = useState("")
    const [config, setConfig] = useState({})
    const [settingConfig, setSettingConfig] = useState(false)
    const [settingInput, setSettingInput] = useState(localStorage.getItem("CONFIG"))

    useEffect(() => {
        const rawConfig = localStorage.getItem("CONFIG")
        if (!rawConfig) {
            const defaultConfig = { i: "ı", y: "ƴ", r: "r" }
            setConfig(defaultConfig)
            setSettingInput(JSON.stringify(defaultConfig))
            localStorage.setItem("CONFIG", JSON.stringify(defaultConfig))
        } else {
            setConfig(JSON.parse(rawConfig))
        }
    }, [])

    const inputHandler = (e) => {
        replace(e.target.value)
    }

    const settingHandler = (e) => {
        setSettingInput(e.target.value)
    }

    const saveConfig = () => {
        try {
            const newConfig = JSON.parse(settingInput);
            setConfig(newConfig)
            localStorage.setItem("CONFIG", settingInput)
            setSettingConfig(false)
        } catch (e) {
            alert("invalid json format!!!");
        }
    }

    const replace = (input) => {
        let newText = ""
        for (let i = 0; i < input.length; i++) {
            if (!!config[input[i]]) {
                newText += config[input[i]]
            } else {
                newText += input[i]
            }
        }
        setTextOutput(newText)
    }

    return (
    <div className="App">
      <div className="content text-center">
          <h2 className="mt-2">Replace Text</h2>
          { settingConfig ?
              <div className="my-2">
                  <Form.Control
                      as="textarea"
                      value={settingInput || ""}
                      style={{ height: '200px' }}
                      onChange={(e) => settingHandler(e)}
                  />
                  <div className="w-100 flex">
                      <div className="w-50 float-end my-2 d-flex">
                          <div className="w-50 px-1"><Button className="w-100" variant="secondary" onClick={saveConfig}>Save</Button></div>
                          <div className="w-50 px-1"><Button className="w-100" variant="danger" onClick={() => setSettingConfig(false)}>Cancel</Button></div>
                      </div>
                  </div>

              </div> :
              <Button className="float-end" variant="info" size="sm" onClick={() => setSettingConfig(true)}>Setting</Button>
          }

        <div className="text-input mt-5">
            <FloatingLabel controlId="floatingTextarea2" label="Text Input">
                <Form.Control
                    as="textarea"
                    placeholder="Paste your text here"
                    style={{ height: '200px' }}
                    onChange={inputHandler}
                />
            </FloatingLabel>
            <div className="my-3 flex"><div className="mx-auto"><img src={arrow} style={{width: 40, height: 40}} /></div></div>
            <FloatingLabel controlId="floatingTextarea2" label="Text Output">
                <Button className="copy-btn" size="sm" variant="primary" onClick={() => {navigator.clipboard.writeText(textOutput)}} >Copy text</Button>
                <Form.Control
                    as="textarea"
                    style={{ height: '200px' }}
                    readOnly={true}
                    value={ textOutput }
                />
            </FloatingLabel>
        </div>
      </div>
    </div>
    );
}

export default App;
