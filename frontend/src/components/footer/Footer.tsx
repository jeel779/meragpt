const Footer = () => {
  return (
    <footer className="w-full py-6 text-center text-xs text-text-dim/40 border-t border-white/5 backdrop-blur-md relative z-10 font-sans">
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>© {new Date().getFullYear()} MeraGPT. All rights reserved.</span>
        <span>Crafted with Glass-Futurism & precision.</span>
      </div>
    </footer>
  )
}

export default Footer