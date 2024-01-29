import { useEffect, useState } from "react";

import { type ArticleType } from "../App";
import Article from "./Article";

import classes from "./Articles.module.css";
import { useWindowSize } from "../utils/customHook";
import settings from "../constants/settings";

type ArticlesProps = {
  articles: ArticleType[];
};

const Articles: React.FC<ArticlesProps> = ({ articles }) => {
  const windowSize = useWindowSize();
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    if (windowSize !== undefined) {
      setIsMobileView(windowSize.width < settings.DESKTOP_WIDTH);
    }
  }, [windowSize]);

  return (
    <div
      className={
        isMobileView ? classes.articleListMobile : classes.articleListDesktop
      }
    >
      {articles.map((article) => (
        <Article
          key={article.id}
          articleTitle={article.articleTitle}
          id={article.id}
          articleDescription={article.articleDescription}
          articleImage={article.articleImage}
          articleLink={article.articleLink}
          articleTag={article.articleTag}
        />
      ))}
    </div>
  );
};

export default Articles;
