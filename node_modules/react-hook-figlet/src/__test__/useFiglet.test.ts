import { useFiglet, FigletFont } from '../'
import { RenderHookResult, act, renderHook } from '@testing-library/react-hooks'

describe('useFiglet', () => {
  let hook: RenderHookResult<unknown, [string, (text: string) => void, (font: FigletFont) => void]>

  beforeEach(async () => {
    // For the first run of useEffect()
    await act(async () => {
      hook = renderHook(() => useFiglet())
      await hook.waitForNextUpdate()
    })
  })

  it('update figlet text', async () => {
    expect(hook.result.current[0]).toBe('')

    act(() => {
      hook.result.current[1]('1')
    })

    expect(hook.result.current[0]).toBe(`\
  _ 
 / |
 | |
 | |
 |_|
    `)

    act(() => {
      hook.result.current[1]('2')
    })

    expect(hook.result.current[0]).toBe(`\
  ____  
 |___ \\ 
   __) |
  / __/ 
 |_____|
        `)
  })

  it('update figlet font', async () => {
    expect(hook.result.current[0]).toBe('')

    act(() => {
      hook.result.current[1]('1')
    })

    expect(hook.result.current[0]).toBe(`\
  _ 
 / |
 | |
 | |
 |_|
    `)

    await act(async () => {
      hook.result.current[2]('Old Banner')
      await hook.waitForNextUpdate()
    })

    expect(hook.result.current[0]).toBe(`\
   #   
  ##   
 # #   
   #   
   #   
   #   
 ##### `)
  })
})
