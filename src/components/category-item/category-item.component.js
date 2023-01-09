import './category-item.styles.scss';

const Category = ({ category }) => {
    const { id, title, imageUrl } = category;
    return (
        <div key={id} className="category">
            <div 
                className="category__image" 
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}/>
            <div className="category__body">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    )
}

export default Category;