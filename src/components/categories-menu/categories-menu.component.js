import Category from "../category-item/category-item.component.js";
import './categories-menu.styles.scss'

const Categories = ({ categories }) => {
  return (
    <div className="categories">
      {categories.map((category) => {
        return <Category key={category.id} category={category}/>
      })}
      
    </div>
  )
}

export default Categories;