import "./App.css";
import { useState } from "react";
import * as React from "react";
import Select from "react-select";

const DAY = ["day",
  [
    { value: 0, label: "오늘" },
    { value: 1, label: "내일" },
  ]
];

const AMPM = ["ampm",
  [
    { value: 0, label: "AM" },
    { value: 1, label: "PM" },
  ]
];

const HOUR = ["hour",
  [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" },
    { value: 11, label: "11" },
  ]
];

const ARCANE = ["Arcane",
  [
    { value: 0, label: "소멸의 여로" },
    { value: 1, label: "츄츄 아일랜드" },
    { value: 2, label: "레헬른" },
    { value: 3, label: "아르카나" },
    { value: 4, label: "모라스" },
    { value: 5, label: "에스페라" },
  ]
]

const AUTHENTIC = ["Authentic",
  [
    { value: 0, label: "세르니움" },
    { value: 1, label: "아르크스" },
    { value: 2, label: "오디움" },
    { value: 3, label: "도원경" },
    { value: 4, label: "아르테리아" },
    { value: 5, label: "카르시온" },
  ]
]

const PORTION = ["Portion",
  [
    { value: 0, label: "익성비" },
    { value: 1, label: "209" },
    { value: 2, label: "219" },
    { value: 3, label: "229" },
    { value: 4, label: "태성비" },
    { value: 5, label: "극성비" },
  ]
]

const EFFI = {
  "200": { "익성비": "25.877%", "209": "100.000%", "219": "100.000%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "201": { "익성비": "23.105%", "209": "100.000%", "219": "100.000%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "202": { "익성비": "20.629%", "209": "100.000%", "219": "100.000%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "203": { "익성비": "18.419%", "209": "100.000%", "219": "100.000%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "204": { "익성비": "16.445%", "209": "100.000%", "219": "100.000%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "205": { "익성비": "14.683%", "209": "100.000%", "219": "100.000%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "206": { "익성비": "13.110%", "209": "100.000%", "219": "100.000%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "207": { "익성비": "11.706%", "209": "100.000%", "219": "100.000%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "208": { "익성비": "10.451%", "209": "100.000%", "219": "100.000%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "209": { "익성비": "9.332%", "209": "100.000%", "219": "100.000%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "210": { "익성비": "7.178%", "209": "76.923%", "219": "100.000%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "211": { "익성비": "6.467%", "209": "69.300%", "219": "100.000%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "212": { "익성비": "5.826%", "209": "62.432%", "219": "100.000%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "213": { "익성비": "5.249%", "209": "56.245%", "219": "100.000%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "214": { "익성비": "4.728%", "209": "50.672%", "219": "100.000%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "215": { "익성비": "3.637%", "209": "38.978%", "219": "100.000%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "216": { "익성비": "3.337%", "209": "35.760%", "219": "100.000%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "217": { "익성비": "3.061%", "209": "32.807%", "219": "100.000%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "218": { "익성비": "2.809%", "209": "30.098%", "219": "100.000%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "219": { "익성비": "2.577%", "209": "27.613%", "219": "100.000%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "220": { "익성비": "1.982%", "209": "21.241%", "219": "76.923%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "221": { "익성비": "1.852%", "209": "19.851%", "219": "71.891%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "222": { "익성비": "1.731%", "209": "18.553%", "219": "67.188%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "223": { "익성비": "1.618%", "209": "17.339%", "219": "62.792%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "224": { "익성비": "1.512%", "209": "16.205%", "219": "58.684%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "225": { "익성비": "1.163%", "209": "12.465%", "219": "45.142%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "226": { "익성비": "1.087%", "209": "11.650%", "219": "42.189%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "227": { "익성비": "1.016%", "209": "10.887%", "219": "39.429%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "228": { "익성비": "0.950%", "209": "10.175%", "219": "36.849%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "229": { "익성비": "0.887%", "209": "9.510%", "219": "34.438%", "229": "100.000%", "태성비": "100.000%", "극성비": "100.000%" },
  "230": { "익성비": "0.683%", "209": "7.315%", "219": "26.491%", "229": "76.923%", "태성비": "100.000%", "극성비": "100.000%" },
  "231": { "익성비": "0.663%", "209": "7.102%", "219": "25.719%", "229": "74.683%", "태성비": "100.000%", "극성비": "100.000%" },
  "232": { "익성비": "0.643%", "209": "6.895%", "219": "24.970%", "229": "72.507%", "태성비": "100.000%", "극성비": "100.000%" },
  "233": { "익성비": "0.625%", "209": "6.694%", "219": "24.243%", "229": "70.396%", "태성비": "100.000%", "극성비": "100.000%" },
  "234": { "익성비": "0.606%", "209": "6.499%", "219": "23.537%", "229": "68.345%", "태성비": "100.000%", "극성비": "100.000%" },
  "235": { "익성비": "0.467%", "209": "4.999%", "219": "18.105%", "229": "52.573%", "태성비": "100.000%", "극성비": "100.000%" },
  "236": { "익성비": "0.453%", "209": "4.854%", "219": "17.578%", "229": "51.042%", "태성비": "100.000%", "극성비": "100.000%" },
  "237": { "익성비": "0.440%", "209": "4.712%", "219": "17.066%", "229": "49.555%", "태성비": "100.000%", "극성비": "100.000%" },
  "238": { "익성비": "0.427%", "209": "4.575%", "219": "16.569%", "229": "48.112%", "태성비": "100.000%", "극성비": "100.000%" },
  "239": { "익성비": "0.415%", "209": "4.442%", "219": "16.086%", "229": "46.711%", "태성비": "100.000%", "극성비": "100.000%" },
  "240": { "익성비": "0.319%", "209": "3.417%", "219": "12.374%", "229": "35.931%", "태성비": "76.923%", "극성비": "100.000%" },
  "241": { "익성비": "0.310%", "209": "3.317%", "219": "12.014%", "229": "34.885%", "태성비": "74.683%", "극성비": "100.000%" },
  "242": { "익성비": "0.301%", "209": "3.221%", "219": "11.664%", "229": "33.869%", "태성비": "72.507%", "극성비": "100.000%" },
  "243": { "익성비": "0.292%", "209": "3.127%", "219": "11.324%", "229": "32.882%", "태성비": "70.396%", "극성비": "100.000%" },
  "244": { "익성비": "0.283%", "209": "3.036%", "219": "10.994%", "229": "31.924%", "태성비": "68.345%", "극성비": "100.000%" },
  "245": { "익성비": "0.218%", "209": "2.335%", "219": "8.457%", "229": "24.557%", "태성비": "52.573%", "극성비": "100.000%" },
  "246": { "익성비": "0.212%", "209": "2.267%", "219": "8.211%", "229": "23.842%", "태성비": "51.042%", "극성비": "100.000%" },
  "247": { "익성비": "0.205%", "209": "2.201%", "219": "7.972%", "229": "23.148%", "태성비": "49.555%", "극성비": "100.000%" },
  "248": { "익성비": "0.199%", "209": "2.137%", "219": "7.739%", "229": "22.473%", "태성비": "48.112%", "극성비": "100.000%" },
  "249": { "익성비": "0.194%", "209": "2.075%", "219": "7.514%", "229": "21.819%", "태성비": "46.711%", "극성비": "100.000%" },
  "250": { "익성비": "0.129%", "209": "1.383%", "219": "5.009%", "229": "14.546%", "태성비": "31.140%", "극성비": "66.667%" },
  "251": { "익성비": "0.125%", "209": "1.343%", "219": "4.863%", "229": "14.122%", "태성비": "30.233%", "극성비": "64.725%" },
  "252": { "익성비": "0.122%", "209": "1.304%", "219": "4.722%", "229": "13.711%", "태성비": "29.353%", "극성비": "62.840%" },
  "253": { "익성비": "0.118%", "209": "1.266%", "219": "4.584%", "229": "13.312%", "태성비": "28.498%", "극성비": "61.009%" },
  "254": { "익성비": "0.115%", "209": "1.229%", "219": "4.451%", "229": "12.924%", "태성비": "27.668%", "극성비": "59.232%" },
  "255": { "익성비": "0.111%", "209": "1.193%", "219": "4.321%", "229": "12.547%", "태성비": "26.862%", "극성비": "57.507%" },
  "256": { "익성비": "0.108%", "209": "1.158%", "219": "4.195%", "229": "12.182%", "태성비": "26.080%", "극성비": "55.832%" },
  "257": { "익성비": "0.105%", "209": "1.125%", "219": "4.073%", "229": "11.827%", "태성비": "25.320%", "극성비": "54.206%" },
  "258": { "익성비": "0.102%", "209": "1.092%", "219": "3.954%", "229": "11.483%", "태성비": "24.583%", "극성비": "52.627%" },
  "259": { "익성비": "0.099%", "209": "1.060%", "219": "3.839%", "229": "11.148%", "태성비": "23.867%", "극성비": "51.094%" },
  "260": { "익성비": "0.033%", "209": "0.353%", "219": "1.280%", "229": "3.716%", "태성비": "7.956%", "극성비": "17.031%" },
  "261": { "익성비": "0.033%", "209": "0.350%", "219": "1.267%", "229": "3.679%", "태성비": "7.877%", "극성비": "16.863%" },
  "262": { "익성비": "0.032%", "209": "0.346%", "219": "1.255%", "229": "3.643%", "태성비": "7.799%", "극성비": "16.696%" },
  "263": { "익성비": "0.032%", "209": "0.343%", "219": "1.242%", "229": "3.607%", "태성비": "7.722%", "극성비": "16.531%" },
  "264": { "익성비": "0.032%", "209": "0.340%", "219": "1.230%", "229": "3.571%", "태성비": "7.645%", "극성비": "16.367%" },
  "265": { "익성비": "0.024%", "209": "0.261%", "219": "0.946%", "229": "2.747%", "태성비": "5.881%", "극성비": "12.590%" },
  "266": { "익성비": "0.024%", "209": "0.259%", "219": "0.937%", "229": "2.720%", "태성비": "5.823%", "극성비": "12.465%" },
  "267": { "익성비": "0.024%", "209": "0.256%", "219": "0.927%", "229": "2.693%", "태성비": "5.765%", "극성비": "12.342%" },
  "268": { "익성비": "0.024%", "209": "0.254%", "219": "0.918%", "229": "2.666%", "태성비": "5.708%", "극성비": "12.220%" },
  "269": { "익성비": "0.023%", "209": "0.251%", "219": "0.909%", "229": "2.640%", "태성비": "5.651%", "극성비": "12.099%" },
  "270": { "익성비": "0.011%", "209": "0.113%", "219": "0.410%", "229": "1.189%", "태성비": "2.546%", "극성비": "5.450%" },
  "271": { "익성비": "0.010%", "209": "0.112%", "219": "0.405%", "229": "1.177%", "태성비": "2.520%", "극성비": "5.396%" },
  "272": { "익성비": "0.010%", "209": "0.111%", "219": "0.401%", "229": "1.166%", "태성비": "2.496%", "극성비": "5.342%" },
  "273": { "익성비": "0.010%", "209": "0.110%", "219": "0.397%", "229": "1.154%", "태성비": "2.471%", "극성비": "5.290%" },
  "274": { "익성비": "0.010%", "209": "0.109%", "219": "0.394%", "229": "1.143%", "태성비": "2.446%", "극성비": "5.237%" },
  "275": { "익성비": "0.005%", "209": "0.054%", "219": "0.195%", "229": "0.566%", "태성비": "1.211%", "극성비": "2.593%" },
  "276": { "익성비": "0.005%", "209": "0.049%", "219": "0.177%", "229": "0.514%", "태성비": "1.101%", "극성비": "2.357%" },
  "277": { "익성비": "0.004%", "209": "0.044%", "219": "0.161%", "229": "0.468%", "태성비": "1.001%", "극성비": "2.143%" },
  "278": { "익성비": "0.004%", "209": "0.040%", "219": "0.146%", "229": "0.425%", "태성비": "0.910%", "극성비": "1.948%" },
  "279": { "익성비": "0.003%", "209": "0.037%", "219": "0.133%", "229": "0.386%", "태성비": "0.827%", "극성비": "1.771%" },
  "280": { "익성비": "0.002%", "209": "0.018%", "219": "0.066%", "229": "0.191%", "태성비": "0.409%", "극성비": "0.877%" },
  "281": { "익성비": "0.002%", "209": "0.017%", "219": "0.060%", "229": "0.174%", "태성비": "0.372%", "극성비": "0.797%" },
  "282": { "익성비": "0.001%", "209": "0.015%", "219": "0.054%", "229": "0.158%", "태성비": "0.338%", "극성비": "0.725%" },
  "283": { "익성비": "0.001%", "209": "0.014%", "219": "0.049%", "229": "0.144%", "태성비": "0.308%", "극성비": "0.659%" },
  "284": { "익성비": "0.001%", "209": "0.012%", "219": "0.045%", "229": "0.131%", "태성비": "0.280%", "극성비": "0.599%" },
  "285": { "익성비": "0.001%", "209": "0.006%", "219": "0.022%", "229": "0.065%", "태성비": "0.138%", "극성비": "0.296%" },
  "286": { "익성비": "0.001%", "209": "0.006%", "219": "0.020%", "229": "0.059%", "태성비": "0.126%", "극성비": "0.269%" },
  "287": { "익성비": "0.000%", "209": "0.005%", "219": "0.018%", "229": "0.053%", "태성비": "0.114%", "극성비": "0.245%" },
  "288": { "익성비": "0.000%", "209": "0.005%", "219": "0.017%", "229": "0.049%", "태성비": "0.104%", "극성비": "0.223%" },
  "289": { "익성비": "0.000%", "209": "0.004%", "219": "0.015%", "229": "0.044%", "태성비": "0.095%", "극성비": "0.202%" },
  "290": { "익성비": "0.000%", "209": "0.002%", "219": "0.008%", "229": "0.022%", "태성비": "0.047%", "극성비": "0.100%" },
  "291": { "익성비": "0.000%", "209": "0.002%", "219": "0.007%", "229": "0.020%", "태성비": "0.043%", "극성비": "0.091%" },
  "292": { "익성비": "0.000%", "209": "0.002%", "219": "0.006%", "229": "0.018%", "태성비": "0.039%", "극성비": "0.083%" },
  "293": { "익성비": "0.000%", "209": "0.002%", "219": "0.006%", "229": "0.016%", "태성비": "0.035%", "극성비": "0.075%" },
  "294": { "익성비": "0.000%", "209": "0.001%", "219": "0.005%", "229": "0.015%", "태성비": "0.032%", "극성비": "0.068%" },
  "295": { "익성비": "0.000%", "209": "0.001%", "219": "0.003%", "229": "0.007%", "태성비": "0.016%", "극성비": "0.034%" },
  "296": { "익성비": "0.000%", "209": "0.001%", "219": "0.002%", "229": "0.007%", "태성비": "0.014%", "극성비": "0.031%" },
  "297": { "익성비": "0.000%", "209": "0.001%", "219": "0.002%", "229": "0.006%", "태성비": "0.013%", "극성비": "0.028%" },
  "298": { "익성비": "0.000%", "209": "0.001%", "219": "0.002%", "229": "0.006%", "태성비": "0.012%", "극성비": "0.025%" },
  "299": { "익성비": "0.000%", "209": "0.000%", "219": "0.001%", "229": "0.004%", "태성비": "0.008%", "극성비": "0.017%" },
}


function App() {

  let [a, b] = useState(["시간변환기", "레지경로", "아케인심볼계산기", "어센틱심볼계산기", "비약/몬파 효율"]);

  let [cmdText, setCmd] = useState("");
  let pathReg = "HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\RunMRU";
  let cur = new Date();
  let korTimeDiff = 9 * 60 * 60 * 1000;
  let date = new Date(cur.getTime() + cur.getTimezoneOffset() * 60 * 1000 + korTimeDiff);

  let [timeDiff, setTimeDiff] = useState({
    day: 0,
    ampm: 0,
    hour: 0,
  })

  const copyToClipBoard = (text) => {
    try {
      navigator.clipboard.writeText(text);
      alert("클립보드에 복사되었습니다");
    } catch (error) {
      alert("실패. 재시도 필요");
    }
  };

  const TimeSelect = (props) => {
    let a = props.options[0];
    const handleSelect = (e) => {
      setTimeDiff({ ...timeDiff, [a]: e.value });
    }
    return (
      <>
        <Select
          name={a}
          isSearchable={false}
          onChange={handleSelect}
          options={props.options[1]}
          value={{
            target: timeDiff[a],
            label: props.options[1][timeDiff[a]].label
          }}

        />
      </>
    );
  };

  let [arcainText, setArcain] = useState("");
  let [arcainState, setArcainState] = useState({
    region: 0,
    level: 0,
    now: 0,
  })

  const ArcainSelect = (props) => {
    let a = props.options[0];
    const handleSelect = (e) => {
      setArcainState({ ...arcainState, region: e.value });
    }
    return (
      <>
        <Select
          name={a}
          onChange={handleSelect}
          options={props.options[1]}
          value={{
            target: arcainState["region"],
            label: props.options[1][arcainState["region"]].label
          }}
        />
      </>
    );
  };

  let [authenticText, setAuthentic] = useState("");
  let [authenticState, setAuthenticState] = useState({
    region: 0,
    level: 0,
    now: 0,
  })

  const AuthenticSelect = (props) => {
    let a = props.options[0];
    const handleSelect = (e) => {
      setAuthenticState({ ...authenticState, region: e.value });
    }
    return (
      <>
        <Select
          name={a}
          onChange={handleSelect}
          options={props.options[1]}
          value={{
            target: authenticState["region"],
            label: props.options[1][authenticState["region"]].label
          }}
        />
      </>
    );
  };

  let [effiText, setEffiText] = useState("");
  let [levelEffi, setLevelEffi] = useState({
    now: 200,
    portion: 0,
  })

  const PortionSelect = (props) => {
    let a = props.options[0]
    const handleSelect = (e) => {
      setLevelEffi({ ...levelEffi, portion: e.value });
      console.log(e.value);
    }
    return (
      <>
        <Select
          name={a}
          onChange={handleSelect}
          options={props.options[1]}
          value={{
            target: levelEffi["portion"],
            label: props.options[1][levelEffi["portion"]].label
          }}
        />
      </>
    );
  };

  return (
    <div className="App">
      <div className="black-nav">
        <div>내가 필요해서 만듦</div>
      </div>

      {/*************** 기능 1 *******************/}
      <div className="list">
        <h4>{a[0]}</h4>
        <p>셧다운 커맨드 뱉어 줌</p>
        <div className="content">
          <TimeSelect options={DAY} ></TimeSelect>
          <TimeSelect options={AMPM} ></TimeSelect>
          <TimeSelect options={HOUR} ></TimeSelect>
          {/* <div>
            {
              timeDiff.day === 0 ? <>오늘 </> : <>내일 </>
            }
            {
              timeDiff.ampm === 0 ? <>오전 </> : <>오후 </>
            }
            {timeDiff.hour}시
          </div> */}
          <button onClick={() => {
            let dTime = new Date(date.getFullYear(),
              date.getMonth(),
              date.getDate() + parseInt(timeDiff.day),
              parseInt(timeDiff.ampm) * 12 + parseInt(timeDiff.hour)
            );
            let result = parseInt((parseInt(dTime.getTime()) - parseInt(date.getTime())) / 1000);
            setCmd("shutdown -r -f -t " + result);
          }}>계산!</button>
          <div>{cmdText ? cmdText : "여기에"}</div>
          <button onClick={() => { copyToClipBoard(cmdText) }} >누르면 복사됨</button>
        </div>
      </div>

      {/*************** 기능 2 *******************/}
      <div className="list">
        <h4>{a[1]}</h4>
        <div>{pathReg}</div>
        <button onClick={() => { copyToClipBoard(pathReg) }} >누르면 복사됨</button>
      </div>

      {/*************** 기능 3 *******************/}
      <div className="list">
        <h4>{a[2]}</h4>
        <p>심볼 종류, 현재 레벨, 현재 갯수 입력 시 남은 갯수와 일수, 레벨업 시 비용 출력</p>

        <div className="content">
          <ArcainSelect options={ARCANE}></ArcainSelect>
          <input
            type="arcainState.level"
            value={arcainState.level}
            onChange={(e) => setArcainState({ ...arcainState, level: e.target.value })}
          />
          <input
            type="arcainState.now"
            value={arcainState.now}
            onChange={(e) => setArcainState({ ...arcainState, now: e.target.value })}
          />
          <button onClick={() => {
            let regionConst = parseInt(arcainState.region);
            let n = parseInt(arcainState.level);
            let now = parseInt(arcainState.now);
            let need = n * n + 11;
            let remain = need - now;
            const meso = Math.floor(need * 2 * ((regionConst + 4) + (n * 0.05))) * 10000

            //필요 성장치 x 2 x {(지역상수+4) + (레벨*0.05)}
            let result =
              "남은 갯수 " + remain + "개\n" +
              "남은 일수 " + ((remain - (remain % 20)) / 20 + (remain % 20 == 0 ? 0 : 1)) + "일\n" +
              meso.toLocaleString("en-US") + "메소"
              ;

            setArcain(result);
          }
          }>계산</button>
          <div>{arcainText ? arcainText : "여기에"}</div>
        </div>
      </div>

      {/*************** 기능 4 *******************/}
      <div className="list">
        <h4>{a[3]}</h4>
        <p>심볼 종류, 현재 레벨, 현재 갯수 입력 시 남은 갯수와 일수, 레벨업 시 비용 출력</p>

        <div className="content">
          <AuthenticSelect options={AUTHENTIC}></AuthenticSelect>
          <input
            type="authenticState.level"
            value={authenticState.level}
            onChange={(e) => setAuthenticState({ ...authenticState, level: e.target.value })}
          />
          <input
            type="authenticState.now"
            value={authenticState.now}
            onChange={(e) => setAuthenticState({ ...authenticState, now: e.target.value })}
          />
          <button onClick={() => {
            let regionConst = parseInt(authenticState.region);
            let n = parseInt(authenticState.level);
            let now = parseInt(authenticState.now);
            let need = 9 * n * n + 20 * n;
            let remain = need - now;
            const meso = Math.floor(need * 1.8 * ((regionConst + 7) - (n - 1) / 3)) * 100000;

            //필요 성장치 × 1.8 × {(지역상수 + 7) - (레벨 - 1)÷3}
            let result =
              "남은 갯수 " + remain + "개\n" +
              "남은 일수 " + (regionConst == 0
                ? ((remain - (remain % 20)) / 20 + (remain % 20 == 0 ? 0 : 1))
                : ((remain - (remain % 10)) / 10 + (remain % 10 == 0 ? 0 : 1))) + "일\n" +
              meso.toLocaleString("en-US") + "메소"
              ;

            setAuthentic(result);
          }
          }>계산</button>
          <div>{authenticText ? authenticText : "여기에"}</div>
        </div>
      </div>

      {/*************** 기능 5 *******************/}
      <div className="list">
        <h4>{a[4]}</h4>
        <div className="content">
          <input
            type="levelEffi.now"
            value={levelEffi.now}
            onChange={(e) => setLevelEffi({ ...levelEffi, now: e.target.value })}
          />
          <PortionSelect options={PORTION}></PortionSelect>
          <button onClick={() => {
            let now = levelEffi.now;
            let portion = PORTION[1][levelEffi.portion].label;
            console.log(now, portion);
            let result = EFFI[now][portion] + "만큼 오름~";

            setEffiText(result);
          }
          }>계산</button>
          <div>{effiText ? effiText : "여기에"}</div>
        </div>
      </div>
    </div >
  );
}

export default App;
