import './App.css';
import { useState } from 'react';
import * as React from 'react';

function App() {

  let [a, b] = useState(['시간변환기', '아케인심볼계산기', '어센틱심볼계산기', '비약/몬파 효율']);

  let [cmdText, setCmd] = useState('');

  let cur = new Date();
  let korTimeDiff = 9 * 60 * 60 * 1000;
  let date = new Date(cur.getTime() + cur.getTimezoneOffset() * 60 * 1000 + korTimeDiff);

  let [timeDiff, setTimeDiff] = useState({
    daydiff: 0,
    ampm: 0,
    hour: 0,
  })

  let [selectedOption, setOption] = useState({
    daydiff: '오늘',
    ampm: 'AM',
    hour: '0',
  })

  const copyToClipBoard = (text) => {
    try {
      navigator.clipboard.writeText(text);
      alert('클립보드에 복사되었습니다');
    } catch (error) {
      alert('실패. 재시도 필요');
    }
  };

  const DAYDIFF = [
    { value: 0, name: '오늘', category: 'daydiff' },
    { value: 1, name: '내일', category: 'daydiff' },
  ];

  const AMPM = [
    { value: 0, name: 'AM', category: 'ampm' },
    { value: 12, name: 'PM', category: 'ampm' },
  ];

  const HOUR = [
    { value: 0, name: '0', category: 'hour' },
    { value: 1, name: '1', category: 'hour' },
    { value: 2, name: '2', category: 'hour' },
    { value: 3, name: '3', category: 'hour' },
    { value: 4, name: '4', category: 'hour' },
    { value: 5, name: '5', category: 'hour' },
    { value: 6, name: '6', category: 'hour' },
    { value: 7, name: '7', category: 'hour' },
    { value: 8, name: '8', category: 'hour' },
    { value: 9, name: '9', category: 'hour' },
    { value: 10, name: '10', category: 'hour' },
    { value: 11, name: '11', category: 'hour' },
  ];


  const SelectBox = (props) => {
    const handleSelectChange = (e) => {
      setTimeDiff({ ...timeDiff, [e.target.name]: e.target.value });
    }
    return (
      <select name={props.options[0].category} onChange={handleSelectChange}>
        {
          props.options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              defaultValue={props.defaultValue === option.value}
            >
              {option.name}
            </option>
          ))
        }
      </select >
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
        <div>
          <SelectBox options={DAYDIFF} defaultValue="0"></SelectBox>
          <SelectBox options={AMPM} defaultValue="0"></SelectBox>
          <SelectBox options={HOUR} defaultValue="0"></SelectBox>
          <div>
            {
              timeDiff.daydiff === 0 ? <>오늘 </>: <>내일 </>
            }
            {
              timeDiff.ampm === 0 ? <>오전 </> : <>오후 </>
            }
            {timeDiff.hour}시
          </div>
          <button onClick={() => {
            let dTime = new Date(date.getFullYear(),
              date.getMonth(),
              date.getDate() + parseInt(timeDiff.daydiff),
              parseInt(timeDiff.ampm) + parseInt(timeDiff.hour)
            );
            let result = parseInt((parseInt(dTime.getTime()) - parseInt(date.getTime())) / 1000);
            setCmd("shutdown -r -f -t " + result);
          }}>계산!</button>
          <button onClick={() => { copyToClipBoard(cmdText) }} >{cmdText} <p>누르면 복사됨</p></button>
        </div>
      </div>
      <div className='list'>
        <h4>{a[1]}</h4>
        <p>이러저러한 기능</p>
      </div>
      <div className='list'>
        <h4>{a[2]}</h4>
        <p>이러저러한 기능</p>
      </div>
      <div className='list'>
        <h4>{a[3]}</h4>
        <p>이러저러한 기능</p>
      </div>
    </div >
  );
}

export default App;
