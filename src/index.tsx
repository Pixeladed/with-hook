import React, { forwardRef, ComponentType } from 'react';

const withHook = <H extends (...args: any[]) => any, N extends string | number>(
  name: N,
  hook: H
) => <C extends { [name in N]: ReturnType<H> }>(
  DynamicComponent: ComponentType<C>,
  mapPropsToHookParameters?: (props: Omit<C, N>) => Parameters<H>
) => {
  if (hook.length && !mapPropsToHookParameters) {
    throw new Error(
      'The provided hook requires parameters but no mapPropsToHookParameters was provided'
    );
  }

  const WrappedComponent = forwardRef((props: Omit<C, N>, ref) => {
    const parameters =
      mapPropsToHookParameters?.(props) || (([] as unknown) as Parameters<H>);
    const hookValue = hook(...parameters);
    const allProps = {
      ...props,
      [name]: hookValue,
    } as C;

    return <DynamicComponent {...allProps} ref={ref} />;
  });

  WrappedComponent.displayName = `withHook(${name})(${DynamicComponent.displayName})`;

  return WrappedComponent;
};

export default withHook;
