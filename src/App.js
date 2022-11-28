import React, { useState, useEffect } from 'react';
import Term from './components/Term.js'
//import Split from "react-split";
import ReactSplit, { SplitDirection } from '@devbookhq/splitter';
export default function App() {
    useEffect(()=>{
        document.addEventListener('keydown',SplitShortKeys,true)
    },[])
    let [insertChildrenHorizontal, setInsertChildrenHorizontal] = useState(false)
    let [insertChildrenHorizontalVertical,SetInsertChildrenHorizontalVertical] = useState(false)
    let [insertChildrenVertical,SetInsertChildrenVertical] = useState(false)
    let [insertChildrenVerticalHorizontal,SetInsertChildrenVerticalHorizontal] = useState(false)
    const SplitShortKeys=(e)=>{
        // splitRight
        if(e.altKey && e.shiftKey && e.key==="+") {
            console.log("SplitRight");
            //document.getElementById("sRight").style.display = "";
            setTimeout(()=>{
                setInsertChildrenHorizontal(true)
            }, 10)

        }
        // SplitLeft
        if(e.altKey && e.shiftKey && e.key==="_"){
            console.log("SplitBottom");
            setTimeout(()=>{
                // SetInsertChildrenHorizontalVertical(true)
                SetInsertChildrenVertical(true)
            }, 10)

        }
        // ExitSplit
        if(e.key==="Escape"){
            console.log("Escape")
            setTimeout(()=>{
                SetInsertChildrenHorizontalVertical(false)
            }, 10)
        }
    }
    return (
        <div className='container'>
            <ReactSplit
                direction={SplitDirection.Horizontal}
                minWidths={[200, 200]}
                gutterClassName="custom-gutter"
                draggerClassName="custom-dragger"
                initialSizes={insertChildrenHorizontal ? [50, 50] : [100]}

            >
               <ReactSplit
                   direction={SplitDirection.Vertical}
                   minHeights={[300, 300]}
                   gutterClassName="custom-gutter"
                   draggerClassName="custom-dragger"
                   initialSizes={insertChildrenVertical ? [50, 50] : [100]}
               >
                   <Term/>
                   {/*Main Terminal*/}
                   {insertChildrenVertical &&
                       <>
                       <Term/>
                           {/*Split Terminal Vertical*/}
                       </>
                   }
               </ReactSplit>
                {/*main terminal end*/}
                {insertChildrenHorizontal &&
                    <>
                        <ReactSplit
                            direction={SplitDirection.Vertical}
                            minHeights={[300, 300]}
                            gutterClassName="custom-gutter"
                            draggerClassName="custom-dragger"
                            initialSizes={insertChildrenHorizontalVertical ? [50, 50] : [100]}
                        >
                            <Term/>
                            {/*Split  Terminal Horizontal*/}
                            {insertChildrenHorizontalVertical &&
                                <>
                                    <Term/>
                                    {/*Split Horizontal Vertical*/}
                                </>
                            }
                        </ReactSplit>
                    </>
                }
            </ReactSplit>

        </div>

    )
}


