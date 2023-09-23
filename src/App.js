import './App.css';
import { useState } from 'react';
import * as React from 'react';
import Select from 'react-select';

const DAY = ['day',
  [
    { value: 0, label: '오늘' },
    { value: 1, label: '내일' },
  ]
];

const AMPM = ['ampm',
  [
    { value: 0, label: 'AM' },
    { value: 1, label: 'PM' },
  ]
];

const HOUR = ['hour',
  [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
    { value: 11, label: '11' },
  ]
];

function App() {

  let [a, b] = useState(['시간변환기', '레지경로', '아케인심볼계산기', '어센틱심볼계산기', '비약/몬파 효율']);

  let [cmdText, setCmd] = useState('');

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
      alert('클립보드에 복사되었습니다');
    } catch (error) {
      alert('실패. 재시도 필요');
    }
  };

  const MakeSelect = (props) => {
    let a = props.options[0];
    const handleSelect = (e) => {
      setTimeDiff({ ...timeDiff, [a]: e.value });
    }
    return (
      <>
        <Select
          width="240px"
          height="40px"
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

  return (
    <div className="App">
      <div className="black-nav">
        <div>내가 필요해서 만듦</div>
      </div>

      <div className='list'>
        <h4>{a[0]}</h4>
        <p>셧다운 커맨드 뱉어 줌</p>
        <div style={{width: '300px'}}>
          <MakeSelect options={DAY} ></MakeSelect>
          <MakeSelect options={AMPM} ></MakeSelect>
          <MakeSelect options={HOUR} ></MakeSelect>
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
              parseInt(timeDiff.ampm)*12 + parseInt(timeDiff.hour)
            );
            let result = parseInt((parseInt(dTime.getTime()) - parseInt(date.getTime())) / 1000);
            setCmd("shutdown -r -f -t " + result);
          }}>계산!</button>
          <div>커맨드: {cmdText}</div>
          <button onClick={() => { copyToClipBoard(cmdText) }} >누르면 복사됨</button>
        </div>
      </div>
      <div className='list'>
        <h4>{a[1]}</h4>
        <p>HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\RunMRU</p>
      </div>
      <div className='list'>
        <h4>{a[2]}</h4>
        <p>이러저러한 기능</p>
      </div>
      <div className='list'>
        <h4>{a[3]}</h4>
        <p>이러저러한 기능</p>
      </div>
      <div className='list'>
        <h4>{a[4]}</h4>
        <p>이러저러한 기능</p>
      </div>
    </div >
  );
}

export default App;
