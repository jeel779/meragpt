type Props={
    name:string,
    type:string,
    placeholder:string
}
const CustomizedInput = (props:Props) => {
  return (
    <>
       <input type={props.type} name={props.name} placeholder={props.placeholder} /> 
    </>
  )
}

export default CustomizedInput