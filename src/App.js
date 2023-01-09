const App = () => {
  const categories = [
    {title: 'Hats'}, 
    {title: 'Jackets'}, 
    {title: 'Sneakers'}, 
    {title: 'Womens'}, 
    {title: 'Mens'} 
  ]
  return (
    <div className="categories">
      {categories.map(({title}) => {
        return <div className="category">
          <img className="category__image"></img>
          <div className="category__text">
            <h2>{title}</h2>
            <p>Shop Now</p>
          </div>
        </div>
      })}
      
    </div>
  )
}

export default App;
