export type ActivePlayerAreaProps = {
  extraProps?: any;
}

export const ActivePlayerArea = (props: ActivePlayerAreaProps) => {
  return <div className='ActivePlayerArea' style={{ border: 'solid red' }} {...props.extraProps} />
}