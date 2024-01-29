import { type ArticleType } from "../App";

import Forward from "../assets/icon-right.png";
import classes from "./Article.module.css";

const Article: React.FC<ArticleType> = ({
  articleTitle,
  articleTag,
  articleDescription,
  articleImage,
  articleLink,
}) => {
  return (
    <div className={classes.mainCard}>
      <a href={articleLink.url} target="_blank">
        <div className={classes.articleImage}>
          <img alt={articleTitle} src={articleImage} />
        </div>
        <div className={classes.infoContainer}>
          <div className={classes.tagContainer}>{articleTag.label}</div>
          <div className={classes.titleContainer}>{articleTitle}</div>
          <p className={classes.descContainer}>{articleDescription}</p>
          <div className={classes.arrowContainer}>
            <img src={Forward} />
          </div>
        </div>
      </a>
    </div>
  );
};

export default Article;
