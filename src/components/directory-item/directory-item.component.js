import { useNavigate } from 'react-router-dom';

import './directory-item.styles.scss'


const DirectoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <div className='preview' onClick={onNavigateHandler}>
      <div className='preview__image' 
          style={{ backgroundImage: `url(${imageUrl})`}} />
      <div className='preview__text'>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;