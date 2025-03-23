// Существующие декларации
declare module '*.svg?react' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module '*.mp3' {
  const src: string;
  export default src;
}

declare module 'vite-plugin-singlefile';
declare module '@originjs/vite-plugin-commonjs';
declare module 'vite-plugin-chunk-split';
declare module '@lingui/vite-plugin';

// Декларации для модулей без типов
declare module 'posthog-js';
declare module '@heroui/react';
declare module '@tanstack/react-query';
declare module 'i18next-http-backend';
declare module 'msw';
declare module 'msw/browser';
declare module 'msw/node';
declare module '@mswjs/socket.io-binding';
declare module '@reduxjs/toolkit';