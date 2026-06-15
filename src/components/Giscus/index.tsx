import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {useColorMode} from '@docusaurus/theme-common';
import Giscus from '@giscus/react';

function GiscusInner() {
  const {colorMode} = useColorMode();
  return (
    <Giscus
      id="comments"
      repo="DDTRobot/community"
      repoId="R_kgDOS3c1eA"
      category="Comments"
      categoryId="DIC_kwDOS3c1eM4C-8rX"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={colorMode === 'dark' ? 'dark_dimmed' : 'light'}
      lang="zh-CN"
      loading="lazy"
    />
  );
}

export default function GiscusComments(): React.ReactElement {
  return (
    <BrowserOnly fallback={<div />}>
      {() => <GiscusInner />}
    </BrowserOnly>
  );
}
