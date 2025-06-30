export const TestColors = () => {
  return (
    <div className="p-8">
      <div className="bg-secondary p-4 text-white mb-4">
        This should be RED if secondary color works
      </div>
      <div className="bg-primary p-4 text-white mb-4">
        This should be GREEN if primary works
      </div>
      <div className="bg-accent p-4 text-white">
        This should be BLUE if accent works
      </div>
    </div>
  )
}