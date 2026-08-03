import { Composition } from 'remotion'
import { NetworkAnimation } from './compositions/NetworkAnimation'
import { FormationPromo } from './compositions/FormationPromo'
import { StatsReveal } from './compositions/StatsReveal'

export function Root() {
  return (
    <>
      {/* 15s loop — hero background dark/gold network */}
      <Composition
        id="NetworkAnimation"
        component={NetworkAnimation}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 30s formation promo */}
      <Composition
        id="FormationPromo"
        component={FormationPromo}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 10s stats counter reveal */}
      <Composition
        id="StatsReveal"
        component={StatsReveal}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  )
}
