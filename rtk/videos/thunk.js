const { createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

const fetchRelatedVideos = createAsyncThunk(
  "video/fetchRelatedVideos",
  async (queryText) => {
    const res = await fetch(`http://localhost:9000/videos?${queryText}`);
    const data = await res.json();

    data.sort((a, b) => {
      const viewsA = parseFloat(a.views);
      const viewsB = parseFloat(b.views);

      if (viewsA > viewsB) {
        return -1;
      } else if (viewsA < viewsB) {
        return 1;
      } else {
        return 0;
      }
    });

    return data;
  }
);

const fetchVideos = createAsyncThunk("video/fetchVideos", async () => {
  const res = await fetch("http://localhost:9000/videos");
  const data = await res.json();
  return data;
});

module.exports.fetchVideos = fetchVideos;
module.exports.fetchRelatedVideos = fetchRelatedVideos;
