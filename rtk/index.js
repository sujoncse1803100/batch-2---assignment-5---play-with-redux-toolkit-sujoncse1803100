const store = require("./videos/store");
const { fetchVideos, fetchRelatedVideos } = require("./videos/thunk");

const fetchMoreVideos = () => {
  const tags = store.getState().video.videos?.tags;
  let str = "";
  tags &&
    tags.forEach((element) => {
      str += `tags_like=${element}&`;
    });
  str = str.substring(0, str.length - 1);
  tags && store.dispatch(fetchRelatedVideos(str));
};

var loaded = false;
store.subscribe(() => {
  const videoInfo = store.getState().video;

  if (!loaded && videoInfo.objectLoaded) {
    loaded = true;
    fetchMoreVideos();
  }
});

store.dispatch(fetchVideos());
