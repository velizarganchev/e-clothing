import {
  DirectoryItemContainer,
  BackgroundImage,
  Body,

} from './directory-item.styles.jsx'

const CategoryItem = ({ category }) => {

  const { imageUrl, title } = category;

  return (
    <DirectoryItemContainer>
      <BackgroundImage />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default CategoryItem;