'use client';

import React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';

export default function AntdStyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  const cache = React.useMemo(() => createCache(), []);

  useServerInsertedHTML(() => (
    <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}></style>
  ));

  return <StyleProvider cache={cache} hashPriority={"high"}>{children}</StyleProvider>;
}