function returnVideoEmbedCode(videoId) {
  return (
    <iframe
      width="560"
      height="315"
      src={videoId}
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  );
}

module.exports = { returnVideoEmbedCode };
