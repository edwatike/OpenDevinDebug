import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes';

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
            children={route.children?.map((child, childIndex) => (
              <Route
                key={childIndex}
                index={child.index}
                path={child.path}
                element={child.element}
                children={child.children?.map((grandChild, grandChildIndex) => (
                  <Route
                    key={grandChildIndex}
                    index={grandChild.index}
                    path={grandChild.path}
                    element={grandChild.element}
                  />
                ))}
              />
            ))}
          />
        ))}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);