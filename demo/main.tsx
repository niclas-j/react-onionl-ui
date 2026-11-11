import 'virtual:uno.css'
import { createRoot } from 'react-dom/client'
import {
  OlButton, OlCard, OlCardHeader, OlCardContent, OlCardFooter, OlAvatar, OlProgress, OlSwitch,
  OlInput, OlTypingText, OlSlider, OlFlipControl, OlHalo, OlMarquee, OlText3D, OlTooltip,
} from '../index'

const S = ({ t, children }: { t: string; children: any }) => (
  <section><h2>{t}</h2>{children}</section>
)

function App() {
  return (
    <div>
      <h1 style={{ fontSize: 20 }}>react-onionl-ui demo</h1>
      <S t="OlButton"><OlButton>Primary</OlButton> <OlButton type="outline">Outline</OlButton></S>
      <S t="OlCard"><OlCard><OlCardHeader>Header</OlCardHeader><OlCardContent>Content</OlCardContent><OlCardFooter>Footer</OlCardFooter></OlCard></S>
      <S t="OlAvatar"><OlAvatar initials="OL" /> <OlAvatar initials="AB" shape="square" size="lg" /></S>
      <S t="OlProgress"><OlProgress value={60} label class="w-60 h-2" /></S>
      <S t="OlSwitch"><OlSwitch checked /></S>
      <S t="OlInput"><OlInput placeholder="Type here" /></S>
      <S t="OlTypingText"><OlTypingText text="Hello from React" /></S>
      <S t="OlSlider"><OlSlider modelValue={40} /></S>
      <S t="OlFlipControl"><OlFlipControl>flip</OlFlipControl></S>
      <S t="OlHalo"><OlHalo>halo</OlHalo></S>
      <S t="OlMarquee (untested)"><OlMarquee>marquee text</OlMarquee></S>
      <S t="OlText3D (untested)"><OlText3D text="Text 3D" /></S>
      <S t="OlTooltip (untested)"><OlTooltip content="tip">hover me</OlTooltip></S>
    </div>
  )
}
createRoot(document.getElementById('root')!).render(<App />)
