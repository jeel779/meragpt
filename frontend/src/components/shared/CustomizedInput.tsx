type Props={
    name:string,
    type:string,
    placeholder:string
}
const CustomizedInput = (props:Props) => {
  return (
    <div className="w-full">
      <input 
        type={props.type} 
        name={props.name} 
        placeholder={props.placeholder} 
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 transition-all duration-300 font-sans"
      /> 
    </div>
  )
}

export default CustomizedInput