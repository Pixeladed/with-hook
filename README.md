# withHook

This is a compatibility function that converts a hook into a higher order function that can be used with class components.

## Example

```tsx
// usage for hooks without parameters

const useMeaningOfLife = () => 42
const Message = (props: {meaningOfLife: number}) => {
  return <div>{props.meaningOfLife}</div>
}

const withMeaningOfLife = withHook('meaningOfLife', useMeaningOfLife)
const WrappedMessage = withMeaningOfLife(Message)

// displays 42
<WrappedMessage />
```

```tsx
// usage for hooks with parameters

const useGreeting = (name: string) => `Hello, ${name}!`
const Message = (props: {name: string, greeting: string}) => {
  return <div>{props.greeting}</div>
}

const withMeaningOfLife = withHook('greeting', useGreeting)
const WrappedMessage = withMeaningOfLife(Message, props => [props.name])

// displays Hello, John!
<WrappedMessage name="John"/>
```

## Parameters

`withHook` takes 2 parameters:

- `name`: this is the name of the prop that your component will receive with the hook's returned value
- `hook`: the hook function

## Returned HOC

`withHook` returns a higher order component that takes the following parameters:

- `DynamicComponent`: the component that you want to inject new props into
- `mapPropsToHookParameters?`: a function that takes in the props provided to the wrapper and return an array of the parameters that will be passed to the hook. This mapper is only required if your hook takes in parameters
