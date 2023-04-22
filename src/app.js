import React, {useState, useEffect} from 'react'
import { ProgressBar } from 'react-bootstrap';
import corpus from './quotes.json';
import './style.css';
export function App(){
  const [string, setString] = useState('Click to begin and type the words as quickly as possible!'); //string is the quote
  const [WordArr, setWordArr] = useState(string.split(" ")); //
  const [Text, setText] = useState("");
  const [Index, setIndex] = useState(0);
  const [Correct, setCorrect] = useState("");
  const [Wrong, setWrong] = useState("");
  const [Time, setTime] = useState(Date.now());
  const [WPM, setWPM] = useState(0);

  useEffect(()=>{
    setIndex(0); //Reset Index
    setText('');
    setTime(Date.now());
    setWPM(0);
  }, [WordArr]);

  useEffect(() => {  //CHECKER FUNCTION
    if(Index >= WordArr?.length){
      genString();
    }
    if(Text?.charAt(Text.length-1) !== " " && Index !== WordArr?.length - 1)return;
    if(Text?.trim() === WordArr[Index].trim()){
      setText("");
      setWPM(Math.floor(Index/((Date.now()-Time)/60000)));
      setIndex(Index+1);
    }
  }, [Text, Index, WordArr, string, Time]);

  useEffect(() => {
    setWordArr(string.split(" "));
  }, [string]);

  useEffect(() => {
    if(Text){
      let i = 0;
      while(i<Text.length){
        if(Text[i] !== WordArr[Index][i])break;
        i+=1;
      }
      setCorrect(Text.slice(0, i));
    }
    else setCorrect("");
  }, [WordArr, Index, Text]);
  useEffect(() => {
    setWrong(Text?.slice(Correct.length,Text.length));
  }, [Correct, Text, Index, WordArr]);

  function genString(){
      let maxlen = 190;
      let linelen = 0; //the number of characters in the line
      let string = '';
      while(maxlen>=20){//while our string is not full
        let concat = corpus[Math.trunc(Math.random(0, 450)*450)].sentence; //Pick random sentence
        if(concat.length<=maxlen){
          let concatword = concat.split(' '); // for adding \n
          maxlen-=concat.length; //adding the string in
          for(let i=0; i<concatword.length; i++){
            if((linelen+concatword[i].length)>60){
              string += '\n'+concatword[i] + ' ';//making newline if line char. cap is exceeded
              linelen = concatword[i].length + 1;
            }
            else{
              string += concatword[i] + ' ';
              linelen+=concatword[i].length + 1;
            }
          }
        }
      }
      setString(string);
  }
  return (
      <>
      <div class="green-box">
      <div class="container">
        <h2 className='row'>
          <span className='col-sm-3'></span>
          <span className='col-sm-3'>{WordArr[Index]}</span>
          <span className='col-sm-3 text-center'><span className='corr'>{Correct}</span><span className='wrong'>{Wrong}</span></span>
          <span className='col-sm-3'></span>
        </h2>
        <h4>{string}</h4>
        <hr></hr>
        {/* <ProgressBar variant="success" now={40} /> */}
      <div className="row">
        <div class="col-sm-1"></div>
        <button class="col-sm-2" onClick={genString}>New passage!</button>
        <div class="col-sm-1"></div>
        <input class="col-sm-7" autoFocus
          onChange={(Text) => setText(Text.target.value.trimStart())}
          value={Text}/>
      </div>
      <div className='myonlypurposeistopad'></div>
      <div className='row'>
        <div className='col-sm-3'></div>
        <ProgressBar className='col-sm-6 taller'>
          <ProgressBar variant="success" now={Index*100/WordArr.length} />
          <ProgressBar variant="info" now={100-Index*100/WordArr.length}/>
        </ProgressBar>
        <div className='col-sm-1'></div>
      </div>
      <div className='thinnerpadding'></div>
      <div className='row'>
        <div className='col-sm-3'></div>
        <h3 className='col-sm-6'>Words typed: {Index}/{WordArr.length}</h3>
        <h3 className='col-sm-3'>WPM: {WPM}</h3>
      </div>
      </div>
      <div className='myonlypurposeistopad'></div>
      </div>
      <div className="myonlypurposeistopad"></div>
      <div className="myonlypurposeistopad"></div>
      </>
  );
};
