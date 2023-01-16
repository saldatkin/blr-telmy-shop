import { useNavigate } from 'react-router-dom';


const DirectoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <div onClick={onNavigateHandler}>
      <div imageUrl={imageUrl} />
      <div>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;