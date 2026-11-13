import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Carousel() {

  const bigBoxRef = useRef(null)
  const [coords, setCoords] = useState(0)
  const [snap, setSnap] = useState(false)
  const [pointerDown, setPointerDown] = useState(false)
  const [intervalRestart, setIntervalRestart] = useState(true)
  const [IID, setIID] = useState(null)
  const [count, setCount] = useState(null)
  const autoPlayTime = 6000 //no unit
  const sliderCount = 5

  function restartInterval(){
    setIntervalRestart(intervalRestart ? false : true)
  }

  function handlePointerDown(e){
    setPointerDown(true)
    const xi = e.pageX
    let t1 = e.timeStamp

    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerup', handlePointerUp)
    document.addEventListener('pointercancel', handlePointerCancel)

    function handlePointerMove(e2){
      let dx = e2.pageX - xi
      setCoords(coords + dx)
    }

    function handlePointerUp(e2){
      setPointerDown(false)
      restartInterval()
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerup', handlePointerUp)
      document.removeEventListener('pointercancel', handlePointerCancel)
      setSnap(true)

      let t2 = e2.timeStamp
      let dt = t2 - t1
      let dx = e2.pageX - xi
      let tx = -coords
      let width = bigBoxRef.current.getBoundingClientRect().width

      if(dt <= 200 && dx !== 0){
        if(dx < 0){
          if(tx < width){
            setCoords(-width)
          } else if(tx < 2*width){
            setCoords(-2*width)
          } else if(tx < 3*width){
            setCoords(-3*width)
          } else if(tx < 4*width){
            setCoords(-4*width)
          } else if(tx < 5*width){
            setCoords(-5*width)
          }
        } else if(dx > 0){
          if(tx > 5*width){
            setCoords(-5*width)
          } else if(tx > 4*width){
            setCoords(-4*width)
          } else if(tx > 3*width){
            setCoords(-3*width)
          } else if(tx > 2*width){
            setCoords(-2*width)
          } else if(tx > width){
            setCoords(-width)
          } else if(tx > 0){
            setCoords(0)
          }
        }
      }
    }

    function handlePointerCancel(){
      setPointerDown(false)
      restartInterval()
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerup', handlePointerUp)
      document.removeEventListener('pointercancel', handlePointerCancel)
    }
  }

  function activatePagination(i){
    let width = bigBoxRef.current.getBoundingClientRect().width
    let n = i+1

    restartInterval()
    setSnap(true)
    clearInterval(IID)
    setCount(n)
    setCoords((1-n)*width)
  }

  useEffect(()=>{
    if(snap){
      let tx = -coords
      let width = bigBoxRef.current.getBoundingClientRect().width

      if(tx < 0 || tx <= width/2){
        setCoords(0)
      } else if(tx < width || tx < 3*width/2){
        setCoords(-width)
      } else if(tx < 2*width || tx < 5*width/2){
        setCoords(-2*width)
      } else if(tx < 3*width || tx < 7*width/2){
        setCoords(-3*width)
      } else if(tx < 4*width || tx < 9*width/2){
        setCoords(-4*width)
      } else if(tx < 5*width || tx < 11*width/2){
        setCoords(-5*width)
      } else{
        setCoords(-5*width)
      }
      
      setTimeout(()=>{setSnap(false)}, 500)
    }
  }, [snap])

//   useEffect(()=>{
//     let width = bigBoxRef.current.getBoundingClientRect().width

//     setIID(
//       setInterval(()=>{
//         setSnap(true)
//         setCoords(c => c - width)
//       }, autoPlayTime)
//     )
//   }, [intervalRestart])

  //disable autoplay by commenting out the hook above

  useEffect(()=>{
    let width = bigBoxRef.current.getBoundingClientRect().width

    if(coords === -sliderCount*width){
      setCoords(0)
    }
  }, [coords])

  useEffect(()=>{
    if(pointerDown){
      clearInterval(IID)
    }
  }, [pointerDown])

  useEffect(()=>{
    let width = bigBoxRef.current.getBoundingClientRect().width

    if(coords === 0){
      setCount(0)
    } else if(coords === -width){
      setCount(1)
    } else if(coords === -2*width){
      setCount(2)
    } else if(coords === -3*width){
      setCount(3)
    } else if(coords === -4*width){
      setCount(4)
    } else if(coords === -5*width){
      setCount(5)
    }
  } ,[coords])

  return (
    <div className="productsCardWrapper" >
        <div className="productsCardCarousel" ref={bigBoxRef} style={{transform: `translateX(${coords}px)`, transitionDuration: snap ? '500ms' : '0ms'}} onPointerDown={handlePointerDown}>
            <article className="productsCard">
                <img src="/media/quotation.png" />
                <p className='cardReview'>UWorld was central to my Step 1 preparation for 4 reasons: (1) Helped me identify the most high yield facts/concepts; (2) Taught me more medicine than my school lectures/syllabi ever did; (3) Strengthened my test-taking skills; (4) Hit me with difficult questions that provided a "reality check," which kept me focused, motivated, and sensible about my Step 1 goals.</p>
                <p className='cardSignature'>Ben, UWorld Step 1 student</p>
                <div className="horiStrip"></div>
            </article>
            <article className="productsCard">
                <img src="/media/quotation.png" />
                <p className='cardReview'>I swear, I did no other preparation than completing UWorld and moved from 1390 to 1510 on the SAT. So, to all those prepping, I PROMISE you that UWORLD IS THE REAL DEAL. Just finish all the questions and learn from your mistakes. IT'S FREAKING AMAZING!</p>
                <p className='cardSignature'>Alex, UWorld SAT student</p>
                <div className="horiStrip"></div>
            </article>
            <article className="productsCard">
                <img src="/media/quotation.png" />
                <p className='cardReview'>URLs NCLEX test prep offers more rationales and diagrams for each answer along with an objective to the question. This is more than any other test prep I have used in the past such as ATI, HESI, and LWW. This offers a student more visual learning along with repetition in reading the question's objective.</p>
                <p className='cardSignature'>Jason, UWorld NCLEX student</p>
                <div className="horiStrip"></div>
            </article>
            <article className="productsCard">
                <img src="/media/quotation.png" />
                <p className='cardReview'>UWORLD is awesome! I am amazed at how good the questions and explanations are, along with the flowcharts and accompanying imagery. You can't find quality study material like this during your residency, but UWorld has done an amazing job of making everything simple and understandable. Hats off to your company!</p>
                <p className='cardSignature'>Hari, UWorld ABIM studen</p>
                <div className="horiStrip"></div>
            </article>
            <article className="productsCard">
                <img src="/media/quotation.png" />
                <p className='cardReview'>UWorld MCAT is an incredible tool. Unfortunately, I found it very close to my MCAT date and wish I'd found it sooner. The comprehensive explanations with gorgeous graphics really make learning an amazing experience. I learned a lot during my time using UWorld.</p>
                <p className='cardSignature'>Anon, UWorld MCAT student</p>
                <div className="horiStrip"></div>
            </article>
        </div>
        <div className="paginationWrapper">
            {
                [...Array(sliderCount)].map((e, i)=>{
                return <div className={count === i ? 'pagination paginationActive' : 'pagination'} key={i} onClick={()=>activatePagination(i)}></div>
            })
            }
        </div>
    </div>
  )
}

export default Carousel

