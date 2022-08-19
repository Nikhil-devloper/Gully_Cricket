import React, { useState, useEffect } from 'react'
import wrapper from '../hoc/Wrapper';
import Button from '../Components/Button';
import ExpandCollapse from '../Components/ExpanCollapse';
import OverData from '../Components/OverData';
import ReactModal from 'react-modal';
import RunCollector from '../Components/RunCollector';
import { useContext } from "react";
import AppContext from "../Components/AppContext";
import { useEffectX } from "use-effect-x";

const ballsInOver = 6;

function Match() {

  const { overCount, resetCount } = useContext(AppContext);
  const [overs, setOverCount] = useState(overCount);

  // useEffect(() => {
  //   console.log('useEffect val-->', val);
  //   setOverCount(overCount);
  //   setResetFlag(true);
  // }, [overCount])

  useEffectX(({ changedItem: [overCountA] }) => {

    if (overCountA.previous != undefined && overCount !== overCountA.previous) {
      setOverCount(overCount);
      setResetFlag(true);

    }

    // do something when val changes
  },
    [overCount]
  );

  useEffect(() => {
    if (resetCount != 0) {
      setResetFlag(true);
    }
  }, [resetCount])



  console.log('overCount ==>', overCount)

  const getnrateNewEmptyArray = () => {
    return new Array(overs).fill(0).map(ele => {
      return new Array(ballsInOver).fill(0).map((res, ind) => {
        let keyName = `${ind}`;
        return {
          [keyName]: 0,
          isDirty: false,
          runs: 0
        };
      });
    });
  }


  // const [team1Data, setTeam1Data] = useState([...initialData]);
  // const [team2Data, setTeam2Data] = useState([...initialData2]);
  const [team1Data, setTeam1Data] = useState([...getnrateNewEmptyArray()]);
  const [team2Data, setTeam2Data] = useState([...getnrateNewEmptyArray()]);
  const [showModal, handleModal] = useState(false);
  const [inning, setInning] = useState(1);

  const [rowCol, setRowCol] = useState({});
  const [firstInningRowCol, setFirstInningRowCol] = useState({});
  const [firstInningComplete, setFirstInningComplete] = useState(false);

  const [updateRowCol, setUpdateRowCol] = useState({});
  const [preloadDirtyData, setPreloadDirtyData] = useState([]);
  const [resetFlag, setResetFlag] = useState(false);

  const handleMyModal = (ballIndex, over) => {
    setRowCol({ ballIndex, over });
    setPreloadDirtyData([])
    handleModal(true);
  }

  const handleCloseModal = (runs, dirtyData) => {
    const { ballIndex, over } = rowCol;
    //if (inning == 1) {

    //Wicket Check
    let WicketDown = 0;
    if (dirtyData.filter(ele => ele.displayData == 'Wk').length != 0) {
      WicketDown = 1
    }
    //Nb or  Wb check
    let NbORWb = 0;
    if (dirtyData.filter(ele => ((ele.displayData == 'Nb') || (ele.displayData == "Wd"))).length != 0) {
      NbORWb = 1
    }
    let onlyNb = 0;
    if (dirtyData.filter(ele => ((ele.displayData == 'Nb'))).length != 0) {
      onlyNb = 1
    }


    let teamDataTemp = inning == 1 ? [...team1Data] : [...team2Data];

    if (NbORWb == 1) {
      if (!(WicketDown == 1 && onlyNb == 1)) {
        teamDataTemp[over].push({ isDirty: false, runs: 0, [team1Data[over].length]: 0 })
      }
    }

    teamDataTemp[over][ballIndex] = { runs: runs, isDirty: true, [ballIndex]: runs, dirtyData: dirtyData, WicketDown: WicketDown, NbORWb: NbORWb, onlyNb: onlyNb }

    if (inning == 1) {
      setTeam1Data(teamDataTemp);
    }
    else {
      setTeam2Data(teamDataTemp);
    }


    handleModal(false);
  }

  const updateCloseModal = (runs, dirtyData) => {
    const { ballIndex, over } = updateRowCol;

    let WicketDown = 0;
    if (dirtyData.filter(ele => ele.displayData == 'Wk').length != 0) {
      WicketDown = 1;
    }

    //Nb or  Wb check
    let NbORWb = 0;
    if (dirtyData.filter(ele => ((ele.displayData == 'Nb') || (ele.displayData == "Wd"))).length != 0) {
      NbORWb = 1
    }

    let onlyNb = 0;
    if (dirtyData.filter(ele => ((ele.displayData == 'Nb'))).length != 0) {
      onlyNb = 1;
    }

    let teamDataTemp = inning == 1 ? [...team1Data] : [...team2Data];

    let oldBall = teamDataTemp[over][ballIndex];
    teamDataTemp[over][ballIndex] = { runs: runs, isDirty: true, [ballIndex]: runs, dirtyData: dirtyData, WicketDown: WicketDown, NbORWb: NbORWb, onlyNb: onlyNb }

    let diff = (teamDataTemp[over].filter(ele => ele.NbORWb == 1).length + 6) - (teamDataTemp[over].length);

    console.log('diff ==>', diff);

    if (diff > 0) {
      if (!(WicketDown == 1 && onlyNb == 1)) {
        teamDataTemp[over].push({ isDirty: false, runs: 0, [teamDataTemp[over].length]: 0 });
      }
    }
    else if (diff < 0) {
      //if (!(oldBall.WicketDown == 1 && oldBall.onlyNb == 1)) {
      teamDataTemp[over].pop()
      //}      
    }
    else if (diff == 0) {
      if ((WicketDown == 1 && onlyNb == 1)) {
        teamDataTemp[over].pop()
      }
    }


    if (inning == 1) {
      setTeam1Data(teamDataTemp);
    }
    else {
      setTeam2Data(teamDataTemp);
    }

    handleModal(false);
  }

  const updateModal = (ballIndex, over) => {

    setUpdateRowCol({ ballIndex, over });
    let displayData = inning == 1 ? [...team1Data] : [...team2Data];
    setPreloadDirtyData(displayData[over][ballIndex].dirtyData);
    handleModal(true);
  }

  const calCOver = () => {
    const { ballIndex, over } = rowCol;
    if (over != undefined)
      return `${over}:${ballIndex + 1}`;
    else
      return `0:0`;
  }

  const switchInning = () => {
    if (inning == 2) {
      setResetFlag(true);
    }
    else {
      setInning(2);
      setFirstInningRowCol(rowCol);
      setFirstInningComplete(true);
      setRowCol({ ballIndex: 0, over: 0 });
    }
  }

  const resetEverything = () => {
    let new1 = getnrateNewEmptyArray();
    let new2 = getnrateNewEmptyArray();
    setTeam1Data([...new1]);
    setTeam2Data([...new2]);
    setInning(1);
    setRowCol({});
    setFirstInningRowCol({})
    setFirstInningComplete(false);
    setUpdateRowCol({});
    setPreloadDirtyData([])
    setResetFlag(false);
    handleModal(false);
  }

  let displayData;


  if (inning == 1) {
    displayData = [...team1Data];
  }
  else {
    displayData = [...team2Data];
  }

  let totalRuns = 0;
  let WicketDown = 0;


  displayData.forEach(ele => {
    ele.map(data => {
      if (data.isDirty) {
        totalRuns += data.runs;
        WicketDown += (data.WicketDown ? data.WicketDown : 0);
      }
    });
  });



  return (
    <div className='mt-20 md:mt-32 bg-primary-myblack text-white' style={{ minHeight: '100vh', height: 'auto' }}>
      <div className='mt-5 mb-5 text-2xl text-center h-10 flex justify-center'>{inning == 1 ? '1st' : '2nd'} Inning </div>

      <div className='flex justify-around'>

        <Button
          label={'Team 1'}
          type={inning == 1 ? 'primary' : 'secondery'}
          onClick={() => { setInning(1) }}
        />


        <Button
          label={'Team 2'}
          type={inning == 1 ? 'secondery' : 'primary'}
          onClick={() => { setInning(2) }}
          addedClass={firstInningComplete == true ? '' : 'opacity-50 pointer-events-none'} //Add condition here

        />

      </div>

      <div className='flex justify-center items-center flex-col w-full mt-14' >
        <div className='text-4xl font-bold'> {totalRuns} / {WicketDown} </div>

        <div className='text-2xl mt-4'> Over:  {(firstInningComplete == true && inning == 1) ? (`${firstInningRowCol.over}:${firstInningRowCol.ballIndex + 1}`) : calCOver()} </div>
        {/* {firstInningComplete ? (`${firstInningRowCol.over}:${firstInningRowCol.ballIndex}`) : */}
      </div>

      <div className='p-3'>
        {displayData.map((over, col, arr) => {
          let isLastBallAdded = false;
          if ((arr.length - 1 == col)) {
            //console.log('over[col]',over[col]);
            if (arr[col].filter(ele => ele.isDirty == true).length == arr[col].length) {
              isLastBallAdded = true;
            }
          }


          return (
            (
              <ExpandCollapse
                displayText={'Over ' + (col + 1)}
                parentClass={'ard-profile-expan-collapse flight'}
                key={col + 100}
              >
                <OverData
                  col={col}
                  over={over}
                  handleModal={(row) => handleMyModal(row, col)}
                  updateModal={(row) => updateModal(row, col)}
                  calCOver={calCOver(displayData)}
                  isLastOverComplete={col == 0 ? true : (arr[col - 1].length == arr[col - 1].filter(ele => ele.isDirty == true).length) ? true : false}
                />
                {arr.length - 1 == col ?
                  <div className={`flex justify-center mt-4 ${(isLastBallAdded == true) ? '' : 'opacity-50 pointer-events-none'}`}>
                    <Button
                      label={'Complete'}
                      type={'secondery'}
                      onClick={() => { switchInning() }}
                    />
                  </div>
                  : null}
              </ExpandCollapse>
            )
          )
        }
        )}
      </div>

      <ReactModal
        isOpen={showModal}
        contentLabel="Minimal Modal Example"
        ariaHideApp={false}
        style={
          {
            overlay: {
              background: '#b9d22640',
            }, content: {
              maxHeight: '525px',
              background: '#171821',
              padding: '20px',
              top: '20%',
              left: '20px',
              right: '20px',
              bottom: '20px',

            }
          }
        }
      >
        <RunCollector justClose={() => handleModal(false)} handleCloseModal={handleCloseModal} updateCloseModal={updateCloseModal} preloadDirtyData={preloadDirtyData} updateRowCol={updateRowCol} />
      </ReactModal>

      <ReactModal
        isOpen={resetFlag}
        contentLabel="Minimal Modal Example"
        ariaHideApp={false}
        style={
          {
            overlay: {
              background: '#b9d22640',
            }, content: {
              maxHeight: '325px',
              background: '#171821',
              padding: '20px',
              top: '20%',
              left: '20px',
              right: '20px',
              bottom: '20px',

            }
          }
        }
      >
        <div className='text-3xl text-primary-gold flex justify-around items-center flex-col h-full'>
          <div> Reset Game ? </div>
          <div className='text-xl'> The new match will get started.  </div>

          <div className='flex w-full justify-around items-center'>

            <Button
              label={'Yes'}
              type={'seconderyRound'}
              onClick={() => { resetEverything() }}

            />


            <Button
              label={'No'}
              type={'seconderyRound'}
              onClick={() => { setResetFlag(false) }}

            />
          </div>
        </div>
      </ReactModal>

    </div>
  )
}

export default wrapper(Match, false);

//TO:DO
/*
- Ball Increse for every no ball and wide ball  // Done
- Over and Wicker  should Work Same as runs  (done)
- Validation if no runs selected    (done)
- Option to Update data in the over. (done)
-If you update noball to valid ball  remove last ball  (done)
- Next ball only Enable if last ball score enterd  
Only scroll Over part score part should remain static. (try or vaishali)
Desktop Navbar
If noball or wide and wicket on same bg shwo both red and green

scenario --> no ball + 2 runs play with same data update same data  ==> bug ball adding and not adding  (done)
for new ball select val and deselect them  0 value is getting added but error message should come
*/


