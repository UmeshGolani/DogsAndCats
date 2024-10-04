import React from 'react';

const GenericComponent = ({ component: Component = 'div', children, ...props }) => {
  return <Component {...props}>{children}</Component>;
};

export default GenericComponent;
