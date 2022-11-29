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
    const a = "10"
    const SplitShortKeys=(e)=> {
        // splitRight
        if (e.altKey && e.shiftKey && e.key === "+") {
            console.log("SplitRight");
            //document.getElementById("sRight").style.display = "";
            setTimeout(() => {
                setInsertChildrenHorizontal(true)
                //SetInsertChildrenHorizontalVertical(true)
                // SetInsertChildrenVerticalHorizontal(true)
            }, 10)

        }
        // SplitLeft
        if (e.altKey && e.shiftKey && e.key === "_") {
            console.log("SplitBottom");
            setTimeout(() => {
                SetInsertChildrenVertical(true)
                SetInsertChildrenHorizontalVertical(true)
            }, 10)
        }
        // ExitSplit
        if(e.key==="Escape"){
            console.log("Escape")
            setTimeout(()=>{
                if(a==10) {
                    SetInsertChildrenHorizontalVertical(false)
                }
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
                initialSizes={insertChildrenHorizontal ? [50, 50] : [100]} //h3

            >
               <ReactSplit
                   direction={SplitDirection.Vertical}
                   minHeights={[300, 300]}
                   gutterClassName="custom-gutter"
                   draggerClassName="custom-dragger"
                   initialSizes={insertChildrenVertical ? [50, 50] : [100]} //h2
               >
                   <Term/>
                   {/*h1*/}
                   {/*Main Terminal*/}
                   {insertChildrenVertical &&
                       <ReactSplit
                           id = "try"
                           direction={SplitDirection.Horizontal}
                           minWidths={[200, 200]}
                           gutterClassName="custom-gutter"
                           draggerClassName="custom-dragger"
                           initialSizes={insertChildrenVerticalHorizontal ? [50, 50] : [100]} //h6
                       >
                           <Term/>
                           {/*h5*/}
                           {/*Split Terminal Horizontal*/}
                           {insertChildrenVerticalHorizontal &&
                               <>
                                   <Term/>
                                   {/*h6*/}
                                   {/*Split Vertical Horizontal*/}
                               </>
                           }
                       </ReactSplit>

                   }
               </ReactSplit>
                {/*Horizontal Start*/}
                {insertChildrenHorizontal &&
                    <>
                        <ReactSplit
                            direction={SplitDirection.Vertical}
                            minHeights={[300, 300]}
                            gutterClassName="custom-gutter"
                            draggerClassName="custom-dragger"
                            initialSizes={insertChildrenHorizontalVertical ? [50, 50] : [100]} //h3
                        >
                            <Term/>
                            {/*h3*/}
                            {/*Split Terminal Horizontal*/}
                            {insertChildrenHorizontalVertical &&
                                <>
                                    <Term/>
                                    {/*h4*/}
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


