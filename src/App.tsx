import { useEffect, useState } from "react";
import axios from "axios";

import { useWindowSize } from "./utils/customHook";

import Articles from "./components/Articles";
import settings from "./constants/settings";
import Tag from "./components/Tag";
import classes from "./App.module.css";
import Button from "./components/Button";

export type ArticleType = {
  id: number;
  articleTitle: string;
  articleDescription: string;
  articleImage: string;
  articleLink: {
    url: string;
    openInNewTab: boolean;
  };
  articleTag: {
    label: string;
    tag: string;
  };
};

type tagType = {
  label: string;
  tag: string;
};

function App() {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [visibleArticles, setVisibleArticles] = useState<ArticleType[]>([]);

  const [tags, setTags] = useState<tagType[]>([]);
  const [spliceVal, setSpliceVal] = useState(0);
  const [currentFilter, setCurrentFilter] = useState("");

  const [page, setPage] = useState<number>(1);
  const [isMobileView, setIsMobileView] = useState(false);

  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize !== undefined) {
      setIsMobileView(windowSize.width < settings.DESKTOP_WIDTH);
    }
  }, [windowSize]);

  useEffect(() => {
    axios
      .get("./articles.json")
      .then((res) => setArticles(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const tempTags: tagType[] = [];
    articles.map((article) => {
      const exist =
        tempTags.findIndex((ar) => ar.tag === article.articleTag.tag) > -1;
      if (!exist) {
        tempTags.push(article.articleTag);
      }
    });

    setTags(tempTags);
    // setArticleLength(articles?.length);
  }, [articles]);

  useEffect(() => {
    let tempVArticles = [...articles];

    if (currentFilter) {
      tempVArticles = tempVArticles.filter(
        (article) => article.articleTag.tag === currentFilter
      );
    }

    let tempSpliceVal = isMobileView
      ? settings.MOBILE_INIT_CARD_LIMIT
      : settings.DESKTOP_INIT_CARD_LIMIT;

    if (page > 1) {
      tempSpliceVal = spliceVal + settings.LOAD_MORE_LIMIT;
    }
    setSpliceVal(tempSpliceVal);
    tempVArticles = tempVArticles.slice(0, tempSpliceVal);

    setVisibleArticles(tempVArticles);
  }, [page, articles, isMobileView, currentFilter]);

  const filterByTag = (tag: string) => {
    setCurrentFilter(tag);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={classes.main}>
      <h1 className={classes.header}>The latest</h1>
      <div className={classes.tagContainer}>
        {tags.map((tag) => (
          <Tag
            key={tag.tag}
            label={tag.label}
            onClick={() => filterByTag(tag.tag)}
          />
        ))}
      </div>
      {visibleArticles.length > 0 ? (
        <Articles articles={visibleArticles} />
      ) : (
        <div className={classes.emptyListContainer}>
          No Articles found with this tag.
        </div>
      )}
      {visibleArticles.length < articles.length && (
        <div className={classes.moreButtonContainer}>
          <Button onClick={handleLoadMore}>More Articles</Button>
        </div>
      )}
    </div>
  );
}

export default App;
