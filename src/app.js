import React, {useState} from 'react'
import corpus from './pootis.json';

function App(){
    const [string, setString] = useState('Click on the button to begin!');
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
        <h3>{string}</h3>
        <h1>TEST TEST TEST</h1>
        <hr></hr>
        <button onClick={genString}>New sequence!</button>
        <input type="text" id = 'monke'>

        </input>
        
        </>
    );
}
 export default App;
