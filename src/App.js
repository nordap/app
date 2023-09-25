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
        <p>이러저러한 기능</p>
      </div>
    </div >
  );
}

export default App;
